import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className={`text-2xl font-bold ${scrolled ? 'text-slate-900' : 'text-white'}`}>
          Ladani Estates
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`hover:text-emerald-500 transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}>Home</Link>
          <Link to="/rent" className={`hover:text-emerald-500 transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}>Rent</Link>
          <Link to="/buy" className={`hover:text-emerald-500 transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}>Buy</Link>
          <Link to="/locations" className={`hover:text-emerald-500 transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}>Locations</Link>
          <Link to="/about" className={`hover:text-emerald-500 transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}>About Us</Link>
          <Link to="/contact" className={`hover:text-emerald-500 transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}>Contact</Link>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-all">List Your Property</button>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden ${scrolled ? 'text-slate-900' : 'text-white'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col gap-4 p-6">
            <Link to="/" className="text-slate-700 hover:text-emerald-500">Home</Link>
            <Link to="/rent" className="text-slate-700 hover:text-emerald-500">Rent</Link>
            <Link to="/buy" className="text-slate-700 hover:text-emerald-500">Buy</Link>
            <Link to="/locations" className="text-slate-700 hover:text-emerald-500">Locations</Link>
            <Link to="/about" className="text-slate-700 hover:text-emerald-500">About Us</Link>
            <Link to="/contact" className="text-slate-700 hover:text-emerald-500">Contact</Link>
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-all">List Your Property</button>
          </div>
        </div>
      )}
    </header>
  );
}
