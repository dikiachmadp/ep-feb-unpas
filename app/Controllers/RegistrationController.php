<?php

namespace App\Controllers;

use App\Core\Seo;
use App\Core\View;
use App\Models\Page;

/**
 * /pendaftaran — lightweight CTA page pointing to Unpas' official
 * registration site. The URL is editable in the admin (Konten Halaman).
 */
class RegistrationController
{
    public function index(): void
    {
        $fields = Page::fields('pendaftaran');
        $seoData = Page::seo('pendaftaran', 'Pendaftaran Mahasiswa Baru - FEB UNPAS');

        View::render('pages/pendaftaran', [
            'seo'    => Seo::page($seoData['title'], $seoData['description'], '/pendaftaran'),
            'fields' => $fields,
        ]);
    }
}
