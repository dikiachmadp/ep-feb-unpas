import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'

const NAV_ROUTES = [
  { key: 'home', path: '/' },
  { key: 'profile', path: '/profil' },
  { key: 'academics', path: '/akademik' },
  { key: 'faculty', path: '/dosen' },
  { key: 'contact', path: '/kontak' },
]

const SOCIALS = [
  { icon: FaInstagram, href: 'https://www.instagram.com/ekonomifebunpas?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', label: 'Instagram' },
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-forest-900 text-white relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest-700 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500 rounded-full translate-y-1/2 -translate-x-1/2 opacity-10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-40 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-full object-contain p-1"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </div>
            </div>
            <p className="text-forest-200 text-sm leading-relaxed mb-4">
              {t('footer.tagline')}
            </p>
            <p className="text-forest-300 text-xs">{t('footer.faculty')}</p>
            <p className="text-forest-300 text-xs">{t('footer.university')}</p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold-400 border border-white/10 hover:border-gold-400 flex items-center justify-center transition-all duration-200 text-white/70 hover:text-white"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-5 font-sans">
              {t('footer.links_title')}
            </h3>
            <ul className="space-y-3">
              {NAV_ROUTES.map(({ key, path }) => (
                <li key={key}>
                  <Link
                    to={path}
                    className="text-forest-200 hover:text-gold-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-5 font-sans">
              {t('footer.contact_title')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-forest-200 text-sm">
                <FiMapPin className="w-4 h-4 mt-0.5 text-gold-400 flex-shrink-0" />
                <span>{t('contact.address')}</span>
              </li>
              <li className="flex items-center gap-3 text-forest-200 text-sm">
                <FiPhone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href={`tel:${t('contact.phone')}`} className="hover:text-gold-400 transition-colors">
                  {t('contact.phone')}
                </a>
              </li>
              <li className="flex items-center gap-3 text-forest-200 text-sm">
                <FiMail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href={`mailto:${t('contact.email')}`} className="hover:text-gold-400 transition-colors">
                  {t('contact.email')}
                </a>
              </li>
              <li className="flex items-center gap-3 text-forest-200 text-sm">
                <FiClock className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>{t('contact.hours')}</span>
              </li>
            </ul>
          </div>

          {/* Map embed placeholder */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-5 font-sans">
              {t('footer.location')}
            </h3>
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-video bg-forest-800 flex items-center justify-center">
              <iframe
                title="Lokasi UNPAS"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.02!2d107.6034!3d-6.9175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFEB+UNPAS!5e0!3m2!1sid!2sid!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '150px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-forest-300 text-sm text-center sm:text-left">
            {t('footer.copyright')}
          </p>

          <p className="text-forest-400 text-xs flex items-center gap-1">
            <span>©</span>
            <a
              href="https://dikiachmadp.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 font-medium transition-colors"
            >
              Techteam
            </a>
            <span> {new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
