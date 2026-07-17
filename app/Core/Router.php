<?php

namespace App\Core;

/**
 * Minimal front-controller router for the public site.
 * Supports static paths and single {param} segments, GET/POST only.
 * The admin panel does NOT use this — it is plain per-file scripts.
 */
class Router
{
    /** @var array<string, array<string, callable>> */
    private array $routes = ['GET' => [], 'POST' => []];

    public function get(string $path, callable $handler): void
    {
        $this->routes['GET'][$path] = $handler;
    }

    public function post(string $path, callable $handler): void
    {
        $this->routes['POST'][$path] = $handler;
    }

    public function dispatch(string $method, string $uri): void
    {
        $path = rtrim(parse_url($uri, PHP_URL_PATH) ?? '/', '/');
        if ($path === '') {
            $path = '/';
        }

        $candidates = $this->routes[$method] ?? [];

        // Exact match first
        if (isset($candidates[$path])) {
            ($candidates[$path])();
            return;
        }

        // Parameterized match: /berita-kegiatan/{slug}
        foreach ($candidates as $route => $handler) {
            if (!str_contains($route, '{')) {
                continue;
            }
            $pattern = '#^' . preg_replace('#\{[a-z_]+\}#', '([^/]+)', $route) . '$#';
            if (preg_match($pattern, $path, $m)) {
                $handler(...array_map('urldecode', array_slice($m, 1)));
                return;
            }
        }

        $this->notFound();
    }

    public function notFound(): void
    {
        http_response_code(404);
        $view = APP_ROOT . '/app/Views/pages/404.php';
        if (is_file($view)) {
            View::render('pages/404', [
                'seo' => Seo::page('Halaman Tidak Ditemukan', 'Halaman yang Anda cari tidak ditemukan.', null, 'noindex, nofollow'),
            ]);
        } else {
            echo '404 Not Found';
        }
        exit;
    }
}
