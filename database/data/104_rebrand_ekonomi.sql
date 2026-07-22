-- ===========================================================================
-- 104_rebrand_ekonomi.sql
-- Rebranding nama tampil Program Studi (konten DB / page_fields).
--
-- Konteks: nama resmi prodi sedang diusulkan berubah "Ekonomi Pembangunan"
-- -> "Ekonomi" (disiapkan lebih dulu). Untuk promosi SEMENTARA, judul besar
-- yang langsung dilihat pengunjung memakai "Ekonomi Bisnis".
--
-- Tiga kelompok:
--   A. RESMI     -> "Ekonomi"       (nama prodi present-tense + SEO)
--   B. PROMO     -> "Ekonomi Bisnis"(hanya judul besar: hero + brand footer)
--   C. TETAP     -> "Ekonomi Pembangunan" (nama matkul, keahlian dosen,
--                   sejarah/akreditasi, isi berita — JANGAN diubah; sekaligus
--                   sinyal SEO alami untuk pencarian "Ekonomi Pembangunan").
--
-- Sengaja UPDATE per-field (bukan REPLACE global) supaya konten bucket C aman.
-- Jalankan via phpMyAdmin: STAGING dulu, verifikasi, baru LIVE.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- B. PROMO — "Ekonomi Bisnis" (judul besar)
--    home/hero/subtitle dipakai ganda: baris emas hero homepage + brand besar
--    footer. Satu update ini meng-cover keduanya.
-- ---------------------------------------------------------------------------
UPDATE page_fields SET value = 'Ekonomi Bisnis'
  WHERE page_key = 'home'      AND section_key = 'hero' AND field_key = 'subtitle';

UPDATE page_fields SET value = 'Ekonomi Bisnis'
  WHERE page_key = 'academics' AND section_key = 'main' AND field_key = 'hero_title';

-- ---------------------------------------------------------------------------
-- A. RESMI — "Ekonomi" (SEO + konten present-tense yang menyebut nama prodi)
-- ---------------------------------------------------------------------------

-- Judul di hasil pencarian homepage -> "Ekonomi FEB Unpas"
UPDATE page_fields SET value = 'Ekonomi FEB Unpas'
  WHERE page_key = 'home' AND section_key = 'seo' AND field_key = 'title';

UPDATE page_fields SET value = 'Program S1 Ekonomi terakreditasi Unggul dengan kurikulum Merdeka Belajar.'
  WHERE page_key = 'home' AND section_key = 'seo' AND field_key = 'description';

UPDATE page_fields SET value = 'Informasi kurikulum, peminatan, prospek karier program Ekonomi.'
  WHERE page_key = 'academics' AND section_key = 'seo' AND field_key = 'description';

UPDATE page_fields SET value = 'Informasi dan tautan pendaftaran mahasiswa baru Program Studi Ekonomi FEB UNPAS.'
  WHERE page_key = 'pendaftaran' AND section_key = 'seo' AND field_key = 'description';

UPDATE page_fields SET value = 'Berita dan kegiatan terbaru Program Studi Ekonomi FEB UNPAS.'
  WHERE page_key = 'news_page' AND section_key = 'seo' AND field_key = 'description';

-- Teks pendaftaran (present-tense)
UPDATE page_fields SET value = 'Pendaftaran mahasiswa baru Program Studi Ekonomi dilakukan melalui portal SPMB Universitas Pasundan. Klik tombol di bawah untuk menuju halaman pendaftaran resmi.'
  WHERE page_key = 'pendaftaran' AND section_key = 'main' AND field_key = 'description';

-- Section "Kenapa …" di beranda
UPDATE page_fields SET value = 'Kenapa Ekonomi?'
  WHERE page_key = 'home' AND section_key = 'why' AND field_key = 'title';

UPDATE page_fields SET value = 'Program Studi Ekonomi FEB UNPAS menghadirkan kurikulum modern yang relevan dengan kebutuhan industri dan pembangunan nasional.'
  WHERE page_key = 'home' AND section_key = 'why' AND field_key = 'description';

-- Deskripsi logo (present-tense) di halaman profil
UPDATE page_fields SET value = 'Logo Program Studi Ekonomi FEB Universitas Pasundan merupakan representasi visual identitas akademik, nilai keilmuan, dan arah pengembangan masa depan. Logo menampilkan stilasi huruf ''E'' sebagai simbol utama Ekonomi, dibentuk dari tiga elemen lengkung dinamis yang bergerak ke atas.'
  WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'description';

-- Copyright footer
UPDATE page_fields SET value = 'Program Studi Ekonomi - FEB UNPAS. Hak Cipta Dilindungi.'
  WHERE page_key = 'footer' AND section_key = 'main' AND field_key = 'copyright';

-- Deskripsi jurnal — hanya frasa PENERBIT (nama prodi) yang jadi "Ekonomi";
-- frasa disiplin ilmu "ekonomi pembangunan" di dalam kalimat dipertahankan.
UPDATE page_fields SET value = 'Journal of Regional and Indonesia Economy (JRIE) adalah jurnal ilmiah peer-review yang diterbitkan Program Studi Ekonomi FEB Universitas Pasundan. JRIE memuat artikel hasil penelitian dan kajian di bidang ekonomi regional, ekonomi pembangunan, serta dinamika perekonomian Indonesia.'
  WHERE page_key = 'academics' AND section_key = 'jurnal_jrie' AND field_key = 'description';

UPDATE page_fields SET value = 'Bandung Regional Investment & Economy (BRAINY) adalah jurnal ilmiah peer-review yang diterbitkan Program Studi Ekonomi FEB Universitas Pasundan, menyoroti kajian investasi dan perekonomian regional, khususnya kawasan Bandung dan Jawa Barat.'
  WHERE page_key = 'academics' AND section_key = 'jurnal_brainy' AND field_key = 'description';

-- ---------------------------------------------------------------------------
-- C. TETAP "Ekonomi Pembangunan" (TIDAK ada UPDATE di sini — sengaja):
--    - curriculum_courses ESP308 "Ekonomi Pembangunan", ESP326 "…Berkelanjutan"
--    - faculty.expertise "Ekonomi Pembangunan"
--    - page_items profile/history_content (sejarah 1983 + akreditasi BAN-PT)
--    - seluruh isi tabel news (editorial bertanggal)
-- ---------------------------------------------------------------------------
