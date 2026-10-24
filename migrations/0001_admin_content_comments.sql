CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS admin_sessions_expiry_idx ON admin_sessions(expires_at);

CREATE TABLE IF NOT EXISTS auth_attempts (
  fingerprint TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS auth_attempts_created_idx ON auth_attempts(created_at);

CREATE TABLE IF NOT EXISTS content_items (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('project', 'inspiration')),
  status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  data_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS content_publication_idx ON content_items(status, sort_order, updated_at);

CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TEXT NOT NULL,
  moderated_at TEXT
);

CREATE INDEX IF NOT EXISTS comments_public_idx ON comments(item_id, status, created_at);

CREATE TABLE IF NOT EXISTS comment_events (
  fingerprint TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS comment_events_created_idx ON comment_events(created_at);
