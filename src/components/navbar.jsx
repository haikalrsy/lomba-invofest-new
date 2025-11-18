import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import AidImage from '../assets/images/aid.png';

export default function Navbar() {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { name: 'Balita', path: '/kategori/bayi' },
    { name: 'Anak-anak', path: '/kategori/anak-anak' },
    { name: 'Remaja', path: '/kategori/remaja' },
    { name: 'Dewasa', path: '/kategori/dewasa' },
    { name: 'Lansia', path: '/kategori/lansia' }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  // Cek apakah di halaman home
  const isHome = location.pathname === '/';
  
  // Cek apakah di halaman about
  const isAbout = location.pathname === '/about';
  
  // Cek apakah di halaman kategori
  const isKategori = location.pathname.startsWith('/kategori/');

  return (
    <>
      <div 
        className="fixed top-0 right-0 left-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 lg:pt-6 text-center"
        style={{
          transform: isScrolled ? 'translateY(0)' : 'translateY(0)',
          transition: 'transform 0.3s ease'
        }}
      >
        <nav
          style={{
            fontFamily: 'Satoshi, sans-serif',
            transform: isScrolled ? 'scale(0.95)' : 'scale(1)',
            transition: 'all 0.3s ease'
          }}
          className={`
            max-w-7xl mx-auto
            flex items-center justify-between
            px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4
            rounded-full
            backdrop-blur-md
            transition-all duration-300
            ${isScrolled 
              ? 'bg-white/90 border border-gray-200/50 shadow-xl' 
              : 'bg-white/70 border border-white/30'
            }
          `}
        >
          {/* Logo */}
          <div 
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            style={{
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h1
              className="text-2xl sm:text-2xl lg:text-3xl font-bold text-center"
              style={{ color: '#800020', fontFamily: 'Chetta, sans-serif' }}
            >
              HealthyCare
            </h1>
            <img
              src={AidImage}
              alt="aid"
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full object-cover -mt-1 sm:-mt-1.5 lg:-mt-2"
              style={{
                animation: 'wiggle 2s infinite',
                animationDelay: '3s'
              }}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 right-10 text-center">
            <a
              href="/"
              onClick={handleLinkClick}
              className={`font-medium transition-all duration-300 ${
                isHome ? 'text-[#800020] font-semibold' : 'text-gray-700 hover:text-gray-900'
              }`}
              style={{
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Home
            </a>
            
            <a
              href="/about"
              onClick={handleLinkClick}
              className={`font-medium transition-all duration-300 ${
                isAbout ? 'text-[#800020] font-semibold' : 'text-gray-700 hover:text-gray-900'
              }`}
              style={{
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              About Us
            </a>
            
            {/* Desktop Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-2 font-medium transition-all duration-300 ${
                  isKategori ? 'text-[#800020] font-semibold' : 'text-gray-700 hover:text-gray-900'
                }`}
                style={{
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Kategori
                <ChevronDown 
                  className="w-4 h-4"
                  style={{
                    transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </button>
              
              {dropdownOpen && (
                <div 
                  className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[150px] z-30"
                  style={{
                    animation: 'dropdownFadeIn 0.2s ease-out'
                  }}
                >
                  {categories.map((category, index) => (
                    <a
                      key={category.name}
                      href={category.path}
                      onClick={handleLinkClick}
                      className={`block w-full text-left px-4 py-2 transition-all duration-200 ${
                        location.pathname === category.path
                          ? 'bg-pink-50 text-[#800020] font-semibold'
                          : 'text-gray-700 hover:bg-pink-50 hover:text-gray-900'
                      }`}
                      style={{
                        animation: `slideIn 0.2s ease-out ${index * 0.05}s backwards`,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              className="px-4 xl:px-6 py-2 text-white rounded-full font-semibold transition-all duration-300"
              style={{ 
                backgroundColor: '#800020',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(128, 0, 32, 0.3)';
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.opacity = '1';
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            >
              Log In
            </button>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 lg:hidden shadow-2xl transform transition-transform duration-300 ease-out"
        style={{
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)'
        }}
      >
        <div className="p-6 space-y-6">
          {/* Close Button */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#800020]">Menu</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-1">
            <a
              href="/"
              onClick={handleLinkClick}
              className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                isHome
                  ? 'bg-[#800020] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Home
            </a>
            
            <a
              href="/about"
              onClick={handleLinkClick}
              className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                isAbout
                  ? 'bg-[#800020] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              About Us
            </a>
          </div>

          {/* Mobile Categories */}
          <div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center justify-between w-full px-4 py-3 font-medium rounded-lg transition-all ${
                isKategori
                  ? 'bg-pink-50 text-[#800020]'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Kategori
              <ChevronDown 
                className="w-4 h-4"
                style={{
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              />
            </button>
            
            {dropdownOpen && (
              <div 
                className="mt-2 space-y-1 pl-4"
                style={{ animation: 'fadeIn 0.2s ease-out' }}
              >
                {categories.map((category) => (
                  <a
                    key={category.name}
                    href={category.path}
                    onClick={handleLinkClick}
                    className={`block px-4 py-2 rounded-lg text-sm transition-all ${
                      location.pathname === category.path
                        ? 'bg-pink-100 text-[#800020] font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Login Button */}
          <button 
            className="w-full px-6 py-3 text-white rounded-full font-semibold transition-all shadow-md"
            style={{ backgroundColor: '#800020' }}
          >
            Log In
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes dropdownFadeIn {
          from { 
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateX(-20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
        }
      `}</style>
    </>
  );
}