import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import { FeatureCard, NewsCard } from '../components/Cards'
import { NEWS_DATA } from '../constants/newsData'
import { HOME_DATA, FEATURE_ICONS } from '../constants/contentData'

import SEO from '../components/SEO'
import { getSEO } from '../constants'

export default function Home() {
  const navigate = useNavigate() 
  const seo = getSEO('home')

  const features = Object.entries(HOME_DATA.why.features).map(([key, data], i) => ({
    key,
    icon: FEATURE_ICONS[key],
    title: data.title,
    desc: data.desc,
    delay: i * 0.1,
    accent: i % 2 === 1,
  }))

  const news = NEWS_DATA.slice(0, 3)

  return (
    <>
      <SEO {...seo.home} />
      <div className="page-wrapper">
        <Hero />

        {/* Why section */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Decorative blob */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-forest-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gold-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:gap-20">
              <div className="lg:w-5/12 mb-12 lg:mb-0">
                <SectionHeader
                  subtitle={HOME_DATA.why.subtitle}
                  title={HOME_DATA.why.title}
                  description={HOME_DATA.why.description}
                />

                {/* Visual stat */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {HOME_DATA.hero.stats.map(({ label, value, color }) => (
                    <div key={label} className={`p-4 rounded-2xl bg-${color}-50 border border-${color}-100`}>
                      <p className={`font-display font-bold text-3xl text-${color}-600`}>{value}</p>
                      <p className="text-gray-500 text-xs mt-1 font-sans">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {features.map(({ key, icon, title, desc, delay, accent }) => (
                  <FeatureCard
                    key={key}
                    icon={icon}
                    title={title}
                    description={desc}
                    delay={delay}
                    accent={accent}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Banner / promo strip */}
        <section className="bg-gradient-to-r from-forest-600 to-forest-800 relative overflow-hidden py-12">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent" />
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-forest-900/30 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-gold-400 text-sm font-semibold uppercase tracking-wider font-sans mb-1">{HOME_DATA.promo.label}</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                  {HOME_DATA.promo.title}
                </h2>
                <p className="text-forest-200 text-sm mt-1 font-sans">
                  {HOME_DATA.promo.desc}
                </p>
              </div>
              <Link
                to="/akademik"
                className="btn-secondary whitespace-nowrap group flex-shrink-0"
              >
                {HOME_DATA.promo.button}
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* News section */}
        <section className="py-24 bg-gray-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <SectionHeader
                subtitle={HOME_DATA.news.subtitle}
                title={HOME_DATA.news.title}
              />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link to="/berita-kegiatan" className="hidden sm:inline-flex items-center gap-2 text-forest-600 hover:text-forest-800 font-semibold text-sm font-sans group">
                  {HOME_DATA.news.button}
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item, index) => (
                <div 
                  key={index} 
                  onClick={() => navigate(`/berita-kegiatan/${item.slug}`)} 
                  className="cursor-pointer"
                >
                  <NewsCard
                    title={item.title}
                    date={item.date}
                    excerpt={item.excerpt}
                    category={item.category}
                    image={item.image}
                    delay={index * 0.1}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative bg-gradient-to-br from-forest-500 to-forest-700 rounded-3xl p-12 overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-400/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <p className="text-gold-400 text-sm font-semibold uppercase tracking-wider font-sans mb-3">
                  {HOME_DATA.cta.badge}
                </p>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
                  {HOME_DATA.cta.title}
                </h2>
                <p className="text-forest-100 text-base mb-8 max-w-xl mx-auto font-sans font-light">
                  {HOME_DATA.cta.desc}
                </p>
                <Link
                  to="/pendaftaran"
                  className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-gold hover:shadow-lg hover:-translate-y-0.5 text-sm"
                >
                  {HOME_DATA.cta.button}
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
