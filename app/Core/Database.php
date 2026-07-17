<?php

namespace App\Core;

use PDO;

/**
 * PDO singleton. Production runs MySQL (Hostinger); local dev may run SQLite
 * (no server install needed). Keep all SQL portable between the two:
 * no NOW()/CURDATE() in queries — pass PHP-generated datetimes as parameters.
 */
class Database
{
    private static ?PDO $pdo = null;

    public static function pdo(): PDO
    {
        if (self::$pdo !== null) {
            return self::$pdo;
        }

        $db = APP_CONFIG['db'];
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        if (($db['driver'] ?? 'mysql') === 'sqlite') {
            self::$pdo = new PDO('sqlite:' . $db['sqlite_path'], null, null, $options);
            self::$pdo->exec('PRAGMA foreign_keys = ON');
        } else {
            $dsn = sprintf(
                'mysql:host=%s;dbname=%s;charset=%s',
                $db['host'],
                $db['name'],
                $db['charset'] ?? 'utf8mb4'
            );
            self::$pdo = new PDO($dsn, $db['user'], $db['pass'], $options);
        }

        return self::$pdo;
    }

    /** Prepare + execute, return the statement. */
    public static function run(string $sql, array $params = []): \PDOStatement
    {
        $stmt = self::pdo()->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }

    public static function fetch(string $sql, array $params = []): ?array
    {
        $row = self::run($sql, $params)->fetch();
        return $row === false ? null : $row;
    }

    public static function fetchAll(string $sql, array $params = []): array
    {
        return self::run($sql, $params)->fetchAll();
    }

    /** Insert from an assoc array, return the new row id. */
    public static function insert(string $table, array $data): int
    {
        $cols = array_keys($data);
        $sql = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            $table,
            implode(', ', $cols),
            implode(', ', array_fill(0, count($cols), '?'))
        );
        self::run($sql, array_values($data));
        return (int) self::pdo()->lastInsertId();
    }

    /** Update from an assoc array by id. */
    public static function update(string $table, int $id, array $data): void
    {
        $sets = implode(', ', array_map(fn($c) => "$c = ?", array_keys($data)));
        $params = array_values($data);
        $params[] = $id;
        self::run("UPDATE $table SET $sets WHERE id = ?", $params);
    }

    public static function now(): string
    {
        return date('Y-m-d H:i:s');
    }
}
