import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home, { AboutPage } from './pages/home.jsx';
import Bayi from './pages/bayi.jsx';
import AnakAnak from './pages/anak-anak.jsx';
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} /> {/* ← TAMBAHKAN INI */}
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/kategori/bayi" element={<Bayi />} />
            <Route path="/kategori/anak-anak" element={<AnakAnak />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;