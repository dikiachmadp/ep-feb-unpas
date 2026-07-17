<?php

namespace App\Controllers;

use App\Core\Seo;
use App\Core\View;
use App\Models\Page;

/**
 * /mahasiswa — Student & Alumni page. Content (prestasi/himpunan/alumni
 * cards) was hardcoded in the old React page, so it lives in the view for
 * now; only SEO comes from the DB.
 */
class FacultyController
{
    public function index(): void
    {
        $seoData = Page::seo('faculty', 'Mahasiswa & Alumni - FEB UNPAS');

        View::render('pages/mahasiswa', [
            'seo' => Seo::page($seoData['title'], $seoData['description'], '/mahasiswa'),
        ]);
    }
}
