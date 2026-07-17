<?php

namespace App\Models;

use App\Core\Database;

class GraduateProfile
{
    public static function all(): array
    {
        return Database::fetchAll(
            'SELECT * FROM graduate_profiles WHERE is_active = 1 ORDER BY sort_order, id'
        );
    }
}
