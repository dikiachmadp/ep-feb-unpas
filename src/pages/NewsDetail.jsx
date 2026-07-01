import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { NEWS_DATA } from '../constants/newsData'
import { NewsCard } from '../components/Cards' 
import SEO from '../components/SEO'

const NewsDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate() 

  // Cari berita berdasarkan slug
  const news = NEWS_DATA.find((item) => item.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            News Not Found
          </h2>
          <Link to="/berita-kegiatan" className="text-forest-600 font-semibold hover:underline">
            &larr; Back
          </Link>
        </div>
      </div>
    )
  }

  // --- LOGIKA BERITA TERKAIT ---
  const relatedNews = NEWS_DATA
    .filter((item) => item.slug !== slug)
    .sort((a, b) => (b.category === news.category ? 1 : 0) - (a.category === news.category ? 1 : 0))
    .slice(0, 3)

  // --- LOGIKA PENYEBARAN GAMBAR DI DALAM ARTIKEL ---
  const coverImage = news.gallery?.[0]
  const extraImages = news.gallery?.slice(1) || []

  const renderContentWithImages = () => {
    const elements = []
    const totalParagraphs = news.content.length
    const totalExtraImages = extraImages.length

    const step = totalExtraImages > 0 
      ? Math.max(1, Math.floor(totalParagraphs / (totalExtraImages + 1))) 
      : totalParagraphs

    let imageInsertedCount = 0

    news.content.forEach((paragraph, index) => {
      elements.push(
        <p key={`p-${index}`} className="text-justify text-gray-700 text-base md:text-lg leading-relaxed indent-0 md:indent-8">
          {paragraph}
        </p>
      )

      if (totalExtraImages > 0 && imageInsertedCount < totalExtraImages) {
        const isTimeToInsert = (index + 1) % step === 0
        const isLastParagraph = index === totalParagraphs - 1

        if (isTimeToInsert || (isLastParagraph && imageInsertedCount < totalExtraImages)) {
          const currentImgUrl = extraImages[imageInsertedCount]
          
          elements.push(
            <div key={`img-${index}`} className="my-8 w-full bg-gray-50/50 rounded-2xl overflow-hidden flex justify-center items-center p-2 border border-gray-100 shadow-sm">
              <img 
                src={currentImgUrl} 
                alt={`Documentation ${imageInsertedCount + 1}`} 
                className="max-h-[550px] w-auto h-auto object-contain rounded-xl transition-transform duration-500 hover:scale-[1.01]"
                onError={(e) => { e.target.parentNode.style.display = 'none' }}
              />
            </div>
          )
          imageInsertedCount++
        }
      }
    })

    return elements
  }

  return (
    <>
      <SEO title={news.title} description={news.excerpt} />

      <div className="page-wrapper pt-28 pb-20 bg-gray-50 font-sans">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Tombol Kembali */}
          <Link 
            to="/berita-kegiatan" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest-600 hover:text-forest-700 transition-colors mb-6 group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span>
            Back to News & Activities
          </Link>

          {/* Meta Kategori & Tanggal */}
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-forest-100 text-forest-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {news.category}
            </span>
            <span className="text-gray-400 text-sm font-medium">{news.date}</span>
          </div>

          {/* Judul Utama */}
          <h1 className="text-2xl md:text-4xl font-display font-bold text-gray-900 mb-8 leading-tight">
            {news.title}
          </h1>

          {/* Gambar Utama (Cover) */}
          {coverImage && (
            <div className="w-full bg-gray-50 rounded-3xl overflow-hidden flex justify-center items-center p-2 border border-gray-100 shadow-md mb-10">
              <img 
                src={coverImage} 
                alt={`Cover - ${news.title}`} 
                className="max-h-[600px] w-auto h-auto object-contain rounded-2xl"
                onError={(e) => { e.target.parentNode.style.display = 'none' }}
              />
            </div>
          )}

          {/* Box Konten Artikel */}
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 mb-16">
            <div className="space-y-6">
              {renderContentWithImages()}
            </div>
          </div>

          {/* SECTION BERITA TERKAIT / LAINNYA */}
          {relatedNews.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="font-display font-bold text-xl md:text-2xl text-gray-800 mb-8">
                Other News & Activities
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedNews.map((item, index) => (
                  <div 
                    key={index} 
                    onClick={() => navigate(`/berita-kegiatan/${item.slug}`)} 
                    className="cursor-pointer"
                  >
                    <NewsCard
                      title={item.title}
                      date={item.date}
                      excerpt={item.excerpt}
                      category={item.category}
                      image={item.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default NewsDetail