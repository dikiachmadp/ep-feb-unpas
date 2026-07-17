-- 001_init.sql — initial schema (MySQL / Hostinger phpMyAdmin)
-- Apply migrations in numeric order. Never edit an applied file; add a new one.

CREATE TABLE news_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(191) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NOT NULL,
  category_id INT NOT NULL,
  content LONGTEXT NOT NULL,
  cover_image_path VARCHAR(255) NOT NULL,
  published_date DATE NOT NULL,
  status ENUM('draft','published') NOT NULL DEFAULT 'draft',
  seo_title VARCHAR(255) NULL,
  seo_description VARCHAR(500) NULL,
  created_by INT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (category_id) REFERENCES news_categories(id),
  INDEX idx_status_date (status, published_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE news_gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  news_id INT NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE faculty (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  position VARCHAR(150) NOT NULL,
  expertise VARCHAR(255) NOT NULL,
  nidn VARCHAR(30) NULL,
  email VARCHAR(255) NULL,
  orcid_id VARCHAR(50) NULL,
  scholar_url VARCHAR(500) NULL,
  photo_path VARCHAR(255) NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE curriculum_years (
  id INT AUTO_INCREMENT PRIMARY KEY,
  year_number INT NOT NULL,
  label VARCHAR(100) NOT NULL,
  description VARCHAR(255) NULL,
  sort_order INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE curriculum_semesters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  year_id INT NOT NULL,
  semester_number INT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (year_id) REFERENCES curriculum_years(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE curriculum_courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  semester_id INT NOT NULL,
  code VARCHAR(30) NULL,
  name VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (semester_id) REFERENCES curriculum_semesters(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE graduate_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  icon_key VARCHAR(50) NOT NULL,
  color_key VARCHAR(50) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Single text values per page/section (includes per-page SEO title/description
-- and the external registration URL — all editable by staff via the admin).
CREATE TABLE page_fields (
  page_key VARCHAR(50) NOT NULL,
  section_key VARCHAR(50) NOT NULL,
  field_key VARCHAR(50) NOT NULL,
  field_type ENUM('text','textarea','richtext','image','url') NOT NULL DEFAULT 'text',
  value LONGTEXT NULL,
  updated_at DATETIME NOT NULL,
  PRIMARY KEY (page_key, section_key, field_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Repeating list items: stats, milestones, facilities, mission bullets, etc.
CREATE TABLE page_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_key VARCHAR(50) NOT NULL,
  section_key VARCHAR(50) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  icon_key VARCHAR(50) NULL,
  image_path VARCHAR(255) NULL,
  label_year VARCHAR(20) NULL,
  title VARCHAR(255) NULL,
  subtitle VARCHAR(255) NULL,
  description TEXT NULL,
  extra_json TEXT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  INDEX idx_page_section (page_key, section_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','editor') NOT NULL DEFAULT 'editor',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  last_login_at DATETIME NULL,
  created_at DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE login_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  identifier VARCHAR(255) NOT NULL,
  attempted_at DATETIME NOT NULL,
  success TINYINT(1) NOT NULL DEFAULT 0,
  INDEX idx_identifier_time (identifier, attempted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
