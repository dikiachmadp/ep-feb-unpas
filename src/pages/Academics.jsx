import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import {
  FiBook, FiGlobe, FiAward, FiUsers, FiFileText, FiExternalLink,
  FiHexagon, FiZap, FiChevronRight, FiX, FiMail, FiExternalLink as FiLink
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
                    <section className="space-y-8">
                      <SectionHeader subtitle="Kurikulum" title="Struktur Kurikulum" />
                      <div className="grid gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                          <div key={sem} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-md transition-all">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-forest-700 text-white rounded-2xl flex items-center justify-center font-bold font-display">0{sem}</div>
                              <div>
                                <h4 className="font-bold text-gray-800">Semester {sem}</h4>
                                <p className="text-xs text-gray-500">Lihat Daftar Mata Kuliah Lengkap</p>
                              </div>
                            </div>
                            <FiChevronRight className="text-gray-300 group-hover:text-forest-700" />
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

                  {/* SECTION 4: DOSEN (DENGAN EFEK EKSPANSI) */}
                  {activeSection === 'dosen' && (
                    <section className="space-y-12">
                      <SectionHeader subtitle="Faculty Members" title="Profil Tenaga Pengajar" />
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
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
                              layout
                              key={index}
                              onClick={() => setSelectedDosen(isSelected ? null : index)}
                              className={`relative cursor-pointer group flex flex-col transition-all duration-500 ${isSelected ? 'md:col-span-2 lg:col-span-2 bg-gray-50 rounded-[3rem] p-8 shadow-2xl border border-gold-200' : 'items-center'}`}
                            >
                              <div className={`flex flex-col md:flex-row gap-8 w-full ${isSelected ? 'items-start' : 'items-center'}`}>
                                <motion.div layout className={`relative flex-shrink-0 overflow-hidden bg-forest-900 border border-white/10 shadow-lg ${isSelected ? 'w-full md:w-48 aspect-[3/4] rounded-3xl' : 'w-full aspect-[3/4] rounded-[2.5rem]'}`}>
                                  <div className="absolute inset-0 flex items-center justify-center text-white/10 group-hover:scale-110 transition-transform duration-700">
                                    <FiUsers size={isSelected ? 64 : 80} />
                                  </div>
                                  {!isSelected && <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent z-10" />}
                                </motion.div>

                                <motion.div layout className={`flex-1 ${isSelected ? 'text-left pt-2' : 'text-center mt-6 px-2'}`}>
                                  <p className="text-gold-600 text-[10px] uppercase tracking-[0.2em] font-black mb-2">{dosen.j}</p>
                                  <h4 className={`font-bold text-forest-950 leading-tight ${isSelected ? 'text-2xl mb-4' : 'text-base group-hover:text-gold-600'}`}>{dosen.n}</h4>

                                  {!isSelected ? (
                                    <p className="text-gray-400 text-xs italic font-medium">{dosen.k}</p>
                                  ) : (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                                      <div className="space-y-1">
                                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">NIDN / NIDK</span>
                                        <p className="text-sm font-bold text-forest-900">{dosen.nidn}</p>
                                      </div>
                                      <div className="space-y-1">
                                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Bidang Keahlian</span>
                                        <p className="text-sm font-bold text-forest-900">{dosen.k}</p>
                                      </div>
                                      <div className="space-y-1">
                                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Email Resmi</span>
                                        <p className="text-sm font-bold text-forest-900 break-all">{dosen.email}</p>
                                      </div>
                                      <div className="space-y-1">
                                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">ORCID ID</span>
                                        <p className="text-sm font-bold text-forest-900">{dosen.orcid}</p>
                                      </div>
                                      <div className="sm:col-span-2 pt-2">
                                        <button className="w-full py-4 bg-forest-700 text-white rounded-2xl text-xs font-bold hover:bg-forest-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-forest-900/10">
                                          Lihat Publikasi Ilmiah <FiLink />
                                        </button>
                                      </div>
                                    </motion.div>
                                  )}
                                </motion.div>
                              </div>
                              {isSelected && (
                                <div className="absolute top-8 right-8 text-gray-400 hover:text-forest-900 transition-colors">
                                  <FiX size={24} />
                                </div>
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

                  {/* SECTION 6: PORTAL AKADEMIK */}
                  {activeSection === 'portal' && (
                    <section className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-24 h-24 bg-gold-50 text-gold-500 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner">
                        <FiExternalLink size={40} />
                      </div>
                      <h3 className="text-2xl font-bold text-forest-900 mb-3">Portal SITU 2 UNPAS</h3>
                      <p className="text-gray-500 text-sm max-w-sm mb-10 leading-relaxed">Akses sistem informasi terpadu untuk pengisian KRS, melihat KHS, dan jadwal perkuliahan harian.</p>
                      <a href="https://situ2.unpas.ac.id/gate/login" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-10 py-5 bg-forest-700 text-white rounded-2xl font-bold hover:bg-forest-800 shadow-lg transition-all">
                        Login ke Portal <FiZap className="text-gold-400" />
                      </a>
                    </section>
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