
import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import anak from '../assets/images/anak-anak.png';
import anak1 from '../assets/images/anak.png';
import dot from '../assets/images/dot.png';
import chart from '../assets/images/chart.webp';
import dokter from '../assets/images/dokter.png';
import nutrisi from '../assets/images/nutrisi.webp';
import toy from '../assets/images/TOY.webp';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import Carousel from '../components/carousellansia';
import platfrom from '../components/platfrom';
import { Shield, Heart, Activity, Stethoscope, Thermometer, Wind, Baby, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// === Enhanced 3D Model with Mouse Follow ===
function Model3D({ mousePosition }) {
  const { scene } = useGLTF('/3d/makanan.glb');
  const meshRef = useRef();
  const timeRef = useRef(0);
  const bouncePhaseRef = useRef(0);
  const scalePhaseRef = useRef(0);
  const breathePhaseRef = useRef(0);
  const targetRotation = useRef({ x: 0.3, y: 0.5, z: 0.2 });

  const easeInOutQuint = (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
  const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    timeRef.current += delta;

    const bounceSpeed = 0.18;
    const bounceHeight = 0.9;
    bouncePhaseRef.current += delta * bounceSpeed;
    
    const primaryBounce = Math.abs(Math.sin(bouncePhaseRef.current));
    const secondaryBounce = Math.abs(Math.sin(bouncePhaseRef.current * 1.3 + 0.5)) * 0.15;
    const tertiaryBounce = Math.abs(Math.cos(bouncePhaseRef.current * 0.7)) * 0.08;
    
    const easedPrimary = easeInOutQuint(primaryBounce);
    const combinedBounce = easedPrimary + secondaryBounce + tertiaryBounce;
    const targetY = -0.2 + combinedBounce * bounceHeight;
    
    const smoothness = 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * smoothness;

    const mouseInfluence = 0.3;
    const normalizedX = (mousePosition.x / window.innerWidth - 0.5) * 2;
    const normalizedY = (mousePosition.y / window.innerHeight - 0.5) * 2;
    
    targetRotation.current.y = 0.5 + normalizedX * mouseInfluence;
    targetRotation.current.x = 0.3 - normalizedY * mouseInfluence * 0.5;
    
    const rotationSmoothness = 0.03;
    meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * rotationSmoothness;
    meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * rotationSmoothness;
    meshRef.current.rotation.z += (targetRotation.current.z - meshRef.current.rotation.z) * rotationSmoothness;

    breathePhaseRef.current += delta * 0.3;
    scalePhaseRef.current += delta * 0.25;
    
    const breathe = Math.sin(breathePhaseRef.current) * 0.04;
    const pulse = Math.sin(scalePhaseRef.current) * 0.05;
    const microPulse = Math.cos(scalePhaseRef.current * 2.3) * 0.015;
    
    const combinedScale = 1 + breathe + pulse + microPulse;
    const easedScale = 1 + (combinedScale - 1) * easeInOutCubic(Math.abs(Math.sin(timeRef.current * 0.2)));
    
    const currentScale = meshRef.current.scale.x / 13;
    const targetScale = easedScale;
    const newScale = currentScale + (targetScale - currentScale) * 0.06;
    meshRef.current.scale.set(13 * newScale, 13 * newScale, 13 * newScale);

    const horizontalWave1 = Math.sin(timeRef.current * 0.4) * 0.12;
    const horizontalWave2 = Math.sin(timeRef.current * 0.25 + 1.5) * 0.06;
    const targetX = horizontalWave1 + horizontalWave2;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.045;
    
    const depthWave1 = Math.cos(timeRef.current * 0.35) * 0.10;
    const depthWave2 = Math.cos(timeRef.current * 0.55 + 0.8) * 0.05;
    const targetZ = depthWave1 + depthWave2;
    meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.045;
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={13}
      position={[0, -0.2, 0]}
      rotation={[0.3, 0.5, 0.2]}
    />
  );
}

// === Animated Chart Component (Usia 7–10 Tahun) ===
function AnimatedGrowthChart() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: ['60 Tahun', '65 Tahun', '70 Tahun', '75 Tahun', '80 Tahun'],
    datasets: [
      {
        label: 'Tinggi Badan (cm)',
        data: [0, 0, 0, 0, 0],
        backgroundColor: '#87ceeb',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  });

  // Perkiraan tinggi rata-rata lansia Indonesia (laki-laki & perempuan)
  // Data disesuaikan dengan tren penurunan tinggi karena penuaan
  const finalData = [160, 158, 156, 154, 152]; // dalam cm

  useEffect(() => {
    const animationDuration = 2000;
    const steps = 60;
    const stepDuration = animationDuration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setChartData((prev) => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: finalData.map((value) => value * easedProgress),
          },
        ],
      }));

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#87ceeb',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `Tinggi: ${Math.round(context.parsed.y)} cm`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 140,
        max: 170,
        ticks: {
          color: '#87ceeb',
          font: {
            size: 11,
            weight: '600',
          },
          callback: function (value) {
            return value + ' cm';
          },
        },
        grid: {
          color: 'rgba(128, 0, 32, 0.1)',
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: '#87ceeb',
          font: {
            size: 11,
            weight: '600',
          },
        },
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 0,
    },
  };

  return (
    <div className="w-full h-full">
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
}


// === Accordion Item ===
function AccordionItem({ title, children, isOpen, onClick }) {
  return (
    <motion.div 
      className="border border-sky-300 rounded-xl sm:rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={onClick}
        className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 bg-sky-100 text-sky-900 font-semibold flex justify-between items-center text-sm sm:text-base"
        whileHover={{ backgroundColor: '#e7feff' }}
        whileTap={{ scale: 0.98 }}
      >
        {title}
        <motion.span 
          className="ml-2 text-sky-900 text-lg sm:text-xl"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? '−' : '+'}
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 py-3 sm:py-4 text-sky-900 bg-sky-50 text-sm sm:text-base">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// === Red Accordion Item ===
function RedAccordionItem({ title, children, isOpen, onClick }) {
  return (
    <motion.div 
      className="border border-white/30 rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={onClick}
        className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 bg-white/10 text-white font-semibold flex justify-between items-center text-sm sm:text-base"
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        whileTap={{ scale: 0.98 }}
      >
        {title}
        <motion.span 
          className="ml-2 text-white text-lg sm:text-xl"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 py-3 sm:py-4 text-white bg-white/5 text-sm sm:text-base">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const BabyHealthLanding = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bubbles, setBubbles] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [openRedIndex, setOpenRedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleRedAccordion = (index) => {
    setOpenRedIndex(openRedIndex === index ? null : index);
  };

const accordionData = [
  {
    title: 'Pentingnya Gizi Seimbang untuk Lansia',
    content: 'Gizi seimbang membantu menjaga kesehatan tubuh, imunitas, dan fungsi organ lansia agar tetap optimal.',
  },
  {
    title: 'Aktivitas Fisik Ringan untuk Lansia',
    content: 'Lakukan aktivitas fisik ringan seperti jalan pagi, peregangan, atau senam lansia untuk menjaga kebugaran dan kekuatan otot.',
  },
  {
    title: 'Cegah Malnutrisi pada Lansia',
    content: 'Pastikan lansia mendapatkan asupan makanan bergizi dengan porsi kecil namun sering untuk mencegah kekurangan gizi.',
  },
  {
    title: 'Perubahan Fisiologis pada Lansia',
    content: 'Kenali perubahan tubuh akibat penuaan agar perawatan kesehatan dapat disesuaikan dengan kebutuhan lansia.',
  },
  {
    title: 'Membentuk Kebiasaan Sehat di Usia Lanjut',
    content: 'Biasakan rutinitas sehat seperti tidur cukup, hidrasi terjaga, dan pola makan teratur untuk meningkatkan kualitas hidup lansia.',
  }
];

  const redAccordionData = [
  {
    title: 'Transisi Pola Makan pada Lansia',
    content: 'Sesuaikan tekstur dan jenis makanan agar mudah dikunyah dan dicerna, terutama bagi lansia yang memiliki masalah gigi atau pencernaan.',
  },
  {
    title: 'Menu Seimbang untuk Lansia Aktif',
    content: 'Pastikan menu harian mengandung protein berkualitas, serat tinggi, karbohidrat kompleks, dan lemak sehat untuk menjaga energi dan kesehatan.',
  },
  {
    title: 'Porsi Makan yang Tepat untuk Lansia',
    content: 'Berikan porsi makan kecil namun lebih sering untuk menyesuaikan kebutuhan metabolisme lansia yang menurun.',
  },
  {
    title: 'Kebiasaan Makan Sehat untuk Lansia',
    content: 'Ajak lansia makan dengan perlahan, hindari makanan tinggi garam/gula, serta ciptakan suasana makan yang nyaman dan tenang.',
  },
];


  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
      offset: 100,
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBubble = {
        id: Date.now(),
        x: Math.random() * 100,
        y: 120,
        size: Math.random() * 60 + 40,
        delay: Math.random() * 2,
        duration: Math.random() * 4 + 6,
      };
      setBubbles((prev) => [...prev, newBubble]);
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
      }, newBubble.duration * 1000);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-white overflow-hidden" id="bayi">
      {/* === SECTION 1: GAYA HIDUP BAYI === */}
      <div className="relative pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 lg:ml-7">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* LEFT TEXT */}
          <motion.div 
            className="space-y-4 sm:space-y-6 z-10 order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            data-aos="fade-right"
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-sky-400 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              data-aos="fade-up"
            >
              Buruk Nya Gaya <br /> Hidup Anak-Anak
            </motion.h1>
            
            <motion.p
              className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              data-aos="fade-up"
            >
              Di Indonesia, 30% anak mengalami stunting, pola makan tidak seimbang, dan akses ke gizi lengkap masih terbatas. Sanitasi buruk, minimnya edukasi orang tua, dan rendahnya cakupan imunisasi lengkap membuat anak rentan terhadap ISPA, diare, dan gangguan perkembangan kognitif.
            </motion.p>
            
            <motion.p
              className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              data-aos="fade-up"
            >
              Kurangnya pola makan sehat, sanitasi yang buruk, dan cakupan
              imunisasi yang belum optimal menjadi tantangan utama.
            </motion.p>
            
            <motion.button 
              className="bg-gradient-to-r from-sky-700 to-sky-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px #87ceeb"
              }}
              whileTap={{ scale: 0.95 }}
              data-aos="fade-up"
            >
              <a href="#pantau-perkembangan" className="flex items-center space-x-2 sm:space-x-3">
                <span className="font-semibold">Selengkapnya</span>
              </a>
              <motion.div 
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <svg fill="#fff" height="16" width="16" viewBox="0 0 24 24" className="sm:w-5 sm:h-5">
                  <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12" />
                </svg>
              </motion.div>
            </motion.button>
          </motion.div>

          {/* RIGHT IMAGE + BUBBLES */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] order-1 md:order-2" data-aos="fade-left">
            <motion.div 
              className="absolute top-5 sm:top-10 right-5 sm:right-10 w-40 h-40 sm:w-64 sm:h-64 bg-sky-700 rounded-full opacity-20"
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-32 h-32 sm:w-48 sm:h-48 bg-sky-900 rounded-full opacity-15"
              animate={{ 
                y: [0, 20, 0],
                scale: [1, 1.08, 1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <AnimatePresence>
              {bubbles.map((bubble) => (
                <motion.div
                  key={bubble.id}
                  className="absolute rounded-full hidden sm:block"
                  style={{
                    left: `${bubble.x}%`,
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                    background:
                      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(190,18,60,0.3), rgba(136,19,55,0.2))',
                    boxShadow:
                      'inset -10px -10px 20px rgba(255,255,255,0.5), inset 5px 5px 10px rgba(190,18,60,0.2), 0 10px 30px rgba(190,18,60,0.3)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(2px)',
                  }}
                  initial={{ 
                    y: 600, 
                    scale: 0, 
                    opacity: 0 
                  }}
                  animate={{ 
                    y: -600, 
                    scale: 1, 
                    opacity: [0, 0.8, 0.6, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: bubble.duration,
                    delay: bubble.delay,
                    ease: "easeIn"
                  }}
                />
              ))}
            </AnimatePresence>

            <motion.div
              className="absolute right-8 sm:right-16 md:right-32 bottom-12 sm:bottom-20 md:bottom-24 z-10 flex justify-center items-center"
              animate={{ 
                y: [0, -15, 0],
                rotateY: (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 0) / 2) / 50,
                rotateX: -(mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2) / 50
              }}
              transition={{ 
                y: {
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotateY: { duration: 0.1 },
                rotateX: { duration: 0.1 }
              }}
              style={{ perspective: 1000 }}
              data-aos="zoom-in"
            >
              <motion.div
                className="relative w-48 h-60 sm:w-64 sm:h-80 md:w-80 md:h-96 rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{ boxShadow: '0 30px 60px #add8e6' }}
              >
                <img
                  src='https://png.pngtree.com/png-clipart/20230518/original/pngtree-elderly-cute-vector-png-image_9164333.png'
                  alt="Happy Baby"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(1.1) contrast(1.05)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent" />
              </motion.div>
            </motion.div>

            <motion.div 
              className="absolute bottom-5 sm:bottom-10 left-0 z-30"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              data-aos="fade-right"
            >
              <motion.div
                className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(4px)',
                  boxShadow: '0 10px 30px rgba(190,18,60,0.2)',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              >
                <img src='https://png.pngtree.com/png-clipart/20250308/original/pngtree-3d-medicine-bottle-with-spilled-capsules-icon-png-image_20599560.png' alt="Toy" className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>

            <motion.div 
              className="absolute top-0 right-0 z-30"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              data-aos="fade-left"
            >
              <motion.div
                className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(4px)',
                  boxShadow: '0 10px 30px rgba(190,18,60,0.2)',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              >
                <img src='https://png.pngtree.com/png-vector/20240124/ourlarge/pngtree-wheel-chair-3d-illustration-png-image_11481669.png' alt="Dot" className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* === SECTION 2: PANTAU PERKEMBANGAN BAYI IDEAL === */}
     <motion.div
  className="min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-white"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 1 }}
  id="pantau-perkembangan"
>
  <div className="max-w-7xl w-full">
    {/* Header */}
    <motion.div 
      className="text-center mb-12 sm:mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      data-aos="fade-up"
    >
      <motion.h1 
        className="text-3xl text-sky-500 sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
        style={{ 
          fontFamily: "'Satoshi', sans-serif",
        }}
      >
        Pantau Perkembangan <span className="text-sky-500">Anak Usia 7–10 Tahun</span>
      </motion.h1>
      <motion.p 
        className="text-gray-700 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        data-aos="fade-up"
      >
        Dukung tumbuh kembang anak usia 7–10 tahun dengan pemantauan berkala. Kenali tahapan penting dalam perkembangan kognitif, sosial, emosional, dan akademik agar anak tumbuh menjadi pribadi yang percaya diri dan cerdas.
      </motion.p>
    </motion.div>

    {/* Chart Container */}
    <motion.div
      className="relative bg-white rounded-3xl shadow-3xl p-12 sm:p-8 md:p-12 overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      data-aos="zoom-in"
      style={{
        fontFamily: "'Satoshi', sans-serif",
        background: 'linear-gradient(135deg, #ffffff 0%, #fff5f7 100%)',
        boxShadow: '0 20px 60px rgba(190, 18, 60, 0.15)'
      }}
    >
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-sky-100 rounded-full opacity-30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 bg-sky-200 rounded-full opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Chart Placeholder (Gantilah dengan komponen grafikmu) */}
      <div className="relative z-10 h-[400px] sm:h-[500px] md:h-[600px]">
        <AnimatedGrowthChart />
      </div>

      {/* Bottom Info — Disesuaikan untuk Usia 7–10 Tahun */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <p className="text-gray-600 text-sm sm:text-base">
          <span className="font-semibold text-sky-900">Grafik di atas</span> menunjukkan tahapan pertumbuhan tinggi dan berat badan ideal anak usia 7–10 tahun. Gunakan sebagai referensi untuk menilai pertumbuhan anak secara menyeluruh bersama dokter atau guru.
        </p>
      </motion.div>
    </motion.div>

    {/* Additional Info Cards — Disesuaikan untuk Usia 7–10 Tahun */}
    <motion.div
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {[
        {
          icon: chart,
          title: "Evaluasi Akademik",
          desc: "Pantau perkembangan belajar anak di sekolah. Bantu mereka mengatasi kesulitan belajar dan dorong rasa ingin tahu.",
        },
        {
          icon: nutrisi,
          title: "Gizi Seimbang",
          desc: "Pastikan anak mendapat asupan gizi lengkap. Perbanyak protein, sayur, buah, dan hindari makanan tinggi gula serta pengawet.",
        },
        {
          icon: dokter,
          title: "Kesehatan & Imunisasi",
          desc: "Lanjutkan imunisasi dasar lengkap dan jaga kesehatan gigi serta mata. Lakukan pemeriksaan rutin ke dokter anak.",
        },
      ].map((card, index) => (
        <motion.div
          key={index}
          className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow bg-sky-100 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          data-aos="fade-up"
          data-aos-delay={index * 100}
          style={{
            border: "1px solid rgba(190, 18, 60, 0.1)",
          }}
        >
          <img
            src={card.icon}
            alt={card.title}
            className="w-20 h-20 object-contain mb-4 mx-auto"
          />

          <h3 className="text-xl font-bold text-sky-900 mb-2 text-center">{card.title}</h3>
          <p className="text-gray-600 text-sm text-center">{card.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </div>
</motion.div>

      {/* === SECTION 3: GIZI BAYI TERCUKUPI === */}
      <motion.div
        className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        id="gizi-bayi"
      >
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-6 sm:space-y-8 order-2 lg:order-1 w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-aos="fade-right"
          >
            <div className="space-y-3 sm:space-y-4">
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-sky-900"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                data-aos="fade-up"
                
              >
                Gizi Lansia <span className="text-sky-900">Tercukupi</span>
              </motion.h1>
              <motion.p 
                className="text-sky-900 text-sm sm:text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                data-aos="fade-up"
              >
                Pastikan lansia mendapatkan asupan nutrisi yang sesuai kebutuhan usia lanjut. Perhatikan kecukupan protein, serat, cairan, serta vitamin untuk menjaga kesehatan tubuh dan kekuatan otot. Temukan tips untuk membantu lansia tetap makan dengan nyaman, termasuk memilih tekstur makanan yang ramah untuk pencernaan dan mudah dikunyah.
              </motion.p>
            </div>

            <motion.div 
              className="space-y-3 sm:space-y-4 w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
               onMouseEnter={(e) => e.preventDefault()} // disable hover
        onMouseLeave={(e) => e.preventDefault()} // disable hover
            >
              {accordionData.map((item, index) => (
                <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                  <AccordionItem
                    title={item.title}
                    isOpen={openIndex === index}
                    onClick={() => toggleAccordion(index)}
                   
                  >
                    {item.content}
                  </AccordionItem>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right 3D Scene */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center items-center w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-aos="fade-left"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-md md:max-w-lg mx-auto h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px]">
              <Canvas 
                camera={{ position: [15, 5, 15], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
              >
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 15, 10]} intensity={1.5} castShadow />
                <directionalLight position={[-10, 10, -10]} intensity={0.8} />
                <pointLight position={[0, 10, 0]} intensity={1} />
                <spotLight position={[5, 15, 5]} angle={0.3} intensity={1.2} castShadow />
                <hemisphereLight intensity={0.5} groundColor="#444444" />
                <Model3D mousePosition={mousePosition} />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  enableRotate={false}
                  enableDamping
                  dampingFactor={0.05}
                  target={[0, -1, 0]}
                />
              </Canvas>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* === SVG PEMBATAS === */}
      <div className="w-full h-full pointer-events-none overflow-hidden relative" data-aos="fade">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
          <path fill="#87ceeb" fillOpacity="1" d="M0,96L20,90.7C40,85,80,75,120,64C160,53,200,43,240,37.3C280,32,320,32,360,64C400,96,440,160,480,170.7C520,181,560,139,600,106.7C640,75,680,53,720,85.3C760,117,800,203,840,218.7C880,235,920,181,960,170.7C1000,160,1040,192,1080,192C1120,192,1160,160,1200,160C1240,160,1280,192,1320,170.7C1360,149,1400,75,1420,37.3L1440,0L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"></path>
        </svg>
      </div>

      {/* === SECTION 4: RENCANA MAKANAN SEIMBANG === */}
      <motion.div 
        className="relative min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #87ceeb 0%, #87ceeb 100%)'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        id="rencana-makanan"
      >
        {/* Floating Circles */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-white/10 backdrop-blur-sm z-0"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-white/5 backdrop-blur-sm z-0"
          animate={{
            y: [0, 40, 0],
            x: [0, -25, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Content */}
          <motion.div 
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-aos="fade-right"
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              data-aos="fade-up"
            >
              Rencana Makanan Seimbang
            </motion.h1>
            
            <motion.p
              className="text-white/90 text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              data-aos="fade-up"
            >
              Rencanakan makan seimbang untuk anak dengan menu bervariasi yang mencakup semua kelompok makanan. Temukan tips untuk pola makan sehat dan menyenangkan untuk keluarga.
            </motion.p>

            <motion.div 
              className="space-y-3 sm:space-y-4 w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {redAccordionData.map((item, index) => (
                <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                  <RedAccordionItem
                    title={item.title}
                    isOpen={openRedIndex === index}
                    onClick={() => toggleRedAccordion(index)}
                  >
                    {item.content}
                  </RedAccordionItem>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Kid Image */}
          <motion.div 
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-aos="fade-left"
          >
            {/* Background Decorative Circles */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div
              className="absolute bottom-10 left-0 w-48 h-48 sm:w-64 sm:h-64 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Main Kid Image Container */}
            <motion.div
              className="relative z-10"
              animate={{
                y: [0, -20, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              data-aos="zoom-in"
            >
              <motion.div
                className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[32rem]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
                    filter: 'blur(40px)'
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <img
                  src='https://png.pngtree.com/png-clipart/20220926/ourmid/pngtree-nursing-home-nursing-home-elderly-seniors-flat-png-image_6155857.png'
                  alt="Happy Kid"
                  className="relative w-full h-full object-contain drop-shadow-2xl rounded-3xl"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="w-full h-full pointer-events-none overflow-hidden relative" data-aos="fade">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
          <path
            fill="#87ceeb"
            fillOpacity="1"
            transform="scale(1, -1) translate(0, -320)"
            d="M0,96L20,90.7C40,85,80,75,120,64C160,53,200,43,240,37.3C280,32,320,32,360,64C400,96,440,160,480,170.7C520,181,560,139,600,106.7C640,75,680,53,720,85.3C760,117,800,203,840,218.7C880,235,920,181,960,170.7C1000,160,1040,192,1080,192C1120,192,1160,160,1200,160C1240,160,1280,192,1320,170.7C1360,149,1400,75,1420,37.3L1440,0L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
          />
        </svg>
      </div>
<div style={{ height: '600px', position: 'relative' }}>
  <Carousel
    baseWidth={300}
    autoplay={true}
    autoplayDelay={3000}
    pauseOnHover={true}
    loop={true}
    round={false}
  />
</div>

    </div>
  );
};

export default BabyHealthLanding;