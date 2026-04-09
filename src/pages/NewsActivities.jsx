import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import Cards from '../components/Cards'
import SEO from '../components/SEO'
import { getSEO } from '../constants'

const NewsActivities = () => {
    const { t, i18n } = useTranslation()
    const isId = i18n.language === 'id'

    const newsData = t('home.news', { returnObjects: true }) || []

    const seoProps = getSEO('home') // Reuse home SEO or customize

    return (
        <>
            <SEO {...seoProps} title={t('nav.news')} />
            <div className="min-h-screen">
                {/* Hero */}
                <Hero
                    badge={isId ? 'Berita Terkini' : 'Latest News'}
                    title={t('nav.news')}
                    subtitle={isId ? 'Informasi Kegiatan Program Studi' : 'Study Program Activities'}
                    ctaPrimaryText={t('nav.registration')}
                    ctaPrimaryLink="/pendaftaran"
                    ctaSecondaryText={t('nav.home')}
                    ctaSecondaryLink="/"
                />

                {/* News Grid */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeader
                            title={t('home.news_title')}
                            subtitle={t('home.news_subtitle')}
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                            {newsData.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Cards.NewsCard
                                        title={item.title}
                                        date={item.date}
                                        excerpt={item.excerpt}
                                        category={item.category}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {newsData.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-xl text-gray-500">{isId ? 'Berita akan segera hadir' : 'News coming soon'}</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-r from-forest-600 to-forest-800 text-white py-20">
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                            {isId ? 'Ikuti Update Terbaru' : 'Stay Updated'}
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            {isId ? 'Dapatkan informasi kegiatan dan berita terbaru dari Program Studi Ekonomi Pembangunan FEB UNPAS.' : 'Get the latest news and activities from Development Economics Study Program FEB UNPAS.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/pendaftaran"
                                className="btn-primary px-8 py-4 text-lg"
                            >
                                {t('nav.registration')}
                            </Link>
                            <Link
                                to="/"
                                className="btn-secondary px-8 py-4 text-lg border-2 border-white"
                            >
                                {t('nav.home')}
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default NewsActivities

