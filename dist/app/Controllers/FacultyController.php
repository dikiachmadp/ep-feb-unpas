<?php

namespace App\Controllers;

use App\Core\Router;
use App\Core\Seo;
use App\Core\View;
use App\Models\Faculty;
use App\Models\Page;

/**
 * /mahasiswa — Student & Alumni page. Content (prestasi/himpunan/alumni
 * cards) was hardcoded in the old React page, so it lives in the view for
 * now; only SEO comes from the DB.
 * Also serves /dosen/{slug} — per-lecturer profile pages whose sole purpose
 * is ranking for name searches (unique title + Person schema per dosen).
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

    public function show(string $slug): void
    {
        $dosen = Faculty::bySlug($slug);
        if ($dosen === null) {
            (new Router())->notFound();
        }

        View::render('pages/dosen-detail', [
            'seo'   => Seo::person($dosen),
            'dosen' => $dosen,
        ]);
    }
}
