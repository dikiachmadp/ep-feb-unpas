# Session Summary: Refactor Bahasa Inggris Tunggal

## Overview
Tujuan dari sesi ini adalah melakukan refactor pada proyek React FEB UNPAS untuk mengubah sistem multibahasa (Indonesia/Inggris) menjadi **Bahasa Inggris tunggal**. Selain itu, proyek juga melakukan pembersihan dependensi i18n dan melakukan sentralisasi data teks ke dalam file konstanta.

## Key Changes
1.  **Ekstraksi Konten:** Semua teks dari `src/locales/` dipindahkan ke file baru `src/constants/contentData.js`. Data dikelompokkan per modul (HOME, PROFILE, ACADEMICS, CONTACT, FOOTER, NAV, NEWS_PAGE).
2.  **Pembaruan Komponen:** Mengganti hook `useTranslation` dan fungsi `t()` dengan akses data langsung dari `contentData.js` pada komponen berikut:
    - `src/pages/Home.jsx`
    - `src/pages/Profile.jsx`
    - `src/pages/Academics.jsx`
    - `src/pages/Contact.jsx`
    - `src/pages/NewsActivities.jsx`
    - `src/pages/NewsDetail.jsx`
    - `src/components/Navbar.jsx`
    - `src/components/Footer.jsx`
    - `src/components/ContactForm.jsx`
    - `src/components/Hero.jsx`
    - `src/pages/Faculty.jsx` (Ditemukan sisa i18n saat proses build)
3.  **Pembersihan:**
    - Menghapus folder `src/locales/`.
    - Menghapus file `src/i18n.js`.
    - Menghapus `i18next` dan `react-i18next` dari `package.json`.
4.  **Infrastruktur:** Menghapus import `i18n.js` dari `src/main.jsx`.

## Verifikasi
- Build produksi (`npm run build`) berhasil dijalankan dengan sukses setelah memperbaiki beberapa error import yang tertinggal.
- Tampilan visual proyek dipastikan tidak mengalami perubahan (sesuai constraint).
- Proyek sekarang sepenuhnya menggunakan Bahasa Inggris tanpa ketergantungan pada library i18n.
