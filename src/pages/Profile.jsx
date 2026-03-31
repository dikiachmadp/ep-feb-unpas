import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FiEye, FiTarget, FiCheckCircle, FiAward, FiCalendar } from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'
import { Card } from '../components/Cards'
import SEO from '../components/SEO'
import { getSEO } from '../constants'

export default function Profile() {
  const { t } = useTranslation()
  const seo = getSEO('profile')

  const missions = t('profile.missions', { returnObjects: true })
  const objectives = t('profile.objectives', { returnObjects: true })
  const achievements = t('profile.achievements', { returnObjects: true })

  // ✅ FIX: state harus di luar return
  const [activeTab, setActiveTab] = useState('vision')

  // ✅ FIX: config juga di luar return
  const tabs = [
    { key: 'vision', label: t('profile.vision_title'), icon: FiEye },
    { key: 'mission', label: t('profile.mission_title'), icon: FiTarget },
    { key: 'objective', label: t('profile.objectives_title'), icon: FiCheckCircle },
  ]

  return (
    <>
      <SEO {...seo.profile} />

      <div className="page-wrapper pt-20">
        {/* Page Hero */}
        <div className="relative bg-gradient-to-br from-forest-700 to-forest-900 py-24 overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
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
              <p className="section-subtitle text-gold-400 mb-3">
                {t('profile.subtitle')}
              </p>
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

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { label: 'Tahun Berdiri', value: '1985' },
                    { label: 'Status', value: 'Aktif' },
                    { label: 'Jenjang', value: 'S1' },
                    { label: 'Akreditasi', value: 'Unggul' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center gap-3 p-4 bg-forest-50 rounded-xl">
                      <div className="w-2 h-8 bg-gradient-to-b from-gold-400 to-forest-500 rounded-full" />
                      <div>
                        <p className="text-gray-500 text-xs font-sans">{label}</p>
                        <p className="text-forest-700 font-bold font-display text-lg">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mt-12 lg:mt-0"
              >
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-forest-100 to-forest-200 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-6xl font-bold text-forest-600/30">30+</p>
                    <p className="text-lg text-forest-700">Tahun Berdedikasi</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle="Visi Misi & Tujuan"
              title="Fondasi Program Studi"
              center
            />

            <div className="flex justify-center gap-3 mb-10">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-5 py-2.5 rounded-full ${activeTab === key ? 'bg-forest-500 text-white' : 'bg-white'
                    }`}
                >
                  <Icon className="inline mr-2" />
                  {label}
                </button>
              ))}
            </div>

            <div className="max-w-3xl mx-auto">
              {activeTab === 'vision' && (
                <Card className="p-8 text-center">
                  <h3>{t('profile.vision_title')}</h3>
                  <p>"{t('profile.vision')}"</p>
                </Card>
              )}

              {activeTab === 'mission' && (
                <Card className="p-8">
                  {missions.map((m, i) => (
                    <p key={i}>{m}</p>
                  ))}
                </Card>
              )}

              {activeTab === 'objective' && (
                <Card className="p-8">
                  {objectives.map((o, i) => (
                    <p key={i}>{o}</p>
                  ))}
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <SectionHeader
              subtitle="Capaian"
              title={t('profile.achievements_title')}
              center
            />

            <div className="relative max-w-3xl mx-auto">

              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-forest-200 via-gold-200 to-forest-100" />

              <div className="space-y-6">
                {Array.isArray(achievements) && achievements.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative flex items-start gap-6 pl-14"
                  >

                    {/* Timeline dot */}
                    <div className="absolute left-6 top-4 -translate-x-1/2">
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-gold-400 flex items-center justify-center shadow-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-gold-400" />
                      </div>
                    </div>

                    {/* Card */}
                    <div className="card p-6 flex-1 hover:shadow-md transition-shadow duration-200">

                      <div className="flex items-start justify-between gap-4">

                        <div>
                          {/* Year */}
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-gold-500 font-bold text-sm font-sans">
                              {a.year}
                            </span>
                          </div>

                          {/* Title */}
                          <h4 className="font-display font-bold text-gray-800 text-base">
                            {a.title}
                          </h4>

                          {/* Description */}
                          <p className="text-gray-500 text-sm mt-1 font-sans leading-relaxed">
                            {a.desc}
                          </p>
                        </div>

                        {/* Badge */}
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
    </>
  )
}