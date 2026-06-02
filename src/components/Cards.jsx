import React from 'react'
import { motion } from 'framer-motion'

/**
 * Generic animated card wrapper.
 * Accepts: className, delay, children
 */
export const Card = React.memo(({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`card ${className}`}
  >
    {children}
  </motion.div>
))

/**
 * Feature card with icon, title, and description.
 */
export const FeatureCard = React.memo(({ icon: Icon, title, description, delay = 0, accent = false }) => (
  <Card delay={delay} className="p-7 group">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 ${
      accent
        ? 'bg-gold-50 text-gold-500 group-hover:bg-gold-400 group-hover:text-white'
        : 'bg-forest-50 text-forest-500 group-hover:bg-forest-500 group-hover:text-white'
    }`}>
      {Icon && <Icon className="w-6 h-6" />}
    </div>
    <h3 className="font-display font-bold text-lg text-gray-800 mb-2 group-hover:text-forest-700 transition-colors">
      {title}
    </h3>
    <p className="text-gray-500 text-sm leading-relaxed font-sans">{description}</p>
  </Card>
))

/**
 * News card for news & activities grid.
 * Added styling to enforce uniform height and text clamping.
 */
export const NewsCard = React.memo(({ title, date, excerpt, category, image, delay = 0 }) => (
  <Card delay={delay} className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
    
    {/* Container Gambar Berita - Rasio Aspek Seragam (4:3) */}
    <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Jika gambar gagal dimuat, tampilkan placeholder warna forest soft
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 400 300'%3E%3Crect width='100%25' height='100%25' fill='%23f4f7f5'/%3E%3C/svg%3E";
          }}
        />
      ) : (
        // Fallback jika tidak ada properti image sama sekali
        <div className="w-full h-full bg-forest-50 flex items-center justify-center">
          <span className="text-forest-400 text-sm font-sans font-medium">No Image</span>
        </div>
      )}
      
      {/* Label Kategori di Atas Gambar */}
      <div className="absolute top-4 left-4">
        <span className="bg-white/90 backdrop-blur-sm text-forest-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {category}
        </span>
      </div>
    </div>

    {/* Konten Teks Card - flex-1 dan flex-col memastikan tinggi tersisa terisi penuh */}
    <div className="p-6 flex flex-col flex-1 justify-between">
      <div>
        {/* Tanggal Berita */}
        <p className="text-xs text-gray-400 font-sans font-medium mb-2">{date}</p>
        
        {/* Judul Berita - Dibatasi Maksimal 2 Baris */}
        <h3 className="font-display font-bold text-gray-800 text-base md:text-lg leading-snug mb-3 group-hover:text-forest-600 transition-colors line-clamp-2 min-h-[3rem]">
          {title}
        </h3>
        
        {/* Ringkasan Berita (Excerpt) - Dibatasi Maksimal 3 Baris */}
        <p className="text-gray-500 text-sm font-sans font-light leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>
      </div>

      {/* Tombol Ajakan Membaca / Selengkapnya */}
      <div className="pt-2 border-t border-gray-50 flex items-center justify-between text-xs font-semibold text-forest-600 group-hover:text-forest-700 transition-colors font-sans">
        <span>Baca Selengkapnya</span>
        <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
      </div>
    </div>

  </Card>
))

/**
 * Faculty member card.
 */
export const FacultyCard = React.memo(({ name, position, specialization, education, email, research, index = 0 }) => {
  // Generate unique gradient for each card
  const gradients = [
    'from-forest-400 to-forest-600',
    'from-forest-500 to-gold-500',
    'from-gold-400 to-forest-500',
    'from-forest-600 to-forest-400',
    'from-gold-500 to-forest-600',
    'from-forest-400 to-gold-600',
    'from-gold-400 to-gold-600',
    'from-forest-500 to-forest-700',
  ]

  return (
    <Card delay={index * 0.07} className="overflow-hidden group">
      {/* Avatar area */}
      <div className={`h-32 bg-gradient-to-br ${gradients[index % gradients.length]} relative flex items-center justify-center`}>
        <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center">
          <span className="font-display text-white text-2xl font-bold">
            {name.split(' ').slice(-2, -1)[0]?.[0] || name[0]}
          </span>
        </div>
        <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full">
          <span className="text-white text-xs font-sans font-medium">{position.split(' ')[0]}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-display font-bold text-gray-800 text-base leading-tight mb-1 group-hover:text-forest-600 transition-colors">
          {name}
        </h3>
        <p className="text-forest-500 text-xs font-semibold font-sans mb-3">{position}</p>
        <div className="space-y-2">
          <div>
            <span className="text-xs text-gray-400 font-sans font-medium block">Spesialisasi</span>
            <span className="text-xs text-gray-600 font-sans">{specialization}</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 font-sans font-medium block">Pendidikan</span>
            <span className="text-xs text-gray-600 font-sans">{education}</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 font-sans font-medium block">Riset</span>
            <span className="text-xs text-gray-600 font-sans">{research}</span>
          </div>
        </div>
        <a
          href={`mailto:${email}`}
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-forest-500 hover:text-forest-700 font-medium font-sans group/link"
        >
          <span className="truncate">{email}</span>
        </a>
      </div>
    </Card>
  )
})
