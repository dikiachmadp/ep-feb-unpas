<?php
require dirname(__DIR__) . '/_bootstrap.php';
require dirname(__DIR__) . '/_layout.php';

use App\Core\Csrf;
use App\Core\Database;
use App\Core\Session;

/**
 * Curriculum editor. Staff edit one semester at a time as plain lines
 * ("ESP201 - Matematika Ekonomi", one course per line) — matching how the
 * curriculum is written in official documents, and far simpler than
 * row-by-row CRUD for a list that changes at most once a year.
 */

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    Csrf::require();

    if (isset($_POST['save_semester'])) {
        $semId = (int) $_POST['semester_id'];
        $sem = Database::fetch('SELECT * FROM curriculum_semesters WHERE id = ?', [$semId]);
        if ($sem) {
            Database::run('DELETE FROM curriculum_courses WHERE semester_id = ?', [$semId]);
            $lines = preg_split('/\r\n|\r|\n/', trim($_POST['courses'] ?? ''));
            $order = 0;
            foreach ($lines as $line) {
                $line = trim($line);
                if ($line === '') {
                    continue;
                }
                $code = null;
                $name = $line;
                if (preg_match('/^([A-Z]{3}\d{3})\s*-\s*(.+)$/', $line, $m)) {
                    $code = $m[1];
                    $name = $m[2];
                }
                Database::insert('curriculum_courses', [
                    'semester_id' => $semId,
                    'code'        => $code,
                    'name'        => $name,
                    'sort_order'  => ++$order,
                ]);
            }
            Session::flash('ok', "Semester {$sem['semester_number']} disimpan ($order mata kuliah).");
        }
    } elseif (isset($_POST['save_year'])) {
        $yearId = (int) $_POST['year_id'];
        Database::update('curriculum_years', $yearId, [
            'label'       => trim($_POST['label'] ?? ''),
            'description' => trim($_POST['description'] ?? ''),
        ]);
        Session::flash('ok', 'Judul tahun disimpan.');
    }
    header('Location: ' . adminUrl('curriculum/index.php'));
    exit;
}

$years = Database::fetchAll('SELECT * FROM curriculum_years ORDER BY sort_order');

adminHeader('Kurikulum', ['subtitle' => 'Satu mata kuliah per baris, format: KODE - Nama Mata Kuliah (kode boleh dikosongkan)']);

foreach ($years as $year) {
    $semesters = Database::fetchAll('SELECT * FROM curriculum_semesters WHERE year_id = ? ORDER BY sort_order', [$year['id']]);
    ?>
    <div class="curriculum-year">
      <form method="post" action="" style="display:flex;gap:10px;align-items:end;flex-wrap:wrap;margin-bottom:10px">
        <?= Csrf::field() ?>
        <input type="hidden" name="year_id" value="<?= (int) $year['id'] ?>">
        <label class="field" style="flex:1;min-width:180px">Tahun <?= (int) $year['year_number'] ?> — Judul
          <input type="text" name="label" value="<?= e($year['label']) ?>">
        </label>
        <label class="field" style="flex:2;min-width:220px">Deskripsi singkat
          <input type="text" name="description" value="<?= e($year['description'] ?? '') ?>">
        </label>
        <button class="btn small secondary" name="save_year" value="1" type="submit">Simpan judul</button>
      </form>

      <?php foreach ($semesters as $sem):
          $courses = Database::fetchAll('SELECT * FROM curriculum_courses WHERE semester_id = ? ORDER BY sort_order', [$sem['id']]);
          $text = implode("\n", array_map(
              fn($c) => $c['code'] ? "{$c['code']} - {$c['name']}" : $c['name'],
              $courses
          ));
          ?>
      <div class="semester">
        <h4>Semester <?= (int) $sem['semester_number'] ?> <span class="hint" style="display:inline"><?= count($courses) ?> mata kuliah</span></h4>
        <form method="post" action="">
          <?= Csrf::field() ?>
          <input type="hidden" name="semester_id" value="<?= (int) $sem['id'] ?>">
          <textarea name="courses"><?= e($text) ?></textarea>
          <div style="margin-top:8px">
            <button class="btn small" name="save_semester" value="1" type="submit">Simpan Semester <?= (int) $sem['semester_number'] ?></button>
          </div>
        </form>
      </div>
      <?php endforeach; ?>
    </div>
    <?php
}

adminFooter();
