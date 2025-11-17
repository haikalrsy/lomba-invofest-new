import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/navbar';
import tirta from '../assets/images/tirta.png';
import home from '../assets/images/home.png';

function MainContent() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState('');

  const categories = ['Bayi', 'Anak-anak', 'Remaja', 'Dewasa', 'Lansia'];
  
  // Data suggestions dengan route untuk navigasi
  const suggestionData = [
    { label: 'Bayi', route: '/kategori/bayi', keywords: ['bayi', 'baby'] },
    { label: 'Anak-anak', route: '/kategori/anak-anak', keywords: ['anak', 'anak-anak', 'children'] },
    { label: 'Remaja', route: '/kategori/remaja', keywords: ['remaja', 'teenager'] },
    { label: 'Dewasa', route: '/kategori/dewasa', keywords: ['dewasa', 'adult'] },
    { label: 'Lansia', route: '/kategori/lansia', keywords: ['lansia', 'elderly'] },
    { label: 'Makanan Bayi', route: '/kategori/bayi', keywords: ['makanan bayi', 'mpasi'] },
    { label: 'Nutrisi Anak', route: '/kategori/anak-anak', keywords: ['nutrisi anak', 'gizi anak'] },
    { label: 'Diet Remaja', route: '/kategori/remaja', keywords: ['diet remaja', 'pola makan remaja'] },
    { label: 'Menu Dewasa', route: '/kategori/dewasa', keywords: ['menu dewasa', 'makanan dewasa'] },
    { label: 'Makanan Lansia', route: '/kategori/lansia', keywords: ['makanan lansia', 'nutrisi lansia'] }
  ];

  const filteredSuggestions = searchQuery
    ? suggestionData.filter(suggestion =>
        suggestion.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        ) || suggestion.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearch = () => {
    if (selectedRoute) {
      // Navigate ke route yang dipilih
      navigate(selectedRoute);
      setShowSuggestions(false);
    } else if (searchQuery) {
      // Jika user langsung search tanpa pilih suggestion
      const matchedSuggestion = suggestionData.find(s => 
        s.label.toLowerCase() === searchQuery.toLowerCase()
      );
      if (matchedSuggestion) {
        navigate(matchedSuggestion.route);
      } else {
        // Fallback ke halaman search results
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
      setShowSuggestions(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log('Selected category:', category);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.label);
    setSelectedRoute(suggestion.route);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedRoute(''); // Reset route ketika user mengetik manual
    setShowSuggestions(e.target.value.length > 0);
  };

  return (
  
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 overflow-hidden " id='home'>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative px-8 py-12 pt-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{fontFamily : 'Satoshi, sans-serif'}}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  style={{ color: '#800020', display: 'inline-block' }}
                >
                  One Step Solution
                </motion.span>
                <br />
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-gray-900"
                  style={{ display: 'inline-block' }}
                >
                  for all your dietary
                </motion.span>
                <br />
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-gray-900"
                  style={{ display: 'inline-block' }}
                >
                  needs.
                </motion.span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-gray-600 text-lg mb-8 max-w-md mx-auto md:mx-0"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Using your BMI index we calculate whether the dish is suitable
              for you.
            </motion.p>

            {/* Selected Category Display */}
            <AnimatePresence>
              {selectedCategory && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 text-center md:text-left"
                >
                  <span className="text-sm text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Kategori terpilih: <span className="font-semibold" style={{ color: '#800020' }}>{selectedCategory}</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="relative max-w-md mx-auto md:mx-0"
            >
              <input
                type="text"
                placeholder="Search Your Categories..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                className="w-full px-6 py-4 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800020]/50 transition-all duration-150 ease-in-out"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              />
              <motion.button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full text-white"
                style={{ backgroundColor: '#800020' }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-40 max-h-60 overflow-y-auto"
                  >
                    {filteredSuggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-6 py-3 text-gray-700 hover:bg-pink-50 transition-colors flex items-center gap-3"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                        whileHover={{ x: 5, backgroundColor: '#fdf2f8' }}
                      >
                        <Search className="w-4 h-4 text-gray-400" />
                        <span>
                          {suggestion.label.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) => 
                            part.toLowerCase() === searchQuery.toLowerCase() ? (
                              <span key={i} className="font-semibold" style={{ color: '#800020' }}>{part}</span>
                            ) : (
                              <span key={i}>{part}</span>
                            )
                          )}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right - Image */}
          <motion.div 
            initial={{ opacity: 0, x: 100, rotate: -30 }}
            animate={{ opacity: 1, x: 0, rotate: -15 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="relative flex items-center justify-center py-12"
          >
            {/* Blood Particles - Top Right */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`particle-tr-${i}`}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 6 + 3 + 'px',
                  height: Math.random() * 6 + 3 + 'px',
                  backgroundColor: '#DC143C',
                  opacity: 0.4,
                  top: '35%',
                  right: '25%',
                }}
                animate={{
                  x: [0, Math.random() * 70 + 30],
                  y: [0, Math.random() * -60 - 20],
                  opacity: [0, 0.5, 0],
                  scale: [0, 1.2, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Blood Particles - Top Left */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`particle-tl-${i}`}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 6 + 3 + 'px',
                  height: Math.random() * 6 + 3 + 'px',
                  backgroundColor: '#8B0000',
                  opacity: 0.4,
                  top: '35%',
                  left: '25%',
                }}
                animate={{
                  x: [0, -(Math.random() * 70 + 30)],
                  y: [0, Math.random() * -60 - 20],
                  opacity: [0, 0.5, 0],
                  scale: [0, 1.2, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3 + 0.8,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Blood Particles - Bottom Right */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`particle-br-${i}`}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 6 + 3 + 'px',
                  height: Math.random() * 6 + 3 + 'px',
                  backgroundColor: '#B22222',
                  opacity: 0.4,
                  bottom: '35%',
                  right: '28%',
                }}
                animate={{
                  x: [0, Math.random() * 60 + 25],
                  y: [0, Math.random() * 60 + 25],
                  opacity: [0, 0.5, 0],
                  scale: [0, 1.2, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.35,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Blood Particles - Bottom Left */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`particle-bl-${i}`}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 6 + 3 + 'px',
                  height: Math.random() * 6 + 3 + 'px',
                  backgroundColor: '#CD5C5C',
                  opacity: 0.4,
                  bottom: '35%',
                  left: '28%',
                }}
                animate={{
                  x: [0, -(Math.random() * 60 + 25)],
                  y: [0, Math.random() * 60 + 25],
                  opacity: [0, 0.5, 0],
                  scale: [0, 1.2, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.35 + 0.8,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Pulsing Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(220, 20, 60, 0.2) 0%, rgba(220, 20, 60, 0) 70%)',
                filter: 'blur(30px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [-15, -15.5, -15]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-[300px] md:w-[400px] h-[350px] md:h-[450px] z-10"
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(128, 0, 32, 0.2))',
              }}
            >
              <motion.img
                animate={{
                  filter: [
                    'brightness(1) contrast(1)',
                    'brightness(1.05) contrast(1.02)',
                    'brightness(1) contrast(1)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                src={home}
                alt="DNA Helix"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      

      {/* Doctor's Quote Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative px-8 pb-16 max-w-5xl mx-auto"
      >
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-left">
          {/* Doctor Image */}
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex justify-center md:justify-start"
          >
          <img
            src={tirta}
            alt="Doctor"
            className="w-full h-full md:w-[420px] md:h-[380px] object-contain drop-shadow-2xl"
          />

          </motion.div>

          {/* Quote */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <svg 
                className="w-12 h-12 md:w-16 md:h-16 mb-6 opacity-20" 
                fill="#800020" 
                viewBox="0 0 24 24"
              >
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
              
              <p 
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-relaxed text-gray-900"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
              "Olahraga sebagai Wujud Syukur atas Kesehatan."
              </p>

              <div className="flex items-center gap-4">
                <div className="h-0.5 w-16 bg-gradient-to-r from-[#800020] to-transparent"></div>
                <div>
                  <p 
                    className="text-xl md:text-2xl font-bold mb-1" 
                    style={{ fontFamily: 'Chetta, sans-serif', color: '#800020' }}
                  >
                    Dr.Tirta
                  </p>
                  <p 
                    className="text-base md:text-lg text-gray-600" 
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Dokter Kesehatan
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Footer with Wave */}
    </div>
  );
}

// Halaman About
function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Content */}
      <div className="pt-32 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-8"
            style={{ fontFamily: 'Chetta, sans-serif', color: '#800020' }}
          >
            About HealthyMe
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-700 mb-6"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            HealthyMe is your comprehensive dietary companion, designed to help you make informed nutritional choices based on your BMI and health goals.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-700"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Our platform combines expert nutritional advice with personalized recommendations to support your journey towards better health.
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
export { AboutPage };