export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Ladani Estates</h1>
          <p className="text-xl text-slate-300 max-w-3xl">Your trusted partner in finding the perfect home for over 15 years</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Founded in 2009, Ladani Estates has grown from a small local agency to one of the most trusted names in real estate. Our journey began with a simple mission: to help people find not just houses, but homes where memories are made.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Today, we serve over 50 cities with a portfolio of 5000+ premium properties, having helped more than 12,000 families find their dream homes. Our commitment to excellence and personalized service sets us apart in the industry.
              </p>
            </div>
            <div className="bg-slate-100 rounded-2xl h-96 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800" alt="Modern office" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To provide exceptional real estate services that exceed expectations, making the process of buying, selling, or renting properties seamless, transparent, and rewarding for every client.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be the most trusted and innovative real estate company, transforming the way people discover and experience their ideal living spaces across the nation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Integrity</h3>
              <p className="text-slate-600">Honest, transparent dealings in every transaction</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Excellence</h3>
              <p className="text-slate-600">Delivering premium service and quality properties</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Client-Focused</h3>
              <p className="text-slate-600">Your needs and satisfaction are our priority</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Meet Our Team</h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Our experienced professionals are dedicated to helping you find your perfect property
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400" alt="Team member" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Raj Ladani</h3>
                <p className="text-emerald-600 mb-2">Founder & CEO</p>
                <p className="text-slate-600 text-sm">15+ years in real estate</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" alt="Team member" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Priya Sharma</h3>
                <p className="text-emerald-600 mb-2">Head of Sales</p>
                <p className="text-slate-600 text-sm">10+ years in property sales</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400" alt="Team member" className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Arjun Patel</h3>
                <p className="text-emerald-600 mb-2">Property Consultant</p>
                <p className="text-slate-600 text-sm">8+ years in consulting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Let our experienced team guide you through every step of your real estate journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition-all">
              Browse Properties
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
