<?php

use App\Core\Icons;
use App\Core\View;

/**
 * @var array $fields     page_fields academics
 * @var array $curriculum years -> semesters -> course strings
 * @var array $profiles   graduate_profiles rows
 * @var array $dosen      faculty rows
 */
$main = $fields['main'] ?? [];

$menu = [
    ['id' => 'kurikulum',  'label' => 'Kurikulum',       'icon' => 'book'],
    ['id' => 'kerjasama',  'label' => 'Kerjasama',       'icon' => 'globe'],
    ['id' => 'akreditasi', 'label' => 'Akreditasi',      'icon' => 'award'],
    ['id' => 'dosen',      'label' => 'Dosen',           'icon' => 'users'],
    ['id' => 'jurnal',     'label' => 'Jurnal',          'icon' => 'file-text'],
    ['id' => 'portal',     'label' => 'Portal Akademik', 'icon' => 'external-link', 'short' => 'Portal'],
];

$journals = [
    ['name' => 'JRIE',   'full' => 'Journal of Regional and Indonesia Economy',  'img' => '/jrie.webp',   'url' => 'https://jrie.feb.unpas.ac.id/index.php/jrie'],
    ['name' => 'BRAINY', 'full' => 'Bandung Regional Investment & Economy',      'img' => '/brainy.webp', 'url' => 'https://brainy.feb.unpas.ac.id/index.php/brainy'],
];
$documents = [
    ['name' => 'Pedoman Akademik Mahasiswa 2025',        'file' => '1_Pedoman_Akademik_Mahasiswa_2025.pdf',  'icon' => 'book'],
    ['name' => 'Pedoman Kode Etik Mahasiswa 2025',       'file' => '2_Pedoman_Kode_Etik_Mahasiswa_2025.pdf', 'icon' => 'check-circle'],
    ['name' => 'Pedoman Kuliah Praktek Kerja (KPK) 2025','file' => '3_Pedoman_KPK_2025.pdf',                 'icon' => 'map-pin'],
    ['name' => 'Pedoman Penulisan Skripsi 2025',         'file' => '4_Pedoman_Skripsi_2025.pdf',             'icon' => 'award'],
    ['name' => 'Pedoman RPL Mahasiswa 2025',             'file' => '5_Pedoman_RPL_Mahasiswa_2025.pdf',       'icon' => 'zap'],
];
?>
<div class="page-wrapper pt-20 bg-white min-h-screen pb-32 lg:pb-0">

    <?php View::partial('page-hero', [
        'badge' => $main['subtitle'] ?? 'Academics',
        'title' => $main['hero_title'] ?? 'Economic Development',
    ]); ?>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div class="flex flex-col lg:flex-row gap-12">

            <?php View::partial('tab-nav', ['menu' => $menu, 'active' => 'kurikulum', 'menuTitle' => 'Menu Akademik', 'mobileCols' => 6]); ?>

            <main class="flex-1">

                <!-- 1. KURIKULUM + PROFIL LULUSAN -->
                <section class="space-y-16 tab-panel" data-panel="kurikulum">
                    <div>
                        <?php View::partial('section-header', [
                            'subtitle' => $main['graduate_profile_subtitle'] ?? 'Graduate Profile',
                            'title'    => $main['graduate_profile_title'] ?? 'Main Graduate Profile',
                        ]); ?>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 px-2">
                            <?php foreach ($profiles as $profile): ?>
                            <div class="group p-6 bg-white border border-gray-100 rounded-[2rem] hover:shadow-xl hover:border-forest-100 transition-all duration-300" data-reveal>
                                <div class="w-12 h-12 <?= e($profile['color_key']) ?> rounded-2xl flex items-center justify-center text-xl mb-4 shadow-inner group-hover:scale-110 transition-transform">
                                    <?= Icons::svg($profile['icon_key'], 'w-6 h-6') ?>
                                </div>
                                <h4 class="font-black text-forest-900 text-lg mb-2"><?= e($profile['title']) ?></h4>
                                <p class="text-xs text-gray-500 leading-relaxed font-medium"><?= e($profile['description']) ?></p>
                            </div>
                            <?php endforeach; ?>
                        </div>
                        <div class="mt-8 mx-2 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
                            <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                <?= Icons::svg('award', 'w-4 h-4 text-gold-500') ?>
                            </div>
                            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">
                                <?= e($main['graduate_standard_label'] ?? '') ?>
                            </p>
                        </div>
                    </div>

                    <div class="pt-10 border-t border-gray-100">
                        <?php View::partial('section-header', ['subtitle' => 'Curriculum', 'title' => $main['curriculum_title'] ?? 'Curriculum Structure']); ?>

                        <div class="mt-12 space-y-20 relative">
                            <?php foreach ($curriculum as $idx => $year): ?>
                            <div class="relative">
                                <div class="flex items-center gap-4 mb-10">
                                    <div class="w-16 h-16 bg-forest-900 text-gold-400 rounded-2xl flex flex-col items-center justify-center border-2 border-gold-500/20 shadow-xl z-10">
                                        <span class="text-[10px] font-black uppercase leading-none">Year</span>
                                        <span class="text-2xl font-black">0<?= (int) $year['year_number'] ?></span>
                                    </div>
                                    <div>
                                        <h3 class="text-xl font-bold text-forest-900"><?= e($year['label']) ?></h3>
                                        <p class="text-sm text-gray-500"><?= e($year['description']) ?></p>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 ml-4 md:ml-10">
                                    <?php foreach ($year['semesters'] as $sem): ?>
                                    <div class="group bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:border-forest-100 transition-all duration-300" data-accordion>
                                        <button type="button" data-acc-toggle class="w-full p-6 flex items-center justify-between text-left">
                                            <div class="flex items-center gap-4">
                                                <div class="acc-badge w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-colors bg-white text-forest-700">
                                                    <?= (int) $sem['semester_number'] ?>
                                                </div>
                                                <span class="font-bold text-gray-800">Semester <?= (int) $sem['semester_number'] ?></span>
                                            </div>
                                            <span class="acc-chevron transition-transform duration-300 text-gray-300"><?= Icons::svg('chevron-right', 'w-5 h-5') ?></span>
                                        </button>
                                        <div class="hidden overflow-hidden" data-acc-body>
                                            <div class="px-6 pb-8 pt-2 space-y-3">
                                                <p class="text-[10px] font-black text-forest-600 uppercase tracking-widest mb-4">Daftar Mata Kuliah:</p>
                                                <?php foreach ($sem['courses'] as $course): ?>
                                                <div class="flex items-start gap-3 text-sm text-gray-600 group/item">
                                                    <div class="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 group-hover/item:scale-150 transition-transform"></div>
                                                    <span class="group-hover/item:text-forest-900 transition-colors leading-relaxed"><?= e($course) ?></span>
                                                </div>
                                                <?php endforeach; ?>
                                            </div>
                                        </div>
                                    </div>
                                    <?php endforeach; ?>
                                </div>

                                <?php if ($idx !== count($curriculum) - 1): ?>
                                <div class="absolute left-8 top-16 bottom-[-40px] w-px border-l-2 border-dashed border-gray-200 -z-0 hidden md:block"></div>
                                <?php endif; ?>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </section>

                <!-- 2. KERJASAMA -->
                <section class="space-y-12 tab-panel hidden" data-panel="kerjasama">
                    <?php View::partial('section-header', ['subtitle' => 'Partnership', 'title' => 'Jejaring Kerjasama']); ?>
                    <div class="space-y-10 px-2">
                        <div>
                            <h4 class="text-[10px] font-black text-gold-600 uppercase tracking-[0.2em] mb-6 px-2">Internasional</h4>
                            <div class="grid md:grid-cols-3 gap-4">
                                <?php foreach (['Kyung Hee University', 'Korea Foundation', 'University Utara Malaysia'] as $uni): ?>
                                <div class="p-6 bg-white border border-gray-100 rounded-3xl text-center shadow-sm hover:border-gold-200 transition-colors">
                                    <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><?= Icons::svg('globe', 'w-6 h-6') ?></div>
                                    <p class="font-bold text-sm text-gray-800 leading-tight"><?= e($uni) ?></p>
                                </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-[10px] font-black text-forest-700 uppercase tracking-[0.2em] mb-6 px-2">Nasional</h4>
                            <div class="p-12 border-2 border-dashed border-gray-100 rounded-[3rem] text-center">
                                <p class="text-gray-400 text-sm italic">Data kerjasama instansi nasional sedang dalam tahap pembaharuan</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 3. AKREDITASI -->
                <section class="space-y-12 tab-panel hidden" data-panel="akreditasi">
                    <?php View::partial('section-header', ['subtitle' => 'Quality Assurance', 'title' => 'Akreditasi Program Studi']); ?>
                    <div class="max-w-md mx-auto p-12 bg-forest-50 rounded-[3rem] border border-forest-100 shadow-inner mt-10 text-center">
                        <?= Icons::svg('award', 'w-20 h-20 text-gold-500 mx-auto mb-6') ?>
                        <h3 class="text-4xl font-black text-forest-900 mb-2 font-display uppercase tracking-tight">UNGGUL</h3>
                        <p class="text-[10px] text-forest-700/60 uppercase tracking-[0.3em] font-bold">Sertifikasi BAN-PT</p>
                        <div class="mt-8 pt-8 border-t border-forest-200/50">
                            <p class="text-xs text-gray-500 leading-relaxed font-medium">Berlaku hingga tahun 2029 sesuai SK resmi Badan Akreditasi Nasional Perguruan Tinggi.</p>
                        </div>
                    </div>
                </section>

                <!-- 4. DOSEN -->
                <section class="space-y-12 tab-panel hidden" data-panel="dosen">
                    <?php View::partial('section-header', ['subtitle' => 'Faculty Members', 'title' => 'Profil Tenaga Pengajar']); ?>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start px-2 mt-10">
                        <?php foreach ($dosen as $d): ?>
                        <div class="dosen-card relative cursor-pointer overflow-hidden shadow-xl flex flex-col items-center rounded-[2.5rem] p-5 border border-white/5 bg-forest-900 hover:border-gold-500/40 transition-all duration-500" data-expand-card>
                            <div class="dosen-photo bg-forest-800 flex items-center justify-center overflow-hidden flex-shrink-0 w-full rounded-[32px] aspect-[4/5] transition-all duration-500">
                                <?php if (!empty($d['photo_path'])): ?>
                                <img src="<?= e(url($d['photo_path'])) ?>" alt="<?= e($d['full_name']) ?>" loading="lazy" class="w-full h-full object-cover">
                                <?php endif; ?>
                            </div>

                            <div class="text-center mt-6 w-full px-2">
                                <p class="dosen-position uppercase font-black tracking-widest text-[10px] mb-1 transition-colors duration-500 text-gold-400"><?= e($d['position']) ?></p>
                                <h4 class="dosen-name font-bold leading-tight break-words transition-all duration-500 text-sm text-white"><?= e($d['full_name']) ?></h4>
                            </div>

                            <div class="expand-body hidden w-full overflow-hidden">
                                <div class="space-y-4 border-t border-gray-100 mt-6 pt-6 text-left px-2">
                                    <?php foreach ([
                                        ['NIDN / NIDK', $d['nidn']],
                                        ['Bidang Keahlian', $d['expertise']],
                                        ['Email Resmi', $d['email']],
                                        ['Sinta ID', $d['orcid_id']],
                                    ] as [$label, $value]): ?>
                                    <div class="flex flex-col border-b border-gray-50 pb-2 last:border-0">
                                        <span class="text-[9px] text-gray-400 uppercase font-bold tracking-tighter"><?= e($label) ?></span>
                                        <span class="text-sm md:text-xs font-semibold text-forest-900 break-words"><?= e($value ?? '-') ?></span>
                                    </div>
                                    <?php endforeach; ?>
                                    <div class="pt-2 space-y-3">
                                        <a href="<?= e(url('/dosen/' . $d['slug'])) ?>" onclick="event.stopPropagation()"
                                           class="w-full py-4 bg-gold-400 text-forest-900 rounded-2xl text-xs font-bold flex items-center justify-center gap-3 active:opacity-80 transition-opacity shadow-lg">
                                            Profil Lengkap <?= Icons::svg('chevron-right', 'w-3.5 h-3.5') ?>
                                        </a>
                                        <a href="<?= e($d['scholar_url'] ?? '#') ?>" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()"
                                           class="w-full py-4 bg-forest-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-3 active:opacity-80 transition-opacity shadow-lg">
                                            Lihat Publikasi Ilmiah <?= Icons::svg('external-link', 'w-3.5 h-3.5') ?>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="expand-close hidden absolute top-6 right-6 text-gray-300 hover:text-forest-900 transition-colors"><?= Icons::svg('x', 'w-5 h-5') ?></div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </section>

                <!-- 5. JURNAL -->
                <section class="space-y-10 tab-panel hidden" data-panel="jurnal">
                    <?php View::partial('section-header', ['subtitle' => 'Publication', 'title' => 'Jurnal Ilmiah']); ?>
                    <div class="grid md:grid-cols-2 gap-10 mt-10 px-2">
                        <?php foreach ($journals as $jurnal): ?>
                        <div class="group relative bg-forest-900 rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl border border-white/5">
                            <img src="<?= e(url($jurnal['img'])) ?>" alt="<?= e($jurnal['name']) ?>" loading="lazy"
                                 class="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-1000 ease-out group-hover:scale-110 group-hover:opacity-100">
                            <div class="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/40 to-transparent z-10"></div>
                            <div class="absolute inset-0 flex flex-col items-center justify-end p-10 text-center z-20">
                                <span class="mb-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] uppercase tracking-widest text-gold-400 font-bold">Peer Reviewed</span>
                                <h4 class="text-white font-black text-3xl mb-3 group-hover:text-gold-400 transition-colors duration-300"><?= e($jurnal['name']) ?></h4>
                                <p class="text-white/60 text-sm leading-relaxed mb-10 max-w-[240px] font-medium"><?= e($jurnal['full']) ?></p>
                                <a href="<?= e($jurnal['url']) ?>" target="_blank" rel="noopener noreferrer"
                                   class="relative inline-flex items-center justify-center px-8 py-4 bg-white text-forest-900 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 hover:bg-gold-400">
                                    Kunjungi Situs Jurnal
                                </a>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </section>

                <!-- 6. PORTAL & DOKUMEN -->
                <section class="space-y-12 tab-panel hidden" data-panel="portal">
                    <div class="relative overflow-hidden bg-gradient-to-br from-forest-600 to-forest-900 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl mx-2 mt-4">
                        <div class="relative z-10 flex flex-col items-center">
                            <div class="w-20 h-20 bg-white/10 backdrop-blur-md text-gold-400 rounded-[2rem] flex items-center justify-center mb-6 border border-white/10">
                                <?= Icons::svg('zap', 'w-8 h-8') ?>
                            </div>
                            <h3 class="text-2xl md:text-3xl font-display font-bold text-white mb-4">Portal SITU 2 UNPAS</h3>
                            <p class="text-forest-100 text-sm max-w-md mb-10 leading-relaxed font-light">Akses sistem informasi terpadu untuk pengisian KRS, melihat KHS, dan jadwal perkuliahan harian.</p>
                            <a href="https://situ2.unpas.ac.id/gate/login" target="_blank" rel="noreferrer"
                               class="group flex items-center gap-4 px-10 py-5 bg-gold-500 text-forest-900 rounded-2xl font-black hover:bg-gold-400 shadow-xl transition-all">
                                Masuk ke Portal Akademik
                                <span class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><?= Icons::svg('external-link', 'w-4 h-4') ?></span>
                            </a>
                        </div>
                    </div>

                    <div class="space-y-8 px-2">
                        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
                            <div>
                                <p class="text-gold-600 font-black text-[10px] tracking-[0.2em] uppercase mb-2">Academic Resources</p>
                                <h4 class="text-2xl font-bold text-forest-900">Pusat Unduhan Pedoman</h4>
                            </div>
                            <p class="text-xs text-gray-400 font-medium italic">Pembaruan: April 2026</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <?php foreach ($documents as $doc): ?>
                            <div class="group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-[2rem] hover:border-forest-200 hover:shadow-xl transition-all duration-300">
                                <div class="flex items-center gap-4 min-w-0">
                                    <div class="w-12 h-12 bg-gray-50 text-forest-700 rounded-2xl flex items-center justify-center group-hover:bg-forest-700 group-hover:text-white transition-all">
                                        <?= Icons::svg($doc['icon'], 'w-5 h-5') ?>
                                    </div>
                                    <div class="min-w-0">
                                        <h5 class="font-bold text-gray-800 text-[13px] leading-tight truncate pr-2"><?= e($doc['name']) ?></h5>
                                        <p class="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">PDF &bull; 2025 Edition</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2 ml-4">
                                    <a href="<?= e(url('/documents/' . $doc['file'])) ?>" target="_blank" rel="noreferrer" title="Preview"
                                       class="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-forest-50 hover:text-forest-600 transition-colors"><?= Icons::svg('external-link', 'w-4 h-4') ?></a>
                                    <a href="<?= e(url('/documents/' . $doc['file'])) ?>" download="<?= e($doc['file']) ?>" title="Download"
                                       class="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gold-50 hover:text-gold-600 transition-colors"><?= Icons::svg('download', 'w-4 h-4') ?></a>
                                </div>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    </div>
</div>
