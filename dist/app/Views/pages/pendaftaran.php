<?php

use App\Core\Icons;
use App\Core\View;

/**
 * CTA page: registration happens on Unpas' official site; this page explains
 * and links out. URL/text editable via admin (Konten Halaman > pendaftaran).
 * @var array $fields
 */
$main = $fields['main'] ?? [];
$registrationUrl = $main['external_registration_url'] ?? 'https://situ2.unpas.ac.id/spmbfront/program-studi-detail/detail/60201';
?>
<div class="page-wrapper pt-20 bg-white min-h-screen">

    <?php View::partial('page-hero', [
        'badge' => 'Penerimaan Mahasiswa Baru',
        'title' => $main['title'] ?? 'Pendaftaran Mahasiswa Baru',
    ]); ?>

    <section class="py-20 bg-gray-50">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative bg-gradient-to-br from-forest-500 to-forest-700 rounded-[2.5rem] p-10 md:p-14 overflow-hidden text-center shadow-2xl" data-reveal>
                <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div class="absolute bottom-0 left-0 w-48 h-48 bg-gold-400/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div class="relative z-10 flex flex-col items-center">
                    <div class="w-20 h-20 bg-white/10 backdrop-blur-md text-gold-400 rounded-[2rem] flex items-center justify-center mb-6 border border-white/10">
                        <?= Icons::svg('external-link', 'w-8 h-8') ?>
                    </div>
                    <p class="text-forest-100 text-base md:text-lg mb-10 max-w-xl leading-relaxed font-sans font-light">
                        <?= e($main['description'] ?? '') ?>
                    </p>
                    <a href="<?= e($registrationUrl) ?>" target="_blank" rel="noopener noreferrer"
                       class="group inline-flex items-center gap-4 px-10 py-5 bg-gold-400 hover:bg-gold-500 text-forest-900 rounded-2xl font-black text-base shadow-gold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                        <?= e($main['button_label'] ?? 'Daftar Sekarang') ?>
                        <span class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><?= Icons::svg('external-link', 'w-5 h-5') ?></span>
                    </a>
                    <p class="text-forest-200/70 text-xs mt-6 font-sans">
                        Anda akan diarahkan ke portal resmi penerimaan mahasiswa baru Universitas Pasundan (situ2.unpas.ac.id).
                    </p>
                </div>
            </div>

            <div class="mt-10 text-center" data-reveal>
                <p class="text-sm text-gray-500 font-sans">
                    Butuh bantuan atau informasi biaya? Lihat brosur dan kontak kami di
                    <a href="<?= e(url('/kontak')) ?>" class="text-forest-600 font-semibold hover:underline">halaman Kontak</a>.
                </p>
            </div>
        </div>
    </section>
</div>
