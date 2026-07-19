<?php

use App\Core\Icons;
use App\Core\View;

/**
 * @var array $fields   page_fields home (hero/why/promo/news/cta)
 * @var array $stats    page_items home/stats
 * @var array $features page_items home/features
 * @var array $news     3 latest published news rows
 */
$hero = $fields['hero'] ?? [];
$why = $fields['why'] ?? [];
$promo = $fields['promo'] ?? [];
$newsSec = $fields['news'] ?? [];
$cta = $fields['cta'] ?? [];

// Old data never stored stat labels (SPA bug rendered them empty); subtitle
// column is the editable label, these are the defaults until staff fill it.
$statLabels = [
    'students' => 'Mahasiswa Aktif', 'lecturers' => 'Dosen',
    'years' => 'Tahun Pengalaman', 'accreditation' => 'Akreditasi',
];
?>
<div class="page-wrapper">

    <!-- Hero -->
    <section class="relative min-h-screen flex items-center overflow-hidden bg-forest-900">
        <video autoplay muted loop playsinline preload="metadata" poster="<?= e(url('/logo.webp')) ?>"
               class="absolute inset-0 w-full h-full object-cover opacity-60" aria-hidden="true">
            <source src="<?= e(url('/video.mp4')) ?>" type="video/mp4">
        </video>

        <div class="absolute inset-0 bg-forest-900 opacity-40"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-transparent to-transparent"></div>

        <div class="absolute top-20 right-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute bottom-20 left-10 w-96 h-96 bg-forest-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute top-1/4 right-1/4 w-64 h-64 border border-white/5 rounded-full pointer-events-none"></div>
        <div class="absolute top-1/3 right-1/3 w-32 h-32 border border-gold-400/10 rounded-full pointer-events-none"></div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 w-full">
            <div class="max-w-3xl space-y-6">
                <div data-reveal>
                    <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/20 border border-gold-400/30 text-gold-300 text-xs font-semibold font-sans uppercase tracking-wider">
                        <span class="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse shadow-md"></span>
                        <?= e($hero['badge'] ?? '') ?>
                    </span>
                </div>

                <div data-reveal data-reveal-delay="100">
                    <h1 class="font-display font-bold leading-none">
                        <span class="block text-3xl lg:text-7xl text-white"><?= e($hero['title'] ?? '') ?></span>
                        <span class="block text-4xl lg:text-5xl text-gold-400 mt-2"><?= e($hero['subtitle'] ?? '') ?></span>
                    </h1>
                </div>

                <p class="text-forest-100/80 text-lg leading-relaxed max-w-xl font-sans font-medium" data-reveal data-reveal-delay="200">
                    <?= e($hero['description'] ?? '') ?>
                </p>

                <div class="flex flex-wrap gap-4 pt-2" data-reveal data-reveal-delay="300">
                    <a href="<?= e(url('/pendaftaran')) ?>" class="btn-secondary group">
                        <?= e($hero['cta_primary'] ?? 'Daftar Sekarang') ?>
                        <span class="group-hover:translate-x-1 transition-transform"><?= Icons::svg('arrow-right', 'w-4 h-4') ?></span>
                    </a>
                    <a href="<?= e(url('/pendaftaran#kontak')) ?>"
                       class="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 text-sm">
                        <?= e($hero['cta_secondary'] ?? 'Hubungi Kami') ?>
                    </a>
                </div>
            </div>

            <div class="mt-12 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4" data-reveal data-reveal-delay="400">
                <?php foreach ($stats as $stat): ?>
                <div class="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:bg-white/15 transition-all duration-200 group">
                    <div class="w-12 h-12 rounded-xl bg-gold-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-400/30 transition-colors">
                        <?= Icons::svg($stat['icon_key'] ?? 'star', 'w-6 h-6 text-gold-400') ?>
                    </div>
                    <div>
                        <p class="font-display font-semibold text-2xl text-white leading-tight"><?= e($stat['title']) ?></p>
                        <p class="text-forest-200 text-xs mt-1 font-sans uppercase tracking-wider">
                            <?= e($stat['subtitle'] ?: ($statLabels[$stat['icon_key']] ?? '')) ?>
                        </p>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Why section -->
    <section class="py-24 bg-white relative overflow-hidden">
        <div class="absolute -top-20 -right-20 w-80 h-80 bg-forest-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-gold-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:flex lg:items-center lg:gap-20">
                <div class="lg:w-5/12 mb-12 lg:mb-0">
                    <?php View::partial('section-header', [
                        'subtitle'    => $why['subtitle'] ?? '',
                        'title'       => $why['title'] ?? '',
                        'description' => $why['description'] ?? '',
                    ]); ?>

                    <div class="grid grid-cols-2 gap-4 mt-8">
                        <?php foreach ($stats as $i => $stat): ?>
                        <div class="p-4 rounded-2xl <?= $i % 2 === 0 ? 'bg-forest-50 border-forest-100' : 'bg-gold-50 border-gold-100' ?> border" data-reveal>
                            <p class="font-display font-bold text-3xl <?= $i % 2 === 0 ? 'text-forest-600' : 'text-gold-600' ?>"><?= e($stat['title']) ?></p>
                            <p class="text-gray-500 text-xs mt-1 font-sans"><?= e($stat['subtitle'] ?: ($statLabels[$stat['icon_key']] ?? '')) ?></p>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <div class="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <?php foreach ($features as $i => $feature): $accent = $i % 2 === 1; ?>
                    <div class="card p-7 group" data-reveal data-reveal-delay="<?= $i * 100 ?>">
                        <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 <?= $accent
                            ? 'bg-gold-50 text-gold-500 group-hover:bg-gold-400 group-hover:text-white'
                            : 'bg-forest-50 text-forest-500 group-hover:bg-forest-500 group-hover:text-white' ?>">
                            <?= Icons::svg($feature['icon_key'] ?? 'star', 'w-6 h-6') ?>
                        </div>
                        <h3 class="font-display font-bold text-lg text-gray-800 mb-2 group-hover:text-forest-700 transition-colors">
                            <?= e($feature['title']) ?>
                        </h3>
                        <p class="text-gray-500 text-sm leading-relaxed font-sans"><?= e($feature['description']) ?></p>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </section>

    <!-- Promo strip -->
    <section class="bg-gradient-to-r from-forest-600 to-forest-800 relative overflow-hidden py-12">
        <div class="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent"></div>
        <div class="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-forest-900/30 to-transparent"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <div data-reveal>
                    <p class="text-gold-400 text-sm font-semibold uppercase tracking-wider font-sans mb-1"><?= e($promo['label'] ?? '') ?></p>
                    <h2 class="font-display text-2xl md:text-3xl font-bold text-white"><?= e($promo['title'] ?? '') ?></h2>
                    <p class="text-forest-200 text-sm mt-1 font-sans"><?= e($promo['desc'] ?? '') ?></p>
                </div>
                <a href="<?= e(url('/akademik')) ?>" class="btn-secondary whitespace-nowrap group flex-shrink-0">
                    <?= e($promo['button'] ?? 'Pelajari Lebih Lanjut') ?>
                    <span class="group-hover:translate-x-1 transition-transform"><?= Icons::svg('arrow-right', 'w-4 h-4') ?></span>
                </a>
            </div>
        </div>
    </section>

    <!-- News section -->
    <section class="py-24 bg-gray-50/60">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-end justify-between mb-12">
                <?php View::partial('section-header', [
                    'subtitle' => $newsSec['subtitle'] ?? '',
                    'title'    => $newsSec['title'] ?? '',
                ]); ?>
                <a href="<?= e(url('/berita-kegiatan')) ?>"
                   class="hidden sm:inline-flex items-center gap-2 text-forest-600 hover:text-forest-800 font-semibold text-sm font-sans group mb-12" data-reveal>
                    <?= e($newsSec['button'] ?? 'Lihat Semua') ?>
                    <span class="group-hover:translate-x-1 transition-transform"><?= Icons::svg('arrow-right', 'w-4 h-4') ?></span>
                </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach ($news as $item): ?>
                    <?php View::partial('news-card', ['item' => $item]); ?>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- CTA section -->
    <section class="py-24 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="relative bg-gradient-to-br from-forest-500 to-forest-700 rounded-3xl p-12 overflow-hidden" data-reveal>
                <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div class="absolute bottom-0 left-0 w-48 h-48 bg-gold-400/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div class="relative z-10">
                    <p class="text-gold-400 text-sm font-semibold uppercase tracking-wider font-sans mb-3"><?= e($cta['badge'] ?? '') ?></p>
                    <h2 class="font-display font-bold text-3xl md:text-4xl text-white mb-4"><?= e($cta['title'] ?? '') ?></h2>
                    <p class="text-forest-100 text-base mb-8 max-w-xl mx-auto font-sans font-light"><?= e($cta['desc'] ?? '') ?></p>
                    <a href="<?= e(url('/pendaftaran')) ?>"
                       class="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-gold hover:shadow-lg hover:-translate-y-0.5 text-sm">
                        <?= e($cta['button'] ?? 'Daftar Sekarang') ?>
                        <?= Icons::svg('arrow-right', 'w-4 h-4') ?>
                    </a>
                </div>
            </div>
        </div>
    </section>
</div>
