<?php

use App\Core\Icons;
use App\Core\View;

/**
 * Student & Alumni page. Card content was hardcoded in the old React page
 * (not part of the CMS yet) — kept identical here.
 */
$menu = [
    ['id' => 'prestasi', 'label' => 'Prestasi', 'icon' => 'award'],
    ['id' => 'himpunan', 'label' => 'Himpunan', 'icon' => 'users'],
    ['id' => 'alumni',   'label' => 'Alumni',   'icon' => 'briefcase'],
];

$content = [
    'prestasi' => [
        'title' => 'Prestasi Mahasiswa',
        'items' => [
            ['tag' => 'Nasional', 'title' => 'Juara 1 Debat Ekonomi Nasional', 'date' => '2025', 'desc' => 'Berhasil meraih posisi pertama dalam kompetisi bergengsi tingkat nasional di Universitas Indonesia.', 'detail' => 'Mahasiswa angkatan 2022 berhasil mengungguli 50 tim lain dengan mosi kebijakan fiskal pascapandemi.', 'icon' => 'award'],
            ['tag' => 'Riset', 'title' => 'Hibah Riset PKM Kemdikbud', 'date' => '2024', 'desc' => 'Tiga tim mahasiswa berhasil lolos pendanaan riset tingkat nasional.', 'detail' => 'Riset berfokus pada pemberdayaan UMKM digital di Jawa Barat dengan total hibah mencapai puluhan juta rupiah.', 'icon' => 'award'],
        ],
    ],
    'himpunan' => [
        'title' => 'Organisasi Mahasiswa',
        'items' => [
            ['tag' => 'Internal', 'title' => 'HIMASPA', 'date' => '2025/2026', 'desc' => 'Organisasi internal mahasiswa yang berfokus pada pengembangan akademik dan sosial.', 'detail' => 'Memiliki 5 departemen utama: Pengembangan Sumber Daya Manusia, Minat & Bakat, Hubungan Masyarakat, Kajian Strategis, dan Kewirausahaan.', 'icon' => 'users'],
            ['tag' => 'Komunitas', 'title' => 'Economic Research Club', 'date' => 'Aktif', 'desc' => 'Komunitas minat dalam penulisan ilmiah dan analisis data ekonomi.', 'detail' => 'Rutin mengadakan pelatihan perangkat lunak E-Views, Stata, dan SPSS bagi mahasiswa tingkat akhir.', 'icon' => 'users'],
        ],
    ],
    'alumni' => [
        'title' => 'Jaringan Alumni',
        'items' => [
            ['tag' => 'Karier', 'title' => 'Andini Putri, S.E.', 'date' => 'Analis @ BI', 'desc' => 'Alumna angkatan 2018 yang kini berkarier di kantor pusat Bank Indonesia.', 'detail' => 'Aktif memberikan mentoring karier bagi mahasiswa tingkat akhir melalui program IKA-EP.', 'icon' => 'briefcase'],
            ['tag' => 'Startup', 'title' => 'Budi Santoso, S.E., M.E.', 'date' => 'Pendiri Startup', 'desc' => 'Wirausahawan sukses yang membangun platform fintech untuk inklusi keuangan.', 'detail' => 'Lulusan angkatan 2015 yang berhasil meraih pendanaan seri A dan mempekerjakan banyak lulusan almamaternya.', 'icon' => 'briefcase'],
        ],
    ],
];
?>
<div class="page-wrapper pt-20 bg-white min-h-screen pb-32 lg:pb-0">

    <?php View::partial('page-hero', ['badge' => 'Kemahasiswaan', 'title' => 'Mahasiswa & Alumni']); ?>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div class="flex flex-col lg:flex-row gap-12">

            <?php View::partial('tab-nav', ['menu' => $menu, 'active' => 'prestasi', 'menuTitle' => 'Menu Navigasi', 'mobileCols' => 3]); ?>

            <main class="flex-1">
                <?php foreach ($content as $sectionId => $section): ?>
                <section class="min-h-[500px] space-y-10 tab-panel <?= $sectionId !== 'prestasi' ? 'hidden' : '' ?>" data-panel="<?= e($sectionId) ?>">
                    <?php View::partial('section-header', [
                        'subtitle' => strtoupper($sectionId),
                        'title'    => $section['title'],
                    ]); ?>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <?php foreach ($section['items'] as $item): ?>
                        <div class="dosen-card relative cursor-pointer overflow-hidden shadow-xl flex flex-col items-center border border-white/5 bg-forest-900 rounded-[2.5rem] p-6 transition-all duration-500" data-expand-card>
                            <div class="dosen-photo bg-forest-800 flex items-center justify-center overflow-hidden flex-shrink-0 mb-6 w-full h-[140px] rounded-[32px] transition-all duration-500">
                                <span class="text-gold-400/30"><?= Icons::svg($item['icon'], 'w-16 h-16') ?></span>
                            </div>

                            <div class="text-center w-full px-2">
                                <p class="dosen-position uppercase font-black tracking-widest text-[10px] mb-1 text-gold-400 transition-colors duration-500">
                                    <?= e($item['tag']) ?> &bull; <?= e($item['date']) ?>
                                </p>
                                <h4 class="dosen-name font-bold leading-tight break-words transition-all duration-500 text-sm text-white"><?= e($item['title']) ?></h4>
                            </div>

                            <div class="expand-body hidden w-full overflow-hidden">
                                <div class="mt-6 pt-6 border-t border-gray-100 space-y-5">
                                    <p class="text-sm text-gray-500 leading-relaxed italic">"<?= e($item['desc']) ?>"</p>
                                    <div class="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                        <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Latar Belakang</span>
                                        <p class="text-sm text-forest-900 font-medium leading-relaxed whitespace-normal break-words"><?= e($item['detail']) ?></p>
                                    </div>
                                </div>
                            </div>
                            <div class="expand-close hidden absolute top-6 right-6 text-gray-300"><?= Icons::svg('x', 'w-5 h-5') ?></div>
                        </div>
                        <?php endforeach; ?>
                    </div>

                    <?php if ($sectionId === 'alumni'): ?>
                    <div class="mt-12 p-8 bg-forest-50 border border-forest-100 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6">
                        <div class="bg-white p-4 rounded-2xl shadow-sm"><?= Icons::svg('briefcase', 'w-8 h-8 text-gold-500') ?></div>
                        <div class="flex-1 text-center md:text-left">
                            <h4 class="font-bold text-forest-900">Tracer Study & Karier</h4>
                            <p class="text-sm text-gray-500 mt-1">Bantu kami meningkatkan kualitas lulusan dengan mengisi data karier Anda.</p>
                        </div>
                        <a href="https://tracerstudy.unpas.ac.id" target="_blank" rel="noopener noreferrer"
                           class="px-8 py-3 bg-gold-500 text-forest-900 font-bold rounded-xl text-sm shadow-lg shadow-gold-500/20 active:scale-95 transition-all">Isi Tracer Study</a>
                    </div>
                    <?php endif; ?>
                </section>
                <?php endforeach; ?>
            </main>
        </div>
    </div>
</div>
