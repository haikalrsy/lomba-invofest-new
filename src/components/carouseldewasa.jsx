import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'motion/react';

const DEFAULT_ITEMS = [
  {
    id: 1,
    title: "Burnout di Dunia Kerja",
    image: "https://tse2.mm.bing.net/th/id/OIP.NOOk5jcg9Qn7DpmYw7YY8QHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Kelelahan fisik dan mental akibat tuntutan kerja. Kenali tanda-tandanya.",
    details:
      "Burnout menyebabkan hilangnya motivasi, energi menurun, dan emosi tidak stabil. Cara mengatasinya: istirahat teratur, olahraga singkat, kurangi lembur, dan evaluasi batasan kerja."
  },
  {
    id: 2,
    title: "Kesehatan Mental Dewasa",
    image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg",
    description:
      "Tekanan hidup meningkatkan kecemasan, overthinking, dan stres.",
    details:
      "Rutinitas dewasa rentan memicu stres. Cobalah journaling, meditasi, olahraga ringan, dan minta bantuan profesional bila perlu."
  },
  {
    id: 3,
    title: "Quarter-Life Crisis",
    image: "https://images.pexels.com/photos/2950003/pexels-photo-2950003.jpeg",
    description:
      "Fase kebingungan arah hidup, karier, dan identitas di usia 20–35.",
    details:
      "Normal merasa tertinggal dari orang lain. Fokus pada tujuan kecil, kurangi membandingkan diri, dan nikmati proses perkembangan."
  },
  {
    id: 4,
    title: "Tekanan Finansial",
    image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg",
    description:
      "Krisis ekonomi dan kebutuhan hidup membuat banyak dewasa stres.",
    details:
      "Buat anggaran bulanan, catat pengeluaran, batasi impulsive buying, dan sisihkan dana darurat sedikit demi sedikit."
  },
  {
    id: 5,
    title: "Kesehatan Fisik",
    image: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
    description:
      "Gaya hidup dewasa sering kurang gerak, memicu kelelahan tubuh.",
    details:
      "Lakukan aktivitas 20–30 menit per hari, perbanyak air putih, kurangi makanan ultra-proses, dan perbaiki jam tidur."
  },
  {
    id: 6,
    title: "Hubungan & Keluarga",
    image: "https://images.pexels.com/photos/4100426/pexels-photo-4100426.jpeg",
    description:
      "Konflik pasangan dan keluarga sering memicu stres emosional.",
    details:
      "Komunikasi terbuka, kejujuran, dan batasan sehat membantu menjaga hubungan tetap harmonis."
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

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % items.length);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x > threshold) handlePrev();
    else if (info.offset.x < -threshold) handleNext();
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-7xl">
        
        {/* TITLE REMAJA */}
        <motion.h1 
          style={{fontFamily: 'Satoshi, sans-serif'}}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 md:mb-12 text-gray-900 px-2"
        >
          Isu Kesehatan & Kehidupan Remaja 2024–2025
        </motion.h1>

        <div className="relative" ref={containerRef}>
          
          {/* ARROWS */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-3 shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* SLIDER */}
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
                <motion.div key={item.id} className="min-w-full px-2 sm:px-4 md:px-8">
                  <motion.div
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative h-48 sm:h-64 md:h-96 overflow-hidden">
                        <motion.img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                        />
                      </div>

                      <div className="p-4 sm:p-6 md:p-10 flex flex-col justify-center">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3">
                          {item.title}
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4">
                          {item.description}
                        </p>
                        <button className="bg-[#800020] text-white px-6 py-3 rounded-xl font-bold">
                          Baca Selengkapnya
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-40"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-4 sm:inset-10 bg-gray-900 rounded-2xl z-50 overflow-hidden"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-white/10 p-3 rounded-full"
              >
                ✕
              </button>

              <div className="flex flex-col md:flex-row h-full">
                
                <div className="md:w-1/2 h-56 md:h-full">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                <div className="md:w-1/2 p-6 overflow-y-auto">
                  
                  {/* TAG REMAJA */}
                  <div className="inline-block px-4 py-2 bg-rose-500/20 rounded-full text-rose-400 font-bold mb-4">
                    🧠 Topik Remaja
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                    {selectedItem.title}
                  </h2>

                  <p className="text-lg text-rose-300 font-semibold mb-4">
                    {selectedItem.description}
                  </p>

                  <h3 className="text-xl font-bold text-white mb-2">
                    Informasi Penting untuk Remaja
                  </h3>

                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    {selectedItem.details}
                  </p>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full bg-[#800020] text-white py-3 rounded-xl font-bold"
                  >
                    Tutup
                  </button>

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Carousel;
