import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AidImage from '../assets/images/aid.png';

export default function HealthyMeLanding() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const categories = ['Bayi', 'Anak-anak', 'Remaja', 'Dewasa', 'Lansia'];
  
  const allSuggestions = [
    'Bayi',
    'Anak-anak', 
    'Remaja',
    'Dewasa',
    'Lansia',
    'Makanan Bayi',
    'Nutrisi Anak',
    'Diet Remaja',
    'Menu Dewasa',
    'Makanan Lansia'
  ];

  const filteredSuggestions = searchQuery
    ? allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    console.log('Selected category:', selectedCategory);
    setShowSuggestions(false);
    alert(`Mencari: "${searchQuery}" di kategori: ${selectedCategory || 'Semua'}`);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
    console.log('Selected category:', category);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 flex items-center justify-between px-8 py-6" 
        style={{fontFamily: 'Satoshi, sans-serif'}}
      >
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <h1
            className="text-3xl font-bold text-center"
            style={{ color: '#800020', fontFamily: 'Chetta, sans-serif' }}
          >
            HealthyMe
          </h1>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <img
              src={AidImage}
              alt="aid"
              className="w-10 h-10 rounded-full object-cover -mt-2"
            />
          </motion.div>
        </motion.div>

        <div className="flex items-center gap-8">
          <motion.a
            href="#"
            className="text-gray-700 hover:text-gray-900 font-medium"
            whileHover={{ scale: 1.1, color: '#800020' }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Home
          </motion.a>
          <motion.a
            href="#"
            className="text-gray-700 hover:text-gray-900 font-medium"
            whileHover={{ scale: 1.1, color: '#800020' }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            About Us
          </motion.a>
          
          {/* Kategori Dropdown */}
          <div className="relative">
            <motion.button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Kategori
              <motion.div
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[150px] z-30"
                >
                  {categories.map((category, index) => (
                    <motion.button
                      key={category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleCategorySelect(category)}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-gray-900 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            className="px-6 py-2 text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#800020' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Log In
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative px-8 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-8"
            >
              <span
                className="text-gray-600 font-medium"
                style={{ fontFamily: 'Chetta, sans-serif', fontSize: '1.5rem', fontWeight: '500'}}
              >
                Health Matters
              </span>
              <motion.img
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                src='https://cdn3.iconfinder.com/data/icons/medical-2267/512/Heart_Rate.png'
                alt="aid"
                className="w-10 h-10 rounded-full object-cover -mt-1"
              /> 
            </motion.div>

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
                          {suggestion.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) => 
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
                src="https://smart.servier.com/wp-content/uploads/2016/10/regurgitation_mitrale_aigue.png"
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
              src="https://static.vecteezy.com/system/resources/previews/041/408/858/non_2x/ai-generated-a-smiling-doctor-with-glasses-and-a-white-lab-coat-isolated-on-transparent-background-free-png.png"
              alt="Doctor"
              className="w-64 h-64 md:w-72 md:h-72 object-contain drop-shadow-2xl items-left"
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
                className="text-2xl md:text-3xl lg:text-4xl font-medium mb-8 leading-relaxed text-gray-800"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                "Proper nutrition is the foundation of good health. HealthyMe makes it easier for everyone to make informed dietary choices tailored to their individual needs."
              </p>

              <div className="flex items-center gap-4">
                <div className="h-0.5 w-16 bg-gradient-to-r from-[#800020] to-transparent"></div>
                <div>
                  <p 
                    className="text-xl md:text-2xl font-bold mb-1" 
                    style={{ fontFamily: 'Chetta, sans-serif', color: '#800020' }}
                  >
                    Dr. Sarah Anderson
                  </p>
                  <p 
                    className="text-base md:text-lg text-gray-600" 
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Clinical Nutritionist & Health Specialist
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Footer with Wave */}
      <div className="relative mt-20">
        {/* Wave SVG */}
        <div className="relative">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#800020" fill-opacity="1" d="M0,0L40,26.7C80,53,160,107,240,128C320,149,400,139,480,165.3C560,192,640,256,720,245.3C800,235,880,149,960,133.3C1040,117,1120,171,1200,186.7C1280,203,1360,181,1400,170.7L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
        </div>

        {/* Footer Content */}
        <div className="relative -mt-1" style={{ backgroundColor: '#800020' }}>
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
              {/* About Us */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Chetta, sans-serif' }}>
                  About Us
                </h3>
                <ul className="space-y-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <li>
                    <a href="#" className="hover:text-pink-200 transition-colors">Our Mission</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-200 transition-colors">Team</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-200 transition-colors">About</a>
                  </li>
                </ul>
              </motion.div>

              {/* Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Chetta, sans-serif' }}>
                  Resources
                </h3>
                <ul className="space-y-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <li>
                    <a href="#" className="hover:text-pink-200 transition-colors">kemkes.go.id</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-200 transition-colors">alodokter.com</a>
                  </li>
                    <li>
                    <a href="#" className="hover:text-pink-200 transition-colors">unsplash</a>
                  </li>
                    <li>
                    <a href="#" className="hover:text-pink-200 transition-colors">vecteezy</a>
                  </li>
                    <li>
                    <a href="#" className="hover:text-pink-200 transition-colors">unicef</a>
                  </li>
                </ul>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Chetta, sans-serif' }}>
                  Contact
                </h3>
                <ul className="space-y-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <li>
                    <a href="#" className="hover:text-pink-200 transition-colors">SMK Negeri 46 Jakarta</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-200 transition-colors">HealthySelf</a>
                  </li>
                </ul>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Chetta, sans-serif' }}>
                  Newsletter
                </h3>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email..."
                    className="flex-1 px-4 py-2 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-pink-300"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-white text-[#800020] rounded-full font-semibold hover:bg-pink-100 transition-colors"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-white/50` text-center text-gray-300 text-left  "
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              <p>Dibuat Oleh Tim <span className='text-white' style={{fontFamily:'Chetta, sans-serif'}}>HealthySelf</span></p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}