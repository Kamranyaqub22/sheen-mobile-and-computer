import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import MobileBottomBar from './components/MobileBottomBar'
import Home from './pages/Home'
import PhoneRepairs from './pages/PhoneRepairs'
import LaptopRepairs from './pages/LaptopRepairs'
import OtherRepairs from './pages/OtherRepairs'
import Accessories from './pages/Accessories'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pb-16 sm:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phone-repairs" element={<PhoneRepairs />} />
          <Route path="/laptop-macbook-repairs" element={<LaptopRepairs />} />
          <Route path="/other-repairs" element={<OtherRepairs />} />
          <Route path="/accessories-buy-sell" element={<Accessories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  )
}

