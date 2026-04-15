import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import {
  FiBook, FiGlobe, FiAward, FiUsers, FiFileText, FiExternalLink,
  FiHexagon, FiZap, FiChevronRight, FiX, FiMail, FiExternalLink as FiLink,
  FiBox, FiCheckCircle, FiMapPin, FiClock, FiArrowRight // Tambahan icon agar tidak error
} from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'
import SEO from '../components/SEO'
import { getSEO } from '../constants'

// Objek pemetaan Icon untuk Navigasi
const IconMap = {
  kurikulum: FiBook,
  kerjasama: FiGlobe,
  akreditasi: FiAward,
  dosen: FiUsers,
  jurnal: FiFileText,
  portal: FiExternalLink
};

export default function Academics() {
  const { t } = useTranslation()
  const seo = getSEO('academics')

  // --- STATE UTAMA ---
  const [activeSection, setActiveSection] = useState('kurikulum')
  const [selectedDosen, setSelectedDosen] = useState(null)

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

  const navMenu = [
    { id: 'kurikulum', label: 'Kurikulum', icon: 'kurikulum' },
    { id: 'kerjasama', label: 'Kerjasama', icon: 'kerjasama' },
    { id: 'akreditasi', label: 'Akreditasi', icon: 'akreditasi' },
    { id: 'dosen', label: 'Dosen', icon: 'dosen' },
    { id: 'jurnal', label: 'Jurnal', icon: 'jurnal' },
    { id: 'portal', label: 'Portal Akademik', icon: 'portal' },
  ]

  const smoothTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.4
  };

  const handleNavClick = (id) => {
    setActiveSection(id);
    setSelectedDosen(null); // Reset detail dosen saat pindah section
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  return (
    <>
      <SEO {...seo.academics} />

      <div className="page-wrapper pt-20 bg-white min-h-screen pb-32 lg:pb-0">

        {/* --- PAGE HERO --- */}
        <div className="relative bg-forest-900 py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-gold-400 font-bold tracking-[0.2em] uppercase text-[10px] mb-4">Akademik</p>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
                Ekonomi Pembangunan
              </h1>
              <div className="h-1.5 w-24 bg-gold-400 mx-auto mt-6 rounded-full" />
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* --- 1. DESKTOP SIDE NAVIGATION --- */}
            <aside className="hidden lg:block lg:w-72 flex-shrink-0">
              <nav className="sticky top-32 flex flex-col gap-1 bg-gray-50 p-4 rounded-[2rem] border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-4">Menu Akademik</p>
                {navMenu.map((item) => {
                  const isActive = activeSection === item.id;
                  const Icon = IconMap[item.icon] || FiHexagon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${isActive ? 'bg-forest-700 text-white shadow-lg' : 'text-gray-500 hover:bg-white hover:text-forest-700'}`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-gold-400' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </nav>
            </aside>

            {/* --- 2. MOBILE SMART BOTTOM NAVIGATION --- */}
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
                      <button key={item.id} onClick={() => handleNavClick(item.id)} className="flex flex-col items-center justify-center py-1">
                        <div className={`mb-1 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-gold-400 text-forest-900 shadow-[0_0_20px_rgba(251,191,36,0.3)]' : 'bg-transparent text-white/40'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[6px] font-black uppercase tracking-widest transition-colors duration-500 ${isActive ? 'text-gold-400' : 'text-white/30'}`}>
                          {item.id === 'portal' ? 'Portal' : item.label.split(' ')[0]}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.nav>

            {/* --- 3. MAIN CONTENT AREA --- */}
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div key={activeSection} variants={containerVariants} initial="initial" animate="animate" exit="exit" className="min-h-[500px]">

                  {/* SECTION 1: KURIKULUM */}
                  {activeSection === 'kurikulum' && (
                    <section className="space-y-12">
                      <SectionHeader subtitle="Kurikulum" title="Struktur Kurikulum" />

                      {/* Roadmap Container */}
                      <div className="relative space-y-16 before:absolute before:left-8 md:before:left-1/2 before:top-0 before:h-full before:w-px before:bg-dashed before:border-l-2 before:border-dashed before:border-gray-200 before:-translate-x-1/2 hidden md:block" />

                      <div className="space-y-20 relative">
                        {[
                          {
                            year: 1,
                            label: "Tahun Pertama",
                            desc: "Fundamental Ekonomi & Alat Analisis",
                            semesters: [
                              { id: 1, courses: ["Pengantar Ekonomi Mikro", "Matematika Ekonomi I", "Pengantar Akuntansi", "Pendidikan Agama", "Bahasa Inggris"] },
                              { id: 2, courses: ["Pengantar Ekonomi Makro", "Matematika Ekonomi II", "Statistika Ekonomi I", "Hukum Ekonomi", "Bahasa Indonesia"] }
                            ]
                          },
                          {
                            year: 2,
                            label: "Tahun Kedua",
                            desc: "Teori Ekonomi Lanjutan",
                            semesters: [
                              { id: 3, courses: ["Ekonomi Mikro Intermediet", "Statistika Ekonomi II", "Ekonomi Pembangunan I", "Ekonomi Moneter I", "Sosiologi Ekonomi"] },
                              { id: 4, courses: ["Ekonomi Makro Intermediet", "Ekonometrika I", "Ekonomi Pembangunan II", "Ekonomi Publik I", "Ekonomi Internasional I"] }
                            ]
                          },
                          {
                            year: 3,
                            label: "Tahun Ketiga",
                            desc: "Spesialisasi & Aplikasi Kebijakan",
                            semesters: [
                              { id: 5, courses: ["Ekonometrika II", "Ekonomi Publik II", "Ekonomi Moneter II", "Metodologi Penelitian", "Ekonomi Regional"] },
                              { id: 6, courses: ["Evaluasi Proyek", "Ekonomi Perencanaan", "Sejarah Pemikiran Ekonomi", "Ekonomi Industri", "Bank & Lembaga Keuangan"] }
                            ]
                          },
                          {
                            year: 4,
                            label: "Tahun Keempat",
                            desc: "Sintesis & Tugas Akhir",
                            semesters: [
                              { id: 7, courses: ["Seminar Usulan Penelitian", "Etika Bisnis", "Kuliah Kerja Nyata (KKN)", "Mata Kuliah Pilihan I", "Mata Kuliah Pilihan II"] },
                              { id: 8, courses: ["Skripsi / Tugas Akhir", "Mata Kuliah Pilihan III"] }
                            ]
                          }
                        ].map((yearData, idx) => (
                          <div key={yearData.year} className="relative">
                            {/* Year Marker */}
                            <div className="flex items-center gap-4 mb-10">
                              <div className="w-16 h-16 bg-forest-900 text-gold-400 rounded-2xl flex flex-col items-center justify-center border-2 border-gold-500/20 shadow-xl z-10">
                                <span className="text-[10px] font-black uppercase leading-none">Year</span>
                                <span className="text-2xl font-black">0{yearData.year}</span>
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-forest-900">{yearData.label}</h3>
                                <p className="text-sm text-gray-500">{yearData.desc}</p>
                              </div>
                            </div>

                            {/* Semesters Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-4 md:ml-10">
                              {yearData.semesters.map((sem) => {
                                const isOpen = selectedDosen === `sem-${sem.id}`; // Kita pinjam state toggle, atau buat state baru jika perlu
                                return (
                                  <div
                                    key={sem.id}
                                    className={`group bg-gray-50 rounded-[2.5rem] border transition-all duration-300 ${isOpen ? 'border-forest-200 bg-white shadow-xl' : 'border-gray-100 hover:border-forest-100'}`}
                                  >
                                    <button
                                      onClick={() => setSelectedDosen(isOpen ? null : `sem-${sem.id}`)}
                                      className="w-full p-6 flex items-center justify-between text-left"
                                    >
                                      <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-colors ${isOpen ? 'bg-forest-700 text-white' : 'bg-white text-forest-700'}`}>
                                          {sem.id}
                                        </div>
                                        <span className="font-bold text-gray-800">Semester {sem.id}</span>
                                      </div>
                                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                                        <FiChevronRight className={isOpen ? 'text-forest-700' : 'text-gray-300'} />
                                      </motion.div>
                                    </button>

                                    <AnimatePresence>
                                      {isOpen && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="overflow-hidden"
                                        >
                                          <div className="px-6 pb-8 pt-2 space-y-3">
                                            <p className="text-[10px] font-black text-forest-600 uppercase tracking-widest mb-4">Daftar Mata Kuliah:</p>
                                            {sem.courses.map((course, cIdx) => (
                                              <div key={cIdx} className="flex items-start gap-3 text-sm text-gray-600 group/item">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 group-hover/item:scale-150 transition-transform" />
                                                <span className="group-hover/item:text-forest-900 transition-colors">{course}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Connector Line (Desktop Only) */}
                            {idx !== 3 && (
                              <div className="absolute left-8 top-16 bottom-[-40px] w-px border-l-2 border-dashed border-gray-200 -z-0 hidden md:block" />
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* SECTION 2: KERJASAMA */}
                  {activeSection === 'kerjasama' && (
                    <section className="space-y-12">
                      <SectionHeader subtitle="Partnership" title="Jejaring Kerjasama" />
                      <div className="space-y-10">
                        <div>
                          <h4 className="text-[10px] font-black text-gold-600 uppercase tracking-[0.2em] mb-6 px-2">Internasional</h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            {['Kyung Hee University', 'Korea Foundation', 'University Utara Malaysia'].map((uni) => (
                              <div key={uni} className="p-6 bg-white border border-gray-100 rounded-3xl text-center shadow-sm hover:border-gold-200 transition-colors">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><FiGlobe className="w-6 h-6" /></div>
                                <p className="font-bold text-sm text-gray-800 leading-tight">{uni}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black text-forest-700 uppercase tracking-[0.2em] mb-6 px-2">Nasional</h4>
                          <div className="p-12 border-2 border-dashed border-gray-100 rounded-[3rem] text-center">
                            <p className="text-gray-400 text-sm italic">Data kerjasama instansi nasional sedang dalam tahap pembaharuan</p>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* SECTION 3: AKREDITASI */}
                  {activeSection === 'akreditasi' && (
                    <section className="space-y-8 text-center py-10">
                      <SectionHeader subtitle="Quality Assurance" title="Akreditasi Program Studi" center />
                      <div className="max-w-md mx-auto p-12 bg-forest-50 rounded-[3rem] border border-forest-100 shadow-inner">
                        <FiAward className="w-20 h-20 text-gold-500 mx-auto mb-6" />
                        <h3 className="text-4xl font-black text-forest-900 mb-2 font-display">UNGGUL</h3>
                        <p className="text-[10px] text-forest-700/60 uppercase tracking-[0.3em] font-bold">Sertifikasi BAN-PT</p>
                        <div className="mt-8 pt-8 border-t border-forest-200/50">
                          <p className="text-xs text-gray-500 leading-relaxed">Berlaku hingga tahun 2029 sesuai SK resmi Badan Akreditasi Nasional Perguruan Tinggi.</p>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* SECTION 4: DOSEN */}
                  {activeSection === 'dosen' && (
                    <section className="space-y-12">
                      <SectionHeader subtitle="Faculty Members" title="Profil Tenaga Pengajar" />

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                        {[
                          { n: "Prof. Dr. H. M. Sidik Priadana, MS.", j: "Guru Besar", k: "Manajemen Sumber Daya Manusia", nidn: "0004125501", email: "sidikpriadana@unpas.ac.id", orcid: "0000-0002-xxxx-xxxx" },
                          { n: "Prof. Dr. H. Horas Djulius, SE.", j: "Guru Besar", k: "Ekonomi Internasional", nidn: "0408077101", email: "horasdjulius@unpas.ac.id", orcid: "0000-0003-xxxx-xxxx" },
                          { n: "Dr. H. Tete Saepudin, SE., M.Si", j: "Lektor Kepala", k: "Ekonomi Pembangunan", nidn: "0424046803", email: "tetesaepudin@unpas.ac.id", orcid: "0000-0001-xxxx-xxxx" },
                          { n: "Dr. Dikdik Kusdiana, SE., MT.", j: "Lektor Kepala", k: "Ekonomi Industri", nidn: "0407106701", email: "dikdik@unpas.ac.id", orcid: "0000-0002-xxxx-xxxx" },
                          { n: "Tubagus Thresna Irijanto, SE., M.Si., Ph.D.", j: "Lektor", k: "Ekonometrika", nidn: "0426047101", email: "tubagus@unpas.ac.id", orcid: "0000-0002-xxxx-xxxx" },
                          { n: "Dr. Endang Rostiana, SE., MT.", j: "Lektor", k: "Ekonomi Publik", nidn: "0420207102", email: "endang@unpas.ac.id", orcid: "0000-0002-xxxx-xxxx" },
                          { n: "Gugum Mukdas, SE., MT.", j: "Lektor", k: "Statistika Ekonomi", nidn: "0424018404", email: "gugum@unpas.ac.id", orcid: "0000-0002-xxxx-xxxx" },
                          { n: "Acuviarta SE., ME.", j: "Asisten Ahli", k: "Kebijakan Publik", nidn: "0401077407", email: "acuviarta@unpas.ac.id", orcid: "0000-0002-xxxx-xxxx" },
                          { n: "Restu Akbar Suryaman, SE., ME.", j: "Asisten Ahli", k: "Ekonomi Moneter", nidn: "0424039602", email: "restu@unpas.ac.id", orcid: "0000-0002-xxxx-xxxx" }
                        ].map((dosen, index) => {
                          const isSelected = selectedDosen === index;

                          return (
                            <motion.div
                              key={index}
                              onClick={() => setSelectedDosen(isSelected ? null : index)}
                              initial={false}
                              animate={{
                                backgroundColor: isSelected ? "#ffffff" : "#062c1b",
                              }}
                              transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
                              className={`relative cursor-pointer overflow-hidden shadow-xl flex flex-col items-center
              ${isSelected
                                  ? 'rounded-[2.5rem] p-8 border border-gold-200'
                                  : 'rounded-[2.5rem] p-5 border border-white/5 hover:border-gold-500/40'}`}
                            >
                              <motion.div
                                animate={{
                                  width: isSelected ? "80px" : "100%",
                                  height: isSelected ? "80px" : "auto",
                                  borderRadius: isSelected ? "100px" : "32px",
                                }}
                                transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
                                className="bg-forest-800 flex items-center justify-center overflow-hidden flex-shrink-0 aspect-[4/5]"
                                style={{ aspectRatio: isSelected ? "1/1" : "4/5" }}
                              >
                                <FiUsers size={isSelected ? 32 : 64} className="text-white/20" />
                              </motion.div>

                              <div className="text-center mt-6 w-full px-2">
                                <p className={`uppercase font-black tracking-widest text-[10px] mb-1 transition-colors duration-500
                ${isSelected ? 'text-gold-600' : 'text-gold-400'}`}>
                                  {dosen.j}
                                </p>
                                <h4 className={`font-bold leading-tight break-words transition-all duration-500
                ${isSelected ? 'text-xl text-forest-950' : 'text-sm text-white'}`}>
                                  {dosen.n}
                                </h4>
                              </div>

                              <AnimatePresence initial={false}>
                                {isSelected && (
                                  <motion.div
                                    key="content"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
                                    className="w-full overflow-hidden"
                                  >
                                    <div className="space-y-4 border-t border-gray-100 mt-6 pt-6">
                                      {[
                                        { label: "NIDN / NIDK", value: dosen.nidn },
                                        { label: "Bidang Keahlian", value: dosen.k },
                                        { label: "Email Resmi", value: dosen.email },
                                        { label: "ORCID ID", value: dosen.orcid }
                                      ].map((info, i) => (
                                        <div key={i} className="flex flex-col border-b border-gray-50 pb-2 last:border-0 text-left px-2">
                                          <span className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">
                                            {info.label}
                                          </span>
                                          <span className="text-sm font-semibold text-forest-900 break-words overflow-wrap-anywhere whitespace-normal">
                                            {info.value}
                                          </span>
                                        </div>
                                      ))}

                                      <div className="pt-2">
                                        <button className="w-full py-4 bg-forest-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-3 active:opacity-80 transition-opacity shadow-lg shadow-forest-900/10">
                                          Lihat Publikasi Ilmiah <FiLink size={14} />
                                        </button>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              {isSelected && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="absolute top-6 right-6 text-gray-300 hover:text-forest-900 transition-colors"
                                >
                                  <FiX size={20} />
                                </motion.div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {/* SECTION 5: JURNAL ILMIAH */}
                  {activeSection === 'jurnal' && (
                    <section className="space-y-10">
                      <SectionHeader subtitle="Publication" title="Jurnal Ilmiah" />
                      <div className="grid md:grid-cols-2 gap-10">
                        {[
                          { name: 'JRIE', full: 'Journal of Regional and Indonesia Economy', img: '/jrie.webp', url: 'https://jrie.feb.unpas.ac.id/index.php/jrie' },
                          { name: 'BRAINY', full: 'Bandung Regional Investment & Economy', img: '/brainy.webp', url: 'https://brainy.feb.unpas.ac.id/index.php/brainy' }
                        ].map((jurnal) => (
                          <div key={jurnal.name} className="group relative bg-forest-950 rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl border border-white/5">
                            <img src={jurnal.img} alt={jurnal.name} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-1000 ease-out group-hover:scale-110 group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent z-10" />
                            <div className="absolute inset-0 flex flex-col items-center justify-end p-10 text-center z-20">
                              <span className="mb-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] uppercase tracking-widest text-gold-400 font-bold">Peer Reviewed</span>
                              <h4 className="text-white font-black text-3xl mb-3 tracking-tight group-hover:text-gold-400 transition-colors duration-300">{jurnal.name}</h4>
                              <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-[240px] font-medium">{jurnal.full}</p>
                              <a href={jurnal.url} target="_blank" rel="noopener noreferrer" className="group/btn relative inline-flex items-center justify-center px-8 py-4 bg-white text-forest-900 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 hover:bg-gold-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] overflow-hidden">
                                <span className="relative z-10">Kunjungi Situs Jurnal</span>
                                <div className="absolute inset-0 bg-gold-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                              </a>
                            </div>
                            <div className="absolute inset-0 border-2 border-gold-400/0 rounded-[3rem] group-hover:border-gold-400/20 transition-all duration-500 z-30 pointer-events-none" />
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* SECTION 6: PORTAL & DOKUMEN AKADEMIK (Hanya bagian ini yang diupdate) */}
                  {activeSection === 'portal' && (
                    <motion.section
                      variants={containerVariants}
                      initial="initial" animate="animate" exit="exit"
                      className="space-y-12"
                    >
                      {/* 1. PORTAL HERO */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-forest-600 to-forest-900 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-20 h-20 bg-white/10 backdrop-blur-md text-gold-400 rounded-[2rem] flex items-center justify-center mb-6 border border-white/10 shadow-xl">
                            <FiZap size={32} />
                          </div>
                          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Portal SITU 2 UNPAS</h3>
                          <p className="text-forest-100 text-sm max-w-md mb-10 leading-relaxed font-light">
                            Akses sistem informasi terpadu untuk pengisian KRS, melihat KHS, dan jadwal perkuliahan harian secara real-time.
                          </p>
                          <a
                            href="https://situ2.unpas.ac.id/gate/login"
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-4 px-10 py-5 bg-gold-500 text-forest-950 rounded-2xl font-black hover:bg-gold-400 shadow-xl transition-all active:scale-95"
                          >
                            Masuk ke Portal Akademik <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </a>
                        </div>
                      </div>

                      {/* 2. PUSAT UNDUHAN */}
                      {/* DOWNLOAD SECTION */}
                      <div className="space-y-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
                          <div>
                            <p className="text-gold-600 font-black text-[10px] tracking-[0.2em] uppercase mb-2">Academic Resources</p>
                            <h4 className="text-2xl font-bold text-forest-900">Pusat Unduhan Pedoman</h4>
                          </div>
                          <p className="text-xs text-gray-400 font-medium italic">Pembaruan: April 2026</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { name: "Pedoman Akademik Mahasiswa 2025", file: "1_Pedoman_Akademik_Mahasiswa_2025.pdf", icon: <FiBook /> },
                            { name: "Pedoman Kode Etik Mahasiswa 2025", file: "2_Pedoman_Kode_Etik_Mahasiswa_2025.pdf", icon: <FiCheckCircle /> },
                            { name: "Pedoman Kuliah Praktek Kerja (KPK) 2025", file: "3_Pedoman_KPK_2025.pdf", icon: <FiMapPin /> },
                            { name: "Pedoman Penulisan Skripsi 2025", file: "4_Pedoman_Skripsi_2025.pdf", icon: <FiAward /> },
                            { name: "Pedoman RPL Mahasiswa 2025", file: "5_Pedoman_RPL_Mahasiswa_2025.pdf", icon: <FiZap /> },
                          ].map((doc, i) => (
                            <div
                              key={i}
                              className="group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-[2rem] hover:border-forest-200 hover:shadow-xl transition-all duration-300"
                            >
                              <div className="flex items-center gap-4 min-w-0">
                                <div className="w-12 h-12 bg-gray-50 text-forest-700 rounded-2xl flex items-center justify-center group-hover:bg-forest-700 group-hover:text-white transition-all shadow-sm">
                                  {doc.icon}
                                </div>
                                <div className="min-w-0">
                                  <h5 className="font-bold text-gray-800 text-[13px] leading-tight group-hover:text-forest-900 truncate pr-2">
                                    {doc.name}
                                  </h5>
                                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">PDF • 2025 Edition</p>
                                </div>
                              </div>

                              {/* DOUBLE ACTION BUTTONS */}
                              <div className="flex items-center gap-2 ml-4">
                                {/* Tombol Preview */}
                                <a
                                  href={`/documents/${doc.file}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-forest-50 hover:text-forest-600 transition-colors"
                                  title="Preview"
                                >
                                  <FiExternalLink size={16} />
                                </a>

                                {/* Tombol Download */}
                                <a
                                  href={`/documents/${doc.file}`}
                                  download={doc.file}
                                  className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gold-50 hover:text-gold-600 transition-colors"
                                  title="Download"
                                >
                                  <FiArrowRight size={16} className="rotate-90" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                            <FiClock className="text-forest-500 w-5 h-5" />
                          </div>
                          <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                            Gunakan opsi <strong>Preview</strong> untuk membaca langsung di browser atau <strong>Download</strong> untuk menyimpan file secara permanen.
                          </p>
                        </div>
                      </div>
                    </motion.section>
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