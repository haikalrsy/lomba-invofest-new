import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSection, setHoveredSection] = useState(null);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const linkVariants = {
    rest: { x: 0, color: "#ffffff" },
    hover: {
      x: 5,
      color: "#ffc0cb",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className="relative mt-10 sm:mt-16 md:mt-20 overflow-hidden  ">
      {/* Animated Background Shapes */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(255, 192, 203, 0.1) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Particles - Hidden on mobile */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-pink-300 rounded-full opacity-20 hidden sm:block"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Wave SVG with Animation */}
      <div className="relative block leading-none">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto block"
          style={{ display: 'block' }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <motion.path
            fill="#800020"
            fillOpacity="1"
            d="M0,0L40,26.7C80,53,160,107,240,128C320,149,400,139,480,165.3C560,192,640,256,720,245.3C800,235,880,149,960,133.3C1040,117,1120,171,1200,186.7C1280,203,1360,181,1400,170.7L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            animate={{
              d: [
                "M0,0L40,26.7C80,53,160,107,240,128C320,149,400,139,480,165.3C560,192,640,256,720,245.3C800,235,880,149,960,133.3C1040,117,1120,171,1200,186.7C1280,203,1360,181,1400,170.7L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z",
                "M0,10L40,32C80,53,160,96,240,112C320,128,400,128,480,144C560,160,640,192,720,197.3C800,203,880,181,960,165.3C1040,149,1120,139,1200,154.7C1280,171,1360,213,1400,234.7L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z",
                "M0,0L40,26.7C80,53,160,107,240,128C320,149,400,139,480,165.3C560,192,640,256,720,245.3C800,235,880,149,960,133.3C1040,117,1120,171,1200,186.7C1280,203,1360,181,1400,170.7L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.svg>
      </div>

      {/* Footer Content */}
      <div className="relative -mt-1" style={{ backgroundColor: '#800020' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 relative z-10">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-white"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* About Us */}
            <motion.div
              variants={itemVariants}
              onHoverStart={() => setHoveredSection('about')}
              onHoverEnd={() => setHoveredSection(null)}
              className="relative"
            >
              <div className="relative">
                <motion.h3
                  className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
                  style={{ fontFamily: 'Chetta, sans-serif' }}
                  animate={{
                    scale: hoveredSection === 'about' ? 1.05 : 1,
                  }}
                >
                  About Us
                </motion.h3>
                <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'About', path: '/about' }
                  ].map((item, index) => (
                    <motion.li
                      key={item.name}
                      variants={linkVariants}
                      initial="rest"
                      whileHover="hover"
                      custom={index}
                    >
                      <Link
                        to={item.path}
                        className="flex items-center group"
                      >
                        <motion.span
                          className="mr-2 opacity-0 group-hover:opacity-100"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          →
                        </motion.span>
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Resources */}
            <motion.div
              variants={itemVariants}
              onHoverStart={() => setHoveredSection('resources')}
              onHoverEnd={() => setHoveredSection(null)}
              className="relative"
            >
              <div className="relative">
                <motion.h3
                  className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
                  style={{ fontFamily: 'Chetta, sans-serif' }}
                  animate={{
                    scale: hoveredSection === 'resources' ? 1.05 : 1,
                  }}
                >
                  Resources
                </motion.h3>
                <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {[
                    { name: 'kemkes.go.id', url: 'https://www.kemkes.go.id' },
                    { name: 'alodokter.com', url: 'https://www.alodokter.com' },
                    { name: 'unsplash', url: 'https://unsplash.com' },
                    { name: 'vecteezy', url: 'https://www.vecteezy.com' },
                    { name: 'unicef', url: 'https://www.unicef.org' }
                  ].map((item, index) => (
                    <motion.li
                      key={item.name}
                      variants={linkVariants}
                      initial="rest"
                      whileHover="hover"
                      custom={index}
                    >
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center group break-all"
                      >
                        <motion.span
                          className="mr-2 opacity-0 group-hover:opacity-100"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          →
                        </motion.span>
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              variants={itemVariants}
              onHoverStart={() => setHoveredSection('contact')}
              onHoverEnd={() => setHoveredSection(null)}
              className="relative"
            >
              <div className="relative">
                <motion.h3
                  className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
                  style={{ fontFamily: 'Chetta, sans-serif' }}
                  animate={{
                    scale: hoveredSection === 'contact' ? 1.05 : 1,
                  }}
                >
                  Contact
                </motion.h3>
                <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {[
                    { name: 'SMK Negeri 46 Jakarta', path: '/contact' },
                    { name: 'HealthySelf', path: '/contact' }
                  ].map((item, index) => (
                    <motion.li
                      key={item.name}
                      variants={linkVariants}
                      initial="rest"
                      whileHover="hover"
                      custom={index}
                    >
                      <Link 
                        to={item.path}
                        className="flex items-center group"
                      >
                        <motion.span
                          className="mr-2 opacity-0 group-hover:opacity-100"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          →
                        </motion.span>
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              variants={itemVariants}
              onHoverStart={() => setHoveredSection('newsletter')}
              onHoverEnd={() => setHoveredSection(null)}
              className="relative sm:col-span-2 lg:col-span-1"
            >
              <div className="relative">
                <motion.h3
                  className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
                  style={{ fontFamily: 'Chetta, sans-serif' }}
                  animate={{
                    scale: hoveredSection === 'newsletter' ? 1.05 : 1,
                  }}
                >
                  
                </motion.h3>
                <motion.p
                  className="mb-3 sm:mb-4 text-pink-100 text-sm sm:text-base"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Subscribe to get health tips and updates
                </motion.p>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                    <motion.input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full sm:flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full text-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                      whileFocus={{
                        scale: 1.02,
                        boxShadow: "0 0 20px rgba(255, 192, 203, 0.5)"
                      }}
                    />
                    <motion.button
                      onClick={handleSubscribe}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 5px 15px rgba(255, 255, 255, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base bg-white text-[#800020] rounded-full font-semibold hover:bg-pink-50 transition-colors relative overflow-hidden"
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-pink-200 to-white opacity-0 pointer-events-none rounded-inherit"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10">Subscribe</span>
                    </motion.button>
                  </div>
                  {isSubscribed && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-pink-100 text-xs sm:text-sm flex items-center gap-2"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        ✓
                      </motion.span>
                      Successfully subscribed!
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-pink-800 text-center text-pink-100 relative text-xs sm:text-sm"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            <motion.p
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              © 2024 HealthyMe. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Footer;