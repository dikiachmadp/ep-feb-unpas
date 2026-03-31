import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FiArrowRight, FiPlay, FiUsers, FiBook, FiAward, FiStar } from 'react-icons/fi'

const STATS = [
  { key: 'students', value: '1.200+', icon: FiUsers },
  { key: 'lecturers', value: '32', icon: FiBook },
  { key: 'years', value: '50+', icon: FiStar },
  { key: 'accreditation', value: 'Unggul', icon: FiAward },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const { t } = useTranslation()
  const videoRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (v) {
      v.addEventListener('canplay', () => setVideoLoaded(true))
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-forest-900">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-60' : 'opacity-0'
          }`}
        aria-hidden="true"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-forest-900 opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-forest-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Geometric decoration */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/3 w-32 h-32 border border-gold-400/10 rounded-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16">
        <div className="max-w-3xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/20 border border-gold-400/30 text-gold-300 text-xs font-semibold font-sans uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse shadow-md" />
                {t('hero.badge')}
              </span>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants}>
              <h1 className="font-display font-bold leading-none">
                <span className="block text-3xl lg:text-7xl text-white">
                  {t('hero.title')}
                </span>
                <span className="block text-4xl lg:text-5xl text-gold-400 mt-2">
                  {t('hero.subtitle')}
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-forest-100/80 text-lg leading-relaxed max-w-xl font-sans font-medium"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <Link to="/akademik" className="btn-secondary group">
                {t('hero.cta_primary')}
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/kontak"
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 text-sm"
              >
                {t('hero.cta_secondary')}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
          className="mt-12 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {STATS.map(({ key, value, icon: Icon }) => (
            <div
              key={key}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:bg-white/15 transition-all duration-200 group"
            >
              {/* Icon di bagian atas */}
              <div className="w-12 h-12 rounded-xl bg-gold-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-400/30 transition-colors">
                <Icon className="w-6 h-6 text-gold-400" />
              </div>

              {/* Teks di bagian bawah */}
              <div>
                <p className="font-display font-semibold text-2xl text-white leading-tight">
                  {value}
                </p>
                <p className="text-forest-200 text-xs mt-1 font-sans uppercase tracking-wider">
                  {t(`hero.stats.${key}`)}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
