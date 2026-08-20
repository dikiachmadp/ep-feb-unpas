<?php

namespace App\Controllers;

use App\Core\Seo;
use App\Core\View;
use App\Models\Page;

class ProfileController
{
    public function index(): void
    {
        $seoData = Page::seo('profile', 'Profil - Visi Misi - FEB UNPAS');

        View::render('pages/profil', [
            'seo'          => Seo::page($seoData['title'], $seoData['description'], '/profil'),
            'fields'       => Page::fields('profile'),
            'history'      => Page::items('profile', 'history_content'),
            'milestones'   => Page::items('profile', 'milestones'),
            'missions'     => Page::items('profile', 'mission'),
            'objectives'   => Page::items('profile', 'objectives'),
            'advantages'   => Page::items('profile', 'advantages'),
            'achievements' => Page::items('profile', 'achievements'),
            'facilities'   => Page::items('profile', 'facilities'),
        ]);
    }
}
