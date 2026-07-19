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

    /** Published news for one list page, newest first, optionally per category. */
    public static function publishedPaged(int $page, int $perPage, ?string $category = null): array
    {
        [$where, $params] = self::publishedWhere($category);
        $offset = ($page - 1) * $perPage;
        return Database::fetchAll(
            self::SELECT . " $where ORDER BY n.published_date DESC, n.id DESC
             LIMIT " . (int) $perPage . ' OFFSET ' . (int) $offset,
            $params
        );
    }

    public static function countPublished(?string $category = null): int
    {
        [$where, $params] = self::publishedWhere($category);
        $row = Database::fetch(
            "SELECT COUNT(*) AS total FROM news n
             LEFT JOIN news_categories c ON c.id = n.category_id $where",
            $params
        );
        return (int) ($row['total'] ?? 0);
    }

    /** @return array{0: string, 1: array} WHERE clause + params shared by list/count */
    private static function publishedWhere(?string $category): array
    {
        $where = "WHERE n.status = 'published'";
        $params = [];
        if ($category !== null && $category !== '') {
            $where .= ' AND c.name = ?';
            $params[] = $category;
        }
        return [$where, $params];
    }

    public static function bySlug(string $slug): ?array
    {
        return Database::fetch(self::SELECT . " WHERE n.slug = ? AND n.status = 'published'", [$slug]);
    }

    /**
     * Single-column raw UPDATE on purpose: updated_at is app-managed and feeds
     * JSON-LD dateModified + sitemap lastmod, so a page view must not touch it.
     */
    public static function incrementViews(int $id): void
    {
        Database::run('UPDATE news SET view_count = view_count + 1 WHERE id = ?', [$id]);
    }

    /**
     * Adjacent published articles in reading order (older = prev, newer = next).
     * Expanded (date, id) comparison — SQLite and MySQL both lack tuple support
     * across all shipped versions.
     */
    public static function prevNext(array $news): array
    {
        $params = [$news['published_date'], $news['published_date'], $news['id']];
        $prev = Database::fetch(
            self::SELECT . " WHERE n.status = 'published'
             AND (n.published_date < ? OR (n.published_date = ? AND n.id < ?))
             ORDER BY n.published_date DESC, n.id DESC LIMIT 1",
            $params
        );
        $next = Database::fetch(
            self::SELECT . " WHERE n.status = 'published'
             AND (n.published_date > ? OR (n.published_date = ? AND n.id > ?))
             ORDER BY n.published_date ASC, n.id ASC LIMIT 1",
            $params
        );
        return ['prev' => $prev, 'next' => $next];
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
