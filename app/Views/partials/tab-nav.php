<?php

use App\Core\Icons;

/**
 * Desktop sidebar + mobile bottom navigation for tabbed pages.
 * Two modes per item:
 *  - button (profil/mahasiswa): panels use data-panel="<id>", app.js switches;
 *  - link   (akademik, item has 'href'): each tab is a real URL with own SEO.
 *
 * @var array  $menu     [['id','label','icon','href'?], ...]
 * @var string $active   id of the active tab
 * @var string $menuTitle sidebar heading
 * @var int    $mobileCols grid columns for the bottom bar
 */
$mobileCols = $mobileCols ?? count($menu);
$isLinkMode = !empty($menu[0]['href']);
?>
<aside class="hidden lg:block lg:w-72 flex-shrink-0">
    <nav class="sticky top-32 flex flex-col gap-1 bg-gray-50 p-4 rounded-[2rem] border border-gray-100" <?= $isLinkMode ? '' : 'data-tab-group' ?>>
        <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-4"><?= e($menuTitle) ?></p>
        <?php foreach ($menu as $item):
            $isActive = $item['id'] === $active;
            $classes = 'tab-btn flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ' . ($isActive
                ? 'is-active bg-forest-700 text-white shadow-lg'
                : 'text-gray-500 hover:bg-white hover:text-forest-700');
            $inner = Icons::svg($item['icon'], 'w-5 h-5 ' . ($isActive ? 'text-gold-400' : 'text-gray-400'))
                . '<span>' . e($item['label']) . '</span>';
        ?>
        <?php if (!empty($item['href'])): ?>
        <a href="<?= e($item['href']) ?>" <?= $isActive ? 'aria-current="page"' : '' ?> class="<?= $classes ?>"><?= $inner ?></a>
        <?php else: ?>
        <button type="button" data-tab="<?= e($item['id']) ?>" class="<?= $classes ?>"><?= $inner ?></button>
        <?php endif; ?>
        <?php endforeach; ?>
    </nav>
</aside>

<nav id="mobile-tab-bar" class="lg:hidden fixed bottom-6 left-4 right-4 z-[100] transition-transform duration-300" <?= $isLinkMode ? '' : 'data-tab-group' ?>>
    <div class="bg-forest-900/95 backdrop-blur-lg border border-white/10 px-2 py-3 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div class="grid grid-cols-<?= (int) $mobileCols ?> gap-0">
            <?php foreach ($menu as $item):
                $isActive = $item['id'] === $active;
                $inner = '<div class="tab-mobile-icon mb-1 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ' . ($isActive
                        ? 'bg-gold-400 text-forest-900 shadow-[0_0_20px_rgba(228,169,48,0.3)]'
                        : 'bg-transparent text-white/40') . '">'
                    . Icons::svg($item['icon'], 'w-5 h-5') . '</div>'
                    . '<span class="tab-mobile-label text-[6px] font-black uppercase tracking-widest transition-colors duration-500 '
                    . ($isActive ? 'text-gold-400' : 'text-white/30') . '">'
                    . e($item['short'] ?? explode(' ', $item['label'])[0]) . '</span>';
            ?>
            <?php if (!empty($item['href'])): ?>
            <a href="<?= e($item['href']) ?>" <?= $isActive ? 'aria-current="page"' : '' ?>
               class="tab-btn flex flex-col items-center justify-center py-1 <?= $isActive ? 'is-active' : '' ?>"><?= $inner ?></a>
            <?php else: ?>
            <button type="button" data-tab="<?= e($item['id']) ?>" class="tab-btn flex flex-col items-center justify-center py-1 <?= $isActive ? 'is-active' : '' ?>"><?= $inner ?></button>
            <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </div>
</nav>
