import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import {
  FiEye, FiTarget, FiCheckCircle, FiAward, FiArrowRight,
  FiHexagon, FiZap, FiBox, FiMapPin, FiClock, FiStar
} from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'
import { Card } from '../components/Cards'
import SEO from '../components/SEO'
import { getSEO } from '../constants'

export default function Profile() {
  const { t } = useTranslation()
  const seo = getSEO('profile')

  // --- STATE UTAMA ---
  const [activeSection, setActiveSection] = useState('sejarah')
  const [expandedFacility, setExpandedFacility] = useState(null)

  // Logic Hide on Scroll
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

  const missions = t('profile.missions', { returnObjects: true })
  const objectives = t('profile.objectives', { returnObjects: true })
  const achievements = t('profile.achievements', { returnObjects: true })

  const navMenu = [
    { id: 'sejarah', label: 'Sejarah', icon: FiClock },
    { id: 'logo', label: 'Identitas', icon: FiHexagon },
    { id: 'visimisi', label: 'Visi Misi', icon: FiTarget },
    { id: 'keunggulan', label: 'Unggul', icon: FiStar },
    { id: 'capaian', label: 'Capaian', icon: FiAward },
    { id: 'fasilitas', label: 'Fasilitas', icon: FiMapPin },
  ]

  const facilities = [
    { name: 'Digital Library', icon: FiMapPin, desc: 'Akses jurnal internasional', img: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800' },
    { name: 'Computer Lab', icon: FiBox, desc: 'Perangkat spek tinggi', img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800' },
    { name: 'Seminar Room', icon: FiZap, desc: 'Audio visual modern', img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800' },
    { name: 'Co-working Space', icon: FiTarget, desc: 'Area diskusi kolaboratif', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800' },
    { name: 'Investment Gallery', icon: FiAward, desc: 'Pojok bursa efek', img: 'https://images.unsplash.com/photo-1611974717535-7c805a0a7d53?q=80&w=800' },
    { name: 'Smart Classroom', icon: FiEye, desc: 'Hybrid learning ready', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800' },
  ];

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  const handleNavClick = (id) => {
    setActiveSection(id);
    setExpandedFacility(null);
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO {...seo.profile} />

      <div className="page-wrapper pt-20 bg-white min-h-screen pb-32 lg:pb-0">

        {/* Page Hero */}
        <div className="relative bg-forest-900 py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-gold-400 font-bold tracking-[0.2em] uppercase text-xs lg:sm mb-4">Explore Our Essence</p>
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
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${isActive ? 'bg-forest-700 text-white' : 'text-gray-500 hover:bg-white hover:text-forest-700'}`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-gold-400' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </nav>
            </aside>

            {/* MOBILE SMART BOTTOM NAVIGATION (Floating Dock) */}
            <motion.nav
              variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: "120%", opacity: 0 }
              }}
              animate={hidden ? "hidden" : "visible"}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed bottom-6 left-4 right-4 z-[100]"
            >
              <div className="bg-forest-900/95 backdrop-blur-lg border border-white/10 px-4 py-3 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="grid grid-cols-3 gap-1">
                  {navMenu.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className="flex flex-col items-center justify-center py-1 transition-all duration-300"
                      >
                        <div className={`
                          mb-1 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500
                          ${isActive ? 'bg-gold-400 text-forest-900 shadow-[0_0_20px_rgba(251,191,36,0.3)]' : 'bg-transparent text-white/40'}
                        `}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-gold-400' : 'text-white/30'}`}>
                          {item.label}
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
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="min-h-[500px]"
                >

                  {/* 1. SEJARAH */}
                  {activeSection === 'sejarah' && (
                    <section className="space-y-10">
                      <SectionHeader subtitle="Sejarah" title={t('profile.history_title')} />
                      <div className="grid lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-3 space-y-6">
                          <div className="p-6 lg:p-8 bg-gray-50 rounded-[2rem] border border-gray-100 italic text-gray-700 leading-relaxed relative">
                            <span className="text-5xl lg:text-6xl text-forest-200 absolute -top-4 -left-2 font-serif opacity-50">“</span>
                            <p className="relative z-10 text-base lg:text-lg">{t('profile.history')}</p>
                          </div>
                          <div className="flex gap-4 p-6 bg-forest-700 rounded-2xl text-white shadow-lg">
                            <FiZap className="w-8 h-8 text-gold-400 flex-shrink-0" />
                            <div>
                              <p className="font-bold">Semangat Padjadjaran</p>
                              <p className="text-xs text-forest-200">Terus bertransformasi menjadi fakultas ekonomi terdepan di Jawa Barat.</p>
                            </div>
                          </div>
                        </div>
                        <div className="lg:col-span-2 space-y-4">
                          {[
                            { year: '1985', event: 'Resmi didirikan sebagai bagian dari Universitas Pasundan.' },
                            { year: '2000', event: 'Pengembangan program studi baru berorientasi pasar.' },
                            { year: '2023', event: 'Meraih Akreditasi Unggul dari BAN-PT.' },
                          ].map((milestone, idx) => (
                            <div key={idx} className="flex gap-4 items-start p-4 border-l-2 border-gold-400 bg-white shadow-sm rounded-r-xl">
                              <span className="font-display font-black text-forest-700">{milestone.year}</span>
                              <p className="text-xs lg:text-sm text-gray-500">{milestone.event}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* 2. IDENTITAS VISUAL */}
                  {activeSection === 'logo' && (
                    <section className="space-y-10">
                      <SectionHeader subtitle="Identitas" title="Filosofi Visual Kami" />
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 rounded-[2.5rem] p-10 lg:p-12 flex flex-col items-center justify-center border border-gray-100 shadow-inner">
                          <div className="w-32 h-32 lg:w-40 lg:h-40 bg-forest-700 rounded-full flex items-center justify-center shadow-2xl mb-6 relative">
                            <div className="absolute inset-2 border-2 border-dashed border-white/20 rounded-full animate-spin-slow" />
                            <span className="text-white italic font-serif text-2xl lg:text-3xl font-bold tracking-tighter">LOGO</span>
                          </div>
                          <p className="text-center text-xs lg:text-sm text-gray-500 leading-relaxed italic">
                            "Simbolisme kemajuan ekonomi yang berakar pada nilai lokal dan integritas akademik."
                          </p>
                        </div>
                        <div className="space-y-4 lg:space-y-6">
                          <h4 className="font-display font-bold text-xl text-forest-800">Sistem Warna</h4>
                          <div className="space-y-4">
                            <div className="group p-5 lg:p-6 bg-white rounded-2xl border border-gray-100 flex items-center justify-between transition-colors">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-forest-700 rounded-xl shadow-lg" />
                                <div>
                                  <p className="font-bold text-gray-800 text-sm lg:text-base">Forest Green</p>
                                  <p className="text-[10px] lg:text-xs text-gray-500 uppercase tracking-wider">#064E3B</p>
                                </div>
                              </div>
                            </div>
                            <div className="group p-5 lg:p-6 bg-white rounded-2xl border border-gray-100 flex items-center justify-between transition-colors">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gold-400 rounded-xl shadow-lg" />
                                <div>
                                  <p className="font-bold text-gray-800 text-sm lg:text-base">Gold Padjadjaran</p>
                                  <p className="text-[10px] lg:text-xs text-gray-500 uppercase tracking-wider">#FBBF24</p>
                                </div>
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
                        <p className="text-xl md:text-3xl font-display text-white leading-relaxed italic">
                          "{t('profile.vision')}"
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        <Card className="p-8 lg:p-10 border-none bg-gray-50 rounded-[2rem]">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-forest-100 rounded-full flex items-center justify-center text-forest-700">
                              <FiTarget className="w-5 h-5 lg:w-6 lg:h-6" />
                            </div>
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
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-forest-100 rounded-full flex items-center justify-center text-forest-700">
                              <FiCheckCircle className="w-5 h-5 lg:w-6 lg:h-6" />
                            </div>
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
                      <SectionHeader subtitle="Keunggulan" title="Nilai Tambah Kami" />
                      <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                        {[
                          { icon: FiZap, title: 'Kurikulum Adaptif', desc: 'Sesuai dengan kebutuhan industri keuangan dan bisnis digital global.' },
                          { icon: FiAward, title: 'Tenaga Pengajar Ahli', desc: 'Kombinasi akademisi doktor dan praktisi korporasi berpengalaman.' },
                          { icon: FiHexagon, title: 'Ekosistem Digital', desc: 'Lingkungan belajar dengan akses platform data ekonomi terkini.' },
                          { icon: FiCheckCircle, title: 'Sertifikasi Profesi', desc: 'Lulusan dibekali sertifikasi kompetensi yang diakui internasional.' },
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="p-6 lg:p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-forest-100 transition-all group text-center lg:text-left"
                          >
                            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-forest-50 rounded-2xl flex items-center justify-center text-forest-600 mb-6 mx-auto lg:mx-0 group-hover:bg-forest-600 group-hover:text-white transition-colors">
                              <item.icon className="w-6 h-6 lg:w-7 lg:h-7" />
                            </div>
                            <h4 className="font-display font-bold text-base lg:text-lg text-gray-800 mb-3">{item.title}</h4>
                            <p className="text-xs lg:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* 5. CAPAIAN */}
                  {activeSection === 'capaian' && (
                    <section className="space-y-10">
                      <SectionHeader subtitle="Capaian" title="Jejak Prestasi" />
                      <div className="grid gap-4">
                        {Array.isArray(achievements) && achievements.map((a, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ x: 5 }}
                            className="group relative flex items-center gap-4 lg:gap-6 p-4 lg:p-6 bg-white border border-gray-100 rounded-2xl lg:rounded-3xl hover:shadow-lg transition-all"
                          >
                            <div className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 bg-gold-50 rounded-xl lg:rounded-2xl flex flex-col items-center justify-center border border-gold-100">
                              <span className="text-[8px] lg:text-[10px] font-bold text-gold-600 uppercase leading-none mb-1">Thn</span>
                              <span className="text-sm lg:text-lg font-black text-gold-700 leading-none">{a.year}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-display font-bold text-forest-800 text-sm lg:text-lg">{a.title}</h4>
                              <p className="text-[10px] lg:text-sm text-gray-500 mt-0.5">{a.desc}</p>
                            </div>
                            <FiArrowRight className="hidden md:block w-5 h-5 text-gray-300 group-hover:text-gold-400 transition-all" />
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* 6. FASILITAS */}
                  {activeSection === 'fasilitas' && (
                    <section className="space-y-10">
                      <SectionHeader subtitle="Fasilitas" title="Infrastruktur Kampus" />
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 items-start">
                        {facilities.map((f, i) => {
                          const isExpanded = expandedFacility === i;
                          return (
                            <motion.div
                              key={i}
                              layout
                              onClick={() => setExpandedFacility(isExpanded ? null : i)}
                              className={`
                                cursor-pointer overflow-hidden rounded-[1.5rem] lg:rounded-[2rem] transition-all duration-500
                                ${isExpanded ? 'lg:col-span-2 bg-forest-800 shadow-2xl' : 'bg-forest-900 hover:bg-forest-850'}
                              `}
                            >
                              <motion.div layout className="p-6 lg:p-8 flex flex-col items-center text-center gap-4">
                                <motion.div
                                  layout
                                  className={`
                                    w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-colors
                                    ${isExpanded ? 'bg-gold-400 text-forest-900' : 'bg-white/10 text-gold-400'}
                                  `}
                                >
                                  <f.icon className="w-6 h-6 lg:w-7 lg:h-7" />
                                </motion.div>

                                <motion.div layout>
                                  <p className="text-white font-bold text-base lg:text-lg mb-1">{f.name}</p>
                                  <p className={`text-[10px] uppercase tracking-tighter ${isExpanded ? 'text-gold-200' : 'text-white/50'}`}>
                                    {f.desc}
                                  </p>
                                </motion.div>

                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="w-full mt-4"
                                    >
                                      <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-xl">
                                        <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
                                      </div>
                                      <p className="text-white/70 text-[10px] lg:text-sm mt-4 italic leading-relaxed">
                                        Fasilitas berstandar global untuk mendukung potensi akademik mahasiswa.
                                      </p>
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