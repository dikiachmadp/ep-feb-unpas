/**
 * One-time exporter: imports the old React constants files directly (so the
 * text is never re-typed by hand) and dumps everything seed.php needs into
 * database/seed-data.json. Run from the repo root:
 *
 *   node database/export-data.mjs
 *
 * Icon components (react-icons) can't survive JSON — they are mapped to
 * string keys here; the PHP views map keys back to inline SVGs.
 */
import { writeFileSync } from 'node:fs'
import { NEWS_DATA } from '../src/constants/newsData.js'
import { DOSEN_DATA, GRADUATE_PROFILES, CURRICULUM_DATA, NAV_MENU } from '../src/constants/facultyData.js'
import {
  HOME_DATA, PROFILE_DATA, ACADEMICS_DATA, CONTACT_DATA,
  FOOTER_DATA, NAV_DATA, NEWS_PAGE_DATA,
} from '../src/constants/contentData.js'

// GRADUATE_PROFILES order is fixed in facultyData.js — map component → key by index
const GRADUATE_ICON_KEYS = ['target', 'trending-up', 'search', 'briefcase']

const data = {
  news: NEWS_DATA.map(n => ({
    slug: n.slug,
    title: n.title,
    date: n.date, // Indonesian long date, parsed to ISO in seed.php
    excerpt: n.excerpt,
    category: n.category,
    image: n.image,
    gallery: n.gallery,
    content: n.content,
  })),

  faculty: DOSEN_DATA.map((d, i) => ({
    full_name: d.n,
    position: d.j,
    expertise: d.k,
    nidn: d.nidn,
    email: d.email,
    orcid_id: d.orcid,
    scholar_url: d.link,
    display_order: i + 1,
  })),

  graduate_profiles: GRADUATE_PROFILES.map((g, i) => ({
    title: g.title,
    description: g.desc,
    icon_key: GRADUATE_ICON_KEYS[i] ?? 'target',
    color_key: g.color,
    sort_order: i + 1,
  })),

  curriculum: CURRICULUM_DATA.map(y => ({
    year_number: y.year,
    label: y.label,
    description: y.desc,
    semesters: y.semesters.map(s => ({
      semester_number: s.id,
      courses: s.courses,
    })),
  })),

  academics_nav: NAV_MENU,

  pages: {
    home: HOME_DATA,
    profile: PROFILE_DATA,
    academics: ACADEMICS_DATA,
    contact: CONTACT_DATA,
    footer: FOOTER_DATA,
    nav: NAV_DATA,
    news_page: NEWS_PAGE_DATA,
  },
}

writeFileSync(
  new URL('./seed-data.json', import.meta.url),
  JSON.stringify(data, null, 2) + '\n'
)
console.log(
  'seed-data.json ditulis:',
  `${data.news.length} berita,`,
  `${data.faculty.length} dosen,`,
  `${data.curriculum.length} tahun kurikulum,`,
  `${data.graduate_profiles.length} profil lulusan`
)
