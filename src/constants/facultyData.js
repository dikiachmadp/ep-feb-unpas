import { FiTarget, FiTrendingUp, FiSearch, FiBriefcase } from 'react-icons/fi';

export const DOSEN_DATA = [
  { n: "Prof. Dr. H. Horas Djulius, S.E.", j: "Guru Besar", k: "Ekonomi Internasional", nidn: "0408077101", email: "horasdjulius@unpas.ac.id", orcid: "5974299", link: "https://scholar.google.co.id/citations?user=zyog5bkAAAAJ&hl=id&oi=ao" },
  { n: "Dr. H. Tete Saepudin, S.E., M.Si.", j: "Lektor Kepala", k: "Ekonomi Pembangunan", nidn: "0424046803", email: "tetesaepudin@unpas.ac.id", orcid: "6113321", link: "https://scholar.google.co.id/citations?user=dpwsgArcgugC&hl=id&oi=ao" },
  { n: "Dr. Dikdik Kusdiana, S.E., M.T.", j: "Lektor Kepala", k: "Ekonomi Industri", nidn: "0407106701", email: "dikdik@unpas.ac.id", orcid: "6685763", link: "https://scholar.google.co.id/citations?user=lLz22lkAAAAJ&hl=id&oi=ao" },
  { n: "Tubagus Thresna Irijanto, S.E., M.Si., Ph.D.", j: "Lektor", k: "Ekonometrika", nidn: "0426047101", email: "tubagus@unpas.ac.id", orcid: "6704617", link: "https://scholar.google.co.id/citations?user=R8ZQDsEAAAAJ&hl=id&oi=ao" },
  { n: "Dr. Endang Rostiana, S.E., M.T.", j: "Lektor Kepala", k: "Ekonomi Publik", nidn: "0420207102", email: "endang@unpas.ac.id", orcid: "5992362", link: "https://scholar.google.co.id/citations?user=683rZMMAAAAJ&hl=id&oi=ao" },
  { n: "Hj. Neni Murniati, S.E., M.Si.", j: "Lektor", k: "Ekonomi Publik", nidn: "0420207102", email: "nenimurniati@unpas.ac.id", orcid: "6763401", link: "https://scholar.google.co.id/citations?user=s3Gn-CsAAAAJ&hl=id&oi=ao" },
  { n: "Gugum Mukdas, S.E., M.T.", j: "Lektor", k: "Statistika Ekonomi", nidn: "0424018404", email: "gugum@unpas.ac.id", orcid: "6042807", link: "https://scholar.google.co.id/citations?user=5EsjhfQAAAAJ&hl=id&oi=ao" },
  { n: "Acuviarta S.E., M.E.", j: "Asisten Ahli", k: "Kebijakan Publik", nidn: "0401077407", email: "acuviarta@unpas.ac.id", orcid: "6831497", link: "https://scholar.google.co.id/citations?user=WRpnNYkAAAAJ&hl=id&oi=ao" },
  { n: "Restu Akbar Suryaman, S.E., M.E.", j: "Asisten Ahli", k: "Ekonomi Moneter", nidn: "0424039602", email: "restu@unpas.ac.id", orcid: "6834765", link: "https://scholar.google.co.id/citations?user=T2CmGQEAAAAJ&hl=id&oi=ao" }
];

export const NAV_MENU = [
  { id: 'kurikulum', label: 'Kurikulum', icon: 'kurikulum' },
  { id: 'kerjasama', label: 'Kerjasama', icon: 'kerjasama' },
  { id: 'akreditasi', label: 'Akreditasi', icon: 'akreditasi' },
  { id: 'dosen', label: 'Dosen', icon: 'dosen' },
  { id: 'jurnal', label: 'Jurnal', icon: 'jurnal' },
  { id: 'portal', label: 'Portal Akademik', icon: 'portal' },
];

export const GRADUATE_PROFILES = [
  {
    title: "Perencana Pembangunan",
    desc: "Ahli dalam menyusun dokumen perencanaan kebijakan ekonomi baik di instansi pemerintah pusat maupun daerah.",
    icon: FiTarget,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Analis Ekonomi & Keuangan",
    desc: "Mampu menganalisis fenomena ekonomi, pasar modal, dan sektor perbankan untuk rekomendasi investasi.",
    icon: FiTrendingUp,
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "Peneliti Muda",
    desc: "Menguasai alat analisis ekonometrika untuk melakukan riset terapan di bidang sosial dan ekonomi.",
    icon: FiSearch,
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Entrepreneur Profesional",
    desc: "Memiliki jiwa wirausaha yang didukung kemampuan analisis kelayakan bisnis dan manajerial yang kuat.",
    icon: FiBriefcase,
    color: "bg-orange-50 text-orange-600"
  }
];

export const CURRICULUM_DATA = [
  {
    year: 1,
    label: "Tahun Pertama",
    desc: "Fundamental Ekonomi & Alat Analisis",
    semesters: [
      {
        id: 1,
        courses: ["EAK201 - Dasar Akuntansi I", "ESP201 - Matematika Ekonomi", "ESP207 - Pengantar Ekonomi Mikro", "FEK203 - Bahasa Indonesia", "FEK205 - Bahasa Inggris Dasar", "UNV101 - Pendidikan Agama Islam", "UNV107 - Budaya Sunda", "Pancasila"]
      },
      {
        id: 2,
        courses: ["EAK301 - Dasar Akuntansi II", "EMJ202 - Pengantar Manajemen", "ESP202 - Statistika Ekonomi dan Bisnis 1", "ESP206 - Pengantar Ekonomi Makro", "ESP301 - Matematika Keuangan dan Bisnis", "FEK213 - Bahasa Inggris Untuk Ekonomi dan Bisnis", "UNV102 - Islam Untuk Disiplin Ilmu", "Kewarganegaraan"]
      }
    ]
  },
  {
    year: 2,
    label: "Tahun Kedua",
    desc: "Teori Ekonomi Lanjutan",
    semesters: [
      {
        id: 3,
        courses: ["EMJ301 - Hukum Bisnis", "ESP203 - Statistika Ekonomi dan Bisnis 2", "ESP208 - Teori Ekonomi Makro", "ESP209 - Teori Ekonomi Mikro", "ESP306 - Ekonomi Moneter", "ESP308 - Ekonomi Pembangunan", "FEK210 - Ekonomi Koperasi dan UMKM", "UNV108 - Ilmu Sosial dan Budaya Dasar"]
      },
      {
        id: 4,
        courses: ["Administrasi Pembangunan Daerah", "ESP307 - Teori Perdagangan Internasional", "ESP313 - Ekonomi Pertanian dan Agrobisnis", "Kebijakan Moneter dan Kebanksentralan", "ESP326 - Ekonomi Pembangunan Berkelanjutan", "ESP427 - Demografi dan Ekonomi Ketenagakerjaan", "FEK402 - Ekonomi Syariah", "Ekonomi Digital dan Big Data"]
      }
    ]
  },
  {
    year: 3,
    label: "Tahun Ketiga",
    desc: "Spesialisasi & Aplikasi Kebijakan",
    semesters: [
      {
        id: 5,
        courses: ["Ekonomi Keuangan Pemerintah Pusat dan Daerah", "ESP315 - Ekonometrika", "ESP413 - Ekonomi Moneter Internasional", "ESP415 - Perencanaan Pembangunan", "ESP434 - Ekonomi Mikro Terapan", "ESP436 - Ekonomi Makro Terapan", "Studi Kelayakan & Evaluasi Proyek", "Ekonomi Pariwisata"]
      },
      {
        id: 6,
        courses: ["EMJ313 - Ekonomi Manajerial", "EMJ402 - Kewirausahaan dan Rencana Bisnis", "ESP204 - Metode Penelitian Ekonomi dan Bisnis", "ESP403 - Ekonomi Industri", "ESP428 - Ekonomi Regional dan Perkotaan", "FEK208 - Lembaga Keuangan Bank dan Non-Bank", "FEK403 - KKM (Pilihan)", "FEK404 - KPK (Pilihan)"]
      }
    ]
  },
  {
    year: 4,
    label: "Tahun Keempat",
    desc: "Sintesis & Tugas Akhir",
    semesters: [
      {
        id: 7,
        courses: ["EMJ434 - Seminar Kewirausahaan", "Perekonomian Indonesia dan Global", "ESP319 - Ekonomi SDA dan Lingkungan", "ESP467 - Keuangan Manajerial", "ESP431 - Perencanaan Pembangunan Ekonomi Kewilayahan", "ESP465 - Analisis Kinerja Institusi Publik"]
      },
      {
        id: 8,
        courses: ["ESP418 - Seminar Masalah dan Kebijakan Ekonomi", "ETA500 - Seminar Usulan Penelitian", "ETA501 - Skripsi"]
      }
    ]
  }
];
