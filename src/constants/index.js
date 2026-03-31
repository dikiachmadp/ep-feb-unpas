/**
 * Design Tokens & Constants
 */

// Colors (Tailwind consistent)
export const COLORS = {
    forest: {
        50: 'forest-50',
        100: 'forest-100',
        400: 'forest-400',
        600: 'forest-600',
        700: 'forest-700',
        800: 'forest-800',
        900: 'forest-900',
    },
    gold: {
        400: 'gold-400',
        500: 'gold-500',
    },
}

// Breakpoints (Tailwind)
export const BREAKPOINTS = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
}

// SEO Defaults
export const SEO_DEFAULTS = {
    title: 'Ekonomi Pembangunan - FEB UNPAS',
    description: 'Program Ekonomi terbaik dengan kurikulum Merdeka Belajar. Akreditasi Unggul, dosen berpengalaman, prospek karier luas.',
    image: '/logo.png',
    keywords: 'ekonomi, unpas, universitas pasundan, fakultas ekonomi, bandung',
}

// SEO helpers for pages
export const getSEO = (page) => ({
    home: {
        title: 'Fakultas Ekonomi dan Bisnis - Universitas Pasundan',
        description: 'Program S1 Ekonomi Pembangunan terakreditasi Unggul dengan kurikulum Merdeka Belajar.',
    },
    profile: {
        title: 'Profil - Visi Misi - FEB UNPAS',
        description: 'Sejarah, visi, misi, dan capaian Fakultas Ekonomi dan Bisnis Universitas Pasundan.',
    },
    academics: {
        title: 'Akademik - Kurikulum - FEB UNPAS',
        description: 'Informasi kurikulum, peminatan, prospek karier program Ekonomi Pembangunan.',
    },
    faculty: {
        title: 'Dosen - Tim Pengajar - FEB UNPAS',
        description: 'Profil dosen Fakultas Ekonomi dan Bisnis Universitas Pasundan.',
    },
    contact: {
        title: 'Kontak - FEB UNPAS',
        description: 'Hubungi Fakultas Ekonomi dan Bisnis Universitas Pasundan untuk informasi lebih lanjut.',
    },
}[page] || SEO_DEFAULTS)

// Form
export const FORM_CONFIG = {
    EMAILJS_SERVICE: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    EMAILJS_PUBLIC: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

// Animation delays
export const ANIMATION_DELAYS = {
    stagger: 0.1,
    item: 0.6,
}
