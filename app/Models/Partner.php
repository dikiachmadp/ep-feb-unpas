<?php

namespace App\Models;

use App\Core\Database;

/**
 * Mitra/kerjasama — logo marquee di beranda. CRUD dikelola di admin
 * (/admin/partners) lewat engine CRUD generik; model ini read-only untuk
 * situs publik.
 */
class Partner
{
    /** Semua mitra aktif, urut sesuai sort_order lalu id. */
    public static function all(): array
    {
        return Database::fetchAll(
            'SELECT * FROM partners WHERE is_active = 1 ORDER BY sort_order, id'
        );
    }
}
