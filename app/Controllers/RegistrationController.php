<?php

namespace App\Controllers;

use App\Core\Seo;
use App\Core\View;
use App\Models\Page;

/**
 * /pendaftaran — merged registration + contact page (G3): brochures, external
 * registration CTA, PDF downloads, cashback promo, contact info, extra notes.
 * /kontak 301-redirects here.
 */
class RegistrationController
{
    public function index(): void
    {
        $seoData = Page::seo('pendaftaran', 'Pendaftaran Mahasiswa Baru - FEB UNPAS');

        View::render('pages/pendaftaran', [
            'seo'       => Seo::page($seoData['title'], $seoData['description'], '/pendaftaran'),
            'fields'    => Page::fields('pendaftaran'),
            'contact'   => Page::fields('contact')['main'] ?? [],
            'brochures' => Page::items('pendaftaran', 'brochures'),
            'downloads' => Page::items('pendaftaran', 'downloads'),
            'extraInfo' => Page::items('pendaftaran', 'extra_info'),
        ]);
    }
}
