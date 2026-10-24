const app = document.querySelector("#app");
const state = { user: null, tab: "projects", content: [], comments: [], filter: "pending", editing: null, toastTimer: 0, mediaAvailable: false };
const icon = (name) => ({
  edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6m4 4v7m6-7v7"/></svg>',
  close: '<svg viewBox="0 0 24 24"><path d="m18 6-12 12M6 6l12 12"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>'
})[name];

boot();

async function boot() {
  try {
    const session = await api("/api/session");
    state.mediaAvailable = Boolean(session.mediaAvailable);
    if (session.setupRequired) renderSetup();
    else if (session.authenticated) {
      state.user = session.user;
      renderDashboard();
      await loadTab();
    } else renderLogin();
  } catch (error) { renderUnavailable(error.message); }
}

function renderBrand() {
  return `<div class="admin-brand"><img src="../assets/dolayout/brand/app-icon.svg" alt=""><span>dolayout / admin</span></div>`;
}

function renderLogin(message = "") {
  app.innerHTML = `
    <section class="auth-shell"><form class="auth-panel" id="loginForm" autocomplete="on">
      ${renderBrand()}<h1>Good to have you back.</h1><p>Sign in to manage projects, inspiration and comments.</p>
      <label class="field">Email<input type="email" name="email" autocomplete="username" required></label>
      <label class="field">Password<input type="password" name="password" autocomplete="current-password" required></label>
      <button class="button button-primary" type="submit">Sign in</button><p class="message ${message ? "is-error" : ""}" role="status">${escapeHtml(message)}</p>
      <p class="hint">Admin access is private. Need help? <a href="mailto:joaodolayout@gmail.com">Contact Dolayout</a>.</p>
    </form></section>`;
  app.querySelector("#loginForm").addEventListener("submit", submitLogin);
}

function renderSetup(message = "") {
  app.innerHTML = `
    <section class="auth-shell"><form class="auth-panel" id="setupForm" autocomplete="on">
      ${renderBrand()}<h1>Set up your admin.</h1><p>This one-time step creates the only administrator account. Choose a strong password you do not use elsewhere.</p>
      <label class="field">Setup code<input type="password" name="setupToken" autocomplete="one-time-code" required></label>
      <label class="field">Admin email<input type="email" name="email" value="joaodolayout@gmail.com" autocomplete="username" required></label>
      <label class="field">New password<input type="password" name="password" minlength="12" maxlength="128" autocomplete="new-password" required><span class="hint">At least 12 characters.</span></label>
      <label class="field">Confirm password<input type="password" name="confirmPassword" minlength="12" maxlength="128" autocomplete="new-password" required></label>
      <button class="button button-primary" type="submit">Create admin account</button><p class="message ${message ? "is-error" : ""}" role="status">${escapeHtml(message)}</p>
    </form></section>`;
  app.querySelector("#setupForm").addEventListener("submit", submitSetup);
}

function renderUnavailable(message) {
  app.innerHTML = `<section class="auth-shell"><div class="auth-panel">${renderBrand()}<h1>Admin is not connected yet.</h1><p>${escapeHtml(message || "The content service is unavailable.")}</p><p class="hint">The site needs its D1 database binding before the admin can sign in. The R2 media bucket enables uploads. See the deployment checklist in the project files.</p><a class="button button-quiet" href="/">Back to Dolayout</a></div></section>`;
}

function renderDashboard() {
  app.innerHTML = `
    <div class="admin-layout">
      <header class="admin-header">${renderBrand()}<div class="admin-header-actions"><span class="admin-user">${escapeHtml(state.user.email)}</span><a class="button button-quiet" href="/" target="_blank" rel="noreferrer">View site</a><button class="button button-quiet" id="logoutButton" type="button">Sign out</button></div></header>
      <main class="admin-main"><div class="admin-title-row"><div><h1>Studio, in order.</h1><p>Projects, ideas and the conversations around them.</p></div><button class="button button-primary" id="newContent" type="button">＋ &nbsp;New content</button></div>
        <nav class="admin-tabs" aria-label="Admin sections">
          <button class="tab-button" data-tab="projects">Projects</button><button class="tab-button" data-tab="inspiration">Inspiration</button><button class="tab-button" data-tab="comments">Comments <span id="pendingCount"></span></button>
        </nav><section id="workspace"></section>
      </main>
    </div><div id="toast" class="toast" hidden></div>`;
  app.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => selectTab(button.dataset.tab)));
  app.querySelector("#newContent").addEventListener("click", () => renderEditor());
  app.querySelector("#logoutButton").addEventListener("click", logout);
  selectTab(state.tab, false);
}

async function selectTab(tab, load = true) {
  state.tab = tab;
  app.querySelectorAll("[data-tab]").forEach((button) => button.classList.toggle("is-active", button.dataset.tab === tab));
  app.querySelector("#newContent").hidden = tab === "comments";
  if (load) await loadTab();
}

async function loadTab() {
  const workspace = app.querySelector("#workspace");
  if (!workspace) return;
  workspace.innerHTML = `<div class="empty-state"><span class="loader"></span><p>Loading ${escapeHtml(state.tab)}…</p></div>`;
  try {
    if (state.tab === "comments") {
      const [comments, pending] = await Promise.all([api(`/api/admin/comments?status=${state.filter}`), api("/api/admin/comments?status=pending")]);
      state.comments = comments;
      app.querySelector("#pendingCount").textContent = pending.length ? `(${pending.length})` : "";
      renderComments();
    } else {
      state.content = await api("/api/admin/content");
      renderContentList();
    }
  } catch (error) { workspace.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`; }
}

function renderContentList() {
  const selected = state.content.filter((item) => item.kind === state.tab.replace(/s$/, "") || (state.tab === "projects" && item.kind === "project"));
  const items = selected.length ? selected : [];
  const workspace = app.querySelector("#workspace");
  workspace.innerHTML = `
    <div class="toolbar"><input id="contentSearch" type="search" placeholder="Find by title or tag"><select id="contentStatus"><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Drafts</option></select><span class="count">${items.length} ${items.length === 1 ? "item" : "items"}</span></div>
    <div class="content-list">${items.length ? items.map(contentRow).join("") : `<div class="empty-state">Nothing here yet. Add the first ${state.tab === "projects" ? "project" : "inspiration article"}.</div>`}</div>`;
  workspace.querySelector("#contentSearch").addEventListener("input", filterContentRows);
  workspace.querySelector("#contentStatus").addEventListener("change", filterContentRows);
  workspace.querySelectorAll("[data-edit]").forEach((button) => button.addEventListener("click", () => renderEditor(state.content.find((item) => item.id === button.dataset.edit))));
  workspace.querySelectorAll("[data-delete]").forEach((button) => button.addEventListener("click", () => deleteContent(button.dataset.delete)));
}

function contentRow(item) {
  return `<article class="content-row" data-content-row data-title="${escapeAttr(`${item.title} ${item.tags?.join(" ") || ""}`.toLowerCase())}" data-status="${item.status}">
    <div class="content-summary"><div class="content-thumb">${item.image ? `<img src="${escapeAttr(item.image)}" alt="" loading="lazy">` : ""}</div><div class="content-copy"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml((item.categories || [item.category]).join(" · "))} · ${escapeHtml((item.tags || []).slice(0, 4).join(" / "))}</small><small><span class="status status-${escapeAttr(item.status)}">${escapeHtml(item.status)}</span></small></div></div>
    <div class="row-actions"><button class="icon-button" type="button" data-edit="${escapeAttr(item.id)}" aria-label="Edit ${escapeAttr(item.title)}" title="Edit">${icon("edit")}</button><button class="icon-button button-danger" type="button" data-delete="${escapeAttr(item.id)}" aria-label="Delete ${escapeAttr(item.title)}" title="Delete">${icon("trash")}</button></div>
  </article>`;
}

function filterContentRows() {
  const query = app.querySelector("#contentSearch").value.toLowerCase();
  const status = app.querySelector("#contentStatus").value;
  app.querySelectorAll("[data-content-row]").forEach((row) => { row.hidden = !row.dataset.title.includes(query) || (status !== "all" && row.dataset.status !== status); });
}

function renderEditor(item = null) {
  state.editing = item || null;
  const workspace = app.querySelector("#workspace");
  const isArticle = (item?.kind || state.tab) === "inspiration";
  const input = (label, name, value = "", attrs = "", wide = false) => `<label class="field ${wide ? "field-wide" : ""}">${label}<input name="${name}" value="${escapeAttr(value || "")}" ${attrs}></label>`;
  workspace.innerHTML = `
    <form id="contentForm" class="content-editor">
      <div class="editor-top"><div><h2>${item ? "Edit content" : isArticle ? "New inspiration" : "New project"}</h2><p class="hint">English is the primary language. Portuguese is optional.</p></div><div class="editor-actions"><button class="button button-quiet" id="cancelEdit" type="button">Cancel</button><button class="button button-primary" type="submit">Save content</button></div></div>
      <div class="editor-grid">
        <label class="field">Content type<select name="kind"><option value="project" ${!isArticle ? "selected" : ""}>Project</option><option value="inspiration" ${isArticle ? "selected" : ""}>Inspiration article</option></select></label>
        <label class="field">Publication<select name="status"><option value="draft" ${item?.status === "draft" ? "selected" : ""}>Save as draft</option><option value="published" ${item?.status !== "draft" ? "selected" : ""}>Publish</option></select></label>
        ${input("Title · English", "title", item?.title, "required maxlength=140")}
        ${input("Title · Portuguese", "titlePt", item?.titlePt, "maxlength=140")}
        ${input("Categories · comma separated", "categories", (item?.categories || [item?.category]).filter(Boolean).join(", "), "required placeholder=Branding,\ Identity,\ Website\ Design", true)}
        ${input("Tags · comma separated", "tags", item?.tags?.join(", "), "placeholder=identity,\ strategy,\ portugal", true)}
        ${input("Hashtags · comma separated", "hashtags", item?.hashtags?.join(", "), "placeholder=PartilhaUrbana,\ LAFDigital", true)}
        <label class="field field-wide">Description · English<textarea name="description" maxlength="800">${escapeHtml(item?.description || "")}</textarea></label>
        <label class="field field-wide">Description · Portuguese<textarea name="descriptionPt" maxlength="800">${escapeHtml(item?.descriptionPt || "")}</textarea></label>
        <label class="field field-wide">Cover image URL<input name="image" value="${escapeAttr(item?.image || "")}" placeholder="Upload an image or add an https URL" required></label>
        <label class="upload-zone field-wide">Upload cover image or video<input id="coverUpload" type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"></label>
        <label class="field field-wide">Project gallery URLs · one per line<textarea name="gallery" placeholder="One URL per line">${escapeHtml((item?.gallery || []).join("\n"))}</textarea></label>
        <label class="upload-zone field-wide">Add images or videos to the gallery<input id="galleryUpload" type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" multiple></label>
        <div class="media-list field-wide" id="uploadStatus"></div>
        ${input("Project website", "website", item?.externalLinks?.find((link) => /website|site/i.test(link.label))?.url, "type=url placeholder=https://")}
        ${input("Instagram", "instagram", item?.externalLinks?.find((link) => /instagram/i.test(link.label))?.url, "type=url placeholder=https://instagram.com/", false)}
        <label class="field field-wide article-field">Article · English<textarea name="articleEn" rows="12" placeholder="Write complete article paragraphs. Separate paragraphs with a blank line.">${escapeHtml((item?.article?.en || []).join("\n\n"))}</textarea><span class="hint">The first paragraph is used as the opening. Separate paragraphs with a blank line.</span></label>
        <label class="field field-wide article-field">Article · Portuguese<textarea name="articlePt" rows="12" placeholder="Texto completo do artigo. Separe os parágrafos com uma linha em branco.">${escapeHtml((item?.article?.pt || []).join("\n\n"))}</textarea></label>
        <label class="field">Order<input name="sortOrder" type="number" min="0" max="100000" value="${Number(item?.sortOrder || 0)}"></label>
      </div>
      <p class="editor-footnote">${state.mediaAvailable ? "Uploads are stored in Dolayout media storage. Supported: JPG, PNG, WebP, MP4 and WebM. Images up to 20 MB; videos up to 100 MB." : "Media uploads are not enabled yet. Add an HTTPS image or video URL above. File uploads can be enabled later by connecting Cloudflare R2."}</p><p class="message" id="editorMessage" role="status"></p>
    </form>`;
  workspace.querySelector("#cancelEdit").addEventListener("click", () => loadTab());
  workspace.querySelector("#contentForm [name=kind]").addEventListener("change", (event) => workspace.querySelectorAll(".article-field").forEach((field) => { field.hidden = event.target.value !== "inspiration"; }));
  workspace.querySelector("#contentForm [name=kind]").dispatchEvent(new Event("change"));
  workspace.querySelector("#contentForm").addEventListener("submit", saveContent);
  workspace.querySelector("#coverUpload").addEventListener("change", (event) => uploadFiles(event.target.files, "cover"));
  workspace.querySelector("#galleryUpload").addEventListener("change", (event) => uploadFiles(event.target.files, "gallery"));
}

async function uploadFiles(files, target) {
  const list = [...files || []];
  if (!list.length) return;
  const status = app.querySelector("#uploadStatus");
  status.innerHTML = `<p class="hint">Uploading ${list.length} file${list.length === 1 ? "" : "s"}…</p>`;
  const form = new FormData();
  list.forEach((file) => form.append("files", file));
  try {
    const uploaded = await api("/api/admin/media", { method: "POST", body: form });
    const imageInput = app.querySelector("[name=image]");
    const galleryInput = app.querySelector("[name=gallery]");
    if (target === "cover") imageInput.value = uploaded[0].url;
    else galleryInput.value = [...galleryInput.value.split("\n").filter(Boolean), ...uploaded.map((file) => file.url)].join("\n");
    status.innerHTML = uploaded.map((file) => `<div class="media-item">${file.type.startsWith("image/") ? `<img src="${escapeAttr(file.url)}" alt="">` : ""}<span>${escapeHtml(file.name)}</span><span>Uploaded</span></div>`).join("");
  } catch (error) { status.innerHTML = `<p class="message is-error">${escapeHtml(error.message)}</p>`; }
}

async function saveContent(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const links = [];
  if (data.get("website")) links.push({ label: "Website", url: data.get("website") });
  if (data.get("instagram")) links.push({ label: "Instagram", url: data.get("instagram") });
  const item = {
    ...(state.editing ? { id: state.editing.id } : {}),
    kind: data.get("kind"), status: data.get("status"), title: data.get("title"), titlePt: data.get("titlePt"),
    categories: splitList(data.get("categories")), tags: splitList(data.get("tags")), hashtags: splitList(data.get("hashtags")),
    description: data.get("description"), descriptionPt: data.get("descriptionPt"), image: data.get("image"),
    gallery: String(data.get("gallery") || "").split(/\n+/).map((url) => url.trim()).filter(Boolean),
    articleEn: data.get("articleEn"), articlePt: data.get("articlePt"), externalLinks: links, sortOrder: Number(data.get("sortOrder") || 0)
  };
  const button = form.querySelector("[type=submit]");
  const message = form.querySelector("#editorMessage");
  button.disabled = true;
  message.textContent = "Saving…";
  try {
    await api("/api/admin/content", { method: state.editing ? "PUT" : "POST", body: item });
    state.tab = item.kind === "project" ? "projects" : "inspiration";
    await loadTab();
    toast("Content saved.");
  } catch (error) {
    message.className = "message is-error";
    message.textContent = error.message;
    button.disabled = false;
  }
}

function renderComments() {
  const workspace = app.querySelector("#workspace");
  workspace.innerHTML = `
    <div class="toolbar"><select id="commentStatus"><option value="pending" ${state.filter === "pending" ? "selected" : ""}>Waiting for review</option><option value="approved" ${state.filter === "approved" ? "selected" : ""}>Approved</option><option value="rejected" ${state.filter === "rejected" ? "selected" : ""}>Rejected</option></select><span class="count">${state.comments.length} ${state.comments.length === 1 ? "comment" : "comments"}</span></div>
    <div class="comment-list">${state.comments.length ? state.comments.map(commentRow).join("") : `<div class="empty-state">No ${state.filter} comments.</div>`}</div>`;
  workspace.querySelector("#commentStatus").addEventListener("change", async (event) => { state.filter = event.target.value; await loadTab(); });
  workspace.querySelectorAll("[data-moderate]").forEach((button) => button.addEventListener("click", () => moderate(button.dataset.moderate, button.dataset.id)));
  workspace.querySelectorAll("[data-comment-delete]").forEach((button) => button.addEventListener("click", () => deleteComment(button.dataset.commentDelete)));
}

function commentRow(item) {
  const actions = state.filter === "pending" ? `<button class="button button-primary" data-moderate="approved" data-id="${escapeAttr(item.id)}">Approve</button><button class="button button-quiet" data-moderate="rejected" data-id="${escapeAttr(item.id)}">Reject</button>` : state.filter === "rejected" ? `<button class="button button-quiet" data-moderate="approved" data-id="${escapeAttr(item.id)}">Approve</button>` : `<button class="button button-quiet" data-moderate="rejected" data-id="${escapeAttr(item.id)}">Hide</button>`;
  return `<article class="comment-row"><div><strong>${escapeHtml(item.author)}</strong><small class="comment-meta">On <a href="/#/card/${encodeURIComponent(item.itemId)}" target="_blank" rel="noreferrer">${escapeHtml(item.itemTitle)}</a> · ${escapeHtml(new Date(item.createdAt).toLocaleString())} · <span class="status status-${escapeAttr(item.status)}">${escapeHtml(item.status)}</span></small><p class="comment-body">${escapeHtml(item.body)}</p></div><div class="row-actions">${actions}<button class="icon-button button-danger" type="button" data-comment-delete="${escapeAttr(item.id)}" title="Delete" aria-label="Delete comment">${icon("trash")}</button></div></article>`;
}

async function moderate(status, id) { await api(`/api/admin/comments/${encodeURIComponent(id)}`, { method: "PATCH", body: { status } }); await loadTab(); toast(`Comment ${status}.`); }
async function deleteComment(id) { if (!confirm("Delete this comment permanently?")) return; await api(`/api/admin/comments/${encodeURIComponent(id)}`, { method: "DELETE" }); await loadTab(); toast("Comment deleted."); }
async function deleteContent(id) { if (!confirm("Delete this content item? This cannot be undone.")) return; await api(`/api/admin/content/${encodeURIComponent(id)}`, { method: "DELETE" }); await loadTab(); toast("Content deleted."); }

async function submitLogin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  try {
    const response = await api("/api/session", { method: "POST", body: { email: data.get("email"), password: data.get("password") } });
    state.user = response.user;
    renderDashboard();
    await loadTab();
  } catch (error) { renderLogin(error.message); }
}

async function submitSetup(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  if (data.get("password") !== data.get("confirmPassword")) { renderSetup("The passwords do not match."); return; }
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  try {
    const response = await api("/api/setup", { method: "POST", body: { setupToken: data.get("setupToken"), email: data.get("email"), password: data.get("password") } });
    state.user = response.user;
    renderDashboard();
    await loadTab();
  } catch (error) { renderSetup(error.message); }
}

async function logout() { await api("/api/session", { method: "DELETE" }); state.user = null; renderLogin(); }

async function api(url, options = {}) {
  const headers = new Headers(options.headers || {});
  let body = options.body;
  if (body && !(body instanceof FormData)) { headers.set("Content-Type", "application/json"); body = JSON.stringify(body); }
  const response = await fetch(url, { ...options, headers, body, credentials: "same-origin" });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status}).`);
  return data;
}

function splitList(value) { return String(value || "").split(/[\n,]/).map((item) => item.trim()).filter(Boolean); }
function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[char]); }
function escapeAttr(value) { return escapeHtml(value).replace(/`/g, "&#96;"); }
function toast(message) { const element = app.querySelector("#toast"); if (!element) return; element.textContent = message; element.hidden = false; clearTimeout(state.toastTimer); state.toastTimer = setTimeout(() => { element.hidden = true; }, 2400); }
