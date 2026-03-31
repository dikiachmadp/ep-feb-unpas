import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import sendContactEmail from '../utils/email'

const initialState = { name: '', email: '', subject: '', message: '' }

export default function ContactForm() {
  const { t } = useTranslation()
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Nama wajib diisi'
    if (!form.email.trim()) e.email = 'Email wajib diisi'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Format email tidak valid'
    if (!form.subject.trim()) e.subject = 'Subjek wajib diisi'
    if (!form.message.trim()) e.message = 'Pesan wajib diisi'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }

    setLoading(true)
    setStatus(null)
    const result = await sendContactEmail(form)
    setLoading(false)
    setStatus(result.success ? 'success' : 'error')
    if (result.success) {
      setForm(initialState)
      setTimeout(() => setStatus(null), 5000)
    }
  }

  const fields = [
    { name: 'name', type: 'text', label: t('contact.form.name'), placeholder: t('contact.form.name_placeholder'), half: true },
    { name: 'email', type: 'email', label: t('contact.form.email'), placeholder: t('contact.form.email_placeholder'), half: true },
    { name: 'subject', type: 'text', label: t('contact.form.subject'), placeholder: t('contact.form.subject_placeholder'), half: false },
  ]

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot (hidden spam filter) */}
      <input
        type="text"
        name="bot-field"
        value={form['bot-field'] || ''}
        onChange={handleChange}
        style={{ display: 'none' }}
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Two-column fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map(({ name, type, label, placeholder, half }) => (
          <div key={name} className={half ? '' : 'sm:col-span-2'}>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 font-sans">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className={`input-field ${errors[name] ? 'border-red-300 focus:ring-red-400' : ''}`}
            />
            {errors[name] && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-sans">
                <FiAlertCircle className="w-3 h-3" />
                {errors[name]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5 font-sans">
          {t('contact.form.message')}
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder={t('contact.form.message_placeholder')}
          rows={5}
          className={`input-field resize-none ${errors.message ? 'border-red-300 focus:ring-red-400' : ''}`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-sans">
            <FiAlertCircle className="w-3 h-3" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Mengirim...
          </>
        ) : (
          <>
            <FiSend className="w-4 h-4" />
            {t('contact.form.submit')}
          </>
        )}
      </button>

      {/* Status toast */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-start gap-3 p-4 rounded-xl text-sm font-sans ${status === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
              }`}
          >
            {status === 'success'
              ? <FiCheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              : <FiAlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            }
            <span>
              {status === 'success' ? t('contact.form.success') : t('contact.form.error')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
