<?php

namespace App\Models;

use App\Core\Database;

class Faculty
{
    public static function all(): array
    {
        return Database::fetchAll(
            'SELECT * FROM faculty WHERE is_active = 1 ORDER BY display_order, id'
        );
    }
}
