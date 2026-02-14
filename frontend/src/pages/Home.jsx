import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import Stats from '../components/Stats';
import PropertyCard from '../components/PropertyCard';
import SkeletonCard from '../components/SkeletonCard';
import { useProperties } from '../hooks/useProperties';

export default function Home() {
  const { data: properties = [], isLoading, isError } = useProperties();

  return (
    <div>
      <Hero />
      <SearchBar />
      <Stats />
      
      <section id="recent-listings" className="scroll-mt-28 py-16 bg-white min-h-[600px]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Recent Listings</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Explore our handpicked selection of premium properties available for sale and rent</p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <p className="text-red-600">Failed to load properties. Please try again.</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600">No properties found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
