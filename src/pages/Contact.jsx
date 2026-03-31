import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'
import ContactForm from '../components/ContactForm'

const INFO_ICONS = {
  address: FiMapPin,
  phone: FiPhone,
  email: FiMail,
  hours: FiClock,
}

export default function Contact() {
  const { t } = useTranslation()

  const infoItems = ['address', 'phone', 'email', 'hours'].map(key => ({
    key,
    icon: INFO_ICONS[key],
    title: t(`contact.${key}_title`),
    value: t(`contact.${key}`),
    href: key === 'email'
      ? `mailto:${t('contact.email')}`
      : key === 'phone'
        ? `tel:${t('contact.phone')}`
        : null,
  }))

  return (
    <div className="page-wrapper pt-20">
      {/* Page Hero */}
      <div className="relative bg-gradient-to-br from-forest-700 to-forest-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle text-gold-400 mb-3">{t('contact.subtitle')}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              {t('contact.title')}
            </h1>
            <p className="text-forest-200 text-base max-w-lg font-sans font-light">
              {t('contact.description')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact info cards + form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Info cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
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
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 font-sans">{title}</p>
                {href ? (
                  <a href={href} className="text-gray-700 text-sm font-medium hover:text-forest-600 transition-colors font-sans leading-relaxed">
                    {value}
                  </a>
                ) : (
                  <p className="text-gray-700 text-sm font-medium font-sans leading-relaxed">{value}</p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card p-8"
            >
              <div className="mb-8">
                <SectionHeader
                  subtitle="Formulir"
                  title={t('contact.form.title')}
                />
              </div>
              <ContactForm />
            </motion.div>

            {/* Map card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              {/* Google Maps embed */}
              <div className="card overflow-hidden flex-1 min-h-[350px]">
                <iframe
                  title="Lokasi FEB UNPAS"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0155499!2d107.60024!3d-6.91755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7288ae0e2d5%3A0x4b42f81bd9c1e47!2sUniversitas%20Pasundan!5e0!3m2!1sid!2sid!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '350px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* FAQ / extra info */}
              <div className="card p-6">
                <h3 className="font-display font-bold text-forest-800 text-base mb-4">Informasi Tambahan</h3>
                <ul className="space-y-3 text-sm text-gray-600 font-sans">
                  {[
                    'Kunjungan langsung disambut pada hari kerja',
                    'Konsultasi akademik tersedia dengan perjanjian',
                    'Respons email dalam 1-2 hari kerja',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
