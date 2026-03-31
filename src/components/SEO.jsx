import React from 'react'
import { Helmet } from 'react-helmet-async'

const DEFAULT_TITLE = 'Fakultas Ekonomi dan Bisnis - Universitas Pasundan'
const DEFAULT_DESC = 'Program Ekonomi terbaik dengan kurikulum Merdeka Belajar. Akreditasi Unggul, dosen berpengalaman, prospek karier luas.'
const DEFAULT_IMAGE = '/logo.png'
const DEFAULT_KEYWORDS = 'ekonomi, unpas, universitas pasundan, fakultas ekonomi, bandung'

export default function SEO({
    title = DEFAULT_TITLE,
    description = DEFAULT_DESC,
    image = DEFAULT_IMAGE,
    keywords = DEFAULT_KEYWORDS,
    canonical = window.location.href,
    type = 'website',
    robots = 'index, follow',
    lang = 'id'
}) {
    return (
        <Helmet>
            {/* Basic */}
            <html lang={lang} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={canonical} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content="FEB UNPAS" />
            <meta property="og:locale" content={lang === 'id' ? 'id_ID' : 'en_US'} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Favicons (existing) */}
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        </Helmet>
    )
}
