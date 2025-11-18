import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'motion/react';

const DEFAULT_ITEMS = [
  {
    title: 'Campak (Measles)',
    description:
      'Penyakit sangat menular yang menyerang terutama anak-anak. Lebih dari 38.000 kasus dilaporkan di Asia tahun 2024 dengan 13 kematian.',
    details: 'Campak adalah penyakit virus yang sangat menular. Gejala meliputi demam tinggi, batuk, pilek, mata merah, dan ruam kemerahan di seluruh tubuh. Vaksinasi adalah cara terbaik untuk mencegah penyakit ini.',
    id: 1,
    image: 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1674702853/attached_image/gejala-campak-pada-anak-dan-cara-mengobatinya.jpg'
  },
  {
    title: 'Batuk Rejan (Pertusis)',
    description:
      'Batuk 100 hari yang berbahaya bagi bayi. Mengalami lonjakan kasus di AS, Australia, Prancis, UK dan Singapura tahun 2024.',
    details: 'Pertusis atau batuk rejan disebabkan oleh bakteri Bordetella pertussis. Batuk yang parah dan berkelanjutan dapat menyebabkan kesulitan bernapas, terutama pada bayi. Vaksinasi DTP sangat penting untuk pencegahan.',
    id: 2,
    image: 'https://cnc-magazine.oramiland.com/parenting/images/batuk-rejan.width-800.format-webp.webp'
  },
  {
    title: 'RSV (Respiratory Syncytial Virus)',
    description:
      'Virus yang menginfeksi saluran pernapasan bayi dan balita. Menyebar sangat cepat dan berpotensi fatal tanpa vaksinasi.',
    details: 'RSV adalah penyebab umum infeksi pernapasan pada bayi. Gejala awal mirip flu biasa, namun dapat berkembang menjadi bronkiolitis atau pneumonia. Vaksin terbaru tersedia untuk bayi dan ibu hamil.',
    id: 3,
    image: 'https://static01.nyt.com/images/2022/12/13/well/13WELL-FLU-RSV-COVID1/13WELL-FLU-RSV-COVID1-videoSixteenByNine3000.jpg'
  },
  {
    title: 'HFMD (Flu Singapura)',
    description:
      'Hand, Foot & Mouth Disease. Hampir 6.500 kasus di Indonesia hingga 2024, mayoritas menyerang bayi dan balita.',
    details: 'HFMD disebabkan oleh virus Coxsackie. Gejala meliputi demam, luka di mulut, dan ruam di tangan dan kaki. Penyakit ini sangat menular di antara anak-anak dan memerlukan kebersihan yang baik untuk pencegahan.',
    id: 4,
    image: 'https://rspp.co.id/uploads/img_post/img_060220241707178243YTU5R.jpg'
  },
  {
    title: 'HMPV (Human Metapneumovirus)',
    description:
      'Wabah baru di China 2024 yang menyerang anak di bawah 14 tahun. Gejala mirip flu dengan risiko pneumonia pada bayi.',
    details: 'HMPV adalah virus pernapasan yang dapat menyebabkan infeksi dari ringan hingga berat. Anak kecil, lansia, dan individu dengan sistem kekebalan lemah berisiko lebih tinggi mengalami komplikasi serius.',
    id: 5,
    image:'https://sph.nus.edu.sg/wp-content/uploads/2025/01/HMPV-1024x1024.png'    
  }
];

function Carousel({ items = DEFAULT_ITEMS }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNudge, setShowNudge] = useState(true);
  const x = useMotionValue(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowNudge(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setShowNudge(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setShowNudge(false);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setShowNudge(false);
  };

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      handlePrev();
    } else if (info.offset.x < -threshold) {
      handleNext();
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-b from-rose-50 to-white">
      <div className="w-full max-w-7xl">
        <motion.h1 
          style={{fontFamily: 'Satoshi, sans-serif'}}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 md:mb-12 text-gray-900 px-2"
        >
          Penyakit yang Sedang Mewabah 2024-2025
        </motion.h1>

        <div className="relative" ref={containerRef}>
          {/* Nudge Animations */}
          <AnimatePresence>
            {showNudge && !selectedItem && (
              <>
                {/* Right Arrow Nudge - Hidden on mobile */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    x: [30, 0, 0, -30]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden sm:block"
                >
                  <div className="bg-white rounded-full p-2 sm:p-3 md:p-4 shadow-2xl">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </motion.div>

                {/* Left Arrow Nudge - Hidden on mobile */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    x: [-30, 0, 0, 30]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                    delay: 1.25
                  }}
                  className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden sm:block"
                >
                  <div className="bg-white rounded-full p-2 sm:p-3 md:p-4 shadow-2xl">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </div>
                </motion.div>

                {/* Swipe Hint for Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    y: [20, 0, 0, -20]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none sm:hidden"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-2xl flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8L22 12L18 16"></path>
                      <path d="M6 8L2 12L6 16"></path>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                    </svg>
                    <span className="text-xs font-bold text-gray-700">Geser untuk lihat</span>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Navigation Buttons - Larger touch targets on mobile */}
          <button
            onClick={handlePrev}
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 md:p-4 shadow-xl hover:shadow-2xl transition-all hover:scale-110 active:scale-95 group touch-manipulation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600 group-hover:text-rose-700 sm:w-6 sm:h-6">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 md:p-4 shadow-xl hover:shadow-2xl transition-all hover:scale-110 active:scale-95 group touch-manipulation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600 group-hover:text-rose-700 sm:w-6 sm:h-6">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Carousel Container with Swipe Support */}
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
            <motion.div
              className="flex"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ x }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="min-w-full px-2 sm:px-4 md:px-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                    onClick={() => handleCardClick(item)}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 30px 80px rgba(0,0,0,0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      <div className="relative h-48 sm:h-64 md:h-96 overflow-hidden">
                        <motion.img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      
                      <div className="p-4 sm:p-6 md:p-10 flex flex-col justify-center min-h-[280px] sm:min-h-0">
                        <motion.div
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="flex flex-col h-full justify-between"
                        >
                          <div>
                            <div className="inline-block px-3 py-1 bg-rose-500/20 rounded-full text-rose-400 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 md:mb-4">
                              #{index + 1}
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
                              {item.title}
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-3 sm:mb-4 md:mb-6 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center gap-2 bg-[#800020] text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-rose-500/30 transition-all text-xs sm:text-sm md:text-base touch-manipulation w-full sm:w-auto"
                          >
                            <span className="whitespace-nowrap">Baca Selengkapnya</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 sm:w-5 sm:h-5">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                          </motion.button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots - Larger touch targets */}
          <div className="flex justify-center gap-2 mt-4 sm:mt-6 md:mt-8">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setShowNudge(false);
                }}
                className="group p-2 touch-manipulation"
              >
                <motion.div
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 sm:w-10 md:w-12 bg-rose-500'
                      : 'w-1.5 sm:w-2 bg-gray-300 group-hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal - Full screen on mobile, centered on desktop */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed inset-0 sm:inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[95%] md:max-w-5xl md:h-[85vh] md:max-h-[900px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 sm:rounded-2xl md:rounded-3xl shadow-2xl z-50 overflow-hidden border-0 sm:border border-white/10"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-full p-2 sm:p-3 transition-all group touch-manipulation"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform sm:w-6 sm:h-6">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="w-full md:w-1/2 h-48 sm:h-64 md:h-full relative overflow-hidden flex-shrink-0"
                >
                  <motion.img 
                    src={selectedItem.image} 
                    alt={selectedItem.title} 
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/50" />
                </motion.div>

                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto"
                >
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-rose-500/20 rounded-full text-rose-400 text-xs sm:text-sm font-bold mb-3 sm:mb-4">
                      <span className='animate-pulse'>🔴</span> WABAH AKTIF
                    </div>
                  </motion.div>
                  
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4"
                  >
                    {selectedItem.title}
                  </motion.h2>
                  
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-base sm:text-lg md:text-xl text-rose-300 mb-4 sm:mb-6 font-semibold leading-relaxed"
                  >
                    {selectedItem.description}
                  </motion.p>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="h-px bg-gradient-to-r from-[#800020] to-transparent" />
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                      <span className="w-1 h-6 sm:h-8 bg-[#800020] rounded-full" />
                      Informasi Lengkap
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                      {selectedItem.details}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-6 sm:mt-8 md:mt-10"
                  >
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="w-full bg-[#800020] text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl hover:shadow-2xl hover:shadow-rose-500/50 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base touch-manipulation"
                    >
                      Tutup
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Carousel;