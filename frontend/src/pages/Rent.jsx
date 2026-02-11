import PropertyCard from '../components/PropertyCard';
import SkeletonCard from '../components/SkeletonCard';
import { useProperties } from '../hooks/useProperties';

export default function Rent() {
  const { data: properties = [], isLoading, isError } = useProperties({ listing_type: 'Rent' });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Properties for Rent</h1>
          <p className="text-xl text-emerald-100">Find your perfect rental property</p>
        </div>
      </div>

      <section className="py-16 min-h-[600px]">
        <div className="container mx-auto px-6">
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
              <p className="text-slate-600">No rental properties found.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-slate-600">{properties.length} properties available for rent</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
