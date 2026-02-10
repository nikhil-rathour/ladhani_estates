import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import Stats from '../components/Stats';
import PropertyCard from '../components/PropertyCard';

export default function Home() {
  const properties = [
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      price: '$850,000',
      location: 'Beverly Hills, CA',
      beds: 4,
      baths: 3,
      area: '3,200 sqft'
    },
    {
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      price: '$1,200,000',
      location: 'Manhattan, NY',
      beds: 3,
      baths: 2,
      area: '2,500 sqft'
    },
    {
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      price: '$650,000',
      location: 'Miami Beach, FL',
      beds: 5,
      baths: 4,
      area: '4,100 sqft'
    },
    {
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      price: '$920,000',
      location: 'San Francisco, CA',
      beds: 3,
      baths: 2,
      area: '2,800 sqft'
    },
    {
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      price: '$1,500,000',
      location: 'Los Angeles, CA',
      beds: 6,
      baths: 5,
      area: '5,200 sqft'
    },
    {
      image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
      price: '$780,000',
      location: 'Seattle, WA',
      beds: 4,
      baths: 3,
      area: '3,500 sqft'
    }
  ];

  return (
    <div>
      <Hero />
      <SearchBar />
      <Stats />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Recent Listings</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Explore our handpicked selection of premium properties available for sale and rent</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <PropertyCard key={index} {...property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
