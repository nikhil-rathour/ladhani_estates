import { useState } from 'react';

export default function SearchBar() {
  const [searchType, setSearchType] = useState('buy');

  return (
    <div className="container mx-auto px-6 -mt-20 relative z-20">
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSearchType('buy')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${searchType === 'buy' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Buy
          </button>
          <button
            onClick={() => setSearchType('rent')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${searchType === 'rent' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Rent
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Location"
            className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <select className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none">
            <option>Budget</option>
            <option>$0 - $500k</option>
            <option>$500k - $1M</option>
            <option>$1M+</option>
          </select>
          <select className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none">
            <option>Property Type</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Condo</option>
          </select>
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all font-semibold">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
