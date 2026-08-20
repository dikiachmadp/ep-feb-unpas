<?php

namespace App\Controllers;

use App\Core\Seo;
use App\Core\View;
use App\Models\News;
use App\Models\Page;
use App\Models\Partner;

class HomeController
{
    public function index(): void
    {
        $fields = Page::fields('home');
        $seoData = Page::seo('home', 'Ekonomi FEB Unpas');

        View::render('pages/home', [
            'seo'      => Seo::page($seoData['title'], $seoData['description'], '/'),
            'fields'   => $fields,
            'stats'    => Page::items('home', 'stats'),
            'features' => Page::items('home', 'features'),
            'news'     => News::published(3),
            'partners' => Partner::all(),
        ]);
    }
}
