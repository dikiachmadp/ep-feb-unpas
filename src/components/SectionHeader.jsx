import React from 'react'
import { motion } from 'framer-motion'

export default function SectionHeader({ subtitle, title, description, center = false, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      {subtitle && (
        <p className={`section-subtitle mb-3 ${light ? 'text-gold-300' : 'text-gold-500'}`}>
          {subtitle}
        </p>
      )}
      <h2 className={`section-title ${light ? 'text-white' : 'text-forest-800'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed max-w-2xl font-sans font-light ${
          center ? 'mx-auto' : ''
        } ${light ? 'text-forest-200' : 'text-gray-500'}`}>
          {description}
        </p>
      )}
      {/* Decorative line */}
      <div className={`mt-5 flex ${center ? 'justify-center' : ''}`}>
        <div className="h-1 w-12 rounded-full bg-gradient-to-r from-gold-400 to-forest-500" />
        <div className="h-1 w-4 rounded-full bg-forest-200 ml-1.5" />
      </div>
    </motion.div>
  )
}
