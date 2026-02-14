import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import PropertyDetail from './pages/PropertyDetail';
import Rent from './pages/Rent';
import Buy from './pages/Buy';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      </main>
      <WhatsAppButton />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
