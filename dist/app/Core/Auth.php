<?php

namespace App\Core;

/**
 * Admin authentication with simple DB-backed brute-force lockout.
 */
class Auth
{
    private const MAX_ATTEMPTS = 5;
    private const WINDOW_MINUTES = 15;

    public static function attempt(string $email, string $password): bool
    {
        $email = strtolower(trim($email));
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

        if (self::isLockedOut($email) || self::isLockedOut($ip)) {
            return false;
        }

        $user = Database::fetch(
            'SELECT * FROM admin_users WHERE email = ? AND is_active = 1',
            [$email]
        );

        $ok = $user !== null && password_verify($password, $user['password_hash']);

        Database::insert('login_attempts', [
            'identifier'   => $email,
            'attempted_at' => Database::now(),
            'success'      => $ok ? 1 : 0,
        ]);
        if (!$ok) {
            Database::insert('login_attempts', [
                'identifier'   => $ip,
                'attempted_at' => Database::now(),
                'success'      => 0,
            ]);
            return false;
        }

        // Upgrade hash transparently if PHP's default algorithm changed
        if (password_needs_rehash($user['password_hash'], PASSWORD_DEFAULT)) {
            Database::update('admin_users', (int) $user['id'], [
                'password_hash' => password_hash($password, PASSWORD_DEFAULT),
            ]);
        }

        Database::update('admin_users', (int) $user['id'], ['last_login_at' => Database::now()]);
        Session::regenerate();
        Session::set('admin_id', (int) $user['id']);
        return true;
    }

    public static function isLockedOut(string $identifier): bool
    {
        $since = date('Y-m-d H:i:s', time() - self::WINDOW_MINUTES * 60);
        $row = Database::fetch(
            'SELECT COUNT(*) AS n FROM login_attempts
             WHERE identifier = ? AND success = 0 AND attempted_at > ?',
            [$identifier, $since]
        );
        return (int) ($row['n'] ?? 0) >= self::MAX_ATTEMPTS;
    }

    public static function check(): bool
    {
        return Session::get('admin_id') !== null;
    }

    public static function user(): ?array
    {
        $id = Session::get('admin_id');
        if ($id === null) {
            return null;
        }
        return Database::fetch('SELECT * FROM admin_users WHERE id = ? AND is_active = 1', [$id]);
    }

    public static function isAdmin(): bool
    {
        $user = self::user();
        return $user !== null && $user['role'] === 'admin';
    }

    /** Gate for every admin page — redirects to login when not authenticated. */
    public static function requireLogin(): void
    {
        if (!self::check() || self::user() === null) {
            header('Location: ' . url('/admin/login.php'));
            exit;
        }
    }

    public static function logout(): void
    {
        Session::destroy();
    }
}
