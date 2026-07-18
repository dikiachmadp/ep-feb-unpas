-- =============================================================================
-- 101 — Gelombang 1: Bahasa Indonesia penuh untuk teks UI & konten di database
-- =============================================================================
-- Portable: jalan di SQLite (dev) dan MySQL (staging/live via phpMyAdmin).
-- Jalankan SEKALI per lingkungan (INSERT di bagian bawah gagal jika diulang).
--   dev     : sqlite3 database/dev.sqlite < database/data/101_wave1_id_texts.sql
--   staging : phpMyAdmin > SQL (DB staging)
--   live    : phpMyAdmin > SQL (DB live) — setelah lolos cek di staging
-- =============================================================================

-- ---------------------------------------------------------------------------
-- page_fields — label UI & konten per halaman
-- ---------------------------------------------------------------------------

-- nav
UPDATE page_fields SET value = 'Beranda'            WHERE page_key = 'nav' AND section_key = 'main' AND field_key = 'home';
UPDATE page_fields SET value = 'Profil'             WHERE page_key = 'nav' AND section_key = 'main' AND field_key = 'profile';
UPDATE page_fields SET value = 'Akademik'           WHERE page_key = 'nav' AND section_key = 'main' AND field_key = 'academics';
UPDATE page_fields SET value = 'Mahasiswa'          WHERE page_key = 'nav' AND section_key = 'main' AND field_key = 'student';
UPDATE page_fields SET value = 'Berita & Kegiatan'  WHERE page_key = 'nav' AND section_key = 'main' AND field_key = 'news';
UPDATE page_fields SET value = 'Kontak'             WHERE page_key = 'nav' AND section_key = 'main' AND field_key = 'contact';
UPDATE page_fields SET value = 'Pendaftaran'        WHERE page_key = 'nav' AND section_key = 'main' AND field_key = 'registration';
UPDATE page_fields SET value = 'Dosen'              WHERE page_key = 'nav' AND section_key = 'main' AND field_key = 'faculty';

-- home / hero
UPDATE page_fields SET value = 'Terakreditasi Unggul'                            WHERE page_key = 'home' AND section_key = 'hero' AND field_key = 'badge';
UPDATE page_fields SET value = 'Program Studi'                                   WHERE page_key = 'home' AND section_key = 'hero' AND field_key = 'title';
UPDATE page_fields SET value = 'Ekonomi Pembangunan'                             WHERE page_key = 'home' AND section_key = 'hero' AND field_key = 'subtitle';
UPDATE page_fields SET value = 'Fakultas Ekonomi dan Bisnis - Universitas Pasundan' WHERE page_key = 'home' AND section_key = 'hero' AND field_key = 'description';
UPDATE page_fields SET value = 'Daftar Sekarang'                                 WHERE page_key = 'home' AND section_key = 'hero' AND field_key = 'cta_primary';
UPDATE page_fields SET value = 'Hubungi Kami'                                    WHERE page_key = 'home' AND section_key = 'hero' AND field_key = 'cta_secondary';

-- home / why
UPDATE page_fields SET value = 'Keunggulan Kami'               WHERE page_key = 'home' AND section_key = 'why' AND field_key = 'subtitle';
UPDATE page_fields SET value = 'Kenapa Ekonomi Pembangunan?'   WHERE page_key = 'home' AND section_key = 'why' AND field_key = 'title';
UPDATE page_fields SET value = 'Program Studi Ekonomi Pembangunan FEB UNPAS menghadirkan kurikulum modern yang relevan dengan kebutuhan industri dan pembangunan nasional.' WHERE page_key = 'home' AND section_key = 'why' AND field_key = 'description';
UPDATE page_fields SET value = 'Kurikulum Berbasis KKNI'       WHERE page_key = 'home' AND section_key = 'why' AND field_key = 'features_curriculum_title';
UPDATE page_fields SET value = 'Kurikulum yang terus diperbarui sesuai Kerangka Kualifikasi Nasional Indonesia (KKNI) dan kebutuhan pasar kerja.' WHERE page_key = 'home' AND section_key = 'why' AND field_key = 'features_curriculum_desc';
UPDATE page_fields SET value = 'Riset & Pengabdian Masyarakat' WHERE page_key = 'home' AND section_key = 'why' AND field_key = 'features_research_title';
UPDATE page_fields SET value = 'Aktif dalam kegiatan riset dan pengabdian masyarakat yang berkontribusi pada pembangunan daerah.' WHERE page_key = 'home' AND section_key = 'why' AND field_key = 'features_research_desc';
UPDATE page_fields SET value = 'Jaringan Alumni Luas'          WHERE page_key = 'home' AND section_key = 'why' AND field_key = 'features_network_title';
UPDATE page_fields SET value = 'Alumni tersebar di berbagai instansi pemerintahan, lembaga keuangan, dan perusahaan terkemuka.' WHERE page_key = 'home' AND section_key = 'why' AND field_key = 'features_network_desc';
UPDATE page_fields SET value = 'Wawasan Internasional'         WHERE page_key = 'home' AND section_key = 'why' AND field_key = 'features_international_title';
UPDATE page_fields SET value = 'Program pertukaran mahasiswa serta kolaborasi riset dengan universitas dan lembaga internasional.' WHERE page_key = 'home' AND section_key = 'why' AND field_key = 'features_international_desc';

-- home / promo
UPDATE page_fields SET value = 'Program Unggulan'                                     WHERE page_key = 'home' AND section_key = 'promo' AND field_key = 'label';
UPDATE page_fields SET value = 'Kurikulum Merdeka Belajar'                            WHERE page_key = 'home' AND section_key = 'promo' AND field_key = 'title';
UPDATE page_fields SET value = 'Fleksibilitas belajar dengan program MBKM terintegrasi' WHERE page_key = 'home' AND section_key = 'promo' AND field_key = 'desc';
UPDATE page_fields SET value = 'Pelajari Lebih Lanjut'                                WHERE page_key = 'home' AND section_key = 'promo' AND field_key = 'button';

-- home / news
UPDATE page_fields SET value = 'Berita & Kegiatan'  WHERE page_key = 'home' AND section_key = 'news' AND field_key = 'title';
UPDATE page_fields SET value = 'Informasi Terkini'  WHERE page_key = 'home' AND section_key = 'news' AND field_key = 'subtitle';
UPDATE page_fields SET value = 'Lihat Semua'        WHERE page_key = 'home' AND section_key = 'news' AND field_key = 'button';

-- home / cta
UPDATE page_fields SET value = 'Penerimaan Mahasiswa Baru'      WHERE page_key = 'home' AND section_key = 'cta' AND field_key = 'badge';
UPDATE page_fields SET value = 'Siap Bergabung Bersama Kami?'   WHERE page_key = 'home' AND section_key = 'cta' AND field_key = 'title';
UPDATE page_fields SET value = 'Daftar sekarang dan jadilah bagian dari komunitas akademik yang berdedikasi untuk kemajuan ekonomi Indonesia.' WHERE page_key = 'home' AND section_key = 'cta' AND field_key = 'desc';
UPDATE page_fields SET value = 'Daftar Sekarang'                WHERE page_key = 'home' AND section_key = 'cta' AND field_key = 'button';

-- profile / main
UPDATE page_fields SET value = 'Profil Program Studi'      WHERE page_key = 'profile' AND section_key = 'main' AND field_key = 'title';
UPDATE page_fields SET value = 'Tentang Kami'              WHERE page_key = 'profile' AND section_key = 'main' AND field_key = 'subtitle';
UPDATE page_fields SET value = 'Kenali Kami Lebih Dekat'   WHERE page_key = 'profile' AND section_key = 'main' AND field_key = 'hero_badge';

-- profile / history
UPDATE page_fields SET value = 'Sejarah Program Studi'  WHERE page_key = 'profile' AND section_key = 'history' AND field_key = 'title';
UPDATE page_fields SET value = 'Terus bertransformasi menjadi fakultas ekonomi terdepan di Jawa Barat.' WHERE page_key = 'profile' AND section_key = 'history' AND field_key = 'footer';
UPDATE page_fields SET value = 'Linimasa'               WHERE page_key = 'profile' AND section_key = 'history' AND field_key = 'timeline_label';

-- profile / identity
UPDATE page_fields SET value = 'Filosofi & Makna Visual' WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'title';
UPDATE page_fields SET value = 'Logo Program Studi Ekonomi Pembangunan FEB Universitas Pasundan merupakan representasi visual identitas akademik, nilai keilmuan, dan arah pengembangan masa depan. Logo menampilkan stilasi huruf ''E'' sebagai simbol utama Ekonomi, dibentuk dari tiga elemen lengkung dinamis yang bergerak ke atas.' WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'description';
UPDATE page_fields SET value = 'Pendekatan Ilmiah' WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'approach_title';
UPDATE page_fields SET value = 'Bentuk lengkung melambangkan pendekatan ilmu ekonomi yang komprehensif, adaptif, dan berkelanjutan, sekaligus mencerminkan sinergi antara pendidikan, penelitian, dan pengabdian masyarakat sebagai pilar perguruan tinggi.' WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'approach_desc';
UPDATE page_fields SET value = 'Semangat Bertumbuh' WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'growth_title';
UPDATE page_fields SET value = 'Arah yang menunjuk ke atas menggambarkan optimisme, pertumbuhan, dan transformasi, menunjukkan komitmen mencetak lulusan yang terus berkembang, unggul secara akademik, serta berdaya saing nasional dan global.' WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'growth_desc';
UPDATE page_fields SET value = 'Secara keseluruhan, logo ini mencerminkan identitas akademik yang progresif, berorientasi masa depan, serta berlandaskan profesionalisme dan kontribusi nyata bagi pembangunan ekonomi masyarakat.' WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'closing';
UPDATE page_fields SET value = 'Konstruksi Simbol'         WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'labels_construction';
UPDATE page_fields SET value = 'Logo Resmi Program Studi'  WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'labels_official_mark';
UPDATE page_fields SET value = 'Filosofi Bentuk'           WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'labels_philosophy';
UPDATE page_fields SET value = 'Palet Warna Resmi'         WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'labels_color_palette';
UPDATE page_fields SET value = 'Sistem Tipografi'          WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'labels_typography';
UPDATE page_fields SET value = 'Font Judul (Display)'      WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'labels_headline_font';
UPDATE page_fields SET value = 'Font Isi (Konten)'         WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'labels_body_font';
UPDATE page_fields SET value = 'Hijau Hutan (Forest Green)' WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'colors_primary_name';
UPDATE page_fields SET value = 'Merepresentasikan pertumbuhan, keberlanjutan, keseimbangan, dan komitmen terhadap pembangunan ekonomi yang inklusif.' WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'colors_primary_desc';
UPDATE page_fields SET value = 'Emas (Gold)' WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'colors_accent_name';
UPDATE page_fields SET value = 'Melambangkan keunggulan, prestasi, dan nilai intelektual yang menjadi tujuan utama proses pendidikan.' WHERE page_key = 'profile' AND section_key = 'identity' AND field_key = 'colors_accent_desc';

-- profile / vision, mission, objectives
UPDATE page_fields SET value = 'Visi' WHERE page_key = 'profile' AND section_key = 'vision' AND field_key = 'title';
UPDATE page_fields SET value = 'Menjadi program studi unggul dalam menghasilkan lulusan ekonomi yang kompeten dan diakui secara nasional maupun internasional di bidang Tata Kelola Pemerintahan, Perbankan, Kewirausahaan, serta Akademisi atau Lembaga Riset Ekonomi, yang menjunjung tinggi nilai-nilai keislaman dan budaya Sunda pada tahun 2037.' WHERE page_key = 'profile' AND section_key = 'vision' AND field_key = 'text';
UPDATE page_fields SET value = 'Misi'                  WHERE page_key = 'profile' AND section_key = 'mission' AND field_key = 'title';
UPDATE page_fields SET value = 'Tujuan Program Studi'  WHERE page_key = 'profile' AND section_key = 'objectives' AND field_key = 'title';

-- profile / advantages, achievements, facilities
UPDATE page_fields SET value = 'Nilai Tambah Kami'            WHERE page_key = 'profile' AND section_key = 'advantages' AND field_key = 'title';
UPDATE page_fields SET value = 'Tonggak Capaian & Akreditasi' WHERE page_key = 'profile' AND section_key = 'achievements' AND field_key = 'title';
UPDATE page_fields SET value = 'Capaian'                      WHERE page_key = 'profile' AND section_key = 'achievements' AND field_key = 'subtitle';
UPDATE page_fields SET value = 'Menuju Transformasi Berkelanjutan & Internasionalisasi Akademik' WHERE page_key = 'profile' AND section_key = 'achievements' AND field_key = 'footer';
UPDATE page_fields SET value = 'Infrastruktur Kampus'         WHERE page_key = 'profile' AND section_key = 'facilities' AND field_key = 'title';
UPDATE page_fields SET value = 'Fasilitas berstandar global untuk menunjang potensi akademik mahasiswa.' WHERE page_key = 'profile' AND section_key = 'facilities' AND field_key = 'footer';

-- academics
UPDATE page_fields SET value = 'Akademik'              WHERE page_key = 'academics' AND section_key = 'main' AND field_key = 'subtitle';
UPDATE page_fields SET value = 'Ekonomi Pembangunan'   WHERE page_key = 'academics' AND section_key = 'main' AND field_key = 'hero_title';
UPDATE page_fields SET value = 'Profil Lulusan'        WHERE page_key = 'academics' AND section_key = 'main' AND field_key = 'graduate_profile_subtitle';
UPDATE page_fields SET value = 'Profil Utama Lulusan'  WHERE page_key = 'academics' AND section_key = 'main' AND field_key = 'graduate_profile_title';
UPDATE page_fields SET value = 'STANDAR SKL & CPL'     WHERE page_key = 'academics' AND section_key = 'main' AND field_key = 'graduate_standard_label';
UPDATE page_fields SET value = 'Struktur Kurikulum'    WHERE page_key = 'academics' AND section_key = 'main' AND field_key = 'curriculum_title';
UPDATE page_fields SET value = 'Konsentrasi Studi'     WHERE page_key = 'academics' AND section_key = 'concentration' AND field_key = 'title';
UPDATE page_fields SET value = 'Prospek Karier'        WHERE page_key = 'academics' AND section_key = 'prospects' AND field_key = 'title';

-- contact
UPDATE page_fields SET value = 'Hubungi Kami'    WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'title';
UPDATE page_fields SET value = 'Kontak & Lokasi' WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'subtitle';
UPDATE page_fields SET value = 'Kami siap membantu. Jangan ragu menghubungi kami melalui saluran komunikasi berikut.' WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'description';
UPDATE page_fields SET value = 'Alamat'          WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'address_title';
UPDATE page_fields SET value = 'Jl. Tamansari No. 6-8, Bandung 40116, Jawa Barat, Indonesia' WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'address_value';
UPDATE page_fields SET value = 'Telepon'         WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'phone_title';
UPDATE page_fields SET value = 'Jam Operasional' WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'hours_title';
UPDATE page_fields SET value = 'Senin – Jumat: 08.00 – 16.00 WIB' WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'hours_value';
UPDATE page_fields SET value = 'Brosur & Informasi'  WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'brochure_subtitle';
UPDATE page_fields SET value = 'Brosur Pendaftaran'  WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'brochure_title';
UPDATE page_fields SET value = 'Unduh Brosur'        WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'brochure_download_title';
UPDATE page_fields SET value = 'Klik untuk mengunduh versi cetak' WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'brochure_download_subtitle';
UPDATE page_fields SET value = 'Program Khusus Mahasiswa Baru' WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'cashback_badge';
UPDATE page_fields SET value = 'Dapatkan Cashback Rp3.000.000 Per Tahun' WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'cashback_title';
UPDATE page_fields SET value = 'Segera daftarkan diri Anda sekarang.' WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'cashback_description';
UPDATE page_fields SET value = 'Daftar Sekarang'     WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'cashback_button';
UPDATE page_fields SET value = 'Informasi Tambahan'  WHERE page_key = 'contact' AND section_key = 'main' AND field_key = 'extra_info_title';

-- news_page
UPDATE page_fields SET value = 'Berita Terbaru'  WHERE page_key = 'news_page' AND section_key = 'main' AND field_key = 'hero';
UPDATE page_fields SET value = 'Berita Kampus'   WHERE page_key = 'news_page' AND section_key = 'main' AND field_key = 'title';
UPDATE page_fields SET value = 'Semua'           WHERE page_key = 'news_page' AND section_key = 'main' AND field_key = 'all';
UPDATE page_fields SET value = 'Belum ada berita untuk kategori ini.' WHERE page_key = 'news_page' AND section_key = 'main' AND field_key = 'empty';

-- footer
UPDATE page_fields SET value = 'Tautan Cepat'  WHERE page_key = 'footer' AND section_key = 'main' AND field_key = 'links_title';
UPDATE page_fields SET value = 'Kontak'        WHERE page_key = 'footer' AND section_key = 'main' AND field_key = 'contact_title';
UPDATE page_fields SET value = 'Lokasi Kami'   WHERE page_key = 'footer' AND section_key = 'main' AND field_key = 'location';
UPDATE page_fields SET value = 'Ikuti Kami'    WHERE page_key = 'footer' AND section_key = 'main' AND field_key = 'social_title';
UPDATE page_fields SET value = 'Mencetak Ekonom Andal untuk Indonesia' WHERE page_key = 'footer' AND section_key = 'main' AND field_key = 'tagline';
UPDATE page_fields SET value = 'Fakultas Ekonomi dan Bisnis' WHERE page_key = 'footer' AND section_key = 'main' AND field_key = 'faculty';
UPDATE page_fields SET value = 'Universitas Pasundan'        WHERE page_key = 'footer' AND section_key = 'main' AND field_key = 'university';
UPDATE page_fields SET value = 'Program Studi Ekonomi Pembangunan - FEB UNPAS. Hak Cipta Dilindungi.' WHERE page_key = 'footer' AND section_key = 'main' AND field_key = 'copyright';

-- ---------------------------------------------------------------------------
-- page_items — konten daftar per halaman (match: page_key + section_key + sort_order)
-- ---------------------------------------------------------------------------

-- home / features
UPDATE page_items SET title = 'Kurikulum Berbasis KKNI', description = 'Kurikulum yang terus diperbarui sesuai Kerangka Kualifikasi Nasional Indonesia (KKNI) dan kebutuhan pasar kerja.' WHERE page_key = 'home' AND section_key = 'features' AND sort_order = 1;
UPDATE page_items SET title = 'Riset & Pengabdian Masyarakat', description = 'Aktif dalam kegiatan riset dan pengabdian masyarakat yang berkontribusi pada pembangunan daerah.' WHERE page_key = 'home' AND section_key = 'features' AND sort_order = 2;
UPDATE page_items SET title = 'Jaringan Alumni Luas', description = 'Alumni tersebar di berbagai instansi pemerintahan, lembaga keuangan, dan perusahaan terkemuka.' WHERE page_key = 'home' AND section_key = 'features' AND sort_order = 3;
UPDATE page_items SET title = 'Wawasan Internasional', description = 'Program pertukaran mahasiswa serta kolaborasi riset dengan universitas dan lembaga internasional.' WHERE page_key = 'home' AND section_key = 'features' AND sort_order = 4;

-- profile / history_content
UPDATE page_items SET description = 'Program Studi Ekonomi Pembangunan Fakultas Ekonomi dan Bisnis Universitas Pasundan (FEB UNPAS) merupakan program strategis dalam pengembangan pendidikan ekonomi di Bandung dan Jawa Barat. Berlokasi di jantung Kota Bandung, program studi ini lahir sebagai jawaban atas kebutuhan pembangunan ekonomi nasional yang kompleks serta meningkatnya permintaan akan tenaga ahli di bidang ekonomi pembangunan.' WHERE page_key = 'profile' AND section_key = 'history_content' AND sort_order = 1;
UPDATE page_items SET description = 'Sejarah Program Studi Ekonomi Pembangunan dimulai pada tahun 1983, ditandai dengan pemberian izin operasional melalui Surat Keputusan Direktorat Jenderal Pendidikan Tinggi, Kementerian Pendidikan dan Kebudayaan Republik Indonesia. Legalitas akademik semakin diperkuat dengan SK Menteri Pendidikan dan Kebudayaan No. 10427/0/1985 tanggal 5 Oktober 1985 yang menjadi tonggak pendidikan ekonomi formal di Universitas Pasundan.' WHERE page_key = 'profile' AND section_key = 'history_content' AND sort_order = 2;
UPDATE page_items SET description = 'Seiring perkembangan mutu pendidikan, pada 5 Agustus 1990 Program Studi Ekonomi memperoleh status ''Diakui'' melalui SK No. 0702/0/1990. Mutu akademik dan tata kelola yang terjaga membawa peningkatan ke status ''Disamakan'' berdasarkan SK No. 07/DIKTI/KEP/1993. Status ini menegaskan bahwa mutu pendidikan setara dengan perguruan tinggi negeri pada masa itu.' WHERE page_key = 'profile' AND section_key = 'history_content' AND sort_order = 3;
UPDATE page_items SET description = 'Memasuki era reformasi penjaminan mutu pendidikan tinggi nasional, sejak 1995 pemerintah memberlakukan mekanisme akreditasi oleh lembaga independen, yaitu Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT). Menyesuaikan kebijakan tersebut, pada 1996 Program Studi Ekonomi menjalani reakreditasi pertama dan meraih peringkat ''B'' (Baik).' WHERE page_key = 'profile' AND section_key = 'history_content' AND sort_order = 4;
UPDATE page_items SET description = 'Komitmen peningkatan mutu akademik ditunjukkan melalui penguatan kurikulum, peningkatan kualitas dosen, pengembangan riset, dan perluasan jejaring. Upaya tersebut membuahkan hasil pada tahun 2005 ketika program studi berhasil menaikkan peringkat akreditasi dari ''B'' menjadi ''A'' (Baik Sekali).' WHERE page_key = 'profile' AND section_key = 'history_content' AND sort_order = 5;
UPDATE page_items SET description = 'Capaian ini bukan peristiwa sekali jadi; peringkat tersebut konsisten dipertahankan. Pada reakreditasi 2010, program studi kembali meraih peringkat ''A'' yang dipertahankan pada 2016 dan berlaku hingga 2021. Konsistensi ini mencerminkan budaya mutu berkelanjutan dan tata kelola akademik yang kuat di Program Studi Ekonomi Pembangunan FEB UNPAS.' WHERE page_key = 'profile' AND section_key = 'history_content' AND sort_order = 6;
UPDATE page_items SET description = 'Puncak capaian mutu ditandai dengan SK Direktur Eksekutif BAN-PT No. 4401/SK/BAN-PT/Ak.KP/S/V/2024 tanggal 21 Mei 2024 yang menetapkan Program Studi Ekonomi Pembangunan berstatus ''UNGGUL''. Peringkat ini merupakan pengakuan nasional atas mutu pendidikan, penelitian, pengabdian masyarakat, tata kelola, serta kontribusi nyata bagi pembangunan ekonomi daerah dan nasional.' WHERE page_key = 'profile' AND section_key = 'history_content' AND sort_order = 7;
UPDATE page_items SET description = 'Dengan perjalanan lebih dari empat dekade, Program Studi Ekonomi Pembangunan FEB Universitas Pasundan terus bertransformasi menjadi pusat keilmuan ekonomi pembangunan yang adaptif, berorientasi kemasyarakatan, dan berkomitmen mencetak lulusan yang unggul, profesional, serta berdaya saing global.' WHERE page_key = 'profile' AND section_key = 'history_content' AND sort_order = 8;

-- profile / milestones
UPDATE page_items SET description = 'Izin operasional dari Ditjen Dikti.'       WHERE page_key = 'profile' AND section_key = 'milestones' AND sort_order = 1;
UPDATE page_items SET description = 'Legalitas formal melalui SK Menteri.'      WHERE page_key = 'profile' AND section_key = 'milestones' AND sort_order = 2;
UPDATE page_items SET description = 'Meraih Peringkat Akreditasi ''A''.'        WHERE page_key = 'profile' AND section_key = 'milestones' AND sort_order = 3;
UPDATE page_items SET description = 'Meraih Akreditasi ''UNGGUL''.'             WHERE page_key = 'profile' AND section_key = 'milestones' AND sort_order = 4;

-- profile / mission
UPDATE page_items SET description = 'Menyelenggarakan pendidikan ekonomi pembangunan yang bermutu, relevan, dan adaptif terhadap perkembangan ilmu pengetahuan dan teknologi.' WHERE page_key = 'profile' AND section_key = 'mission' AND sort_order = 1;
UPDATE page_items SET description = 'Melaksanakan penelitian ilmiah yang inovatif di bidang ekonomi pembangunan untuk berkontribusi pada ilmu pengetahuan dan pembangunan nasional.' WHERE page_key = 'profile' AND section_key = 'mission' AND sort_order = 2;
UPDATE page_items SET description = 'Melaksanakan pengabdian kepada masyarakat yang bermanfaat bagi peningkatan kesejahteraan masyarakat.' WHERE page_key = 'profile' AND section_key = 'mission' AND sort_order = 3;
UPDATE page_items SET description = 'Mengembangkan kerja sama strategis dengan berbagai lembaga nasional dan internasional untuk meningkatkan mutu akademik dan jejaring profesional.' WHERE page_key = 'profile' AND section_key = 'mission' AND sort_order = 4;
UPDATE page_items SET description = 'Menciptakan lingkungan akademik yang kondusif, berlandaskan integritas dan nilai-nilai keislaman dalam kehidupan kampus.' WHERE page_key = 'profile' AND section_key = 'mission' AND sort_order = 5;

-- profile / objectives
UPDATE page_items SET description = 'Menghasilkan lulusan yang kompeten, profesional, dan beretika di bidang ekonomi pembangunan.' WHERE page_key = 'profile' AND section_key = 'objectives' AND sort_order = 1;
UPDATE page_items SET description = 'Menghasilkan penelitian dan publikasi ilmiah yang diakui secara nasional dan internasional.' WHERE page_key = 'profile' AND section_key = 'objectives' AND sort_order = 2;
UPDATE page_items SET description = 'Memberikan kontribusi nyata kepada masyarakat melalui program pengabdian yang berkelanjutan.' WHERE page_key = 'profile' AND section_key = 'objectives' AND sort_order = 3;
UPDATE page_items SET description = 'Membangun kemitraan strategis untuk meningkatkan kualitas lulusan dan relevansi program.' WHERE page_key = 'profile' AND section_key = 'objectives' AND sort_order = 4;

-- profile / advantages
UPDATE page_items SET title = 'Kurikulum Adaptif', description = 'Selaras dengan kebutuhan industri keuangan dan bisnis digital global.' WHERE page_key = 'profile' AND section_key = 'advantages' AND sort_order = 1;
UPDATE page_items SET title = 'Dosen Ahli', description = 'Kombinasi akademisi bergelar doktor dan praktisi korporasi berpengalaman.' WHERE page_key = 'profile' AND section_key = 'advantages' AND sort_order = 2;
UPDATE page_items SET title = 'Ekosistem Digital', description = 'Lingkungan belajar dengan akses ke platform data ekonomi terkini.' WHERE page_key = 'profile' AND section_key = 'advantages' AND sort_order = 3;
UPDATE page_items SET title = 'Sertifikasi Profesional', description = 'Lulusan dibekali sertifikasi kompetensi yang diakui secara internasional.' WHERE page_key = 'profile' AND section_key = 'advantages' AND sort_order = 4;

-- profile / achievements
UPDATE page_items SET title = 'Izin Operasional', description = 'Prodi Ekonomi didirikan melalui izin operasional dari Ditjen Dikti, Kemendikbud RI.' WHERE page_key = 'profile' AND section_key = 'achievements' AND sort_order = 1;
UPDATE page_items SET title = 'Penguatan Legalitas', description = 'Memperoleh legalitas akademik melalui SK Menteri No. 10427/0/1985 sebagai tonggak formal.' WHERE page_key = 'profile' AND section_key = 'achievements' AND sort_order = 2;
UPDATE page_items SET title = 'Status ''Diakui''', description = 'Memperoleh status ''Diakui'' berdasarkan SK Menteri No. 0702/0/1990.' WHERE page_key = 'profile' AND section_key = 'achievements' AND sort_order = 3;
UPDATE page_items SET title = 'Status ''Disamakan''', description = 'Naik ke status ''Disamakan'', menandakan kualitas setara perguruan tinggi negeri.' WHERE page_key = 'profile' AND section_key = 'achievements' AND sort_order = 4;
UPDATE page_items SET title = 'Akreditasi Nasional Pertama', description = 'Menjalani akreditasi nasional pertama oleh BAN-PT dan meraih peringkat ''B''.' WHERE page_key = 'profile' AND section_key = 'achievements' AND sort_order = 5;
UPDATE page_items SET title = 'Akreditasi A', description = 'Berhasil meningkatkan mutu akademik hingga meraih peringkat ''A'' (Baik Sekali) dari BAN-PT.' WHERE page_key = 'profile' AND section_key = 'achievements' AND sort_order = 6;
UPDATE page_items SET title = 'Konsistensi Mutu', description = 'Mempertahankan Akreditasi ''A'', menunjukkan konsistensi pendidikan dan tata kelola.' WHERE page_key = 'profile' AND section_key = 'achievements' AND sort_order = 7;
UPDATE page_items SET title = 'Reakreditasi A', description = 'Berhasil mempertahankan peringkat ''A'' dari BAN-PT (berlaku hingga 2021).' WHERE page_key = 'profile' AND section_key = 'achievements' AND sort_order = 8;
UPDATE page_items SET title = 'Hibah Kurikulum MBKM', description = 'Menerima hibah kurikulum Merdeka Belajar Kampus Merdeka (MBKM) untuk transformasi adaptif.' WHERE page_key = 'profile' AND section_key = 'achievements' AND sort_order = 9;
UPDATE page_items SET title = 'Sertifikasi Mutu', description = 'Mempertahankan akreditasi peringkat ''A'' dari BAN-PT.' WHERE page_key = 'profile' AND section_key = 'achievements' AND sort_order = 10;
UPDATE page_items SET title = 'Hibah PKKM', description = 'Memenangkan hibah Program Kompetisi Kampus Merdeka (PKKM) dari Kemendikbud untuk peningkatan mutu pembelajaran.' WHERE page_key = 'profile' AND section_key = 'achievements' AND sort_order = 11;
UPDATE page_items SET title = 'Peringkat UNGGUL', description = 'Meraih peringkat tertinggi ''UNGGUL'' berdasarkan SK BAN-PT No. 4401/SK/BAN-PT/Ak.KP/S/V/2024.' WHERE page_key = 'profile' AND section_key = 'achievements' AND sort_order = 12;
UPDATE page_items SET title = 'Anggota Internasional AACSB', description = 'Menjadi anggota lembaga akreditasi internasional AACSB sebagai langkah strategis menuju standar pendidikan bisnis global.' WHERE page_key = 'profile' AND section_key = 'achievements' AND sort_order = 13;

-- profile / facilities
UPDATE page_items SET title = 'Perpustakaan', description = 'Akses koleksi buku, jurnal, dan basis data ekonomi terkini' WHERE page_key = 'profile' AND section_key = 'facilities' AND sort_order = 1;
UPDATE page_items SET title = 'Lab Komputer', description = 'Komputer dengan perangkat lunak analisis data ekonomi terbaru' WHERE page_key = 'profile' AND section_key = 'facilities' AND sort_order = 2;
UPDATE page_items SET title = 'Ruang Seminar', description = 'Ruang seminar dengan fasilitas audio-visual lengkap' WHERE page_key = 'profile' AND section_key = 'facilities' AND sort_order = 3;
UPDATE page_items SET title = 'Area Diskusi', description = 'Area diskusi terbuka untuk kolaborasi dan curah gagasan' WHERE page_key = 'profile' AND section_key = 'facilities' AND sort_order = 4;
UPDATE page_items SET title = 'Galeri Investasi', description = 'Pojok investasi dengan info pasar saham dan data ekonomi global' WHERE page_key = 'profile' AND section_key = 'facilities' AND sort_order = 5;
UPDATE page_items SET title = 'Kelas Hybrid', description = 'Ruang kelas siap hybrid untuk pembelajaran interaktif' WHERE page_key = 'profile' AND section_key = 'facilities' AND sort_order = 6;

-- academics / concentration
UPDATE page_items SET title = 'Ekonomi Moneter & Perbankan', description = 'Mempelajari kebijakan moneter, sistem perbankan, dan manajemen keuangan makro.' WHERE page_key = 'academics' AND section_key = 'concentration' AND sort_order = 1;
UPDATE page_items SET title = 'Perencanaan & Pembangunan Wilayah', description = 'Berfokus pada perencanaan pembangunan daerah, otonomi daerah, dan kebijakan publik.' WHERE page_key = 'academics' AND section_key = 'concentration' AND sort_order = 2;
UPDATE page_items SET title = 'Ekonomi Sumber Daya & Lingkungan', description = 'Mengkaji pengelolaan sumber daya alam dan kebijakan lingkungan dalam pembangunan berkelanjutan.' WHERE page_key = 'academics' AND section_key = 'concentration' AND sort_order = 3;

-- academics / prospects
UPDATE page_items SET title = 'Instansi Pemerintah', description = 'Kementerian Keuangan, Bappenas, Bank Indonesia, BPS, dan instansi daerah.' WHERE page_key = 'academics' AND section_key = 'prospects' AND sort_order = 1;
UPDATE page_items SET title = 'Lembaga Keuangan', description = 'Perbankan, OJK, BUMN keuangan, dan lembaga pembiayaan.' WHERE page_key = 'academics' AND section_key = 'prospects' AND sort_order = 2;
UPDATE page_items SET title = 'Konsultan Ekonomi', description = 'Konsultan pembangunan, analis kebijakan, dan peneliti ekonomi.' WHERE page_key = 'academics' AND section_key = 'prospects' AND sort_order = 3;
UPDATE page_items SET title = 'Akademisi & Peneliti', description = 'Dosen serta peneliti di lembaga riset nasional dan internasional.' WHERE page_key = 'academics' AND section_key = 'prospects' AND sort_order = 4;

-- contact / extra_info
UPDATE page_items SET description = 'Kunjungan langsung dapat dilakukan pada jam kerja.' WHERE page_key = 'contact' AND section_key = 'extra_info' AND sort_order = 1;
UPDATE page_items SET description = 'Konsultasi akademik dapat dijadwalkan dengan dosen pembimbing sesuai kebutuhan mahasiswa.' WHERE page_key = 'contact' AND section_key = 'extra_info' AND sort_order = 2;
UPDATE page_items SET description = 'Untuk pertanyaan akademik, silakan hubungi bagian akademik melalui email atau nomor telepon yang tersedia.' WHERE page_key = 'contact' AND section_key = 'extra_info' AND sort_order = 3;

-- ---------------------------------------------------------------------------
-- Field baru: link media sosial footer (editable via admin > Konten Halaman >
-- Footer > Media Sosial). Kosongkan nilai untuk menyembunyikan ikonnya.
-- Jalankan sekali — INSERT gagal (duplicate key) jika file diulang.
-- ---------------------------------------------------------------------------
INSERT INTO page_fields (page_key, section_key, field_key, field_type, value, updated_at) VALUES
('footer', 'socials', 'instagram_url', 'url', 'https://www.instagram.com/ekonomifebunpas', '2026-07-19 00:00:00'),
('footer', 'socials', 'facebook_url',  'url', '', '2026-07-19 00:00:00'),
('footer', 'socials', 'youtube_url',   'url', '', '2026-07-19 00:00:00'),
('footer', 'socials', 'linkedin_url',  'url', '', '2026-07-19 00:00:00');
