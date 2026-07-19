-- =============================================================================
-- 102 — Gelombang 3: CMS-ifikasi konten hardcoded + penggabungan kontak→pendaftaran
-- =============================================================================
-- Portable SQLite (dev) + MySQL (staging/live via phpMyAdmin).
-- Jalankan SEKALI per lingkungan, SETELAH 101, SEBELUM upload kode G3.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Halaman gabungan: field brosur/cashback pindah dari "contact" ke
--    "pendaftaran" (info kontak inti tetap di contact/main karena footer
--    juga membacanya).
-- ---------------------------------------------------------------------------
UPDATE page_fields SET page_key = 'pendaftaran'
 WHERE page_key = 'contact' AND section_key = 'main'
   AND field_key IN ('brochure_subtitle', 'brochure_title',
                     'cashback_badge', 'cashback_title', 'cashback_description',
                     'cashback_button', 'extra_info_title');

-- Judul/subjudul unduhan kini per-item (page_items pendaftaran/downloads)
DELETE FROM page_fields
 WHERE page_key = 'contact' AND section_key = 'main'
   AND field_key IN ('brochure_download_title', 'brochure_download_subtitle');

UPDATE page_items SET page_key = 'pendaftaran'
 WHERE page_key = 'contact' AND section_key = 'extra_info';

-- ---------------------------------------------------------------------------
-- 2. Brosur (urutan gambar dipertahankan) + PDF unduhan → page_items
-- ---------------------------------------------------------------------------
INSERT INTO page_items (page_key, section_key, sort_order, title, image_path, is_active) VALUES
('pendaftaran', 'brochures', 1, 'Brosur Pendaftaran Halaman 1', '/brosur1.webp', 1),
('pendaftaran', 'brochures', 2, 'Brosur Pendaftaran Halaman 2', '/brosur2.webp', 1),
('pendaftaran', 'brochures', 3, 'Brosur Pendaftaran Halaman 3', '/brosur3.webp', 1),
('pendaftaran', 'brochures', 4, 'Brosur Pendaftaran Halaman 4', '/brosur4.webp', 1),
('pendaftaran', 'brochures', 5, 'Brosur Pendaftaran Halaman 5', '/brosur5.webp', 1),
('pendaftaran', 'brochures', 6, 'Brosur Pendaftaran Halaman 6', '/brosur6.webp', 1);

INSERT INTO page_items (page_key, section_key, sort_order, title, subtitle, image_path, is_active) VALUES
('pendaftaran', 'downloads', 1, 'Unduh Brosur Pendaftaran', 'Klik untuk mengunduh versi cetak', '/brosur.pdf', 1),
('pendaftaran', 'downloads', 2, 'Unduh Brosur 2', 'File PDF kedua', '/brosur2.pdf', 1);

-- ---------------------------------------------------------------------------
-- 3. Akademik: kerjasama, akreditasi, dokumen pedoman, portal → DB
-- ---------------------------------------------------------------------------
INSERT INTO page_items (page_key, section_key, sort_order, title, is_active) VALUES
('academics', 'partners_international', 1, 'Kyung Hee University', 1),
('academics', 'partners_international', 2, 'Korea Foundation', 1),
('academics', 'partners_international', 3, 'University Utara Malaysia', 1);

INSERT INTO page_fields (page_key, section_key, field_key, field_type, value, updated_at) VALUES
('academics', 'kerjasama', 'national_placeholder', 'text', 'Data kerjasama instansi nasional sedang dalam tahap pembaharuan', '2026-07-19 00:00:00');

INSERT INTO page_fields (page_key, section_key, field_key, field_type, value, updated_at) VALUES
('academics', 'akreditasi', 'title', 'text', 'UNGGUL', '2026-07-19 00:00:00'),
('academics', 'akreditasi', 'subtitle', 'text', 'Sertifikasi BAN-PT', '2026-07-19 00:00:00'),
('academics', 'akreditasi', 'description', 'textarea', 'Berlaku hingga tahun 2029 sesuai SK resmi Badan Akreditasi Nasional Perguruan Tinggi.', '2026-07-19 00:00:00');

INSERT INTO page_items (page_key, section_key, sort_order, icon_key, title, image_path, is_active) VALUES
('academics', 'documents', 1, 'book',         'Pedoman Akademik Mahasiswa 2025',         '/documents/1_Pedoman_Akademik_Mahasiswa_2025.pdf', 1),
('academics', 'documents', 2, 'check-circle', 'Pedoman Kode Etik Mahasiswa 2025',        '/documents/2_Pedoman_Kode_Etik_Mahasiswa_2025.pdf', 1),
('academics', 'documents', 3, 'map-pin',      'Pedoman Kuliah Praktek Kerja (KPK) 2025', '/documents/3_Pedoman_KPK_2025.pdf', 1),
('academics', 'documents', 4, 'award',        'Pedoman Penulisan Skripsi 2025',          '/documents/4_Pedoman_Skripsi_2025.pdf', 1),
('academics', 'documents', 5, 'zap',          'Pedoman RPL Mahasiswa 2025',              '/documents/5_Pedoman_RPL_Mahasiswa_2025.pdf', 1);

INSERT INTO page_fields (page_key, section_key, field_key, field_type, value, updated_at) VALUES
('academics', 'documents', 'updated_label', 'text', 'Pembaruan: April 2026', '2026-07-19 00:00:00'),
('academics', 'portal', 'title', 'text', 'Portal SITU 2 UNPAS', '2026-07-19 00:00:00'),
('academics', 'portal', 'description', 'textarea', 'Akses sistem informasi terpadu untuk pengisian KRS, melihat KHS, dan jadwal perkuliahan harian.', '2026-07-19 00:00:00'),
('academics', 'portal', 'url', 'url', 'https://situ2.unpas.ac.id/gate/login', '2026-07-19 00:00:00'),
('academics', 'portal', 'button', 'text', 'Masuk ke Portal Akademik', '2026-07-19 00:00:00');

-- ---------------------------------------------------------------------------
-- 4. Jurnal (kartu di /akademik/jurnal + halaman detail /jurnal/{slug})
-- ---------------------------------------------------------------------------
INSERT INTO page_fields (page_key, section_key, field_key, field_type, value, updated_at) VALUES
('academics', 'jurnal_jrie', 'name', 'text', 'JRIE', '2026-07-19 00:00:00'),
('academics', 'jurnal_jrie', 'full_name', 'text', 'Journal of Regional and Indonesia Economy', '2026-07-19 00:00:00'),
('academics', 'jurnal_jrie', 'url', 'url', 'https://jrie.feb.unpas.ac.id/index.php/jrie', '2026-07-19 00:00:00'),
('academics', 'jurnal_jrie', 'cover', 'image', '/jrie.webp', '2026-07-19 00:00:00'),
('academics', 'jurnal_jrie', 'description', 'textarea', 'Journal of Regional and Indonesia Economy (JRIE) adalah jurnal ilmiah peer-review yang diterbitkan Program Studi Ekonomi Pembangunan FEB Universitas Pasundan. JRIE memuat artikel hasil penelitian dan kajian di bidang ekonomi regional, ekonomi pembangunan, serta dinamika perekonomian Indonesia.', '2026-07-19 00:00:00'),
('academics', 'jurnal_brainy', 'name', 'text', 'BRAINY', '2026-07-19 00:00:00'),
('academics', 'jurnal_brainy', 'full_name', 'text', 'Bandung Regional Investment & Economy', '2026-07-19 00:00:00'),
('academics', 'jurnal_brainy', 'url', 'url', 'https://brainy.feb.unpas.ac.id/index.php/brainy', '2026-07-19 00:00:00'),
('academics', 'jurnal_brainy', 'cover', 'image', '/brainy.webp', '2026-07-19 00:00:00'),
('academics', 'jurnal_brainy', 'description', 'textarea', 'Bandung Regional Investment & Economy (BRAINY) adalah jurnal ilmiah peer-review yang diterbitkan Program Studi Ekonomi Pembangunan FEB Universitas Pasundan, menyoroti kajian investasi dan perekonomian regional, khususnya kawasan Bandung dan Jawa Barat.', '2026-07-19 00:00:00');
