<?php

namespace App\Core;

interface StorageInterface
{
    /**
     * Persist an uploaded image, return its public relative path (e.g.
     * "/uploads/news/judul-berita-a1b2c3.jpg"). Throws RuntimeException with a
     * user-presentable Indonesian message on any validation failure.
     */
    public function storeImage(array $file, string $subdir, string $slugBase): string;

    public function delete(string $relativePath): void;
}
