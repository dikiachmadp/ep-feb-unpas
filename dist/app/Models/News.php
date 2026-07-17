<?php

namespace App\Models;

use App\Core\Database;

class News
{
    private const SELECT = 'SELECT n.*, c.name AS category_name
                            FROM news n
                            LEFT JOIN news_categories c ON c.id = n.category_id';

    /** Published news, newest first. */
    public static function published(?int $limit = null): array
    {
        $sql = self::SELECT . " WHERE n.status = 'published' ORDER BY n.published_date DESC, n.id DESC";
        if ($limit !== null) {
            $sql .= ' LIMIT ' . (int) $limit;
        }
        return Database::fetchAll($sql);
    }

    public static function bySlug(string $slug): ?array
    {
        return Database::fetch(self::SELECT . " WHERE n.slug = ? AND n.status = 'published'", [$slug]);
    }

    /** Gallery image paths for one article, in order. */
    public static function gallery(int $newsId): array
    {
        $rows = Database::fetchAll(
            'SELECT image_path FROM news_gallery WHERE news_id = ? ORDER BY sort_order',
            [$newsId]
        );
        return array_column($rows, 'image_path');
    }

    /** Other published articles, same category first (mirrors the old site). */
    public static function related(array $news, int $limit = 3): array
    {
        return Database::fetchAll(
            self::SELECT . " WHERE n.status = 'published' AND n.id != ?
             ORDER BY (n.category_id = ?) DESC, n.published_date DESC
             LIMIT " . (int) $limit,
            [$news['id'], $news['category_id']]
        );
    }

    /** Category names that actually have published news (for the filter bar). */
    public static function activeCategories(): array
    {
        $rows = Database::fetchAll(
            "SELECT DISTINCT c.name FROM news_categories c
             JOIN news n ON n.category_id = c.id AND n.status = 'published'
             ORDER BY c.name"
        );
        return array_column($rows, 'name');
    }
}
