import React, { useState, useEffect, useCallback } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi'
import { scrollToTop } from '../hooks/useScrollToTop'
import logoFallback from '../assets/logo-fallback.svg'

const NAV_ROUTES = [
  { key: 'home', path: '/' },
  { key: 'profile', path: '/profil' },
  { key: 'academics', path: '/akademik' },
  { key: 'student', path: '/mahasiswa' },
  { key: 'registration', path: '/pendaftaran' },
  { key: 'news', path: '/berita-kegiatan' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const [isCondensed, setIsCondensed] = useState(false)

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const previous = scrollY.getPrevious()

      if (isMobile) {
        if (latest > previous && latest > 50) {
          setIsCondensed(true)
        } else {
          setIsCondensed(false)
        }
      } else {
        // Desktop tetap kembali normal hanya saat di atas
        if (latest > 120) {
          setIsCondensed(true)
        } else {
          setIsCondensed(false)
        }
      }
    })
  }, [scrollY, isMobile])

  useEffect(() => { setIsOpen(false) }, [location.pathname])

  const toggleLanguage = useCallback(() => {
    i18n.changeLanguage(i18n.language === 'id' ? 'en' : 'id')
  }, [i18n])

  const handleLogoClick = useCallback(() => {
    location.pathname === '/' ? scrollToTop() : navigate('/')
  }, [location.pathname, navigate])

  const handleNavClick = () => {
    setIsOpen(false)
    setTimeout(() => { scrollToTop() }, 60)
  }

  const springConfig = { type: 'spring', stiffness: 350, damping: 35 }

  return (
    <motion.header
      initial={{ y: -120 }}
      animate={{
        y: 0,
        // DESKTOP: Selalu melayang sedikit agar tidak menempel kaku di tepi atas
        // MOBILE: Tetap 14px saat kondensasi, 0 saat normal (sesuai permintaanmu)
        marginTop: isMobile
          ? (isCondensed ? 14 : 0)
          : (isCondensed ? 20 : 12),
      }}
      transition={springConfig}
      className="fixed top-0 left-0 right-0 z-[110] w-full"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          layout
          animate={{
            // DESKTOP: Menggunakan Glassmorphism (bg-white/80) dan Radius dinamis
            // MOBILE: Tetap sesuai kode yang kamu sukai
            margin: isCondensed
              ? (isMobile ? "0 1.5rem" : "0 4rem")
              : "0 0rem",

            borderRadius: isCondensed
              ? "3rem"
              : (isMobile ? "0rem" : "1.5rem"),

            height: isCondensed ? (isMobile ? 54 : 64) : 95,

            backgroundColor: isCondensed
              ? "rgba(255, 255, 255, 0.95)"
              : (isMobile ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.85)"),

            boxShadow: isCondensed
              ? "0 15px 40px rgba(0,0,0,0.12)"
              : (isMobile ? "0 1px 0px rgba(0,0,0,0.03)" : "0 4px 20px rgba(0,0,0,0.02)"),
          }}
          transition={springConfig}
          className={`flex items-center justify-between px-8 lg:px-12 transition-colors duration-500 backdrop-blur-md ${isCondensed ? 'border-transparent' : 'border-gray-100/50'
            }`}
        >

          {/* Logo */}
          <motion.button
            layout
            onClick={handleLogoClick}
            className="flex items-center focus:outline-none py-1 mr-6"
          >
            <motion.img
              layout
              src="/logo.webp"
              alt="Logo Ekonomi Pembangunan FEB UNPAS"
              animate={{
                height: isCondensed ? (isMobile ? 36 : 42) : 65,
              }}
              transition={springConfig}
              className="w-auto object-contain pointer-events-none"
              onError={(e) => { e.target.onerror = null; e.target.src = logoFallback }}
            />
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ROUTES.map(({ key, path }) => (
              <NavLink
                key={key}
                to={path}
                end={path === '/'}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${isActive
                    ? 'text-forest-700 bg-forest-50 shadow-inner'
                    : 'text-gray-500 hover:text-forest-600 hover:bg-white/50'
                  }`
                }
              >
                {t(`nav.${key}`)}
              </NavLink>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <motion.button
              layout
              onClick={toggleLanguage}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 font-bold text-[10px] uppercase tracking-wider transition-all duration-500 ${isCondensed ? 'bg-forest-700 text-white border-transparent' : 'bg-white text-forest-600'
                }`}
            >
              <FiGlobe className="w-4 h-4" />
              <span className="hidden sm:inline">{t('nav.language')}</span>
              <span className="sm:hidden">{i18n.language.toUpperCase()}</span>
            </motion.button>

            <motion.button
              layout
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-full bg-gray-50 text-forest-700"
            >
              {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-10 right-10 mt-3 overflow-hidden bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-[2.5rem]"
          >
            <nav className="flex flex-col py-6 px-6 gap-2">
              {NAV_ROUTES.map(({ key, path }, i) => (
                <NavLink
                  key={key}
                  to={path}
                  end={path === '/'}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `block px-6 py-4 rounded-2xl text-base font-bold transition-all ${isActive
                      ? 'text-white bg-forest-700 shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  {t(`nav.${key}`)}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}