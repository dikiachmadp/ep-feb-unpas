<?php

namespace App\Models;

use App\Core\Database;

/**
 * Read access to the generic page content tables (page_fields / page_items)
 * that the admin "Konten Halaman" screens edit. Results are memoized per
 * request because the layout (nav/footer) and the page controller both read.
 */
class Page
{
    /** @var array<string, array<string, array<string, string>>> */
    private static array $fieldsCache = [];

    /** All fields of a page, nested: [section_key][field_key] => value. */
    public static function fields(string $pageKey): array
    {
        if (!isset(self::$fieldsCache[$pageKey])) {
            $rows = Database::fetchAll(
                'SELECT section_key, field_key, value FROM page_fields WHERE page_key = ?',
                [$pageKey]
            );
            $nested = [];
            foreach ($rows as $row) {
                $nested[$row['section_key']][$row['field_key']] = $row['value'];
            }
            self::$fieldsCache[$pageKey] = $nested;
        }
        return self::$fieldsCache[$pageKey];
    }

    public static function field(string $pageKey, string $sectionKey, string $fieldKey, string $default = ''): string
    {
        return self::fields($pageKey)[$sectionKey][$fieldKey] ?? $default;
    }

    /** Active repeating items of one page section, in display order. */
    public static function items(string $pageKey, string $sectionKey): array
    {
        return Database::fetchAll(
            'SELECT * FROM page_items WHERE page_key = ? AND section_key = ? AND is_active = 1 ORDER BY sort_order',
            [$pageKey, $sectionKey]
        );
    }

    /**
     * SEO title/description pair for a page, with fallbacks so a page never
     * ships an empty tag even if staff clear the fields.
     */
    public static function seo(string $pageKey, string $fallbackTitle, string $fallbackDescription = ''): array
    {
        return [
            'title'       => self::field($pageKey, 'seo', 'title', $fallbackTitle),
            'description' => self::field($pageKey, 'seo', 'description', $fallbackDescription),
        ];
    }
}
