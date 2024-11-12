import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    initAutocomplete: () => void;
  }
}

const SearchBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState('');
  const autoCompleteRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.initAutocomplete = () => {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          componentRestrictions: { country: 'BR' },
          fields: ['address_components', 'geometry', 'name'],
          types: ['address']
        }
      );

      autoCompleteRef.current.addListener('place_changed', () => {
        const place = autoCompleteRef.current.getPlace();
        if (place.geometry) {
          // Handle the selected place
          setAddress(place.name);
        }
      });
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCIjF9IYEbbLblKUayFDV2L7o-kXo6qafo&libraries=places&callback=initAutocomplete`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Implement search functionality
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Digite seu endereço para encontrar creches próximas..."
          className="w-full px-6 py-4 pr-12 text-lg rounded-full border-2 border-amber-500 focus:outline-none focus:border-amber-600 shadow-lg"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full transition"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <Search size={24} />
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;