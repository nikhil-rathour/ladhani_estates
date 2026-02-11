import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProperty } from '../hooks/useProperties';

export default function PropertyDetail() {
  const { id } = useParams();
  const { data: property, isLoading, isError } = useProperty(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Property not found</p>
      </div>
    );
  }

  const images = [property.image1, property.image2, property.image3, property.image4, property.image5].filter(Boolean);
  const currentImage = images[currentImageIndex] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800';

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image Slider */}
          <div className="relative h-96 md:h-[500px] bg-gray-900">
            <img
              src={currentImage}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition ${
                        index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {property.listing_type}
              </span>
              <span className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {property.property_type}
              </span>
            </div>
          </div>

          {/* Property Details */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{property.title}</h1>
                <p className="text-slate-600 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {property.area}, {property.city}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-4xl font-bold text-emerald-600">₹{property.price.toLocaleString()}</p>
              </div>
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-slate-900">{property.bedrooms}</p>
                <p className="text-slate-600">Bedrooms</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-slate-900">{property.bathrooms}</p>
                <p className="text-slate-600">Bathrooms</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-slate-900">{property.built_up_area}</p>
                <p className="text-slate-600">Sq Ft</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Description</h2>
              <p className="text-slate-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Address */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Address</h2>
              <p className="text-slate-600">{property.address}</p>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-3">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity.id}
                      className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-medium"
                    >
                      {amenity.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Button */}
            <div className="flex gap-4">
              <button className="flex-1 bg-emerald-600 text-white py-4 rounded-lg hover:bg-emerald-700 transition font-semibold text-lg">
                Contact Agent
              </button>
              <button className="flex-1 bg-slate-900 text-white py-4 rounded-lg hover:bg-slate-800 transition font-semibold text-lg">
                Schedule Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
