<?php

use App\Core\Icons;
use App\Models\Page;

/**
 * @var array $navLabels
 * @var array $navRoutes
 */
$footerFields = Page::fields('footer');
$footer  = $footerFields['main'] ?? [];
$socialUrls = $footerFields['socials'] ?? [];
$contact = Page::fields('contact')['main'] ?? [];
$brand   = Page::field('home', 'hero', 'subtitle', 'Economic Development');

$logos = [
    ['src' => '/logo.webp',      'href' => url('/'),                                                              'alt' => 'UNPAS',     'ring' => true],
    ['src' => '/feb.webp',       'href' => 'https://feb.unpas.ac.id',                                             'alt' => 'FEB',       'ring' => false],
    ['src' => '/aacsb.webp',     'href' => 'https://www.aacsb.edu/members?searchTerm=universitas+pasundan',       'alt' => 'AACSB',     'ring' => false],
    ['src' => '/berdampak.webp', 'href' => 'https://kemdiktisaintek.go.id/library/book/diktisaintek-berdampak',   'alt' => 'Berdampak', 'ring' => false],
];
// URL diedit staf via admin (Konten Halaman > footer, section socials);
// akun tanpa URL (kosong/'#') tidak ditampilkan.
$socials = array_filter([
    ['icon' => 'instagram', 'href' => $socialUrls['instagram_url'] ?? '', 'label' => 'Instagram'],
    ['icon' => 'facebook',  'href' => $socialUrls['facebook_url'] ?? '',  'label' => 'Facebook'],
    ['icon' => 'youtube',   'href' => $socialUrls['youtube_url'] ?? '',   'label' => 'YouTube'],
    ['icon' => 'linkedin',  'href' => $socialUrls['linkedin_url'] ?? '',  'label' => 'LinkedIn'],
], fn ($s) => $s['href'] !== '' && $s['href'] !== '#');
?>
<footer class="bg-forest-900 text-white relative overflow-hidden border-t border-white/10 font-sans">
    <div class="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.05),transparent_50%)] pointer-events-none"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            <div class="lg:col-span-5 flex flex-col items-center lg:items-start">
                <div class="grid grid-cols-2 gap-3 w-full max-w-[280px] lg:max-w-[450px] mb-6">
                    <?php foreach ($logos as $logo): ?>
                    <div class="group relative">
                        <div class="aspect-[16/9] bg-white rounded-xl p-3 flex items-center justify-center shadow-lg transition-all duration-500 group-hover:-translate-y-1 <?= $logo['ring'] ? 'ring-2 ring-gold-500/20' : 'border border-white/5' ?>">
                            <a href="<?= e($logo['href']) ?>" target="_blank" rel="noopener noreferrer" class="w-full h-full flex items-center justify-center">
                                <img src="<?= e(url($logo['src'])) ?>" alt="<?= e($logo['alt']) ?>" class="max-h-full object-contain transition-transform group-hover:scale-105">
                            </a>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>

                <div class="space-y-3 text-center lg:text-left mb-6">
                    <div class="space-y-1">
                        <h2 class="text-white font-black text-xl lg:text-lg leading-tight tracking-tighter uppercase italic">
                            <?= e($brand) ?>
                        </h2>
                        <div class="h-1 w-12 bg-gold-500 mx-auto lg:mx-0 rounded-full"></div>
                    </div>
                    <div class="space-y-2">
                        <p class="text-forest-100 text-[11px] lg:text-xs font-bold uppercase tracking-[0.15em] leading-tight max-w-[350px]">
                            <?= e($footer['tagline'] ?? '') ?>
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-2.5 mt-auto">
                    <?php foreach ($socials as $social): ?>
                    <a href="<?= e($social['href']) ?>" target="_blank" rel="noopener noreferrer" aria-label="<?= e($social['label']) ?>"
                       class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-gold-500 group shadow-md">
                        <?= Icons::svg($social['icon'], 'w-4 h-4 text-white group-hover:text-forest-900') ?>
                    </a>
                    <?php endforeach; ?>
                </div>
            </div>

            <div class="lg:col-span-7">
                <div class="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 lg:p-8 space-y-8 backdrop-blur-sm shadow-inner">
                    <div class="grid grid-cols-2 gap-6 lg:gap-10">
                        <div>
                            <h3 class="font-black text-white text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                                <span class="w-4 h-px bg-gold-500"></span>
                                <?= e($footer['links_title'] ?? 'Tautan Cepat') ?>
                            </h3>
                            <ul class="space-y-2">
                                <?php foreach ($navRoutes as $route): ?>
                                <li>
                                    <a href="<?= e(url($route['path'])) ?>" class="text-forest-200 hover:text-gold-400 text-[11px] font-semibold transition-all flex items-center gap-2 group/link">
                                        <span class="opacity-0 -ml-3 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all text-gold-500"><?= Icons::svg('arrow-right', 'w-3 h-3') ?></span>
                                        <?= e($navLabels[$route['key']] ?? ucfirst($route['key'])) ?>
                                    </a>
                                </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>

                        <div>
                            <h3 class="font-black text-white text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                                <span class="w-4 h-px bg-gold-500"></span>
                                <?= e($footer['contact_title'] ?? 'Kontak') ?>
                            </h3>
                            <ul class="space-y-3 text-[11px] text-forest-200">
                                <li class="flex gap-3">
                                    <span class="shrink-0 text-gold-500 mt-0.5"><?= Icons::svg('map-pin', 'w-4 h-4') ?></span>
                                    <span class="leading-tight font-medium"><?= e($contact['address_value'] ?? '') ?></span>
                                </li>
                                <li class="flex gap-3">
                                    <span class="shrink-0 text-gold-500"><?= Icons::svg('phone', 'w-4 h-4') ?></span>
                                    <a href="tel:<?= e($contact['phone_value'] ?? '') ?>" class="hover:text-white transition-colors"><?= e($contact['phone_value'] ?? '') ?></a>
                                </li>
                                <li class="flex gap-3">
                                    <span class="shrink-0 text-gold-500"><?= Icons::svg('mail', 'w-4 h-4') ?></span>
                                    <a href="mailto:<?= e($contact['email_value'] ?? '') ?>" class="hover:text-white transition-colors underline-offset-4 hover:underline"><?= e($contact['email_value'] ?? '') ?></a>
                                </li>
                                <li class="flex gap-3 opacity-80">
                                    <span class="shrink-0 text-gold-400"><?= Icons::svg('clock', 'w-4 h-4') ?></span>
                                    <span class="font-medium"><?= e($contact['hours_value'] ?? '') ?></span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="w-full h-32 lg:h-36 rounded-2xl overflow-hidden border border-white/10 shadow-xl group/map">
                        <iframe title="Lokasi UNPAS Tamansari"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9168940868843!2d107.6069945!3d-6.9005436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64797079f41%3A0xc3f982d1c681944!2sJl.%20Tamansari%20No.6-8%2C%20Tamansari%2C%20Kec.%20Bandung%20Wetan%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040116!5e0!3m2!1sid!2sid!4v1710000000000"
                                width="100%" height="100%"
                                class="grayscale opacity-50 group-hover/map:grayscale-0 group-hover/map:opacity-100 transition-all duration-700"
                                allowfullscreen loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-forest-400 text-[11px] font-medium tracking-wide">
                <?= e($footer['copyright'] ?? '') ?>
            </p>
            <div class="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 shadow-sm">
                <span class="text-forest-500 text-[9px] font-bold tracking-widest uppercase">Copyright</span>
                <div class="w-1 h-1 bg-gold-500 rounded-full"></div>
                <a href="https://dikiachmadp.work" target="_blank" rel="noopener noreferrer"
                   class="text-white hover:text-gold-400 text-[10px] font-black tracking-[0.12em] transition-all uppercase">Techteam</a>
                <span class="text-forest-500 text-[9px] font-bold opacity-50"><?= date('Y') ?></span>
            </div>
        </div>
    </div>
</footer>
