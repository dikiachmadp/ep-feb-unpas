<?php
/**
 * @var array $item news row joined with category_name
 */
$cover = $item['cover_image_path'] ?? '';
?>
<a href="<?= e(url('/berita-kegiatan/' . $item['slug'])) ?>" data-category="<?= e($item['category_name'] ?? '') ?>"
   class="card group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300" data-reveal>

    <div class="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
        <?php if ($cover): ?>
        <img src="<?= e(url($cover)) ?>" alt="<?= e($item['title']) ?>" loading="lazy"
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <?php else: ?>
        <div class="w-full h-full bg-forest-50 flex items-center justify-center">
            <img src="<?= e(url('/logo.webp')) ?>" alt="" aria-hidden="true" loading="lazy"
                 class="w-20 h-20 object-contain opacity-25 grayscale">
        </div>
        <?php endif; ?>

        <div class="absolute top-4 left-4">
            <span class="bg-white/90 backdrop-blur-sm text-forest-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                <?= e($item['category_name'] ?? '') ?>
            </span>
        </div>
    </div>

    <div class="p-6 flex flex-col flex-1 justify-between">
        <div>
            <p class="text-xs text-gray-400 font-sans font-medium mb-2"><?= e(tanggal_id($item['published_date'])) ?></p>
            <h3 class="font-display font-bold text-gray-800 text-base md:text-lg leading-snug mb-3 group-hover:text-forest-600 transition-colors line-clamp-2 min-h-[3rem]">
                <?= e($item['title']) ?>
            </h3>
            <p class="text-gray-500 text-sm font-sans font-light leading-relaxed mb-4 line-clamp-3">
                <?= e($item['excerpt']) ?>
            </p>
        </div>
        <div class="pt-2 border-t border-gray-50 flex items-center justify-between text-xs font-semibold text-forest-600 group-hover:text-forest-700 transition-colors font-sans">
            <span>Baca Selengkapnya</span>
            <span class="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
        </div>
    </div>
</a>
