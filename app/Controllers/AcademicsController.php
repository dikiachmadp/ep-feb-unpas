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

        View::render('pages/akademik', [
            'seo'        => Seo::page($seoData['title'], $seoData['description'], '/akademik'),
            'fields'     => Page::fields('academics'),
            'curriculum' => Curriculum::tree(),
            'profiles'   => GraduateProfile::all(),
            'dosen'      => Faculty::all(),
        ]);
    }
}
