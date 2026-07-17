<?php

namespace App\Controllers;

use App\Core\Seo;
use App\Core\View;
use App\Models\Page;

/** Info-only contact page: address/phone/email/hours + brochures. No form. */
class ContactController
{
    public function index(): void
    {
        $seoData = Page::seo('contact', 'Kontak - FEB UNPAS');

        View::render('pages/kontak', [
            'seo'       => Seo::page($seoData['title'], $seoData['description'], '/kontak'),
            'fields'    => Page::fields('contact'),
            'extraInfo' => Page::items('contact', 'extra_info'),
        ]);
    }
}
