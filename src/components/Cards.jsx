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
 * News / blog card.
 */
export const NewsCard = React.memo(({ title, date, excerpt, category, delay = 0 }) => {
  const categoryColors = {
    Seminar: 'bg-blue-50 text-blue-600',
    Prestasi: 'bg-gold-50 text-gold-600',
    Kegiatan: 'bg-forest-50 text-forest-600',
    Achievement: 'bg-gold-50 text-gold-600',
    Activity: 'bg-forest-50 text-forest-600',
  }

  return (
    <Card delay={delay} className="overflow-hidden group cursor-pointer">
      {/* Placeholder image */}
      <div className="h-44 bg-gradient-to-br from-forest-100 to-forest-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-500/20 to-gold-400/20" />
        <div className="absolute bottom-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[category] || 'bg-gray-100 text-gray-600'}`}>
            {category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-xs text-gray-400 font-sans mb-2">{date}</p>
        <h3 className="font-display font-bold text-gray-800 text-base leading-snug mb-2 group-hover:text-forest-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed font-sans">{excerpt}</p>
      </div>
    </Card>
  )
})

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
