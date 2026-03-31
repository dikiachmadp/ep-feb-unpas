import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FiClock, FiBookOpen, FiAward, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import {
  MdAccountBalance, MdShowChart, MdSchool, MdLocationCity
} from 'react-icons/md'
import SectionHeader from '../components/SectionHeader'
import { Card } from '../components/Cards'

const PROSPECT_ICONS = { building: MdLocationCity, bank: MdAccountBalance, chart: MdShowChart, academic: MdSchool }

export default function Academics() {
  const { t } = useTranslation()
  const concentrations = t('academics.concentrations', { returnObjects: true })
  const semesters = t('academics.semesters', { returnObjects: true })
  const prospects = t('academics.prospects', { returnObjects: true })
  const [openSem, setOpenSem] = useState(null)

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
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gold-400/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle text-gold-400 mb-3">{t('academics.subtitle')}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
              {t('academics.title')}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Program overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <SectionHeader
                subtitle="Program Sarjana"
                title={t('academics.program_title')}
                description={t('academics.program_desc')}
              />

              {/* Info pills */}
              <div className="flex flex-wrap gap-3 mt-2">
                {[
                  { icon: FiClock, label: t('academics.duration') },
                  { icon: FiBookOpen, label: t('academics.credits') },
                  { icon: FiAward, label: t('academics.degree') },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 px-4 py-2 bg-forest-50 rounded-xl border border-forest-100">
                    <Icon className="w-4 h-4 text-forest-500" />
                    <span className="text-forest-700 text-sm font-semibold font-sans">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mt-12 lg:mt-0 grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Mahasiswa Aktif', value: '1.200+', bg: 'bg-forest-500' },
                { label: 'Lulusan/Tahun', value: '200+', bg: 'bg-gold-400' },
                { label: 'Mata Kuliah', value: '60+', bg: 'bg-forest-400' },
                { label: 'Akreditasi', value: 'B', bg: 'bg-forest-700' },
              ].map(({ label, value, bg }) => (
                <div key={label} className={`${bg} rounded-2xl p-6 text-white`}>
                  <p className="font-display text-4xl font-bold">{value}</p>
                  <p className="text-white/70 text-xs mt-1 font-sans">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Concentrations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Peminatan"
            title={t('academics.concentration_title')}
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.isArray(concentrations) && concentrations.map((c, i) => (
              <Card key={i} delay={i * 0.1} className="p-8 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-forest-400 to-forest-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200">
                  <FiBookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-forest-800 text-lg mb-3 group-hover:text-forest-600 transition-colors">
                  {c.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-sans mb-5">{c.desc}</p>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 font-sans">Mata Kuliah Inti</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(c.courses) && c.courses.map((course, j) => (
                      <span key={j} className="text-xs px-2.5 py-1 bg-forest-50 text-forest-600 rounded-lg font-sans font-medium">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum accordion */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Kurikulum"
            title={t('academics.curriculum_title')}
            center
          />
          <div className="space-y-3">
            {Array.isArray(semesters) && semesters.map(({ sem, courses }) => {
              const isOpen = openSem === sem
              return (
                <motion.div
                  key={sem}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (sem - 1) * 0.05 }}
                >
                  <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => setOpenSem(isOpen ? null : sem)}
                      className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm font-sans transition-colors ${isOpen ? 'bg-forest-500 text-white' : 'bg-forest-50 text-forest-600'
                          }`}>
                          {sem}
                        </div>
                        <span className="font-semibold text-gray-800 font-sans text-sm">
                          Semester {sem}
                        </span>
                        <span className="text-xs text-gray-400 font-sans">
                          {Array.isArray(courses) ? courses.length : 0} Mata Kuliah
                        </span>
                      </div>
                      {isOpen ? (
                        <FiChevronUp className="w-5 h-5 text-forest-500" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2 border-t border-gray-50">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {Array.isArray(courses) && courses.map((course, j) => (
                              <div key={j} className="flex items-center gap-2.5 py-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                                <span className="text-gray-600 text-sm font-sans">{course}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Career prospects */}
      <section className="py-20 bg-gradient-to-br from-forest-700 to-forest-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Prospek Karier"
            title={t('academics.prospect_title')}
            center
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.isArray(prospects) && prospects.map(({ icon, title, desc }, i) => {
              const Icon = PROSPECT_ICONS[icon] || FiBookOpen
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-400/20 flex items-center justify-center mb-4 group-hover:bg-gold-400/30 transition-colors">
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <h4 className="font-display font-bold text-white text-base mb-2">{title}</h4>
                  <p className="text-forest-200 text-sm leading-relaxed font-sans">{desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
