import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Anak from '../assets/images/anak.png';
import dot from '../assets/images/dot.png';
import kura from '../assets/images/kura-kura.png';
import bola from '../assets/images/bola.png';

// ========== 3D MODEL COMPONENT ==========
function Model3D() {
  const { scene } = useGLTF('/3d/makanan.glb');
  return (
    <primitive
      object={scene}
      scale={13}
      position={[0, -0.2, 0]}
      rotation={[0, 0.3, 0.15]}
    />
  );
}

// ========== ACCORDION COMPONENT ==========
const AccordionItem = ({ title, isOpen, onClick, children }) => (
  <div className="mb-4">
    <button
      onClick={onClick}
      className="w-full bg-blue-100/60 backdrop-blur-sm hover:bg-blue-200/60 transition-all duration-300 rounded-2xl px-6 py-5 flex items-center justify-between group"
    >
      <span className="text-blue-900 text-lg font-medium">{title}</span>
      <ChevronDown 
        className={`text-blue-900 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        size={24}
      />
    </button>
    <div 
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-96 mt-3' : 'max-h-0'
      }`}
    >
      <div className="bg-blue-50/60 backdrop-blur-sm rounded-2xl px-6 py-4 text-gray-700">
        {children}
      </div>
    </div>
  </div>
);

// ========== THREE.JS SCENE ==========
const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Create sphere
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x8B1538,
      emissiveIntensity: 0.2,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add ring
    const ringGeometry = new THREE.TorusGeometry(2.2, 0.08, 16, 100);
    const ringMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.6
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Add small sphere
    const smallSphereGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const smallSphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.5
    });
    const smallSphere = new THREE.Mesh(smallSphereGeometry, smallSphereMaterial);
    smallSphere.position.set(2.5, 2, 0);
    scene.add(smallSphere);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 6;

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      sphere.rotation.y += 0.005;
      ring.rotation.z += 0.008;
      
      smallSphere.position.x = 2.5 * Math.cos(time);
      smallSphere.position.y = 2 + 0.5 * Math.sin(time * 2);
      smallSphere.position.z = 2.5 * Math.sin(time);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = mountRef.current?.clientWidth || 500;
      const height = mountRef.current?.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      smallSphereGeometry.dispose();
      smallSphereMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

// ========== MAIN APP COMPONENT ==========
export default function App() {
  const [openIndex, setOpenIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bubbles, setBubbles] = useState([]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "Jadwal Menyusui",
      content: "Bayi baru lahir biasanya perlu disusui setiap 2-3 jam atau 8-12 kali dalam 24 jam. Ikuti tanda lapar bayi seperti mengisap jari, membuka mulut, atau gelisah."
    },
    {
      title: "Manfaat ASI untuk Bayi",
      content: "ASI mengandung nutrisi lengkap, antibodi untuk melindungi dari infeksi, mudah dicerna, dan membantu perkembangan otak optimal. ASI juga memperkuat ikatan emosional ibu dan bayi."
    },
    {
      title: "Tips untuk Ibu Baru",
      content: "Istirahat cukup, minum air putih minimal 8 gelas per hari, konsumsi makanan bergizi seimbang, dan jangan ragu meminta bantuan keluarga. Perhatikan posisi menyusui yang nyaman."
    },
    {
      title: "Penyimpanan ASI Perah",
      content: "ASI perah dapat disimpan di suhu ruang (25°C) selama 4 jam, di kulkas (4°C) selama 4 hari, dan di freezer (-18°C) selama 6 bulan. Gunakan wadah steril dan beri label tanggal."
    },
    {
      title: "Transisi ke Makanan Padat",
      content: "Mulai MPASI saat bayi berusia 6 bulan dengan tekstur lembut. Perkenalkan satu jenis makanan baru setiap 3-5 hari untuk memantau alergi. Tetap lanjutkan pemberian ASI."
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
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
    <div className="min-h-screen">
      {/* ========== SECTION 1: GAYA HIDUP ANAK (BLUE) ========== */}
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden" id="anak">
        <div className="relative pt-16 pb-20 px-6 md:pt-20 ml-7">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT TEXT */}
            <div className="space-y-6 z-10 animate-[fadeInUp_1s_ease-out]">
              <h1
                className="text-5xl md:text-6xl font-semibold text-blue-900 leading-tight"
                style={{ fontFamily: 'Satoshi' }}
              >
                Gaya Hidup Anak yang Kurang Sehat
              </h1>
              <p
                className="text-gray-700 text-lg leading-relaxed"
                style={{ fontFamily: 'Satoshi' }}
              >
                Banyak anak di Indonesia masih memiliki gaya hidup yang kurang mendukung tumbuh kembang mereka. Kebiasaan jarang berolahraga, lebih banyak bermain gawai, dan sering mengonsumsi makanan cepat saji mulai menjadi hal yang umum. Kondisi ini membuat anak rentan mengalami kegemukan, kurang gizi, dan daya tahan tubuh yang lemah.
              </p>
            
              <button className="group bg-gradient-to-r from-[#1E90FF] to-blue-900 text-white px-8 py-4 rounded-full flex items-center space-x-3 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <span className="font-semibold text-lg" style={{ fontFamily: 'Satoshi' }}>
                  Selengkapnya
                </span>
                <div className="w-6 h-6 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <svg fill="#fff" height="20" width="20" viewBox="0 0 24 24">
                    <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12" />
                  </svg>
                </div>
              </button>
            </div>

            {/* RIGHT IMAGE + BUBBLES */}
            <div className="relative h-[600px]">
              {/* Background decorative circles */}
              <div className="absolute top-10 right-10 w-64 h-64 bg-[#1E90FF] rounded-full opacity-20 animate-[float_6s_ease-in-out_infinite]" />
              <div className="absolute bottom-20 left-10 w-48 h-48 bg-blue-900 rounded-full opacity-15 animate-[float_8s_ease-in-out_infinite_reverse]" />

              {/* Floating Bubbles */}
              {bubbles.map((bubble) => (
                <div
                  key={bubble.id}
                  className="absolute rounded-full"
                  style={{
                    left: `${bubble.x}%`,
                    bottom: '0%',
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                    background:
                      'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(30,144,255,0.3), rgba(25,118,210,0.2))',
                    boxShadow:
                      'inset -10px -10px 20px rgba(255,255,255,0.5), inset 5px 5px 10px rgba(30,144,255,0.2), 0 10px 30px rgba(30,144,255,0.3)',
                    animation: `floatUp ${bubble.duration}s ease-in forwards`,
                    animationDelay: `${bubble.delay}s`,
                    border: '2px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(2px)',
                  }}
                />
              ))}

              {/* Anak Image */}
              <div
                className="absolute right-34 bottom-23 z-10 flex justify-center items-center"
                style={{
                  transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth / 2) / 50}deg) rotateX(${-(mousePosition.y - window.innerHeight / 2) / 50}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <div
                  className="relative w-80 h-96 rounded-[3rem] shadow-2xl overflow-hidden animate-[float_4s_ease-in-out_infinite]"
                  style={{ boxShadow: '0 30px 60px rgba(30,144,255,0.3)' }}
                >
                  <img
                    src={Anak}
                    alt="Happy Child"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.1) contrast(1.05)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
                </div>
              </div>

              {/* LEFT BUBBLE */}
              <div className="absolute bottom-10 left-0 z-30 animate-[slideInLeft_1s_ease-out_0.5s_both]">
                <div
                  className="relative w-40 h-40 rounded-full overflow-hidden flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(4px)',
                    boxShadow: '0 10px 30px rgba(30,144,255,0.2)',
                    border: '2px solid rgba(255,255,255,0.3)',
                  }}
                >
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/ice-cream-cone-7367834-5966749.png"
                    alt="Bahagia"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* RIGHT BUBBLE */}
              <div className="absolute top-0 right-0 w-48 h-48 z-30 animate-[slideInRight_1s_ease-out_0.5s_both]">
                <div
                  className="relative w-40 h-40 rounded-full overflow-hidden flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(4px)',
                    boxShadow: '0 10px 30px rgba(30,144,255,0.2)',
                    border: '2px solid rgba(255,255,255,0.3)',
                  }}
                >
                  <img src={bola} alt="Bahagia" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== SECTION 2: GIZI BAYI TERCUKUPI (BLUE) - WITH 3D MODEL ========== */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-blue-900">
                Gizi Bayi <span className="text-[#1E90FF]">Tercukupi</span>
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                Pastikan bayi mendapat nutrisi optimal dengan rencana ASI yang tepat. 
                Temukan tips untuk menjadikan proses menyusui lebih lancar dan nyaman.
              </p>
            </div>

            <div className="space-y-3">
              {accordionData.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item.title}
                  isOpen={openIndex === index}
                  onClick={() => toggleAccordion(index)}
                >
                  {item.content}
                </AccordionItem>
              ))}
            </div>
          </div>

          {/* Right 3D Scene with GLB Model */}
          <div className="order-1 lg:order-2 flex justify-center items-center">
            <div className="relative w-full max-w-lg h-[600px]">
              <Canvas camera={{ position: [15, 8, 15], fov: 60 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 15, 10]} intensity={1.5} />
                <directionalLight position={[-10, 10, -10]} intensity={0.8} />
                <pointLight position={[0, 10, 0]} intensity={1} />
                <hemisphereLight intensity={0.5} groundColor="#444444" />
                <Model3D />
                <OrbitControls 
                  enableZoom={true}
                  autoRotate
                  autoRotateSpeed={1.5}
                  minDistance={10}
                  maxDistance={30}
                  target={[0, 2, 0]}
                />
              </Canvas>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-600px) scale(1); opacity: 0; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}