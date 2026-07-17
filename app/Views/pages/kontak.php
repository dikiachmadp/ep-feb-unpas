<?php

use App\Core\Icons;
use App\Core\View;
use App\Models\Page;

/**
 * Info-only contact page (no form, by design — see MIGRATION_PLAN).
 * @var array $fields    page_fields contact
 * @var array $extraInfo page_items contact/extra_info
 */
$main = $fields['main'] ?? [];
$registrationUrl = Page::field('pendaftaran', 'main', 'external_registration_url', 'https://situ2.unpas.ac.id/spmbfront/program-studi-detail/detail/60201');

$brochures = [];
for ($i = 1; $i <= 6; $i++) {
    $brochures[] = ['src' => "/brosur{$i}.webp", 'alt' => "Registration Brochure Page {$i}"];
}
$infoItems = [
    ['icon' => 'map-pin', 'title' => $main['address_title'] ?? 'Address', 'value' => $main['address_value'] ?? '', 'href' => null],
    ['icon' => 'phone',   'title' => $main['phone_title'] ?? 'Phone',     'value' => $main['phone_value'] ?? '',   'href' => 'tel:' . ($main['phone_value'] ?? '')],
    ['icon' => 'mail',    'title' => $main['email_title'] ?? 'Email',     'value' => $main['email_value'] ?? '',   'href' => 'mailto:' . ($main['email_value'] ?? '')],
    ['icon' => 'clock',   'title' => $main['hours_title'] ?? 'Hours',     'value' => $main['hours_value'] ?? '',   'href' => null],
];
?>
<div class="page-wrapper pt-20">

    <?php View::partial('page-hero', [
        'badge' => $main['subtitle'] ?? 'Contact & Location',
        'title' => $main['title'] ?? 'Contact Us',
    ]); ?>

    <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div data-reveal>
                <div class="mb-12">
                    <?php View::partial('section-header', [
                        'subtitle' => $main['brochure_subtitle'] ?? '',
                        'title'    => $main['brochure_title'] ?? '',
                    ]); ?>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
                    <?php foreach ($brochures as $idx => $img): ?>
                    <button type="button" data-lightbox-src="<?= e(url($img['src'])) ?>" data-lightbox-index="<?= $idx ?>"
                            class="card p-2 bg-white shadow-sm overflow-hidden border border-gray-100 rounded-xl cursor-zoom-in hover:shadow-md transition-shadow duration-200 group relative">
                        <img src="<?= e(url($img['src'])) ?>" alt="<?= e($img['alt']) ?>" loading="lazy" class="w-full h-auto rounded-lg object-contain">
                        <span class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-xl"></span>
                    </button>
                    <?php endforeach; ?>
                </div>

                <div class="max-w-lg mx-auto flex flex-col gap-4">
                    <?php foreach ([
                        ['title' => $main['brochure_download_title'] ?? 'Download Brochure', 'subtitle' => $main['brochure_download_subtitle'] ?? '', 'file' => '/brosur.pdf',  'download' => 'Brosur_Pendaftaran_FEB_UNPAS.pdf'],
                        ['title' => 'Download Brosur 2', 'subtitle' => 'File PDF Kedua', 'file' => '/brosur2.pdf', 'download' => 'Brosur_Pendaftaran_FEB_UNPAS_2.pdf'],
                    ] as $doc): ?>
                    <div class="group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-[2rem] hover:border-forest-200 hover:shadow-xl transition-all duration-300">
                        <div class="flex items-center gap-4 min-w-0">
                            <div class="w-12 h-12 bg-gray-50 text-forest-700 rounded-2xl flex items-center justify-center group-hover:bg-forest-700 group-hover:text-white transition-all">
                                <?= Icons::svg('download', 'w-5 h-5') ?>
                            </div>
                            <div class="min-w-0 text-left">
                                <h5 class="font-bold text-gray-800 text-[13px] leading-tight truncate pr-2"><?= e($doc['title']) ?></h5>
                                <p class="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1"><?= e($doc['subtitle']) ?></p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 ml-4">
                            <a href="<?= e(url($doc['file'])) ?>" target="_blank" rel="noreferrer" title="Preview"
                               class="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-forest-50 hover:text-forest-600 transition-colors"><?= Icons::svg('external-link', 'w-4 h-4') ?></a>
                            <a href="<?= e(url($doc['file'])) ?>" download="<?= e($doc['download']) ?>" title="Download"
                               class="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gold-50 hover:text-gold-600 transition-colors"><?= Icons::svg('download', 'w-4 h-4') ?></a>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <div class="mt-12 bg-forest-900 rounded-2xl p-8 md:p-10 shadow-md text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden" data-reveal>
                <div class="text-center md:text-left">
                    <span class="inline-block bg-white/10 text-gold-300 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider font-sans">
                        <?= e($main['cashback_badge'] ?? '') ?>
                    </span>
                    <h3 class="font-display text-2xl md:text-3xl font-bold tracking-tight"><?= e($main['cashback_title'] ?? '') ?></h3>
                    <p class="text-forest-200 text-sm font-sans mt-1 font-light"><?= e($main['cashback_description'] ?? '') ?></p>
                </div>
                <div class="flex-shrink-0 w-full md:w-auto">
                    <a href="<?= e($registrationUrl) ?>" target="_blank" rel="noopener noreferrer"
                       class="inline-flex w-full md:w-auto items-center justify-center bg-gold-400 hover:bg-gold-500 text-forest-900 font-sans font-bold text-center px-8 py-4 rounded-xl shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
                        <?= e($main['cashback_button'] ?? 'Register Now') ?>
                    </a>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-20">
                <?php foreach ($infoItems as $i => $info): ?>
                <div class="card p-6 group" data-reveal data-reveal-delay="<?= $i * 100 ?>">
                    <div class="w-11 h-11 rounded-xl bg-forest-50 flex items-center justify-center mb-4 group-hover:bg-forest-500 transition-colors duration-200">
                        <?= Icons::svg($info['icon'], 'w-5 h-5 text-forest-500 group-hover:text-white transition-colors duration-200') ?>
                    </div>
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 font-sans"><?= e($info['title']) ?></p>
                    <?php if ($info['href']): ?>
                    <a href="<?= e($info['href']) ?>" class="text-gray-700 text-sm font-medium hover:text-forest-600 transition-colors font-sans leading-relaxed"><?= e($info['value']) ?></a>
                    <?php else: ?>
                    <p class="text-gray-700 text-sm font-medium font-sans leading-relaxed"><?= e($info['value']) ?></p>
                    <?php endif; ?>
                </div>
                <?php endforeach; ?>
            </div>

            <?php if ($extraInfo): ?>
            <div class="mt-12 max-w-3xl mx-auto p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm" data-reveal>
                <h4 class="font-display font-bold text-forest-800 mb-4"><?= e($main['extra_info_title'] ?? 'Additional Information') ?></h4>
                <ul class="space-y-3">
                    <?php foreach ($extraInfo as $info): ?>
                    <li class="flex gap-3 text-sm text-gray-600 leading-relaxed">
                        <span class="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 flex-shrink-0"></span>
                        <?= e($info['description']) ?>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <?php endif; ?>

        </div>
    </section>
</div>

<!-- Lightbox brosur -->
<div id="lightbox" class="hidden fixed inset-0 z-[200] bg-black/95 items-center justify-center p-4 select-none backdrop-blur-sm">
    <div class="absolute top-4 right-4 flex items-center gap-3 z-50">
        <button type="button" data-lightbox-zoom class="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors" title="Zoom">
            <?= Icons::svg('zoom-in', 'w-5 h-5') ?>
        </button>
        <button type="button" data-lightbox-close class="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors" title="Close">
            <?= Icons::svg('x', 'w-5 h-5') ?>
        </button>
    </div>
    <button type="button" data-lightbox-prev class="absolute left-4 md:left-6 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors">
        <?= Icons::svg('chevron-left', 'w-6 h-6') ?>
    </button>
    <button type="button" data-lightbox-next class="absolute right-4 md:right-6 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors">
        <?= Icons::svg('chevron-right', 'w-6 h-6') ?>
    </button>
    <div class="w-full h-full flex items-center justify-center overflow-auto">
        <img data-lightbox-img src="" alt="Preview brosur" class="max-w-full max-h-full object-contain transition-transform origin-center cursor-zoom-in">
    </div>
</div>
