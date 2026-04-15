import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import {
  FiEye, FiTarget, FiCheckCircle, FiAward, FiArrowRight,
  FiHexagon, FiZap, FiBox, FiMapPin, FiClock, FiStar,
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'
import { Card } from '../components/Cards'
import SEO from '../components/SEO'
import { getSEO } from '../constants'

// Objek pemetaan untuk mengubah string di JSON menjadi Komponen Icon
const IconMap = {
  FiClock, FiHexagon, FiTarget, FiStar, FiAward, FiMapPin, FiBox, FiZap, FiEye, FiCheckCircle
};

export default function Profile() {
  const { t } = useTranslation()
  const seo = getSEO('profile')

  // --- STATE UTAMA ---
  const [activeSection, setActiveSection] = useState('sejarah')
  const [expandedFacility, setExpandedFacility] = useState(null)

  // --- STATE SLIDER SEJARAH ---
  const [historyIndex, setHistoryIndex] = useState(0)

  // Logic Hide on Scroll untuk Mobile Nav
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const previous = scrollY.getPrevious()
      if (latest > previous && latest > 150) {
        setHidden(true)
      } else {
        setHidden(false)
      }
    })
  }, [scrollY])

  // --- DATA DARI i18next ---
  const navMenu = t('profile.nav_menu', { returnObjects: true })
  const historyData = t('profile.history', { returnObjects: true })
  const milestones = t('profile.history_milestones', { returnObjects: true })
  const missions = t('profile.missions', { returnObjects: true })
  const objectives = t('profile.objectives', { returnObjects: true })
  const advantages = t('profile.advantages', { returnObjects: true })
  const achievements = t('profile.achievements', { returnObjects: true })
  const facilities = t('profile.facilities', { returnObjects: true })

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  const handleNavClick = (id) => {
    setActiveSection(id);
    setExpandedFacility(null);
    setHistoryIndex(0);
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextHistory = () => {
    if (historyIndex < historyData.length - 1) setHistoryIndex(historyIndex + 1);
  }
  const prevHistory = () => {
    if (historyIndex > 0) setHistoryIndex(historyIndex - 1);
  }

  return (
    <>
      <SEO {...seo.profile} />

      <div className="page-wrapper pt-20 bg-white min-h-screen pb-32 lg:pb-0">

        {/* Page Hero */}
        <div className="relative bg-forest-900 py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-gold-400 font-bold tracking-[0.2em] uppercase text-xs lg:sm mb-4">
                {t('profile.hero_badge')}
              </p>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
                {t('profile.title')}
              </h1>
              <div className="h-1.5 w-24 bg-gold-400 mx-auto mt-6 rounded-full" />
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* DESKTOP SIDE NAVIGATION */}
            <aside className="hidden lg:block lg:w-72 flex-shrink-0">
              <nav className="sticky top-32 flex flex-col gap-1 bg-gray-50 p-4 rounded-[2rem] border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-4">Menu Profil</p>
                {navMenu.map((item) => {
                  const isActive = activeSection === item.id;
                  const Icon = IconMap[item.icon] || FiHexagon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${isActive ? 'bg-forest-700 text-white' : 'text-gray-500 hover:bg-white hover:text-forest-700'}`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-gold-400' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </nav>
            </aside>

            {/* MOBILE SMART BOTTOM NAVIGATION */}
            <motion.nav
              variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: "120%", opacity: 0 } }}
              animate={hidden ? "hidden" : "visible"}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed bottom-6 left-4 right-4 z-[100]"
            >
              <div className="bg-forest-900/95 backdrop-blur-lg border border-white/10 px-2 py-3 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="grid grid-cols-6 gap-0">
                  {navMenu.map((item) => {
                    const isActive = activeSection === item.id;
                    const Icon = IconMap[item.icon] || FiHexagon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className="flex flex-col items-center justify-center py-1"
                      >
                        <div className={`mb-1 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive
                          ? 'bg-gold-400 text-forest-900 shadow-[0_0_20px_rgba(251,191,36,0.3)]'
                          : 'bg-transparent text-white/40'
                          }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[6px] font-black uppercase tracking-widest transition-colors duration-500 ${isActive ? 'text-gold-400' : 'text-white/30'
                          }`}>
                          {item.label.split(' ')[0]}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.nav>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  variants={containerVariants}
                  initial="initial" animate="animate" exit="exit"
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="min-h-[500px]"
                >

                  {/* 1. SEJARAH DENGAN SLIDER */}
                  {activeSection === 'sejarah' && (
                    <section className="space-y-10">
                      <SectionHeader subtitle="Sejarah" title={t('profile.history_title')} />
                      <div className="grid lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-3 w-full overflow-hidden">
                          <div className="relative">
                            <div className="overflow-hidden rounded-[2.5rem]">
                              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${historyIndex * 100}%)` }}>
                                {historyData.map((paragraph, index) => (
                                  <div key={index} className="w-full flex-shrink-0">
                                    <div className="mx-1 p-7 lg:p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 italic text-gray-700 leading-relaxed relative min-h-[400px] flex flex-col justify-center shadow-sm">
                                      <span className="text-6xl lg:text-7xl text-forest-200 absolute -top-4 -left-2 font-serif opacity-30 select-none pointer-events-none">“</span>
                                      <div className="absolute top-6 right-8 flex flex-col items-end">
                                        <span className="font-display text-4xl lg:text-5xl text-forest-100 font-black opacity-20">
                                          {String(index + 1).padStart(2, '0')}
                                        </span>
                                      </div>
                                      <p className="relative z-10 text-sm lg:text-lg leading-loose lg:leading-relaxed">{paragraph}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-6 px-2">
                              <div className="flex gap-3">
                                <button onClick={prevHistory} disabled={historyIndex === 0} className={`p-4 rounded-2xl border transition-all ${historyIndex === 0 ? 'opacity-20 cursor-not-allowed border-gray-100' : 'bg-white hover:bg-forest-50 border-forest-100 text-forest-700 shadow-sm'}`}>
                                  <FiChevronLeft className="w-5 h-5" />
                                </button>
                                <button onClick={nextHistory} disabled={historyIndex === historyData.length - 1} className={`p-4 rounded-2xl border transition-all ${historyIndex === historyData.length - 1 ? 'opacity-20 cursor-not-allowed border-gray-100' : 'bg-white hover:bg-forest-50 border-forest-100 text-forest-700 shadow-sm'}`}>
                                  <FiChevronRight className="w-5 h-5" />
                                </button>
                              </div>
                              <div className="flex gap-1.5">
                                {historyData.map((_, i) => (
                                  <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === historyIndex ? 'w-8 bg-gold-400' : 'w-2 bg-gray-200'}`} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="mt-8 flex gap-4 p-5 bg-forest-700 rounded-[2rem] text-white shadow-lg items-center">
                            <div className="bg-white/10 p-2 rounded-xl"><FiZap className="w-6 h-6 text-gold-400" /></div>
                            <p className="text-xs lg:text-sm font-medium leading-snug">{t('profile.history_footer')}</p>
                          </div>
                        </div>
                        <div className="lg:col-span-2 space-y-4">
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">{t('profile.history_timeline_label')}</h4>
                          <div className="grid gap-3">
                            {milestones.map((milestone, idx) => (
                              <div key={idx} className="flex gap-4 items-center p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
                                <div className="bg-gold-50 px-3 py-1 rounded-lg">
                                  <span className="font-display font-black text-forest-700 text-sm">{milestone.year}</span>
                                </div>
                                <p className="text-xs text-gray-500 font-medium">{milestone.event}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* 2. IDENTITAS VISUAL */}
                  {activeSection === 'logo' && (
                    <section className="space-y-12">
                      <SectionHeader subtitle="Brand Guideline" title={t('profile.identity.title')} />
                      <div className="space-y-16">
                        <div className="grid lg:grid-cols-12 gap-10 items-start">
                          <div className="lg:col-span-5 bg-gray-50 rounded-[3rem] p-12 flex flex-col items-center justify-center border border-gray-100 shadow-inner relative overflow-hidden group min-h-[400px]">
                            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#064E3B 1px, transparent 1px), linear-gradient(90deg, #064E3B 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} whileHover={{ scale: 1.05 }} className="relative z-10 w-48 h-48 lg:w-56 lg:h-56 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center p-8 border border-gray-50">
                              <img src="/logo.png" alt={t('profile.identity.labels.official_mark')} className="w-full h-full object-contain pointer-events-none" />
                            </motion.div>
                            <div className="absolute bottom-4 left-6 right-6 text-center z-10">
                              <p className="text-[10px] font-black text-forest-900/40 uppercase tracking-[0.3em]">{t('profile.identity.labels.official_mark')}</p>
                            </div>
                          </div>
                          <div className="lg:col-span-7 space-y-8">
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white border border-gray-100 shadow-sm text-forest-700 rounded-full text-xs font-bold uppercase tracking-widest">
                              <FiHexagon className="w-4 h-4 text-gold-500" /> {t('profile.identity.labels.construction')}
                            </div>
                            <div className="prose prose-forest max-w-none text-gray-600 leading-relaxed text-sm lg:text-base space-y-6">
                              <p>{t('profile.identity.description')}</p>
                              <p className="italic font-medium text-forest-900 bg-forest-50 p-6 rounded-2xl border-l-4 border-gold-400 shadow-sm">"{t('profile.identity.closing')}"</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-8">
                          <h4 className="font-display font-bold text-xl text-forest-900 px-2 border-l-4 border-gold-400">{t('profile.identity.labels.philosophy')}</h4>
                          <div className="grid md:grid-cols-2 gap-6">
                            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gold-50 flex items-center justify-center border border-gold-100"><FiZap className="w-6 h-6 text-gold-600" /></div>
                                <h5 className="font-display font-bold text-lg text-forest-800">{t('profile.identity.growth_title')}</h5>
                              </div>
                              <p className="text-sm text-gray-500 leading-relaxed">{t('profile.identity.growth_desc')}</p>
                            </motion.div>
                            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-forest-50 flex items-center justify-center border border-forest-100"><FiTarget className="w-6 h-6 text-forest-600" /></div>
                                <h5 className="font-display font-bold text-lg text-forest-800">{t('profile.identity.approach_title')}</h5>
                              </div>
                              <p className="text-sm text-gray-500 leading-relaxed">{t('profile.identity.approach_desc')}</p>
                            </motion.div>
                          </div>
                        </div>
                        <div className="space-y-8 p-10 bg-gray-50 rounded-[3rem] border border-gray-100 shadow-inner">
                          <h4 className="font-display font-bold text-xl text-forest-900 text-center">{t('profile.identity.labels.color_palette')}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">
                              <div className="w-full sm:w-24 h-20 sm:h-24 rounded-xl bg-[#064E3B] shadow-lg flex-shrink-0" />
                              <div className="flex-1 space-y-2 w-full">
                                <p className="font-bold text-gray-800">{t('profile.identity.colors.primary_name')}</p>
                                <p className="text-xs text-gray-500">{t('profile.identity.colors.primary_desc')}</p>
                                <div className="flex gap-2 text-[10px] font-mono pt-1 text-forest-700"><span className="bg-forest-50 px-2 py-1 rounded">HEX: #064E3B</span></div>
                              </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">
                              <div className="w-full sm:w-24 h-20 sm:h-24 rounded-xl bg-[#FBBF24] shadow-lg flex-shrink-0" />
                              <div className="flex-1 space-y-2 w-full">
                                <p className="font-bold text-gray-800">{t('profile.identity.colors.accent_name')}</p>
                                <p className="text-xs text-gray-500">{t('profile.identity.colors.accent_desc')}</p>
                                <div className="flex gap-2 text-[10px] font-mono pt-1 text-gold-700"><span className="bg-gold-50 px-2 py-1 rounded">HEX: #FBBF24</span></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* 3. VISI MISI */}
                  {activeSection === 'visimisi' && (
                    <section className="space-y-8 lg:space-y-12">
                      <SectionHeader subtitle="Visi & Misi" title="Arah & Tujuan Strategis" />
                      <div className="relative p-8 lg:p-12 bg-forest-800 rounded-[2.5rem] lg:rounded-[3rem] text-center overflow-hidden">
                        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                        <h4 className="text-gold-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-6">Visi Kami</h4>
                        <p className="text-xl md:text-3xl font-display text-white leading-relaxed italic">"{t('profile.vision')}"</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        <Card className="p-8 lg:p-10 border-none bg-gray-50 rounded-[2rem]">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-forest-100 rounded-full flex items-center justify-center text-forest-700"><FiTarget className="w-5 h-5 lg:w-6 lg:h-6" /></div>
                            <h4 className="font-display font-bold text-lg lg:text-xl text-forest-800">Misi Akademik</h4>
                          </div>
                          <ul className="space-y-4">
                            {missions.map((m, i) => (
                              <li key={i} className="flex gap-4 text-gray-600 text-xs lg:text-sm leading-relaxed">
                                <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 flex-shrink-0" /> {m}
                              </li>
                            ))}
                          </ul>
                        </Card>
                        <Card className="p-8 lg:p-10 border-none bg-gray-50 rounded-[2rem]">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-forest-100 rounded-full flex items-center justify-center text-forest-700"><FiCheckCircle className="w-5 h-5 lg:w-6 lg:h-6" /></div>
                            <h4 className="font-display font-bold text-lg lg:text-xl text-forest-800">Tujuan Strategis</h4>
                          </div>
                          <ul className="space-y-4">
                            {objectives.map((o, i) => (
                              <li key={i} className="flex gap-4 text-gray-600 text-xs lg:text-sm leading-relaxed">
                                <span className="w-1.5 h-1.5 bg-forest-500 rounded-full mt-2 flex-shrink-0" /> {o}
                              </li>
                            ))}
                          </ul>
                        </Card>
                      </div>
                    </section>
                  )}

                  {/* 4. KEUNGGULAN */}
                  {activeSection === 'keunggulan' && (
                    <section className="space-y-10">
                      <SectionHeader subtitle="Keunggulan" title={t('profile.advantages_title')} />
                      <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                        {advantages.map((item, i) => {
                          const icons = [FiZap, FiAward, FiHexagon, FiCheckCircle];
                          const Icon = icons[i] || FiZap;
                          return (
                            <motion.div key={i} whileHover={{ y: -5 }} className="p-6 lg:p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-forest-100 transition-all group text-center lg:text-left">
                              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-forest-50 rounded-2xl flex items-center justify-center text-forest-600 mb-6 mx-auto lg:mx-0 group-hover:bg-forest-600 group-hover:text-white transition-colors">
                                <Icon className="w-6 h-6 lg:w-7 lg:h-7" />
                              </div>
                              <h4 className="font-display font-bold text-base lg:text-lg text-gray-800 mb-3">{item.title}</h4>
                              <p className="text-xs lg:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                          )
                        })}
                      </div>
                    </section>
                  )}

                  {/* 5. CAPAIAN */}
                  {activeSection === 'capaian' && (
                    <section className="space-y-10">
                      <SectionHeader subtitle={t('profile.achievements_subtitle')} title={t('profile.achievements_title')} />
                      <div className="relative max-w-5xl mx-auto px-4 lg:px-0">
                        <div className="absolute left-4 lg:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-gold-400 via-forest-100 to-transparent transform lg:-translate-x-1/2" />
                        <div className="space-y-6 lg:space-y-0 lg:-mt-16">
                          {achievements.map((a, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} className={`relative flex items-center justify-between w-full lg:mb-0 ${i % 2 === 0 ? "lg:flex-row-reverse" : ""} ${i !== 0 ? "lg:-mt-20" : "lg:pt-20"}`}>
                              <div className="hidden lg:block w-[46%]" />
                              <div className="absolute left-0 lg:left-1/2 w-3.5 h-3.5 bg-white border-[3px] border-gold-400 rounded-full z-10 transform translate-x-2.5 lg:-translate-x-1/2 shadow-sm" />
                              <motion.div whileHover={{ y: -5 }} className="w-full lg:w-[46%] pl-10 lg:pl-0 relative z-20">
                                <div className="group relative p-5 lg:p-6 bg-white border border-gray-100 rounded-2xl lg:rounded-[2rem] shadow-sm hover:shadow-xl hover:border-gold-200 transition-all duration-300">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="flex flex-col items-center px-2.5 py-1 bg-forest-700 rounded-lg shadow-md"><span className="text-[10px] lg:text-xs font-black text-white">{a.year}</span></div>
                                    <h4 className="font-display font-bold text-forest-800 text-xs lg:text-base leading-tight group-hover:text-forest-600 transition-colors">{a.title}</h4>
                                  </div>
                                  <p className="text-[11px] lg:text-sm text-gray-500 leading-relaxed">{a.desc}</p>
                                  <div className="absolute top-4 right-6 w-8 h-8 bg-gold-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><div className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-ping" /></div>
                                </div>
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-24 p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center relative z-30">
                        <p className="text-[10px] lg:text-xs font-bold text-forest-700 uppercase tracking-[0.2em]">{t('profile.achievements_footer')}</p>
                      </div>
                    </section>
                  )}

                  {/* 6. FASILITAS */}
                  {activeSection === 'fasilitas' && (
                    <section className="space-y-10">
                      <SectionHeader subtitle="Fasilitas" title={t('profile.facilities_title')} />
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 items-start">
                        {facilities.map((f, i) => {
                          const isExpanded = expandedFacility === i;
                          const Icon = IconMap[f.icon] || FiMapPin;
                          return (
                            <motion.div key={i} layout onClick={() => setExpandedFacility(isExpanded ? null : i)} className={`cursor-pointer overflow-hidden rounded-[1.5rem] lg:rounded-[2rem] transition-all duration-500 ${isExpanded ? 'lg:col-span-2 bg-forest-800 shadow-2xl' : 'bg-forest-900 hover:bg-forest-850'}`}>
                              <motion.div layout className="p-6 lg:p-8 flex flex-col items-center text-center gap-4">
                                <motion.div layout className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-gold-400 text-forest-900' : 'bg-white/10 text-gold-400'}`}>
                                  <Icon className="w-6 h-6 lg:w-7 lg:h-7" />
                                </motion.div>
                                <motion.div layout>
                                  <p className="text-white font-bold text-base lg:text-lg mb-1">{f.name}</p>
                                  <p className={`text-[10px] uppercase tracking-tighter ${isExpanded ? 'text-gold-200' : 'text-white/50'}`}>{f.desc}</p>
                                </motion.div>
                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="w-full mt-4">
                                      <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-xl">
                                        <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
                                      </div>
                                      <p className="text-white/70 text-[10px] lg:text-sm mt-4 italic leading-relaxed">{t('profile.facilities_footer')}</p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </section>
                  )}

                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  )
}