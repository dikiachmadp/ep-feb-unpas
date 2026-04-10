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

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const previous = scrollY.getPrevious()
      if (latest > previous && latest > 40) {
        setIsCondensed(true)
      } else {
        setIsCondensed(false)
      }
    })
  }, [scrollY])

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

  // Pegas yang lebih empuk (damping lebih tinggi) agar tidak terlalu goyang
  const springConfig = { type: 'spring', stiffness: 300, damping: 35 };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{
        y: 0,
        marginTop: isCondensed ? 12 : 0,
      }}
      transition={springConfig}
      className="fixed top-0 left-0 right-0 z-[110]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          layout
          animate={{
            margin: isCondensed ? "0 1.5rem" : "0 0rem",
            borderRadius: isCondensed ? "3rem" : "0rem",
            height: isCondensed ? 50 : 85,
            backgroundColor: isCondensed ? "rgba(255, 255, 255, 0.92)" : "rgba(255, 255, 255, 1)",
            boxShadow: isCondensed ? "0 15px 35px rgba(0,0,0,0.1)" : "0 1px 0px rgba(0,0,0,0.05)",
          }}
          transition={springConfig}
          className={`flex items-center justify-between px-6 lg:px-10 border-b transition-colors duration-500 ${isCondensed ? 'border-transparent backdrop-blur-md' : 'border-gray-100'
            }`}
        >

          {/* Logo Polos Tanpa Background & Tanpa Padding */}
          <motion.button
            layout
            onClick={handleLogoClick}
            className="flex items-center focus:outline-none py-2"
          >
            <motion.img
              layout
              src="/logo.png"
              alt="Logo FEB UNPAS"
              // Transisi tinggi gambar langsung untuk kehalusan maksimal
              animate={{
                height: isCondensed ? 32 : 55, // Dari h-14 ke h-8 secara visual
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
                    ? 'text-forest-700 bg-forest-50'
                    : 'text-gray-500 hover:text-forest-600 hover:bg-gray-50'
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
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 font-bold text-[10px] uppercase tracking-wider transition-all duration-500 ${isCondensed ? 'bg-forest-700 text-white border-transparent' : 'bg-white text-forest-600'
                }`}
            >
              <FiGlobe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('nav.language')}</span>
              <span className="sm:hidden">{i18n.language.toUpperCase()}</span>
            </motion.button>

            <motion.button
              layout
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full bg-gray-50 text-forest-700"
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
            className="lg:hidden absolute top-full left-6 right-6 mt-3 overflow-hidden bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-[2.5rem]"
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
                      ? 'text-white bg-forest-700 shadow-lg scale-[1.02]'
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