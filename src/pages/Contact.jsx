import React, { useState } from 'react'
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
import SEO from '../components/SEO'
import { getSEO } from '../constants'
import { CONTACT_DATA } from '../constants/contentData'

const INFO_ICONS = {
  address: FiMapPin,
  phone: FiPhone,
  email: FiMail,
  hours: FiClock,
}

export default function Contact() {
  const seo = getSEO('contact')

  // State untuk Lightbox Preview Brosur
  const [activeImgIndex, setActiveImgIndex] = useState(null)
  const [isZoomed, setIsZoomed] = useState(false)

  // Data Brosur Gambar Dinamis
  const brochureImages = [
    { src: '/brosur1.webp', alt: 'Registration Brochure Page 1' },
    { src: '/brosur2.webp', alt: 'Registration Brochure Page 2' },
    { src: '/brosur3.webp', alt: 'Registration Brochure Page 3' },
    { src: '/brosur4.webp', alt: 'Registration Brochure Page 4' },
    { src: '/brosur5.webp', alt: 'Registration Brochure Page 5' },
    { src: '/brosur6.webp', alt: 'Registration Brochure Page 6' },
  ]

  const infoItems = ['address', 'phone', 'email', 'hours'].map((key) => ({
    key,
    icon: INFO_ICONS[key],
    title: CONTACT_DATA[key].title,
    value: CONTACT_DATA[key].value,
    href:
      key === 'email'
        ? `mailto:${CONTACT_DATA.email.value}`
        : key === 'phone'
          ? `tel:${CONTACT_DATA.phone.value}`
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
                {CONTACT_DATA.subtitle}
              </p>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
                {CONTACT_DATA.title}
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
                  subtitle={CONTACT_DATA.brochure.subtitle}
                  title={CONTACT_DATA.brochure.title}
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
                      alt={img.alt} 
                      className="w-full h-auto rounded-lg object-contain"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-xl" />
                  </div>
                ))}
              </div>

              {/* Tombol Unduh Brosur (Desain "Pedoman") */}
              <div className="max-w-lg mx-auto flex flex-col gap-4">
                <div className="group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-[2rem] hover:border-forest-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 bg-gray-50 text-forest-700 rounded-2xl flex items-center justify-center group-hover:bg-forest-700 group-hover:text-white transition-all">
                      <FiDownload size={20} />
                    </div>
                    <div className="min-w-0 text-left">
                      <h5 className="font-bold text-gray-800 text-[13px] leading-tight truncate pr-2">
                        {CONTACT_DATA.brochure.download.title}
                      </h5>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">
                        {CONTACT_DATA.brochure.download.subtitle}
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

                <div className="group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-[2rem] hover:border-forest-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 bg-gray-50 text-forest-700 rounded-2xl flex items-center justify-center group-hover:bg-forest-700 group-hover:text-white transition-all">
                      <FiDownload size={20} />
                    </div>
                    <div className="min-w-0 text-left">
                      <h5 className="font-bold text-gray-800 text-[13px] leading-tight truncate pr-2">
                        Download Brosur 2
                      </h5>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">
                        File PDF Kedua
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <a 
                      href="/brosur2.pdf" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-forest-50 hover:text-forest-600 transition-colors" 
                      title="Preview Brosur 2"
                    >
                      <FiExternalLink size={16} />
                    </a>
                    <a 
                      href="/brosur2.pdf" 
                      download="Brosur_Pendaftaran_FEB_UNPAS_2.pdf" 
                      className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gold-50 hover:text-gold-600 transition-colors" 
                      title="Download Brosur 2"
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
                  {CONTACT_DATA.cashback.badge}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                  {CONTACT_DATA.cashback.title}
                </h3>
                <p className="text-forest-200 text-sm font-sans mt-1 font-light">
                  {CONTACT_DATA.cashback.description}
                </p>
              </div>

              <div className="flex-shrink-0 w-full md:w-auto">
                <a
                  href="https://situ2.unpas.ac.id/spmbfront/program-studi-detail/detail/60201?_gl=1*ybvxxc*_gcl_au*MTUzNTY1ODAyMy4xNzc3Mjc3NzA4*_ga*MjA4ODI5NzUwNi4xNzE3ODM0NjM0*_ga_HZGXZ34P67*czE3Nzk2NzAzNTckbzE2JGcwJHQxNzc5NjcwMzU3JGo2MCRsMCRoMzQ2MjkyNTA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full md:w-auto items-center justify-center bg-gold-400 hover:bg-gold-500 text-forest-950 font-sans font-bold text-center px-8 py-4 rounded-xl shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {CONTACT_DATA.cashback.button}
                </a>
              </div>
            </motion.div>

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
                alt={brochureImages[activeImgIndex].alt}
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