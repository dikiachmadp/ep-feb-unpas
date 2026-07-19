-- 002 — Gelombang 2: kolom penulis & jumlah dilihat pada berita.
-- Apply ke MySQL (staging lalu live) via phpMyAdmin SEBELUM upload kode G2.
-- Mirror SQLite dev: lihat sqlite_dev.sql (apply manual ke dev.sqlite).

ALTER TABLE news
  ADD COLUMN author_name VARCHAR(150) NULL,
  ADD COLUMN view_count INT NOT NULL DEFAULT 0;
