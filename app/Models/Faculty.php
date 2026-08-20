<?php

namespace App\Models;

use App\Core\Database;

class Faculty
{
    /** Honorifics/degrees stripped (after dot removal) when building slugs. */
    private const TITLE_TOKENS = [
        'prof', 'dr', 'drs', 'dra', 'h', 'hj', 'ir',
        'se', 'sh', 'st', 'ssi', 'me', 'mt', 'msi', 'mm', 'msc', 'ma', 'mba', 'phd',
    ];

    /** Status vocabulary for the `position` column (dropdown in the admin). */
    public const STATUSES = [
        'Dosen Pengajar',
        'Ketua Program Studi',
        'Sekretaris Program Studi',
        'Guru Besar',
    ];

    /** Repeating detail sections, in display order: section_key => heading. */
    public const SECTIONS = [
        'education'      => 'Riwayat Pendidikan',
        'teaching'       => 'Pengajaran',
        'publications'   => 'Publikasi Ilmiah',
        'certifications' => 'Sertifikasi',
        'organizations'  => 'Organisasi',
        'networks'       => 'Jejaring Akademik & Profesional',
    ];

    /** All active rows, each decorated with a URL 'slug' derived from the name. */
    public static function all(): array
    {
        $rows = Database::fetchAll(
            'SELECT * FROM faculty WHERE is_active = 1 ORDER BY display_order, id'
        );
        $seen = [];
        foreach ($rows as &$row) {
            $slug = self::slugify($row['full_name']) ?: 'dosen-' . $row['id'];
            if (isset($seen[$slug])) {
                $slug .= '-' . $row['id'];
            }
            $seen[$slug] = true;
            $row['slug'] = $slug;
        }
        unset($row);
        return $rows;
    }

    public static function bySlug(string $slug): ?array
    {
        foreach (self::all() as $row) {
            if ($row['slug'] === $slug) {
                return $row;
            }
        }
        return null;
    }

    /**
     * Active detail items for one dosen, grouped by section_key and ordered
     * by sort_order. Keys follow self::SECTIONS; empty sections are omitted.
     *
     * @return array<string, array<int, array>>
     */
    public static function items(int $facultyId): array
    {
        $rows = Database::fetchAll(
            'SELECT * FROM faculty_items WHERE faculty_id = ? AND is_active = 1 ORDER BY section_key, sort_order, id',
            [$facultyId]
        );
        $grouped = [];
        foreach ($rows as $row) {
            $grouped[$row['section_key']][] = $row;
        }
        return $grouped;
    }

    /** "Dr. Dikdik Kusdiana, S.E., M.T." -> "dikdik-kusdiana" */
    private static function slugify(string $name): string
    {
        $s = str_replace(['.', "'"], '', strtolower($name)); // "Ph.D." -> "phd", "S.E." -> "se"
        $s = preg_replace('/[^a-z0-9]+/', ' ', $s);
        $words = array_filter(
            explode(' ', $s),
            fn(string $w) => $w !== '' && !in_array($w, self::TITLE_TOKENS, true)
        );
        return implode('-', $words);
    }
}
