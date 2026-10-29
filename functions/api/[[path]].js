const SESSION_COOKIE = "dolayout_admin_session";
const SESSION_DAYS = 7;
const MAX_JSON_BYTES = 350000;
const MAX_IMAGE_BYTES = 20 * 1024 * 1024;
const MAX_VIDEO_BYTES = 100 * 1024 * 1024;
const ALLOWED_MEDIA = new Set(["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm"]);

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api\/?/, "");

  if (request.method !== "GET" && !sameOrigin(request)) {
    return json({ error: "Cross-origin request denied." }, 403);
  }

  try {
    if (path === "dindin/google-token" && request.method === "POST") return exchangeDindinGoogleCode(request, env);
    if (path === "session" && request.method === "GET") return getSession(request, env);
    if (path === "session/challenge" && request.method === "POST") return getLoginChallenge(request, env);
    if (path === "setup" && request.method === "POST") return setupAdmin(request, env);
    if (path === "session" && request.method === "POST") return login(request, env);
    if (path === "session" && request.method === "DELETE") return logout(request, env);
    if (path === "content" && request.method === "GET") return getPublishedContent(env);
    if (path === "comments" && request.method === "GET") return getPublicComments(url, env);
    if (path === "comments" && request.method === "POST") return postComment(request, env);
    if (path === "media" && request.method === "GET") return getMedia(url, env);
    if (path === "admin/content" && request.method === "GET") return getAdminContent(request, env);
    if (path === "admin/content" && ["POST", "PUT"].includes(request.method)) return saveContent(request, env);
    if (path.startsWith("admin/content/") && request.method === "DELETE") return deleteContent(request, env, path.slice("admin/content/".length));
    if (path === "admin/comments" && request.method === "GET") return getAdminComments(request, env, url);
    if (path.startsWith("admin/comments/") && request.method === "PATCH") return moderateComment(request, env, path.slice("admin/comments/".length));
    if (path.startsWith("admin/comments/") && request.method === "DELETE") return deleteComment(request, env, path.slice("admin/comments/".length));
    if (path === "admin/media" && request.method === "POST") return uploadMedia(request, env);
    return json({ error: "Not found." }, 404);
  } catch (error) {
    console.error("Dolayout API error:", error?.message || error);
    if (error?.status) return json({ error: error.message }, error.status);
    return json({ error: "The request could not be completed." }, 500);
  }
}

async function exchangeDindinGoogleCode(request, env) {
  if (request.headers.get("X-Requested-With") !== "XmlHttpRequest") return json({ error: "Invalid OAuth request." }, 400);
  if (!env.GOOGLE_OAUTH_CLIENT_SECRET) return json({ error: "Google Drive connection is not configured." }, 503);
  const origin = new URL(request.url).origin;
  const body = await readJson(request);
  const code = typeof body.code === "string" ? body.code : "";
  if (!code || code.length > 4096 || body.redirectUri !== origin) return json({ error: "Invalid OAuth code request." }, 400);

  let googleResponse;
  try {
    googleResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: "215401091425-3qec03kr78a1dl57frk8tab3bo7dgl4s.apps.googleusercontent.com",
        client_secret: env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirect_uri: origin,
        grant_type: "authorization_code",
      }),
    });
  } catch {
    return json({ error: "Google could not complete the authorization." }, 502);
  }

  let tokens;
  try { tokens = await googleResponse.json(); } catch { return json({ error: "Google returned an invalid authorization response." }, 502); }
  if (!googleResponse.ok || typeof tokens.access_token !== "string") return json({ error: "Google could not complete the authorization." }, 502);

  return json({ access_token: tokens.access_token, expires_in: tokens.expires_in, token_type: tokens.token_type, scope: tokens.scope });
}

async function getSession(request, env) {
  const db = database(env);
  const admin = await db.prepare("SELECT id, email FROM admin_users LIMIT 1").first();
  if (!admin) return json({ authenticated: false, setupRequired: true, mediaAvailable: Boolean(env.MEDIA_BUCKET) });
  const token = readCookie(request, SESSION_COOKIE);
  if (!token) return json({ authenticated: false, setupRequired: false, mediaAvailable: Boolean(env.MEDIA_BUCKET) });
  const tokenHash = await sha256(token);
  const session = await db.prepare(
    "SELECT admin_users.id, admin_users.email FROM admin_sessions JOIN admin_users ON admin_users.id = admin_sessions.user_id WHERE admin_sessions.token_hash = ? AND admin_sessions.expires_at > ?"
  ).bind(tokenHash, new Date().toISOString()).first();
  return json({ authenticated: Boolean(session), setupRequired: false, user: session || null, mediaAvailable: Boolean(env.MEDIA_BUCKET) });
}

async function setupAdmin(request, env) {
  const db = database(env);
  if (!env.ADMIN_SETUP_TOKEN) {
    return json({ error: "Admin setup is not configured yet. Contact the site administrator." }, 503);
  }
  const existing = await db.prepare("SELECT id FROM admin_users LIMIT 1").first();
  if (existing) return json({ error: "Initial setup has already been completed." }, 409);
  const body = await readJson(request);
  const email = normalizeEmail(body.email);
  if (!constantTimeEqual(String(body.setupToken || ""), env.ADMIN_SETUP_TOKEN)) return json({ error: "Invalid setup code." }, 403);
  if (!validEmail(email)) return json({ error: "Enter a valid email address." }, 400);
  const passwordSalt = String(body.passwordSalt || "");
  const passwordVerifier = String(body.passwordVerifier || "");
  if (!Number.isInteger(body.passwordLength) || body.passwordLength < 12 || body.passwordLength > 128) return json({ error: "Use a password between 12 and 128 characters." }, 400);
  if (!/^[\da-z_-]{22}$/i.test(passwordSalt) || !/^[\da-z_-]{43}$/i.test(passwordVerifier)) return json({ error: "The password could not be secured. Please try again." }, 400);

  const passwordHash = await sha256(passwordVerifier);
  const id = crypto.randomUUID();
  try {
    await db.prepare("INSERT INTO admin_users (id, email, password_hash, password_salt, created_at) SELECT ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM admin_users)")
      .bind(id, email, passwordHash, passwordSalt, new Date().toISOString()).run();
  } catch {
    return json({ error: "An administrator has already been created." }, 409);
  }
  const admin = await db.prepare("SELECT id, email FROM admin_users WHERE id = ?").bind(id).first();
  if (!admin) return json({ error: "Initial setup has already been completed." }, 409);
  return createSession(db, admin, request);
}

async function getLoginChallenge(request, env) {
  const body = await readJson(request);
  const email = normalizeEmail(body.email);
  const admin = validEmail(email)
    ? await database(env).prepare("SELECT password_salt FROM admin_users WHERE email = ?").bind(email).first()
    : null;
  return json({ salt: admin?.password_salt || randomToken(16) });
}

async function login(request, env) {
  const db = database(env);
  const body = await readJson(request);
  const email = normalizeEmail(body.email);
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const fingerprint = await sha256(`login:${ip}`);
  const now = Date.now();
  await db.prepare("DELETE FROM auth_attempts WHERE created_at < ?").bind(new Date(now - 60 * 60 * 1000).toISOString()).run();
  const failures = await db.prepare("SELECT COUNT(*) AS total FROM auth_attempts WHERE fingerprint = ? AND created_at > ?")
    .bind(fingerprint, new Date(now - 15 * 60 * 1000).toISOString()).first();
  if ((failures?.total || 0) >= 10) return json({ error: "Too many attempts. Try again in 15 minutes." }, 429);

  const admin = await db.prepare("SELECT id, email, password_hash, password_salt FROM admin_users WHERE email = ?").bind(email).first();
  const verifier = String(body.passwordVerifier || "");
  const candidate = /^[\da-z_-]{43}$/i.test(verifier) ? await sha256(verifier) : "invalid-verifier";
  if (!admin || !constantTimeEqual(candidate, admin.password_hash)) {
    await db.prepare("INSERT INTO auth_attempts (fingerprint, created_at) VALUES (?, ?)").bind(fingerprint, new Date(now).toISOString()).run();
    return json({ error: "Email or password is incorrect." }, 401);
  }
  await db.prepare("DELETE FROM auth_attempts WHERE fingerprint = ?").bind(fingerprint).run();
  return createSession(db, admin, request);
}

async function createSession(db, user, request) {
  const token = randomToken(32);
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  await db.prepare("INSERT INTO admin_sessions (token_hash, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)")
    .bind(await sha256(token), user.id, expires, new Date().toISOString()).run();
  return json({ authenticated: true, user: { id: user.id, email: user.email } }, 200, {
    "Set-Cookie": `${SESSION_COOKIE}=${token}; Path=/; Max-Age=${SESSION_DAYS * 86400}; HttpOnly; Secure; SameSite=Strict`
  });
}

async function logout(request, env) {
  const token = readCookie(request, SESSION_COOKIE);
  if (token) await database(env).prepare("DELETE FROM admin_sessions WHERE token_hash = ?").bind(await sha256(token)).run();
  return json({ authenticated: false }, 200, { "Set-Cookie": `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict` });
}

async function getPublishedContent(env) {
  const result = await database(env).prepare("SELECT data_json FROM content_items WHERE status = 'published' ORDER BY sort_order ASC, updated_at DESC").all();
  const items = (result.results || []).map((row) => {
    try { return JSON.parse(row.data_json); } catch { return null; }
  }).filter(Boolean);
  return json(items, 200, { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" });
}

async function getAdminContent(request, env) {
  await requireAdmin(request, env);
  const result = await database(env).prepare("SELECT id, kind, status, sort_order, data_json, created_at, updated_at FROM content_items ORDER BY updated_at DESC").all();
  return json((result.results || []).map((row) => ({ ...JSON.parse(row.data_json), id: row.id, kind: row.kind, status: row.status, sortOrder: row.sort_order, createdAt: row.created_at, updatedAt: row.updated_at })));
}

async function saveContent(request, env) {
  await requireAdmin(request, env);
  const db = database(env);
  const body = await readJson(request);
  const item = validateContent(body);
  const id = String(body.id || crypto.randomUUID());
  if (!/^[a-f0-9-]{36}$/i.test(id)) return json({ error: "Invalid content id." }, 400);
  const current = await db.prepare("SELECT id FROM content_items WHERE id = ?").bind(id).first();
  if ((request.method === "PUT" || body.id) && !current) return json({ error: "Content item not found." }, 404);
  const now = new Date().toISOString();
  const sortOrder = Number.isFinite(Number(body.sortOrder)) ? Math.max(0, Math.min(100000, Number(body.sortOrder))) : 0;
  item.id = id;
  item._remote = true;
  if (current) {
    await db.prepare("UPDATE content_items SET kind = ?, status = ?, sort_order = ?, data_json = ?, updated_at = ? WHERE id = ?")
      .bind(item.kind, item.status, sortOrder, JSON.stringify(item), now, id).run();
  } else {
    await db.prepare("INSERT INTO content_items (id, kind, status, sort_order, data_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .bind(id, item.kind, item.status, sortOrder, JSON.stringify(item), now, now).run();
  }
  return json({ ...item, updatedAt: now }, current ? 200 : 201);
}

async function deleteContent(request, env, id) {
  await requireAdmin(request, env);
  const decoded = decodeURIComponent(id);
  const result = await database(env).prepare("DELETE FROM content_items WHERE id = ?").bind(decoded).run();
  return result.meta?.changes ? json({ deleted: true }) : json({ error: "Content item not found." }, 404);
}

function validateContent(body) {
  const kind = body.kind === "inspiration" ? "inspiration" : body.kind === "project" ? "project" : "";
  if (!kind) throw httpError("Choose a project or inspiration article.", 400);
  const title = cleanText(body.title, 140);
  const titlePt = cleanText(body.titlePt, 140);
  if (!title) throw httpError("An English title is required.", 400);
  const categories = cleanList(body.categories || body.category, 8, 40);
  if (!categories.length) throw httpError("Add at least one category.", 400);
  const tags = cleanList(body.tags, 24, 48);
  const hashtags = cleanList(body.hashtags, 24, 48).map((tag) => tag.replace(/^#/, ""));
  const image = safeAsset(body.image);
  if (!image) throw httpError("Add a cover image.", 400);
  const gallery = cleanList(body.gallery, 80, 400).map(safeAsset).filter(Boolean);
  const description = cleanText(body.description, 800);
  const descriptionPt = cleanText(body.descriptionPt, 800);
  const articleEn = cleanText(body.articleEn, 40000);
  const articlePt = cleanText(body.articlePt, 40000);
  if (kind === "inspiration" && !articleEn) throw httpError("Add the English article text.", 400);
  const status = body.status === "draft" ? "draft" : "published";
  const palette = Array.isArray(body.palette) && body.palette.length === 2 && body.palette.every((value) => /^#[\da-f]{3,8}$/i.test(value)) ? body.palette : ["#111111", "#4b4b4b"];
  const externalLinks = Array.isArray(body.externalLinks) ? body.externalLinks.slice(0, 4).map((link) => ({
    label: cleanText(link?.label, 40),
    url: safeExternalUrl(link?.url)
  })).filter((link) => link.label && link.url) : [];
  const projectArticle = kind === "inspiration" ? {
    en: articleEn.split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean),
    pt: articlePt.split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean)
  } : undefined;
  return {
    kind,
    status,
    title,
    titlePt,
    category: categories[0],
    categories,
    type: kind === "inspiration" ? "article" : "complete case",
    description,
    descriptionPt,
    tags,
    hashtags,
    image,
    gallery,
    images: gallery,
    article: projectArticle,
    externalLinks,
    height: 520,
    palette,
    tone: "mono",
    feedCarousel: false,
    showFeedTitle: false,
    downloadable: false,
    openMode: "detail",
    _remote: true
  };
}

async function getPublicComments(url, env) {
  const itemId = cleanText(url.searchParams.get("itemId"), 100);
  if (!itemId) return json({ error: "A content id is required." }, 400);
  const result = await database(env).prepare("SELECT id, author_name AS author, body, created_at AS createdAt FROM comments WHERE item_id = ? AND status = 'approved' ORDER BY created_at ASC LIMIT 100")
    .bind(itemId).all();
  return json(result.results || [], 200, { "Cache-Control": "public, max-age=30" });
}

async function postComment(request, env) {
  const db = database(env);
  const body = await readJson(request);
  if (body.website) return json({ submitted: true });
  const itemId = cleanText(body.itemId, 100);
  const author = cleanText(body.author, 80);
  const text = cleanText(body.body, 1500);
  if (!itemId || !author || text.length < 3) return json({ error: "Add your name and a comment." }, 400);
  if (!/^[a-z0-9][a-z0-9-]{0,99}$/i.test(itemId)) return json({ error: "This page is not accepting comments." }, 404);
  const databaseItem = await db.prepare("SELECT status FROM content_items WHERE id = ?").bind(itemId).first();
  if (databaseItem && databaseItem.status !== "published") return json({ error: "This page is not accepting comments." }, 404);
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const fingerprint = await sha256(`comment:${ip}`);
  const cutoff = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  await db.prepare("DELETE FROM comment_events WHERE created_at < ?").bind(new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()).run();
  const recent = await db.prepare("SELECT COUNT(*) AS total FROM comment_events WHERE fingerprint = ? AND created_at > ?").bind(fingerprint, cutoff).first();
  if ((recent?.total || 0) >= 5) return json({ error: "Please wait before sending another comment." }, 429);
  const now = new Date().toISOString();
  await db.batch([
    db.prepare("INSERT INTO comments (id, item_id, author_name, body, status, created_at) VALUES (?, ?, ?, ?, 'pending', ?)").bind(crypto.randomUUID(), itemId, author, text, now),
    db.prepare("INSERT INTO comment_events (fingerprint, created_at) VALUES (?, ?)").bind(fingerprint, now)
  ]);
  return json({ submitted: true, message: "Thanks. Your comment is waiting for approval." }, 201);
}

async function getAdminComments(request, env, url) {
  await requireAdmin(request, env);
  const status = ["pending", "approved", "rejected"].includes(url.searchParams.get("status")) ? url.searchParams.get("status") : "pending";
  const result = await database(env).prepare("SELECT comments.id, comments.item_id AS itemId, comments.author_name AS author, comments.body, comments.status, comments.created_at AS createdAt, content_items.data_json FROM comments LEFT JOIN content_items ON content_items.id = comments.item_id WHERE comments.status = ? ORDER BY comments.created_at DESC LIMIT 250")
    .bind(status).all();
  return json((result.results || []).map(({ data_json, ...comment }) => {
    let content = {};
    try { content = JSON.parse(data_json || "{}"); } catch {}
    return { ...comment, itemTitle: content.title || comment.itemId };
  }));
}

async function moderateComment(request, env, id) {
  await requireAdmin(request, env);
  const body = await readJson(request);
  const status = body.status;
  if (!new Set(["approved", "rejected", "pending"]).has(status)) return json({ error: "Invalid moderation status." }, 400);
  const result = await database(env).prepare("UPDATE comments SET status = ?, moderated_at = ? WHERE id = ?")
    .bind(status, new Date().toISOString(), decodeURIComponent(id)).run();
  return result.meta?.changes ? json({ updated: true }) : json({ error: "Comment not found." }, 404);
}

async function deleteComment(request, env, id) {
  await requireAdmin(request, env);
  const result = await database(env).prepare("DELETE FROM comments WHERE id = ?").bind(decodeURIComponent(id)).run();
  return result.meta?.changes ? json({ deleted: true }) : json({ error: "Comment not found." }, 404);
}

async function uploadMedia(request, env) {
  await requireAdmin(request, env);
  if (!env.MEDIA_BUCKET) return json({ error: "Media storage is not connected yet." }, 503);
  const form = await request.formData();
  const files = form.getAll("files").filter((file) => file instanceof File);
  if (!files.length) return json({ error: "Choose at least one file." }, 400);
  const results = [];
  for (const file of files.slice(0, 24)) {
    const type = file.type.toLowerCase();
    if (!ALLOWED_MEDIA.has(type)) return json({ error: `Unsupported file type: ${type || "unknown"}.` }, 415);
    const limit = type.startsWith("video/") ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
    if (!file.size || file.size > limit) return json({ error: `${file.name} is too large.` }, 413);
    const extension = ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "video/mp4": "mp4", "video/webm": "webm" })[type];
    const key = `portfolio/${crypto.randomUUID()}.${extension}`;
    await env.MEDIA_BUCKET.put(key, file.stream(), {
      httpMetadata: { contentType: type, cacheControl: "public, max-age=31536000, immutable" },
      customMetadata: { originalName: cleanText(file.name, 120) }
    });
    results.push({ key, url: `/api/media?key=${encodeURIComponent(key)}`, name: file.name, type, size: file.size });
  }
  return json(results, 201);
}

async function getMedia(url, env) {
  if (!env.MEDIA_BUCKET) return json({ error: "Media storage is not connected." }, 503);
  const key = String(url.searchParams.get("key") || "");
  if (!/^portfolio\/[\da-f-]+\.(jpg|png|webp|mp4|webm)$/i.test(key)) return json({ error: "Invalid media key." }, 400);
  const object = await env.MEDIA_BUCKET.get(key);
  if (!object) return json({ error: "Media not found." }, 404);
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("ETag", object.httpEtag);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
}

async function requireAdmin(request, env) {
  const db = database(env);
  const token = readCookie(request, SESSION_COOKIE);
  if (!token) throw httpError("Sign in to continue.", 401);
  const session = await db.prepare("SELECT user_id FROM admin_sessions WHERE token_hash = ? AND expires_at > ?")
    .bind(await sha256(token), new Date().toISOString()).first();
  if (!session) throw httpError("Your session has expired. Sign in again.", 401);
  return session;
}

function database(env) {
  if (!env.DB) throw httpError("The content database is not connected yet.", 503);
  return env.DB;
}

function safeAsset(value) {
  const asset = cleanText(value, 500);
  if (!asset) return "";
  if (/^(assets\/|\/assets\/|\/api\/media\?key=portfolio%2F|\/api\/media\?key=portfolio\/)/i.test(asset)) return asset;
  try {
    const url = new URL(asset);
    return url.protocol === "https:" ? url.href : "";
  } catch { return ""; }
}

function safeExternalUrl(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" ? url.href : "";
  } catch { return ""; }
}

function cleanList(value, maxItems, maxLength) {
  const list = Array.isArray(value) ? value : String(value || "").split(/[\n,]/);
  return [...new Set(list.map((item) => cleanText(item, maxLength).replace(/^#/, "")).filter(Boolean))].slice(0, maxItems);
}

function cleanText(value, maxLength) {
  return String(value || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, maxLength);
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase().slice(0, 254);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function readJson(request) {
  const rawLength = Number(request.headers.get("Content-Length") || 0);
  if (rawLength > MAX_JSON_BYTES) throw httpError("Request is too large.", 413);
  const text = await request.text();
  if (new TextEncoder().encode(text).length > MAX_JSON_BYTES) throw httpError("Request is too large.", 413);
  try { return JSON.parse(text || "{}"); } catch { throw httpError("Invalid JSON body.", 400); }
}

function sameOrigin(request) {
  const origin = request.headers.get("Origin");
  return Boolean(origin && origin === new URL(request.url).origin);
}

function readCookie(request, name) {
  const cookies = request.headers.get("Cookie") || "";
  for (const piece of cookies.split(";")) {
    const [key, ...value] = piece.trim().split("=");
    if (key === name) return value.join("=");
  }
  return "";
}

function randomToken(bytes) {
  const value = crypto.getRandomValues(new Uint8Array(bytes));
  return toBase64Url(value);
}

async function sha256(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return toBase64Url(new Uint8Array(digest));
}

function toBase64Url(bytes) {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function constantTimeEqual(left, right) {
  if (typeof right !== "string") return false;
  let mismatch = left.length ^ right.length;
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index += 1) mismatch |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  return mismatch === 0;
}

function httpError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function json(data, status = 200, extraHeaders = {}) {
  const headers = new Headers({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  for (const [key, value] of Object.entries(extraHeaders)) headers.set(key, value);
  return new Response(JSON.stringify(data), { status, headers });
}
