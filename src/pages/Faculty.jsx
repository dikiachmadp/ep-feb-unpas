import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import {
  FiAward, FiUsers, FiBriefcase, FiHexagon, FiZap,
  FiLink, FiX, FiCheckCircle, FiChevronRight, FiMapPin
} from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'
import SEO from '../components/SEO'
import { getSEO } from '../constants'

// Objek pemetaan Icon untuk Navigasi
const IconMap = {
  FiAward, FiUsers, FiBriefcase, FiHexagon
};

export default function StudentAlumni() {
  const { t } = useTranslation()
  const seo = getSEO('faculty') // Sesuaikan dengan key SEO kamu

  // --- STATE UTAMA ---
  const [activeSection, setActiveSection] = useState('prestasi')
  const [selectedCard, setSelectedCard] = useState(null)

  // Logic Hide on Scroll untuk Mobile Nav (Sesuai tema Profile)
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

  // --- DATA NAVIGATION ---
  const navMenu = [
    { id: 'prestasi', label: 'Prestasi', icon: 'FiAward' },
    { id: 'himpunan', label: 'Himpunan', icon: 'FiUsers' },
    { id: 'alumni', label: 'Alumni', icon: 'FiBriefcase' }
  ];

  // --- DATA KONTEN (Nanti bisa ditarik dari i18n) ---
  const contentData = {
    prestasi: [
      { id: 1, tag: "Nasional", title: "Juara 1 Debat Ekonomi Nasional", date: "2025", desc: "Berhasil meraih posisi pertama dalam kompetisi bergengsi tingkat nasional di Universitas Indonesia.", detail: "Mahasiswa angkatan 2022 berhasil menyisihkan 50 tim lainnya dengan mosi kebijakan fiskal pasca-pandemi.", icon: <FiAward /> },
      { id: 2, tag: "Riset", title: "Hibah PKM Riset Kemdikbud", date: "2024", desc: "Tiga tim mahasiswa berhasil lolos pendanaan penelitian tingkat nasional.", detail: "Penelitian fokus pada pemberdayaan UMKM digital di Jawa Barat dengan total hibah mencapai puluhan juta rupiah.", icon: <FiAward /> }
    ],
    himpunan: [
      { id: 1, tag: "Internal", title: "HIMASPA", date: "2025/2026", desc: "Organisasi internal mahasiswa yang berfokus pada pengembangan akademik dan sosial.", detail: "Memiliki 5 departemen utama: PSDM, Bakat Minat, Humas, Kajian Strategis, dan Kewirausahaan.", icon: <FiUsers /> },
      { id: 2, tag: "Komunitas", title: "Economic Research Club", date: "Aktif", desc: "Komunitas minat bakat di bidang penulisan ilmiah dan analisis data ekonomi.", detail: "Mengadakan pelatihan rutin penggunaan software E-Views, Stata, dan SPSS bagi mahasiswa tingkat akhir.", icon: <FiUsers /> }
    ],
    alumni: [
      { id: 1, tag: "Karir", title: "Andini Putri, S.E.", date: "Analyst @ BI", desc: "Alumni angkatan 2018 yang kini berkarir di Bank Indonesia pusat.", detail: "Beliau aktif memberikan mentoring karir bagi mahasiswa tingkat akhir melalui program IKA-EP.", icon: <FiBriefcase /> },
      { id: 2, tag: "Startup", title: "Budi Santoso, S.E., M.E.", date: "Tech Founder", desc: "Entrepreneur sukses yang membangun platform fintech untuk inklusi keuangan.", detail: "Lulusan 2015 yang berhasil mendapatkan pendanaan seri-A dan mempekerjakan banyak lulusan dari almamater sendiri.", icon: <FiBriefcase /> }
    ]
  };

  const smoothTransition = { type: "tween", ease: "easeInOut", duration: 0.4 };

  const handleNavClick = (id) => {
    setActiveSection(id);
    setSelectedCard(null);
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO {...seo.faculty} />

      <div className="page-wrapper pt-20 bg-white min-h-screen pb-32 lg:pb-0">

        {/* Page Hero - Tema Forest 900 */}
        <div className="relative bg-forest-900 py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-gold-400 font-bold tracking-[0.2em] uppercase text-xs mb-4">Kemahasiswaan</p>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">Mahasiswa & Alumni</h1>
              <div className="h-1.5 w-24 bg-gold-400 mx-auto mt-6 rounded-full" />
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* DESKTOP SIDE NAVIGATION */}
            <aside className="hidden lg:block lg:w-72 flex-shrink-0">
              <nav className="sticky top-32 flex flex-col gap-1 bg-gray-50 p-4 rounded-[2rem] border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-4">Menu Navigasi</p>
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

            {/* MOBILE BOTTOM NAVIGATION */}
            <motion.nav
              variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: "120%", opacity: 0 } }}
              animate={hidden ? "hidden" : "visible"}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed bottom-6 left-4 right-4 z-[100]"
            >
              <div className="bg-forest-900/95 backdrop-blur-lg border border-white/10 px-2 py-3 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="grid grid-cols-3 gap-0">
                  {navMenu.map((item) => {
                    const isActive = activeSection === item.id;
                    const Icon = IconMap[item.icon] || FiHexagon;
                    return (
                      <button key={item.id} onClick={() => handleNavClick(item.id)} className="flex flex-col items-center justify-center py-1">
                        <div className={`mb-1 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-gold-400 text-forest-900' : 'bg-transparent text-white/40'}`}>
                          <Icon className="w-5 h-5" />
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={smoothTransition}
                  className="min-h-[500px] space-y-10"
                >
                  <SectionHeader
                    subtitle={activeSection.toUpperCase()}
                    title={activeSection === 'prestasi' ? "Capaian Mahasiswa" : activeSection === 'himpunan' ? "Organisasi Mahasiswa" : "Jejaring Alumni"}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {contentData[activeSection].map((item) => {
                      const isOpen = selectedCard === item.id;
                      return (
                        <motion.div
                          key={item.id}
                          onClick={() => setSelectedCard(isOpen ? null : item.id)}
                          animate={{ backgroundColor: isOpen ? "#ffffff" : "#062c1b" }}
                          transition={smoothTransition}
                          className={`relative cursor-pointer overflow-hidden shadow-xl flex flex-col items-center border transition-all duration-500
                            ${isOpen ? 'rounded-[2.5rem] p-8 border-gold-200' : 'rounded-[2.5rem] p-6 border-white/5'}`}
                        >
                          {/* Circle Icon */}
                          <motion.div
                            animate={{
                              width: isOpen ? "70px" : "100%",
                              height: isOpen ? "70px" : "140px",
                              borderRadius: isOpen ? "20px" : "32px",
                            }}
                            transition={smoothTransition}
                            className="bg-forest-800 flex items-center justify-center overflow-hidden flex-shrink-0 mb-6"
                          >
                            <span className={`${isOpen ? 'text-2xl' : 'text-6xl'} text-gold-400/30`}>{item.icon}</span>
                          </motion.div>

                          {/* Text Header */}
                          <div className="text-center w-full px-2">
                            <p className={`uppercase font-black tracking-widest text-[10px] mb-1 ${isOpen ? 'text-gold-600' : 'text-gold-400'}`}>
                              {item.tag} • {item.date}
                            </p>
                            <h4 className={`font-bold leading-tight break-words transition-all duration-500 ${isOpen ? 'text-xl text-forest-950' : 'text-sm text-white'}`}>
                              {item.title}
                            </h4>
                          </div>

                          {/* Accordion Content */}
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={smoothTransition}
                                className="w-full overflow-hidden"
                              >
                                <div className="mt-6 pt-6 border-t border-gray-100 space-y-5">
                                  <p className="text-sm text-gray-500 leading-relaxed italic">"{item.desc}"</p>
                                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Latar Belakang</span>
                                    <p className="text-sm text-forest-900 font-medium leading-relaxed whitespace-normal break-words">
                                      {item.detail}
                                    </p>
                                  </div>
                                  <button className="w-full py-4 bg-forest-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-3">
                                    Lihat Dokumentasi <FiLink size={14} />
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {isOpen && (
                            <div className="absolute top-6 right-6 text-gray-300"><FiX size={20} /></div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* ALUMNI CTA (Hanya muncul di section Alumni) */}
                  {activeSection === 'alumni' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 p-8 bg-forest-50 border border-forest-100 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6">
                      <div className="bg-white p-4 rounded-2xl shadow-sm"><FiBriefcase className="w-8 h-8 text-gold-500" /></div>
                      <div className="flex-1 text-center md:text-left">
                        <h4 className="font-bold text-forest-900">Tracer Study & Karir</h4>
                        <p className="text-sm text-gray-500 mt-1">Bantu kami meningkatkan kualitas lulusan dengan mengisi data karir Anda.</p>
                      </div>
                      <button className="px-8 py-3 bg-gold-500 text-forest-900 font-bold rounded-xl text-sm shadow-lg shadow-gold-500/20 active:scale-95 transition-all">Isi Tracer Study</button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}