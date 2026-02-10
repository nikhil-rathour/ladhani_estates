export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Ladani Estates</h3>
            <p className="text-sm">Your trusted partner in finding the perfect home. Quality properties, exceptional service.</p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-emerald-500 transition-colors">Home</a></li>
              <li><a href="/rent" className="hover:text-emerald-500 transition-colors">Rent</a></li>
              <li><a href="/buy" className="hover:text-emerald-500 transition-colors">Buy</a></li>
              <li><a href="/about" className="hover:text-emerald-500 transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: info@ladaniestates.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Real Estate Ave</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-emerald-500 transition-colors">Facebook</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">Twitter</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-slate-800 py-6">
        <p className="text-center text-sm">&copy; 2024 Ladani Estates. All rights reserved.</p>
      </div>
    </footer>
  );
}
