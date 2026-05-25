import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiDownload, 
  FiX, 
  FiChevronLeft, 
  FiChevronRight, 
  FiZoomIn, 
  FiZoomOut,
  FiExternalLink,
  FiArrowRight
} from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'
import ContactForm from '../components/ContactForm'
import SEO from '../components/SEO'
import { getSEO } from '../constants'

const INFO_ICONS = {
  address: FiMapPin,
  phone: FiPhone,
  email: FiMail,
  hours: FiClock,
}

export default function Contact() {
  const { t } = useTranslation()
  const seo = getSEO('contact')

  // State untuk Lightbox Preview Brosur
  const [activeImgIndex, setActiveImgIndex] = useState(null)
  const [isZoomed, setIsZoomed] = useState(false)

  // Data Brosur Gambar Dinamis
  const brochureImages = [
    { src: '/brosur1.webp', altKey: 'contact.brochure.page1_alt' },
    { src: '/brosur2.webp', altKey: 'contact.brochure.page2_alt' },
  ]

  const infoItems = ['address', 'phone', 'email', 'hours'].map((key) => ({
    key,
    icon: INFO_ICONS[key],
    title: t(`contact.${key}_title`),
    value: t(`contact.${key}`),
    href:
      key === 'email'
        ? `mailto:${t('contact.email')}`
        : key === 'phone'
          ? `tel:${t('contact.phone')}`
          : null,
  }))

  // Fungsi Navigasi Lightbox
  const handlePrev = (e) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev === 0 ? brochureImages.length - 1 : prev - 1))
    setIsZoomed(false)
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev === brochureImages.length - 1 ? 0 : prev + 1))
    setIsZoomed(false)
  }

  const handleClose = () => {
    setActiveImgIndex(null)
    setIsZoomed(false)
  }

  return (
    <>
      <SEO {...seo.contact} />

      <div className="page-wrapper pt-20">
        {/* --- PAGE HERO --- */}
        <div className="relative bg-forest-900 py-16 lg:py-20 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
              backgroundSize: '40px 40px' 
            }} 
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-gold-400 font-bold tracking-[0.2em] uppercase text-[10px] mb-4">
                {t('contact.subtitle')}
              </p>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
                {t('contact.title')}
              </h1>
              <div className="h-1.5 w-24 bg-gold-400 mx-auto mt-6 rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* Main Content Area */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* 1. Brosur Section (Sekarang di atas) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-12">
                <SectionHeader
                  subtitle={t('contact.brochure.subtitle')}
                  title={t('contact.brochure.title')}
                />
              </div>
              
              {/* Grid Gambar Brosur yang Bisa Di-klik */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
                {brochureImages.map((img, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className="card p-2 bg-white shadow-sm overflow-hidden border border-gray-100 rounded-xl cursor-zoom-in hover:shadow-md transition-shadow duration-200 group relative"
                  >
                    <img 
                      src={img.src} 
                      alt={t(img.altKey)} 
                      className="w-full h-auto rounded-lg object-contain"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-xl" />
                  </div>
                ))}
              </div>

              {/* Tombol Unduh Brosur (Desain "Pedoman") */}
              <div className="max-w-lg mx-auto">
                <div className="group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-[2rem] hover:border-forest-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 bg-gray-50 text-forest-700 rounded-2xl flex items-center justify-center group-hover:bg-forest-700 group-hover:text-white transition-all">
                      <FiDownload size={20} />
                    </div>
                    <div className="min-w-0 text-left">
                      <h5 className="font-bold text-gray-800 text-[13px] leading-tight truncate pr-2">
                        {t('contact.brochure.download_title')}
                      </h5>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">
                        {t('contact.brochure.download_subtitle')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <a 
                      href="/brosur.pdf" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-forest-50 hover:text-forest-600 transition-colors" 
                      title="Preview Brosur"
                    >
                      <FiExternalLink size={16} />
                    </a>
                    <a 
                      href="/brosur.pdf" 
                      download="Brosur_Pendaftaran_FEB_UNPAS.pdf" 
                      className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gold-50 hover:text-gold-600 transition-colors" 
                      title="Download Brosur"
                    >
                      <FiArrowRight size={16} className="rotate-90" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 2. Cashback CTA Card (Dipindah ke bawah brosur) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-12 bg-forest-900 rounded-2xl p-8 md:p-10 shadow-md text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
            >
              <div className="text-center md:text-left">
                <span className="inline-block bg-white/10 text-gold-300 text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider font-sans">
                  {t('contact.cashback.badge')}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                  {t('contact.cashback.title')}
                </h3>
                <p className="text-forest-200 text-sm font-sans mt-1 font-light">
                  {t('contact.cashback.description')}
                </p>
              </div>

              <div className="flex-shrink-0 w-full md:w-auto">
                <a
                  href="https://situ2.unpas.ac.id/spmbfront/program-studi-detail/detail/60201?_gl=1*ybvxxc*_gcl_au*MTUzNTY1ODAyMy4xNzc3Mjc3NzA4*_ga*MjA4ODI5NzUwNi4xNzE3ODM0NjM0*_ga_HZGXZ34P67*czE3Nzk2NzAzNTckbzE2JGcwJHQxNzc5NjcwMzU3JGo2MCRsMCRoMzQ2MjkyNTA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full md:w-auto items-center justify-center bg-gold-400 hover:bg-gold-500 text-forest-950 font-sans font-bold text-center px-8 py-4 rounded-xl shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {t('contact.cashback.button')}
                </a>
              </div>
            </motion.div>

            {/* 3. Formulir & Maps Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="card p-8"
              >
                <div className="mb-8">
                  <SectionHeader
                    subtitle={t('contact.form.subtitle')}
                    title={t('contact.form.title')}
                  />
                </div>
                <ContactForm />
              </motion.div>

              {/* Map + Info Extra */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex flex-col gap-6"
              >
                <div className="card overflow-hidden flex-1 min-h-[350px]">
                  <iframe
                    title="Lokasi FEB UNPAS"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0155499!2d107.60024!3d-6.91755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7288ae0e2d5%3A0x4b42f81bd9c1e47!2sUniversitas%20Pasundan!5e0!3m2!1sid!2sid!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '350px' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="card p-6">
                  <h3 className="font-display font-bold text-forest-800 text-base mb-4">
                    {t('contact.extra_info.title')}
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600 font-sans">
                    {['item1', 'item2', 'item3'].map((itemKey, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0 mt-1.5" />
                        {t(`contact.extra_info.${itemKey}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* 4. Info Cards (Dipindah ke paling bawah) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-20">
              {infoItems.map(({ key, icon: Icon, title, value, href }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card p-6 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-forest-50 flex items-center justify-center mb-4 group-hover:bg-forest-500 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-forest-500 group-hover:text-white transition-colors duration-200" />
                  </div>

                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 font-sans">
                    {title}
                  </p>

                  {href ? (
                    <a
                      href={href}
                      className="text-gray-700 text-sm font-medium hover:text-forest-600 transition-colors font-sans leading-relaxed"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-gray-700 text-sm font-medium font-sans leading-relaxed">
                      {value}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      </div>

      {/* --- MODAL LIGHTBOX FULLSCREEN --- */}
      <AnimatePresence>
        {activeImgIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 select-none backdrop-blur-sm"
          >
            {/* Panel Tombol Atas */}
            <div className="absolute top-4 right-4 flex items-center gap-3 z-50" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setIsZoomed(!isZoomed)}
                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer"
                title={isZoomed ? "Zoom Out" : "Zoom In"}
              >
                {isZoomed ? <FiZoomOut className="w-5 h-5" /> : <FiZoomIn className="w-5 h-5" />}
              </button>
              <button 
                onClick={handleClose}
                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer"
                title="Close"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Tombol Navigasi */}
            <button onClick={handlePrev} className="absolute left-4 md:left-6 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer">
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={handleNext} className="absolute right-4 md:right-6 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer">
              <FiChevronRight className="w-6 h-6" />
            </button>

            {/* Wadah Frame Gambar */}
            <div className={`w-full h-full flex items-center justify-center ${isZoomed ? 'overflow-auto cursor-zoom-out' : 'overflow-hidden'}`}>
              <motion.img
                key={activeImgIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: isZoomed ? 1.8 : 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                src={brochureImages[activeImgIndex].src}
                alt={t(brochureImages[activeImgIndex].altKey)}
                onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
                className={`max-w-full max-h-full object-contain transition-transform origin-center ${!isZoomed && 'cursor-zoom-in'}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}