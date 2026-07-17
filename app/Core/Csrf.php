<?php

namespace App\Core;

class Csrf
{
    public static function token(): string
    {
        $token = Session::get('_csrf');
        if (!$token) {
            $token = bin2hex(random_bytes(32));
            Session::set('_csrf', $token);
        }
        return $token;
    }

    /** Hidden input for POST forms. */
    public static function field(): string
    {
        return '<input type="hidden" name="_csrf" value="' . e(self::token()) . '">';
    }

    public static function verify(?string $token): bool
    {
        $known = Session::get('_csrf');
        return is_string($token) && is_string($known) && hash_equals($known, $token);
    }

    /** Verify or abort — call at the top of every state-changing POST handler. */
    public static function require(): void
    {
        if (!self::verify($_POST['_csrf'] ?? null)) {
            http_response_code(419);
            exit('Sesi kedaluwarsa atau token tidak valid. Silakan muat ulang halaman dan coba lagi.');
        }
    }
}
