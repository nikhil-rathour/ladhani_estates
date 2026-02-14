import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { firebaseUser, backendUser, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (event) => {
    setMobileMenuOpen(false);

    if (location.pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 120);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" onClick={handleHomeClick} className={`text-2xl font-bold ${scrolled ? 'text-slate-900' : 'text-white'}`}>
          Ladani Estates
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" onClick={handleHomeClick} className={`hover:text-emerald-500 transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}>Home</Link>
          <Link to="/rent" className={`hover:text-emerald-500 transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}>Rent</Link>
          <Link to="/buy" className={`hover:text-emerald-500 transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}>Buy</Link>
          <Link to="/about" className={`hover:text-emerald-500 transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}>About Us</Link>
          
          {firebaseUser ? (
            <div className="flex items-center gap-4">
              <span className={`${scrolled ? 'text-slate-700' : 'text-white'}`}>
                {backendUser?.name || firebaseUser.email}
              </span>
              <button 
                onClick={logout}
                className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-all">List Your Property</button>
          )}
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
            <Link to="/" onClick={handleHomeClick} className="text-slate-700 hover:text-emerald-500">Home</Link>
            <Link to="/rent" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-emerald-500">Rent</Link>
            <Link to="/buy" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-emerald-500">Buy</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-emerald-500">About Us</Link>
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-all">List Your Property</button>
          </div>
        </div>
      )}
    </header>
  );
}
