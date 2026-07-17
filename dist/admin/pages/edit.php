<?php
require dirname(__DIR__) . '/_bootstrap.php';
require dirname(__DIR__) . '/_layout.php';
require __DIR__ . '/index_labels.php';

use App\Core\Csrf;
use App\Core\Database;
use App\Core\Session;

$page = $_GET['page'] ?? '';
if (!isset(PAGE_EDIT_LABELS[$page])) {
    http_response_code(404);
    exit('Halaman tidak dikenal.');
}
$pageLabel = PAGE_EDIT_LABELS[$page];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    Csrf::require();
    $now = Database::now();

    // Single text fields
    foreach ((array) ($_POST['field'] ?? []) as $section => $fields) {
        foreach ((array) $fields as $key => $value) {
            Database::run(
                'UPDATE page_fields SET value = ?, updated_at = ?
                 WHERE page_key = ? AND section_key = ? AND field_key = ?',
                [trim((string) $value), $now, $page, $section, $key]
            );
        }
    }

    // Repeating items (title/subtitle/description/label_year editable; add/delete)
    foreach ((array) ($_POST['item'] ?? []) as $itemId => $cols) {
        $item = Database::fetch('SELECT id FROM page_items WHERE id = ? AND page_key = ?', [(int) $itemId, $page]);
        if (!$item) {
            continue;
        }
        if (!empty($cols['_delete'])) {
            Database::run('DELETE FROM page_items WHERE id = ?', [(int) $itemId]);
            continue;
        }
        Database::update('page_items', (int) $itemId, [
            'label_year'  => trim((string) ($cols['label_year'] ?? '')) ?: null,
            'title'       => trim((string) ($cols['title'] ?? '')) ?: null,
            'subtitle'    => trim((string) ($cols['subtitle'] ?? '')) ?: null,
            'description' => trim((string) ($cols['description'] ?? '')) ?: null,
        ]);
    }

    // New item per section
    foreach ((array) ($_POST['new_item'] ?? []) as $section => $cols) {
        $hasContent = trim(implode('', array_map('strval', $cols))) !== '';
        if (!$hasContent) {
            continue;
        }
        $max = (int) (Database::fetch(
            'SELECT MAX(sort_order) AS m FROM page_items WHERE page_key = ? AND section_key = ?',
            [$page, $section]
        )['m'] ?? 0);
        Database::insert('page_items', [
            'page_key'    => $page,
            'section_key' => $section,
            'sort_order'  => $max + 1,
            'label_year'  => trim((string) ($cols['label_year'] ?? '')) ?: null,
            'title'       => trim((string) ($cols['title'] ?? '')) ?: null,
            'subtitle'    => trim((string) ($cols['subtitle'] ?? '')) ?: null,
            'description' => trim((string) ($cols['description'] ?? '')) ?: null,
            'is_active'   => 1,
        ]);
    }

    Session::flash('ok', "Konten halaman \"$pageLabel\" disimpan.");
    header('Location: ' . adminUrl('pages/edit.php?page=' . $page));
    exit;
}

$fields = Database::fetchAll(
    'SELECT * FROM page_fields WHERE page_key = ? ORDER BY section_key, field_key',
    [$page]
);
$items = Database::fetchAll(
    'SELECT * FROM page_items WHERE page_key = ? ORDER BY section_key, sort_order',
    [$page]
);

$fieldsBySection = [];
foreach ($fields as $f) {
    $fieldsBySection[$f['section_key']][] = $f;
}
$itemsBySection = [];
foreach ($items as $it) {
    $itemsBySection[$it['section_key']][] = $it;
}
$sections = array_unique(array_merge(array_keys($fieldsBySection), array_keys($itemsBySection)));

/** Which item columns a section actually uses — drive the table shape from data. */
function itemColumns(array $items): array
{
    $cols = [];
    foreach (['label_year' => 'Tahun', 'title' => 'Judul', 'subtitle' => 'Subjudul', 'description' => 'Deskripsi'] as $col => $label) {
        foreach ($items as $it) {
            if ($it[$col] !== null && $it[$col] !== '') {
                $cols[$col] = $label;
                break;
            }
        }
    }
    return $cols ?: ['description' => 'Deskripsi'];
}

adminHeader('Konten: ' . $pageLabel, ['subtitle' => 'Perubahan langsung tampil di website setelah disimpan']);
?>
<form method="post" action="">
  <?= Csrf::field() ?>
  <?php foreach ($sections as $section): ?>
  <div class="card form-grid">
    <strong><?= e(sectionLabel($page, $section)) ?></strong>

    <?php foreach ($fieldsBySection[$section] ?? [] as $f): ?>
    <label class="field"><?= e(fieldLabel($f['field_key'])) ?>
      <?php if ($f['field_type'] === 'textarea' || mb_strlen((string) $f['value']) > 120): ?>
      <textarea name="field[<?= e($section) ?>][<?= e($f['field_key']) ?>]"><?= e((string) $f['value']) ?></textarea>
      <?php else: ?>
      <input type="<?= $f['field_type'] === 'url' ? 'url' : 'text' ?>"
             name="field[<?= e($section) ?>][<?= e($f['field_key']) ?>]" value="<?= e((string) $f['value']) ?>">
      <?php endif; ?>
    </label>
    <?php endforeach; ?>

    <?php if (!empty($itemsBySection[$section])):
        $cols = itemColumns($itemsBySection[$section]); ?>
    <table class="list">
      <tr><?php foreach ($cols as $label): ?><th><?= e($label) ?></th><?php endforeach; ?><th>Hapus</th></tr>
      <?php foreach ($itemsBySection[$section] as $it): ?>
      <tr>
        <?php foreach (array_keys($cols) as $col): ?>
        <td>
          <?php if ($col === 'description'): ?>
          <textarea name="item[<?= (int) $it['id'] ?>][<?= e($col) ?>]" style="min-height:52px"><?= e((string) $it[$col]) ?></textarea>
          <?php else: ?>
          <input type="text" name="item[<?= (int) $it['id'] ?>][<?= e($col) ?>]" value="<?= e((string) $it[$col]) ?>">
          <?php endif; ?>
        </td>
        <?php endforeach; ?>
        <td><input type="checkbox" name="item[<?= (int) $it['id'] ?>][_delete]" value="1"></td>
      </tr>
      <?php endforeach; ?>
      <tr>
        <?php foreach (array_keys($cols) as $col): ?>
        <td><input type="text" name="new_item[<?= e($section) ?>][<?= e($col) ?>]" placeholder="+ baru"></td>
        <?php endforeach; ?>
        <td></td>
      </tr>
    </table>
    <?php endif; ?>
  </div>
  <?php endforeach; ?>

  <button class="btn" type="submit">Simpan Semua Perubahan</button>
</form>
<?php adminFooter(); ?>
