import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import { NewsCard } from '../components/Cards'
import { NEWS_DATA } from '../constants/newsData'
import SEO from '../components/SEO'
import { getSEO } from '../constants'

const NewsActivities = () => {
    const { t, i18n } = useTranslation()
    const isId = i18n.language === 'id'
    const seo = getSEO('news') // Pastikan 'news' ada di constants atau gunakan fallback

    const categories = ['all', ...new Set(NEWS_DATA.map(item => item.category))]
    const [activeCategory, setActiveCategory] = useState('all')

    const filteredNews = activeCategory === 'all'
        ? NEWS_DATA
        : NEWS_DATA.filter(item => item.category === activeCategory)

    return (
        <>
            <SEO title={t('nav.news')} description={isId ? 'Berita dan kegiatan terbaru Ekonomi Pembangunan FEB UNPAS' : 'Latest news and activities'} />

            <div className="page-wrapper pt-20">
                {/* REPLACEMENT: Menggunakan struktur Hero yang sama dengan Profile & Academics 
                */}
                <div className="relative bg-gradient-to-br from-forest-700 to-forest-900 py-24 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px',
                        }}
                    />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="section-subtitle text-gold-400 mb-3">
                                {isId ? 'Berita Terkini' : 'Latest News'}
                            </p>
                            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                                {t('nav.news')}
                            </h1>
                        </motion.div>
                    </div>
                </div>

                {/* News Grid Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                            <SectionHeader
                                title={isId ? "Warta Kampus" : "Campus News"}
                                subtitle={t('home.news_subtitle')}
                                margin={false}
                            />

                            {/* Category Filter - Styled to match Tabs in Profile */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === category
                                                ? 'bg-forest-500 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {category === 'all' ? (isId ? 'Semua' : 'All') : category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {filteredNews.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredNews.map((item, index) => (
                                    <NewsCard
                                        key={index}
                                        title={item.title}
                                        date={item.date}
                                        excerpt={item.excerpt}
                                        category={item.category}
                                        delay={index * 0.1}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                <p className="text-gray-500 font-sans">
                                    {isId ? 'Belum ada berita untuk kategori ini.' : 'No news found for this category.'}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    )
}

export default NewsActivities;