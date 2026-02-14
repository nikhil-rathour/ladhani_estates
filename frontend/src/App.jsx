import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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

function AppLayout() {
  const location = useLocation();
  const isPropertyDetailPage = location.pathname.startsWith('/property/');

  return (
    <>
      <ScrollToTop />
      {!isPropertyDetailPage && <Header />}
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
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
