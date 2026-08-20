<?php

namespace App\Core;

use RuntimeException;

/**
 * Local-filesystem storage for shared hosting. The only class that knows
 * uploads live on disk — swap for an S3-compatible implementation later
 * without touching call sites.
 *
 * Every image is validated by real MIME (finfo, not extension) and then
 * re-encoded through GD, which strips EXIF and any embedded payload and
 * normalizes the format — a disguised .php "image" cannot survive this.
 */
class LocalFilesystemStorage implements StorageInterface
{
    private const ALLOWED = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
    ];

    public function storeImage(array $file, string $subdir, string $slugBase): string
    {
        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            throw new RuntimeException('Upload gagal. Silakan coba lagi.');
        }

        $maxBytes = (int) config('uploads.max_bytes', 4194304);
        if (($file['size'] ?? 0) > $maxBytes) {
            throw new RuntimeException(sprintf('Ukuran file maksimal %d MB.', intdiv($maxBytes, 1048576)));
        }

        $mime = (new \finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
        if (!isset(self::ALLOWED[$mime])) {
            throw new RuntimeException('Format file harus JPG, PNG, atau WebP.');
        }

        $image = match ($mime) {
            'image/jpeg' => imagecreatefromjpeg($file['tmp_name']),
            'image/png'  => imagecreatefrompng($file['tmp_name']),
            'image/webp' => imagecreatefromwebp($file['tmp_name']),
        };
        if ($image === false) {
            throw new RuntimeException('File gambar rusak atau tidak dapat dibaca.');
        }

        $image = $this->downscaleIfNeeded($image);

        $ext = self::ALLOWED[$mime];
        $name = $this->safeSlug($slugBase) . '-' . substr(bin2hex(random_bytes(6)), 0, 8) . '.' . $ext;

        $dir = rtrim(config('uploads.dir'), '/') . '/' . trim($subdir, '/');
        if (!is_dir($dir) && !mkdir($dir, 0755, true)) {
            throw new RuntimeException('Folder upload tidak dapat dibuat.');
        }
        $dest = $dir . '/' . $name;

        $ok = match ($ext) {
            'jpg'  => imagejpeg($image, $dest, 85),
            'png'  => imagepng($image, $dest, 8),
            'webp' => imagewebp($image, $dest, 85),
        };
        imagedestroy($image);
        if (!$ok) {
            throw new RuntimeException('Gagal menyimpan gambar.');
        }

        return rtrim(config('uploads.url_prefix', '/uploads'), '/') . '/' . trim($subdir, '/') . '/' . $name;
    }

    public function delete(string $relativePath): void
    {
        $prefix = rtrim(config('uploads.url_prefix', '/uploads'), '/');
        if (!str_starts_with($relativePath, $prefix . '/')) {
            return; // only ever delete inside the uploads dir
        }
        $inside = substr($relativePath, strlen($prefix));
        // basename() each segment: no traversal
        $safe = implode('/', array_map('basename', array_filter(explode('/', $inside))));
        $full = rtrim(config('uploads.dir'), '/') . '/' . $safe;
        if (is_file($full)) {
            unlink($full);
        }
    }

    private function downscaleIfNeeded(\GdImage $image): \GdImage
    {
        $max = (int) config('uploads.max_dimension', 2400);
        $w = imagesx($image);
        $h = imagesy($image);
        if ($w <= $max && $h <= $max) {
            return $image;
        }
        $scale = $max / max($w, $h);
        $resized = imagescale($image, (int) round($w * $scale), (int) round($h * $scale));
        imagedestroy($image);
        if ($resized === false) {
            throw new RuntimeException('Gagal memproses gambar.');
        }
        return $resized;
    }

    private function safeSlug(string $text): string
    {
        $slug = strtolower(trim($text));
        $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
        $slug = trim($slug, '-');
        return substr($slug ?: 'file', 0, 60);
    }
}
