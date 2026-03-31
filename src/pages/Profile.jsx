import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FiEye, FiTarget, FiCheckCircle, FiAward, FiCalendar } from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'
import { Card } from '../components/Cards'

export default function Profile() {
  const { t } = useTranslation()
  const missions = t('profile.missions', { returnObjects: true })
  const objectives = t('profile.objectives', { returnObjects: true })
  const achievements = t('profile.achievements', { returnObjects: true })

  const [activeTab, setActiveTab] = useState('vision')
  const tabs = [
    { key: 'vision', label: t('profile.vision_title'), icon: FiEye },
    { key: 'mission', label: t('profile.mission_title'), icon: FiTarget },
    { key: 'objective', label: t('profile.objectives_title'), icon: FiCheckCircle },
  ]

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
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle text-gold-400 mb-3">{t('profile.subtitle')}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
              {t('profile.title')}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* History */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <SectionHeader
                subtitle="Sejarah"
                title={t('profile.history_title')}
              />
              <p className="text-gray-600 leading-relaxed font-sans font-light text-base">
                {t('profile.history')}
              </p>

              {/* Quick facts */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: 'Tahun Berdiri', value: '1974' },
                  { label: 'Status', value: 'Aktif' },
                  { label: 'Jenjang', value: 'S1' },
                  { label: 'Akreditasi', value: 'B' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-3 p-4 bg-forest-50 rounded-xl">
                    <div className="w-2 h-8 bg-gradient-to-b from-gold-400 to-forest-500 rounded-full flex-shrink-0" />
                    <div>
                      <p className="text-gray-500 text-xs font-sans">{label}</p>
                      <p className="text-forest-700 font-bold font-display text-lg">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 lg:mt-0"
            >
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-forest-100 to-forest-200">
                  <div className="w-full h-full bg-gradient-to-br from-forest-400/30 to-gold-400/30 flex items-center justify-center">
                    <div className="text-center p-8">
                      <p className="font-display text-7xl font-bold text-forest-600/30">50+</p>
                      <p className="font-display text-xl font-semibold text-forest-700 mt-2">Tahun Berdedikasi</p>
                      <p className="text-gray-500 text-sm mt-1 font-sans">Untuk Ekonomi Indonesia</p>
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-card p-5 border border-gray-100">
                  <p className="font-display text-3xl font-bold text-gold-500">1.200+</p>
                  <p className="text-gray-500 text-xs font-sans mt-0.5">Mahasiswa Aktif</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision / Mission tabs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Visi Misi & Tujuan"
            title="Fondasi Program Studi"
            center
          />

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm font-sans transition-all duration-200 ${activeTab === key
                  ? 'bg-forest-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-forest-300 hover:text-forest-600'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="max-w-3xl mx-auto"
          >
            {activeTab === 'vision' && (
              <Card className="p-10 text-center">
                <div className="w-16 h-16 rounded-2xl bg-forest-50 flex items-center justify-center mx-auto mb-6">
                  <FiEye className="w-8 h-8 text-forest-500" />
                </div>
                <h3 className="font-display font-bold text-2xl text-forest-800 mb-4">{t('profile.vision_title')}</h3>
                <p className="text-gray-600 leading-relaxed font-sans font-light text-lg italic">
                  "{t('profile.vision')}"
                </p>
              </Card>
            )}

            {activeTab === 'mission' && (
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center">
                    <FiTarget className="w-6 h-6 text-gold-500" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-forest-800">{t('profile.mission_title')}</h3>
                </div>
                <ul className="space-y-4">
                  {Array.isArray(missions) && missions.map((m, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="w-7 h-7 rounded-full bg-forest-100 text-forest-600 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-sans">
                        {i + 1}
                      </span>
                      <p className="text-gray-600 text-sm leading-relaxed font-sans">{m}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {activeTab === 'objective' && (
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center">
                    <FiCheckCircle className="w-6 h-6 text-forest-500" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-forest-800">{t('profile.objectives_title')}</h3>
                </div>
                <ul className="space-y-4">
                  {Array.isArray(objectives) && objectives.map((o, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FiCheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600 text-sm leading-relaxed font-sans">{o}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </motion.div>
        </div>
      </section>

      {/* Achievements timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Capaian"
            title={t('profile.achievements_title')}
            center
          />
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-forest-200 via-gold-200 to-forest-100" />

            <div className="space-y-6">
              {Array.isArray(achievements) && achievements.map(({ year, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative flex items-start gap-6 pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-5 top-4 w-7 h-7 rounded-full bg-white border-2 border-gold-400 flex items-center justify-center -translate-x-1/2 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-gold-400" />
                  </div>

                  <div className="card p-6 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <FiCalendar className="w-3.5 h-3.5 text-gold-500" />
                          <span className="text-gold-500 font-bold text-sm font-sans">{year}</span>
                        </div>
                        <h4 className="font-display font-bold text-gray-800 text-base">{title}</h4>
                        <p className="text-gray-500 text-sm mt-1 font-sans">{desc}</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-gold-50 flex items-center justify-center flex-shrink-0">
                        <FiAward className="w-5 h-5 text-gold-500" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
