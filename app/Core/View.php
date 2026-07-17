<?php

namespace App\Core;

/**
 * Tiny template renderer. Public pages render inside the main layout;
 * partials render bare. Templates are plain PHP files in app/Views/.
 */
class View
{
    /** Render a page template wrapped in the main layout. */
    public static function render(string $template, array $data = []): void
    {
        $data['content'] = self::capture($template, $data);
        extract($data, EXTR_SKIP);
        require APP_ROOT . '/app/Views/layout.php';
    }

    /** Render a template to string without the layout (also used for partials). */
    public static function capture(string $template, array $data = []): string
    {
        extract($data, EXTR_SKIP);
        ob_start();
        require APP_ROOT . '/app/Views/' . $template . '.php';
        return ob_get_clean();
    }

    /** Include a partial inline from within another template. */
    public static function partial(string $name, array $data = []): void
    {
        extract($data, EXTR_SKIP);
        require APP_ROOT . '/app/Views/partials/' . $name . '.php';
    }
}
