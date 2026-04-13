import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowRight } from 'react-icons/fi'
import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from 'react-icons/fa'

const NAV_ROUTES = [
  { key: 'home', path: '/' },
  { key: 'profile', path: '/profil' },
  { key: 'academics', path: '/akademik' },
  { key: 'student', path: '/mahasiswa' },
  { key: 'registration', path: '/pendaftaran' },
  { key: 'news', path: '/berita-kegiatan' },
]

const SOCIALS = [
  { icon: FaInstagram, href: 'https://www.instagram.com/ekonomifebunpas', label: 'Instagram' },
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-forest-900 text-white relative overflow-hidden border-t border-white/10 font-sans">
      {/* Visual Effect: Background Texture */}
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.05),transparent_50%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">

          {/* LEFT: Identity & Branding - Alignment Adjusted */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">

            {/* Logo Grid: Width aligned with text below */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-[280px] lg:max-w-[450px] mb-6">
              {[
                { src: '/logo.webp', href: '/', alt: 'UNPAS', p: true },
                { src: '/feb.webp', href: 'https://feb.unpas.ac.id', alt: 'FEB' },
                { src: '/aacsb.webp', href: 'https://www.aacsb.edu/members?searchTerm=universitas+pasundan', alt: 'AACSB' },
                { src: '/berdampak.webp', href: 'https://kemdiktisaintek.go.id/library/book/diktisaintek-berdampak', alt: 'Berdampak' }
              ].map((item, idx) => (
                <div key={idx} className="group relative">
                  <div className={`
                    aspect-[16/9] lg:aspect-[16/5] bg-white rounded-xl p-3 flex items-center justify-center 
                    shadow-lg transition-all duration-500 group-hover:-translate-y-1
                    ${item.p ? 'ring-2 ring-gold-500/20' : 'border border-white/5'}
                  `}>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                        <img src={item.src} alt={item.alt} className="max-h-full object-contain transition-transform group-hover:scale-105" />
                      </a>
                    ) : (
                      <img src={item.src} alt={item.alt} className="max-h-full object-contain" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Brand Identity Text */}
            <div className="space-y-3 text-center lg:text-left mb-6">
              <div className="space-y-1">
                <h2 className="text-white font-black text-xl lg:text-lg leading-tight tracking-tighter uppercase italic">
                  {t('hero.subtitle')}
                </h2>
                <div className="h-1 w-12 bg-gold-500 mx-auto lg:mx-0 rounded-full" />
              </div>

              <div className="space-y-2">
                <p className="text-forest-100 text-[11px] lg:text-xs font-bold uppercase tracking-[0.15em] leading-tight max-w-[350px]">
                  {t('footer.tagline')}
                </p>
              </div>
            </div>

            {/* Social Icons: Positioned to align bottom with the right card */}
            <div className="flex items-center gap-2.5 mt-auto">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-gold-500 group shadow-md"
                >
                  <Icon className="w-4 h-4 text-white group-hover:text-forest-900" />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Combined Info (Inner Card) */}
          <div className="lg:col-span-7">
            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 lg:p-8 space-y-8 backdrop-blur-sm shadow-inner">
              <div className="grid grid-cols-2 gap-6 lg:gap-10">
                {/* Quick Links */}
                <div>
                  <h3 className="font-black text-white text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                    <span className="w-4 h-px bg-gold-500" />
                    {t('footer.links_title')}
                  </h3>
                  <ul className="space-y-2">
                    {NAV_ROUTES.map(({ key, path }) => (
                      <li key={key}>
                        <Link to={path} className="text-forest-200 hover:text-gold-400 text-[11px] font-semibold transition-all flex items-center gap-2 group/link">
                          <FiArrowRight className="w-3 h-3 opacity-0 -ml-3 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all text-gold-500" />
                          {t(`nav.${key}`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="font-black text-white text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                    <span className="w-4 h-px bg-gold-500" />
                    {t('footer.contact_title')}
                  </h3>
                  <ul className="space-y-3 text-[11px] text-forest-200">
                    <li className="flex gap-3 group/item">
                      <FiMapPin className="shrink-0 text-gold-500 mt-0.5" />
                      <span className="leading-tight font-medium">{t('contact.address')}</span>
                    </li>
                    <li className="flex gap-3 group/item">
                      <FiPhone className="shrink-0 text-gold-500" />
                      <a href={`tel:${t('contact.phone')}`} className="hover:text-white transition-colors">{t('contact.phone')}</a>
                    </li>
                    <li className="flex gap-3 group/item">
                      <FiMail className="shrink-0 text-gold-500" />
                      <a href={`mailto:${t('contact.email')}`} className="hover:text-white transition-colors underline-offset-4 hover:underline">{t('contact.email')}</a>
                    </li>
                    <li className="flex gap-3 opacity-80">
                      <FiClock className="shrink-0 text-gold-400" />
                      <span className="font-medium">{t('contact.hours')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Compact Map */}
              <div className="w-full h-32 lg:h-36 rounded-2xl overflow-hidden border border-white/10 shadow-xl group/map">
                <iframe
                  title="Lokasi UNPAS Tamansari"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9168940868843!2d107.6069945!3d-6.9005436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64797079f41%3A0xc3f982d1c681944!2sJl.%20Tamansari%20No.6-8%2C%20Tamansari%2C%20Kec.%20Bandung%20Wetan%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040116!5e0!3m2!1sid!2sid!4v1710000000000"
                  width="100%"
                  height="100%"
                  className="grayscale opacity-50 group-hover/map:grayscale-0 group-hover/map:opacity-100 transition-all duration-700"
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Pill-Styled Techteam */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-forest-400 text-[11px] font-medium tracking-wide">
            {t('footer.copyright')}
          </p>

          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 shadow-sm">
            <span className="text-forest-500 text-[9px] font-bold tracking-widest uppercase">Copyright</span>
            <div className="w-1 h-1 bg-gold-500 rounded-full" />
            <a
              href="https://dikiachmadp.work"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gold-400 text-[10px] font-black tracking-[0.12em] transition-all uppercase"
            >
              Techteam
            </a>
            <span className="text-forest-500 text-[9px] font-bold opacity-50">{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}