import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'
import SEO from './components/SEO'
import { SEO_DEFAULTS } from './constants'

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const Profile = lazy(() => import('./pages/Profile'))
const Academics = lazy(() => import('./pages/Academics'))
const Faculty = lazy(() => import('./pages/Faculty'))
const Contact = lazy(() => import('./pages/Contact'))

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-forest-200 border-t-forest-500 rounded-full animate-spin" />
      <p className="text-forest-600 font-medium text-sm">Memuat halaman...</p>
    </div>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HelmetProvider>
        <SEO {...SEO_DEFAULTS} />
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profil" element={<Profile />} />
                  <Route path="/akademik" element={<Academics />} />
                  <Route path="/dosen" element={<Faculty />} />
                  <Route path="/kontak" element={<Contact />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </HelmetProvider>
    </BrowserRouter>
  )
}
