<?php

namespace App\Models;

use App\Core\Database;

class Curriculum
{
    /**
     * Full nested structure: years -> semesters -> course display strings
     * ("ESP201 - Matematika Ekonomi" or just the name when code is NULL).
     */
    public static function tree(): array
    {
        $years = Database::fetchAll('SELECT * FROM curriculum_years ORDER BY sort_order, year_number');
        foreach ($years as &$year) {
            $semesters = Database::fetchAll(
                'SELECT * FROM curriculum_semesters WHERE year_id = ? ORDER BY semester_number',
                [$year['id']]
            );
            foreach ($semesters as &$sem) {
                $courses = Database::fetchAll(
                    'SELECT code, name FROM curriculum_courses WHERE semester_id = ? ORDER BY sort_order, id',
                    [$sem['id']]
                );
                $sem['courses'] = array_map(
                    fn(array $c) => $c['code'] ? $c['code'] . ' - ' . $c['name'] : $c['name'],
                    $courses
                );
            }
            unset($sem);
            $year['semesters'] = $semesters;
        }
        return $years;
    }
}
