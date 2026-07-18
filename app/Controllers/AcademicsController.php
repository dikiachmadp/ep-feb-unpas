<?php

namespace App\Controllers;

use App\Core\Seo;
use App\Core\View;
use App\Models\Curriculum;
use App\Models\Faculty;
use App\Models\GraduateProfile;
use App\Models\Page;

class AcademicsController
{
    public function index(): void
    {
        $seoData = Page::seo('academics', 'Akademik - Kurikulum - FEB UNPAS');
        $curriculum = Curriculum::tree();
        $dosen = Faculty::all();

        $seo = Seo::page($seoData['title'], $seoData['description'], '/akademik');
        // Machine-readable roster + course list so name/mata-kuliah searches
        // associate them with this site, not just the news pages.
        $seo->jsonLd[] = Seo::facultyListSchema($dosen);
        $seo->jsonLd[] = Seo::courseListSchema($curriculum);

        View::render('pages/akademik', [
            'seo'        => $seo,
            'fields'     => Page::fields('academics'),
            'curriculum' => $curriculum,
            'profiles'   => GraduateProfile::all(),
            'dosen'      => $dosen,
        ]);
    }
}
