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
    'contact'     => 'Kontak',
    'pendaftaran' => 'Pendaftaran',
    'news_page'   => 'Halaman Berita',
    'footer'      => 'Footer',
    'nav'         => 'Menu Navigasi',
];

const SECTION_LABELS = [
    'hero'            => 'Bagian Atas (Hero)',
    'stats'           => 'Statistik Singkat',
    'why'             => 'Kenapa Ekonomi Pembangunan',
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
];

function sectionLabel(string $page, string $section): string
{
    return SECTION_LABELS[$section] ?? ucwords(str_replace('_', ' ', $section));
}

function fieldLabel(string $key): string
{
    return FIELD_LABELS[$key] ?? ucwords(str_replace('_', ' ', $key));
}
