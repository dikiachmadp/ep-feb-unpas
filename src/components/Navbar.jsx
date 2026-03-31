import React, { useState, useEffect, useCallback } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi'
import { scrollToTop } from '../hooks/useScrollToTop'
import logoFallback from '../assets/logo-fallback.svg'

const NAV_ROUTES = [
  { key: 'home', path: '/' },
  { key: 'profile', path: '/profil' },
  { key: 'academics', path: '/akademik' },
  { key: 'faculty', path: '/dosen' },
  { key: 'contact', path: '/kontak' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detect scroll for glass-morphism effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false) }, [location.pathname])

  const toggleLanguage = useCallback(() => {
    i18n.changeLanguage(i18n.language === 'id' ? 'en' : 'id')
  }, [i18n])

  const handleLogoClick = useCallback(() => {
    if (location.pathname === '/') {
      scrollToTop()
    } else {
      navigate('/')
    }
  }, [location.pathname, navigate])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white backdrop-blur-md rounded-xl mx-4 mt-4 shadow-lg'
        : 'bg-white/0 backdrop-blur-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-0">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Kembali ke Beranda"
          >
            <div className="h-12 lg:h-16 rounded-xl overflow-hidden ring-forest-100 group-hover:ring-forest-300 transition-all duration-200 flex bg-white p-1">
              <img
                src="/logo.png"
                alt="Logo FEB UNPAS"
                className="h-full object-contain items-center p-1"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = logoFallback
                }}
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ROUTES.map(({ key, path }) => (
              <NavLink
                key={key}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                    ? 'text-forest-600 bg-forest-50 font-semibold'
                    : 'text-gold-400 hover:text-forest-500 hover:bg-gray-50'
                  }`
                }
              >
                {t(`nav.${key}`)}
              </NavLink>
            ))}
          </nav>

          {/* Right: Lang Toggle + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg borde bg-white border-forest-200 hover:border-forest-400 hover:bg-forest-50 text-forest-600 font-semibold text-xs transition-all duration-200"
              aria-label="Toggle language"
            >
              <FiGlobe className="w-3.5 h-3.5" />
              <span>{t('nav.language')}</span>
            </motion.button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-white text-gray-600 hover:text-forest-500 hover:bg-gray-50 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white/0 border-t border-gray-100 shadow-lg"
          >
            <nav className="flex flex-col py-3 px-4 gap-1">
              {NAV_ROUTES.map(({ key, path }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                        ? 'text-forest-600 bg-forest-50 font-semibold'
                        : 'text-forest-900 bg-forest-50 hover:text-forest-500 hover:bg-gray-50'
                      }`
                    }
                  >
                    {t(`nav.${key}`)}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
