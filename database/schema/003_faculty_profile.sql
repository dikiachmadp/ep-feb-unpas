-- 003_faculty_profile.sql — richer dosen profiles (MySQL / Hostinger phpMyAdmin)
-- Apply AFTER 001_init.sql and 002_news_author_views.sql, in numeric order.
-- Never edit an applied file.
--
-- Adds:
--   * biografi singkat + SINTA/Scopus profile links on the faculty row,
--   * a generic child table (faculty_items) backing the repeating detail
--     sections: pendidikan, pengajaran, publikasi, sertifikasi, organisasi,
--     jejaring — one table, distinguished by section_key (mirrors page_items).
--   * remaps the old "jabatan fungsional" column (position) to the new Status
--     vocabulary. Guru Besar is kept; everything else defaults to Dosen
--     Pengajar. Ketua/Sekretaris Program Studi are set per-dosen in the admin.

ALTER TABLE faculty
  ADD COLUMN bio TEXT NULL AFTER expertise,
  ADD COLUMN sinta_url VARCHAR(500) NULL AFTER scholar_url,
  ADD COLUMN scopus_url VARCHAR(500) NULL AFTER sinta_url;

CREATE TABLE faculty_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  faculty_id INT NOT NULL,
  section_key VARCHAR(40) NOT NULL,  -- education|teaching|publications|certifications|organizations|networks
  sort_order INT NOT NULL DEFAULT 0,
  title VARCHAR(500) NULL,           -- teks utama: jenjang, mata kuliah, judul, nama
  subtitle VARCHAR(500) NULL,        -- institusi / penerbit / peran / keterangan
  meta VARCHAR(100) NULL,            -- tahun / periode
  url VARCHAR(500) NULL,             -- link opsional (publikasi / jejaring)
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  INDEX idx_faculty_section (faculty_id, section_key),
  FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

UPDATE faculty
   SET position = 'Dosen Pengajar'
 WHERE position NOT IN ('Guru Besar', 'Ketua Program Studi', 'Sekretaris Program Studi');
