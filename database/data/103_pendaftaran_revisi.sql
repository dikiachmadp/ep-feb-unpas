-- =============================================================================
-- 103 — Revisi pra-go-live: penamaan tombol unduhan kedua halaman pendaftaran
-- =============================================================================
-- Portable SQLite (dev) + MySQL (staging/live via phpMyAdmin).
-- Jalankan SEKALI per lingkungan, SETELAH 102.
-- =============================================================================

UPDATE page_items
   SET title = 'Unduh Brosur KIP-K',
       subtitle = 'Klik untuk mengunduh versi cetak'
 WHERE page_key = 'pendaftaran' AND section_key = 'downloads' AND sort_order = 2;
