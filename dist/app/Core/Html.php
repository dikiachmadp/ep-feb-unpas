<?php

namespace App\Core;

/**
 * Server-side HTML sanitizer for WYSIWYG news content. Even though only
 * logged-in staff write this content, pasted content from Word/Google Docs
 * (or a compromised session) can carry scripts — everything outside the
 * allowlist is stripped on save, before it ever reaches the database.
 */
class Html
{
    private const ALLOWED_TAGS = [
        'p' => [], 'br' => [], 'strong' => [], 'b' => [], 'em' => [], 'i' => [],
        'u' => [], 'ul' => [], 'ol' => [], 'li' => [],
        'h2' => [], 'h3' => [], 'blockquote' => [],
        'a' => ['href', 'title'],
        'img' => ['src', 'alt'],
    ];

    public static function sanitize(string $html): string
    {
        if (trim($html) === '') {
            return '';
        }

        $doc = new \DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML(
            '<?xml encoding="utf-8"?><div id="__root">' . $html . '</div>',
            LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
        );
        libxml_clear_errors();

        $root = $doc->getElementById('__root');
        if ($root === null) {
            return '';
        }
        self::clean($root);

        $out = '';
        foreach ($root->childNodes as $child) {
            $out .= $doc->saveHTML($child);
        }
        return trim($out);
    }

    private static function clean(\DOMNode $node): void
    {
        // Iterate over a static copy: we mutate the child list while walking it
        foreach (iterator_to_array($node->childNodes) as $child) {
            if ($child instanceof \DOMElement) {
                $tag = strtolower($child->tagName);
                if (!isset(self::ALLOWED_TAGS[$tag])) {
                    // Unwrap unknown tags (keep the text inside), but drop
                    // script/style entirely — their text is code, not content.
                    if (in_array($tag, ['script', 'style', 'iframe', 'object', 'embed'], true)) {
                        $node->removeChild($child);
                    } else {
                        while ($child->firstChild) {
                            $node->insertBefore($child->firstChild, $child);
                        }
                        $node->removeChild($child);
                    }
                    continue;
                }

                $allowedAttrs = self::ALLOWED_TAGS[$tag];
                foreach (iterator_to_array($child->attributes) as $attr) {
                    $name = strtolower($attr->name);
                    if (!in_array($name, $allowedAttrs, true)) {
                        $child->removeAttribute($attr->name);
                        continue;
                    }
                    if (in_array($name, ['href', 'src'], true)) {
                        $value = trim($attr->value);
                        $isSafe = preg_match('#^(https?:)?/#i', $value) === 1
                            && stripos($value, 'javascript:') === false;
                        if (!$isSafe) {
                            $child->removeAttribute($attr->name);
                        }
                    }
                }
                self::clean($child);
            } elseif (!($child instanceof \DOMText)) {
                // Comments, CDATA, processing instructions — all dropped
                $node->removeChild($child);
            }
        }
    }

    /** Join plain paragraphs into sanitized HTML (used by the seed migration). */
    public static function fromParagraphs(array $paragraphs): string
    {
        $html = implode('', array_map(
            fn(string $p) => '<p>' . e($p) . '</p>',
            $paragraphs
        ));
        return $html;
    }
}
