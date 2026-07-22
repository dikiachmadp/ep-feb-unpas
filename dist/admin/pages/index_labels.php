<?php
/**
 * Indonesian labels for page/section/field keys so staff never see raw
 * database keys. Unlisted keys fall back to a prettified version of the key.
 */

const PAGE_EDIT_LABELS = [
    'home'        => 'Beranda',
    'profile'     => 'Profil',
    'academics'   => 'Akademik',
    'faculty'     => 'Dosen (SEO)',
    'contact'     => 'Info Kontak (tampil di footer & halaman Pendaftaran)',
    'pendaftaran' => 'Pendaftaran & Kontak',
    'news_page'   => 'Halaman Berita',
    'footer'      => 'Footer',
    'nav'         => 'Menu Navigasi',
];

const SECTION_LABELS = [
    'hero'            => 'Bagian Atas (Hero)',
    'stats'           => 'Statistik Singkat',
    'why'             => 'Kenapa Ekonomi',
    'features'        => 'Keunggulan',
    'promo'           => 'Program Unggulan',
    'news'            => 'Blok Berita di Beranda',
    'cta'             => 'Ajakan Daftar (CTA)',
    'main'            => 'Umum',
    'history'         => 'Sejarah',
    'history_content' => 'Paragraf Sejarah',
    'milestones'      => 'Tonggak Sejarah',
    'identity'        => 'Identitas & Logo',
    'vision'          => 'Visi',
    'mission'         => 'Misi',
    'objectives'      => 'Tujuan',
    'advantages'      => 'Nilai Tambah',
    'achievements'    => 'Capaian & Akreditasi',
    'facilities'      => 'Fasilitas',
    'concentration'   => 'Konsentrasi Studi',
    'prospects'       => 'Prospek Karier',
    'extra_info'      => 'Informasi Tambahan',
    'socials'         => 'Media Sosial',
    'brochures'       => 'Brosur (gambar, urutan dipertahankan)',
    'downloads'       => 'File Unduhan (PDF)',
    'partners_international' => 'Kerjasama Internasional',
    'partners_national'      => 'Kerjasama Nasional',
    'kerjasama'       => 'Kerjasama (teks umum)',
    'akreditasi'      => 'Akreditasi',
    'documents'       => 'Dokumen Pedoman',
    'portal'          => 'Portal Akademik',
    'jurnal_jrie'     => 'Jurnal JRIE',
    'jurnal_brainy'   => 'Jurnal BRAINY',
    'seo'             => 'SEO (Judul & Deskripsi di Google)',
];

const FIELD_LABELS = [
    'title'                     => 'Judul',
    'subtitle'                  => 'Subjudul',
    'description'               => 'Deskripsi',
    'badge'                     => 'Label kecil',
    'button'                    => 'Teks tombol',
    'button_label'              => 'Teks tombol',
    'footer'                    => 'Teks penutup',
    'external_registration_url' => 'Link pendaftaran resmi Unpas',
    'cta_primary'               => 'Tombol utama',
    'cta_secondary'             => 'Tombol kedua',
    'hero_badge'                => 'Label hero',
    'text'                      => 'Teks',
    'timeline_label'            => 'Label linimasa',
    'instagram_url'             => 'Link Instagram (kosongkan untuk sembunyikan)',
    'facebook_url'              => 'Link Facebook (kosongkan untuk sembunyikan)',
    'youtube_url'               => 'Link YouTube (kosongkan untuk sembunyikan)',
    'linkedin_url'              => 'Link LinkedIn (kosongkan untuk sembunyikan)',
    'name'                      => 'Nama singkat',
    'full_name'                 => 'Nama lengkap',
    'url'                       => 'Alamat situs (URL)',
    'cover'                     => 'Gambar sampul',
    'national_placeholder'      => 'Teks jika belum ada data nasional',
    'updated_label'             => 'Label tanggal pembaruan',
];

function sectionLabel(string $page, string $section): string
{
    return SECTION_LABELS[$section] ?? ucwords(str_replace('_', ' ', $section));
}

function fieldLabel(string $key): string
{
    return FIELD_LABELS[$key] ?? ucwords(str_replace('_', ' ', $key));
}
