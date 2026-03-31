import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'
import { FacultyCard } from '../components/Cards'

export default function Faculty() {
  const { t } = useTranslation()
  const members = t('faculty.members', { returnObjects: true })
  const [search, setSearch] = useState('')

  const filtered = Array.isArray(members)
    ? members.filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.specialization.toLowerCase().includes(search.toLowerCase()) ||
      m.position.toLowerCase().includes(search.toLowerCase())
    )
    : []

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
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-400/10 rounded-full -translate-y-1/2 -translate-x-1/4 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle text-gold-400 mb-3">{t('faculty.subtitle')}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              {t('faculty.title')}
            </h1>
            <p className="text-forest-200 text-base max-w-xl font-sans font-light">
              {t('faculty.description')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search bar */}
      <div className="sticky top-28 z-30 shadow-md rounded-xl bg-white backdrop-blur-sm mx-4 mt-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari dosen berdasarkan nama atau spesialisasi..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-400 text-sm font-sans bg-gray-50 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Faculty grid */}
      <section className="py-20 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Count indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500 font-sans mb-8"
          >
            Menampilkan <span className="font-semibold text-forest-600">{filtered.length}</span> dosen
            {search && ` untuk "${search}"`}
          </motion.p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((member, i) => (
                <FacultyCard key={member.email} {...member} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 font-sans text-lg">Tidak ada dosen yang ditemukan</p>
              <button
                onClick={() => setSearch('')}
                className="mt-3 text-forest-500 hover:text-forest-700 font-semibold text-sm"
              >
                Reset pencarian
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Join us section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-forest-50 to-gold-50 border border-forest-100 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="flex-1">
              <p className="section-subtitle text-gold-500 mb-2">Bergabung Bersama Kami</p>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-forest-800 mb-3">
                Jadilah Bagian dari Tim Pengajar
              </h2>
              <p className="text-gray-500 text-sm font-sans leading-relaxed">
                Kami selalu terbuka untuk kolaborasi dengan akademisi dan praktisi berpengalaman di bidang ekonomi pembangunan.
              </p>
            </div>
            <a
              href="mailto:ep.feb@unpas.ac.id"
              className="btn-primary whitespace-nowrap flex-shrink-0"
            >
              Hubungi Kami
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
