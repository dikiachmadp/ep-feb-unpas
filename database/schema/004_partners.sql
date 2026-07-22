-- 004_partners.sql — mitra/kerjasama (logo marquee di beranda; MySQL / Hostinger phpMyAdmin)
-- Apply AFTER 003_faculty_profile.sql, in numeric order. Never edit an applied file.
--
-- Menggantikan tab "Kerjasama" lama di halaman Akademik (dulu page_items
-- academics/partners_international) dengan entitas mitra ber-logo yang bisa
-- di-CRUD di admin (/admin/partners) dan tampil sebagai marquee di beranda.

CREATE TABLE partners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_path VARCHAR(255) NULL,
  link_url VARCHAR(255) NULL,
  sort_order INT NOT NULL DEFAULT 99,
  is_active TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
