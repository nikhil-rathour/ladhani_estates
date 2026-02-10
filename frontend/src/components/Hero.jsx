export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Find Your Perfect Home with Ladani Estates
        </h1>
        <p className="text-lg md:text-xl text-slate-200 mb-8">
          Discover premium properties for rent and sale. Your dream home awaits with our expert guidance and exceptional service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-emerald-600 text-white px-8 py-4 rounded-full hover:bg-emerald-700 transition-all duration-300 font-semibold">
            Explore Properties
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300 font-semibold">
            List Your Property
          </button>
        </div>
      </div>
    </section>
  );
}
