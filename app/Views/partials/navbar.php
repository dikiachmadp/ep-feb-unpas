<?php

use App\Core\Icons;

/**
 * Fixed navbar; condensing on scroll is handled by assets/js/app.js toggling
 * .is-condensed on #site-nav (styles in the Tailwind source, .site-nav-*).
 *
 * @var array $navLabels  page_fields nav/main
 * @var array $navRoutes  [['key','path'], ...]
 * @var string $currentPath
 */
?>
<header class="fixed top-0 left-0 right-0 z-[110] w-full">
    <div class="max-w-7xl mx-auto">
        <div id="site-nav" class="site-nav-shell flex items-center justify-between px-8 lg:px-12 backdrop-blur-md">

            <a href="<?= e(url('/')) ?>" class="flex items-center focus:outline-none py-1 mr-6">
                <img src="<?= e(url('/logo.webp')) ?>" alt="Logo Ekonomi FEB UNPAS"
                     class="site-nav-logo w-auto object-contain pointer-events-none">
            </a>

            <nav class="hidden lg:flex items-center gap-1">
                <?php foreach ($navRoutes as $route):
                    $isActive = $route['path'] === '/' ? $currentPath === '/' : str_starts_with($currentPath, $route['path']);
                ?>
                <a href="<?= e(url($route['path'])) ?>"
                   class="px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 <?= $isActive
                        ? 'text-forest-700 bg-forest-50 shadow-inner'
                        : 'text-gray-500 hover:text-forest-600 hover:bg-white/50' ?>">
                    <?= e($navLabels[$route['key']] ?? ucfirst($route['key'])) ?>
                </a>
                <?php endforeach; ?>
            </nav>

            <div class="flex items-center gap-3">
                <a href="<?= e(url('/pendaftaran#kontak')) ?>"
                   class="site-nav-cta flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 font-bold text-[10px] uppercase tracking-wider transition-all duration-500 bg-white text-forest-600">
                    <?= Icons::svg('phone', 'w-4 h-4') ?>
                    <span class="hidden sm:inline"><?= e($navLabels['contact'] ?? 'Kontak') ?></span>
                </a>

                <button id="nav-drawer-toggle" type="button" aria-label="Buka menu" aria-expanded="false"
                        class="lg:hidden p-2.5 rounded-full bg-gray-50 text-forest-700">
                    <span class="nav-icon-menu"><?= Icons::svg('menu', 'w-5 h-5') ?></span>
                    <span class="nav-icon-close hidden"><?= Icons::svg('x', 'w-5 h-5') ?></span>
                </button>
            </div>
        </div>
    </div>

    <div id="nav-drawer"
         class="hidden lg:hidden absolute top-full left-10 right-10 mt-3 overflow-hidden bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-[2.5rem]">
        <nav class="flex flex-col py-6 px-6 gap-2">
            <?php foreach ($navRoutes as $route):
                $isActive = $route['path'] === '/' ? $currentPath === '/' : str_starts_with($currentPath, $route['path']);
            ?>
            <a href="<?= e(url($route['path'])) ?>"
               class="block px-6 py-4 rounded-2xl text-base font-bold transition-all <?= $isActive
                    ? 'text-white bg-forest-700 shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50' ?>">
                <?= e($navLabels[$route['key']] ?? ucfirst($route['key'])) ?>
            </a>
            <?php endforeach; ?>
        </nav>
    </div>
</header>
