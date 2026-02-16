import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProperty } from '../hooks/useProperties';
import { useAuth } from '../context/useAuth';

const WHATSAPP_NUMBER = '917726886835';

export default function PropertyDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: property, isLoading, isError } = useProperty(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const { backendUser, firebaseUser } = useAuth();

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

  const handleContactAgent = () => {
    const propertyId = property.id ?? id;
    const userName = backendUser?.name || firebaseUser?.displayName || 'Customer';
    const propertyUrl = typeof window !== 'undefined' ? window.location.href : '';
    const message = [
      `Hi, my name is ${userName}. I am interested in this property.`,
      `Property: ${property.title}`,
      `Property ID: ${propertyId}`,
      `Type: ${property.property_type} (${property.listing_type})`,
      `Location: ${property.area}, ${property.city}`,
      `Price: Rs ${Number(property.price).toLocaleString('en-IN')}`,
      `Link: ${propertyUrl}`,
      'Please share more details.'
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-3 md:py-4">
      <div className="mx-auto h-[calc(100vh-1.5rem)] max-w-7xl px-3 md:px-4">
        <button
          onClick={handleBack}
          className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-slate-900 shadow-md ring-2 ring-amber-300 transition hover:bg-amber-300"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="grid h-full grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-lg lg:grid-cols-2">
          <div className="relative bg-gray-900">
            <img src={currentImage} alt={property.title} className="h-[48vh] w-full object-cover lg:h-full" />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-lg transition hover:bg-white"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-lg transition hover:bg-white"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <div className="absolute left-3 top-3 flex gap-2">
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                {property.listing_type}
              </span>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                {property.property_type}
              </span>
            </div>

            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/35 px-3 py-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full transition ${index === currentImageIndex ? 'w-6 bg-white' : 'bg-white/55'}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex h-full flex-col p-4 md:p-5">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h1 className="line-clamp-2 text-xl font-bold text-slate-900 md:text-2xl">{property.title}</h1>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {property.area}, {property.city}
                </p>
              </div>
              <p className="text-right text-2xl font-bold text-emerald-600 md:text-3xl">Rs {property.price.toLocaleString()}</p>
            </div>

            <div className="mb-3 grid grid-cols-3 gap-2 rounded-xl bg-gray-50 p-3">
              <div className="rounded-lg bg-white p-2 text-center">
                <p className="text-lg font-bold text-slate-900">{property.bedrooms}</p>
                <p className="text-xs text-slate-600">Bedrooms</p>
              </div>
              <div className="rounded-lg bg-white p-2 text-center">
                <p className="text-lg font-bold text-slate-900">{property.bathrooms}</p>
                <p className="text-xs text-slate-600">Bathrooms</p>
              </div>
              <div className="rounded-lg bg-white p-2 text-center">
                <p className="text-lg font-bold text-slate-900">{property.built_up_area}</p>
                <p className="text-xs text-slate-600">Sq Ft</p>
              </div>
            </div>

            <div className="mb-3 flex gap-2">
              <button
                onClick={() => setActiveTab('description')}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  activeTab === 'description' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('address')}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  activeTab === 'address' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Address
              </button>
              <button
                onClick={() => setActiveTab('amenities')}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  activeTab === 'amenities' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Amenities
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-slate-200 p-3">
              {activeTab === 'description' && <p className="text-sm leading-relaxed text-slate-600">{property.description}</p>}

              {activeTab === 'address' && <p className="text-sm text-slate-600">{property.address}</p>}

              {activeTab === 'amenities' && (
                <div className="flex flex-wrap gap-2">
                  {property.amenities && property.amenities.length > 0 ? (
                    property.amenities.map((amenity) => (
                      <span key={amenity.id} className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                        {amenity.name}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No amenities listed for this property.</p>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleContactAgent}
              className="mt-3 w-full rounded-lg bg-emerald-600 py-3 text-base font-semibold text-white transition hover:bg-emerald-700"
            >
              Get Inquiry on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



