import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronRight, Activity, AlertCircle, Heart, Thermometer, Sparkles } from 'lucide-react';

const BabyDiseasePlatform = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  const diseases = [
    {
      id: 'pneumonia',
      name: 'Pneumonia',
      icon: Activity,
      description: 'Infeksi paru-paru yang menyebabkan kesulitan bernapas',
      stats: '15% kasus kematian bayi di dunia',
      symptoms: ['Batuk berdahak', 'Demam tinggi', 'Napas cepat', 'Sesak napas'],
      prevention: ['Vaksinasi pneumokokus', 'ASI eksklusif', 'Hindari asap rokok', 'Kebersihan tangan'],
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80'
    },
    {
      id: 'diare',
      name: 'Diare Akut',
      icon: AlertCircle,
      description: 'Gangguan pencernaan yang menyebabkan dehidrasi',
      stats: '9% kematian bayi global',
      symptoms: ['Feses cair berlebihan', 'Muntah', 'Demam ringan', 'Lemas'],
      prevention: ['Air bersih', 'Sanitasi baik', 'Cuci tangan', 'Rotavirus vaccine'],
      image: 'https://images.unsplash.com/photo-1631248055945-c62c2e1f8a93?w=800&q=80'
    },
    {
      id: 'malaria',
      name: 'Malaria',
      icon: Thermometer,
      description: 'Penyakit menular yang disebabkan parasit',
      stats: '5% kematian bayi terutama di Afrika',
      symptoms: ['Demam tinggi', 'Menggigil', 'Berkeringat', 'Anemia'],
      prevention: ['Kelambu anti-nyamuk', 'Obat anti-malaria', 'Semprot insektisida', 'Drainase air'],
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80'
    },
    {
      id: 'sepsis',
      name: 'Sepsis Neonatal',
      icon: Heart,
      description: 'Infeksi darah yang mengancam jiwa bayi baru lahir',
      stats: '13% kematian neonatal',
      symptoms: ['Suhu tubuh tidak stabil', 'Napas tidak teratur', 'Tidak mau menyusu', 'Kulit kebiruan'],
      prevention: ['Persalinan higienis', 'Perawatan tali pusat', 'ASI dini', 'Deteksi dini infeksi'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80'
    }
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview Penyakit Bayi Global', icon: '🌍' },
    { id: 'diseases', label: 'Penyakit yang Marak Terjadi', icon: '🏥' },
    { id: 'prevention', label: 'Pencegahan & Perawatan', icon: '💊' },
    { id: 'statistics', label: 'Statistik Kesehatan Bayi', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-white flex">
      {/* Sidebar */}
      <motion.div 
        className="w-80 bg-gradient-to-b from-burgundy-900 to-burgundy-800 text-white p-8 fixed h-screen overflow-y-auto"
        style={{ background: 'linear-gradient(180deg, #800020 0%, #5c0017 100%)' }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-2xl font-bold mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Platform Kesehatan
        </motion.h1>
        <p className="text-rose-200 mb-8 text-sm">Penyakit Bayi Global</p>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all ${
                activeSection === item.id 
                  ? 'bg-white text-burgundy-900 shadow-lg' 
                  : 'hover:bg-white/10'
              }`}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ x: 5 }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
              {activeSection === item.id && <ChevronRight className="ml-auto" size={16} />}
            </motion.button>
          ))}
        </nav>

        <motion.div 
          className="mt-12 p-4 bg-white/10 rounded-lg backdrop-blur-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-semibold mb-2 text-sm">Info Penting</h3>
          <p className="text-xs text-rose-200">
            Setiap tahun, jutaan bayi di dunia terkena penyakit yang sebenarnya dapat dicegah dengan pengetahuan dan perawatan yang tepat.
          </p>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="ml-80 flex-1 p-12">
        <AnimatePresence mode="wait">
          {activeSection === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <h2 className="text-5xl font-bold mb-4" style={{ color: '#800020' }}>
                  Transformasi Kesehatan Bayi dengan Pengetahuan
                </h2>
                <p className="text-gray-700 text-lg max-w-3xl">
                  Membangun masa depan kesehatan bayi Indonesia melalui edukasi dan pencegahan penyakit yang marak terjadi di dunia
                </p>
              </div>

              <motion.div 
                className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 h-96"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=80" 
                  alt="Baby Healthcare"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/80 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <h3 className="text-3xl font-bold mb-2">Kesehatan Bayi adalah Prioritas</h3>
                    <p className="text-rose-100">Kenali penyakit, pahami gejala, lakukan pencegahan</p>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: '5.2 Juta', label: 'Kematian Bayi per Tahun', icon: '👶' },
                  { number: '75%', label: 'Dapat Dicegah', icon: '🛡️' },
                  { number: '45%', label: 'Terjadi di Asia & Afrika', icon: '🌏' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-rose-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(128, 0, 32, 0.15)' }}
                  >
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <div className="text-3xl font-bold mb-2" style={{ color: '#800020' }}>
                      {stat.number}
                    </div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'diseases' && (
            <motion.div
              key="diseases"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-8" style={{ color: '#800020' }}>
                Penyakit yang Marak Terjadi pada Bayi
              </h2>

              <div className="grid gap-6">
                {diseases.map((disease, index) => (
                  <motion.div
                    key={disease.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-rose-100"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ boxShadow: '0 20px 40px rgba(128, 0, 32, 0.2)' }}
                  >
                    <div className="grid md:grid-cols-3 gap-6 p-6">
                      <div className="md:col-span-1">
                        <div className="relative rounded-xl overflow-hidden h-48 mb-4">
                          <img 
                            src={disease.image} 
                            alt={disease.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-white rounded-full p-2">
                            <disease.icon size={24} style={{ color: '#800020' }} />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2" style={{ color: '#800020' }}>
                          {disease.name}
                        </h3>
                        <p className="text-sm text-rose-600 font-semibold mb-2">{disease.stats}</p>
                        <p className="text-gray-600 text-sm">{disease.description}</p>
                      </div>

                      <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 text-burgundy-900">Gejala Utama:</h4>
                          <ul className="space-y-2">
                            {disease.symptoms.map((symptom, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm">
                                <span className="text-rose-600 mt-1">•</span>
                                <span className="text-gray-700">{symptom}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 text-burgundy-900">Pencegahan:</h4>
                          <ul className="space-y-2">
                            {disease.prevention.map((prev, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm">
                                <span className="text-green-600 mt-1">✓</span>
                                <span className="text-gray-700">{prev}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'prevention' && (
            <motion.div
              key="prevention"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-8" style={{ color: '#800020' }}>
                Pencegahan & Perawatan
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Imunisasi Lengkap',
                    desc: 'Pastikan bayi mendapat vaksinasi sesuai jadwal untuk perlindungan optimal',
                    icon: '💉',
                    items: ['BCG', 'Hepatitis B', 'Polio', 'DPT', 'Campak']
                  },
                  {
                    title: 'ASI Eksklusif',
                    desc: 'Berikan ASI eksklusif 6 bulan untuk meningkatkan sistem imun',
                    icon: '🍼',
                    items: ['Antibodi alami', 'Nutrisi lengkap', 'Bonding ibu-bayi', 'Ekonomis']
                  },
                  {
                    title: 'Sanitasi & Kebersihan',
                    desc: 'Lingkungan bersih mencegah infeksi dan penyakit',
                    icon: '🧼',
                    items: ['Cuci tangan rutin', 'Air bersih', 'Rumah sehat', 'Buang sampah tepat']
                  },
                  {
                    title: 'Nutrisi Seimbang',
                    desc: 'MPASI berkualitas setelah 6 bulan untuk tumbuh kembang optimal',
                    icon: '🥗',
                    items: ['Protein hewani', 'Sayur & buah', 'Karbohidrat', 'Lemak sehat']
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-rose-100"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#800020' }}>
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                    <ul className="space-y-2">
                      {item.items.map((subitem, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm">
                          <span className="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
                          <span className="text-gray-700">{subitem}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'statistics' && (
            <motion.div
              key="statistics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-8" style={{ color: '#800020' }}>
                Statistik Kesehatan Bayi Global
              </h2>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-rose-100 mb-6">
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#800020' }}>
                  Penyebab Utama Kematian Bayi
                </h3>
                <div className="space-y-4">
                  {[
                    { cause: 'Komplikasi Prematur', percentage: 35, color: '#800020' },
                    { cause: 'Pneumonia', percentage: 15, color: '#be123c' },
                    { cause: 'Komplikasi Persalinan', percentage: 12, color: '#e11d48' },
                    { cause: 'Sepsis Neonatal', percentage: 13, color: '#f43f5e' },
                    { cause: 'Diare', percentage: 9, color: '#fb7185' },
                    { cause: 'Malaria', percentage: 5, color: '#fda4af' },
                    { cause: 'Lainnya', percentage: 11, color: '#fecdd3' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{item.cause}</span>
                        <span className="text-sm font-bold" style={{ color: item.color }}>
                          {item.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: 0.2 + 0.1 * index, duration: 0.8 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-burgundy-900 to-burgundy-800 text-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Fakta Penting</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start space-x-2">
                      <span>📍</span>
                      <span>50% kematian bayi terjadi di 5 negara: India, Nigeria, Pakistan, Kongo, Ethiopia</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span>⏰</span>
                      <span>75% kematian bayi terjadi dalam 1 minggu pertama kehidupan</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span>💰</span>
                      <span>Investasi kesehatan ibu hamil dapat menurunkan 30% kematian bayi</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-rose-100">
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#800020' }}>
                    Target Global 2030
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Angka Kematian Bayi</span>
                        <span className="font-bold" style={{ color: '#800020' }}>≤12 per 1000</span>
                      </div>
                      <div className="text-xs text-gray-600">Target SDGs untuk mengurangi kematian bayi</div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Cakupan Imunisasi</span>
                        <span className="font-bold" style={{ color: '#800020' }}>≥90%</span>
                      </div>
                      <div className="text-xs text-gray-600">Target vaksinasi global untuk semua bayi</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BabyDiseasePlatform;