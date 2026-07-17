-- sqlite_dev.sql — LOCAL DEVELOPMENT ONLY mirror of 001_init.sql.
-- Production source of truth is the numbered MySQL files; keep this in sync
-- when adding a new migration. SQLite has no ENUM — CHECK constraints instead.

CREATE TABLE news_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

CREATE TABLE news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category_id INTEGER NOT NULL REFERENCES news_categories(id),
  content TEXT NOT NULL,
  cover_image_path TEXT NOT NULL,
  published_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  seo_title TEXT NULL,
  seo_description TEXT NULL,
  created_by INTEGER NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX idx_news_status_date ON news (status, published_date);

CREATE TABLE news_gallery (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  news_id INTEGER NOT NULL REFERENCES news(id) ON DELETE CASCADE,
  image_path TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE faculty (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  position TEXT NOT NULL,
  expertise TEXT NOT NULL,
  nidn TEXT NULL,
  email TEXT NULL,
  orcid_id TEXT NULL,
  scholar_url TEXT NULL,
  photo_path TEXT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE curriculum_years (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  year_number INTEGER NOT NULL,
  label TEXT NOT NULL,
  description TEXT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE curriculum_semesters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  year_id INTEGER NOT NULL REFERENCES curriculum_years(id) ON DELETE CASCADE,
  semester_number INTEGER NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE curriculum_courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  semester_id INTEGER NOT NULL REFERENCES curriculum_semesters(id) ON DELETE CASCADE,
  code TEXT NULL,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE graduate_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_key TEXT NOT NULL,
  color_key TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE page_fields (
  page_key TEXT NOT NULL,
  section_key TEXT NOT NULL,
  field_key TEXT NOT NULL,
  field_type TEXT NOT NULL DEFAULT 'text' CHECK (field_type IN ('text','textarea','richtext','image','url')),
  value TEXT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (page_key, section_key, field_key)
);

CREATE TABLE page_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_key TEXT NOT NULL,
  section_key TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  icon_key TEXT NULL,
  image_path TEXT NULL,
  label_year TEXT NULL,
  title TEXT NULL,
  subtitle TEXT NULL,
  description TEXT NULL,
  extra_json TEXT NULL,
  is_active INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX idx_page_items_section ON page_items (page_key, section_key);

CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin','editor')),
  is_active INTEGER NOT NULL DEFAULT 1,
  last_login_at TEXT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE login_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  identifier TEXT NOT NULL,
  attempted_at TEXT NOT NULL,
  success INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_attempts_identifier ON login_attempts (identifier, attempted_at);
