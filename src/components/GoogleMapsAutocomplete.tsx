import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMapsApi } from '../utils/loadGoogleMaps';
import { Search, Loader2, MapPin } from 'lucide-react';

interface Props {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
  placeholder?: string;
}

const GoogleMapsAutocomplete: React.FC<Props> = ({ 
  onPlaceSelected, 
  placeholder = 'Digite seu endereço para encontrar creches próximas'
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAutocomplete = async () => {
      try {
        await loadGoogleMapsApi();
        
        if (inputRef.current) {
          const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: 'BR' },
            fields: ['address_components', 'geometry', 'name', 'formatted_address'],
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
              onPlaceSelected(place);
              setError(null);
            } else {
              setError('Por favor, selecione um endereço válido da lista');
            }
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        setError('Erro ao carregar o serviço de busca. Por favor, tente novamente mais tarde.');
        setIsLoading(false);
      }
    };

    initAutocomplete();
  }, [onPlaceSelected]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <MapPin size={24} />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="w-full pl-12 pr-16 py-4 text-lg rounded-full border-2 border-amber-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition shadow-lg"
          disabled={isLoading}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <div className="bg-amber-500 p-2 rounded-full">
              <Loader2 className="animate-spin text-white" size={24} />
            </div>
          ) : (
            <button 
              className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full transition"
              onClick={() => {
                const input = inputRef.current;
                if (input && input.value) {
                  // Trigger search if needed
                }
              }}
            >
              <Search size={24} />
            </button>
          )}
        </div>
      </div>
      {error && (
        <div className="absolute left-0 right-0 mt-2">
          <p className="text-sm text-red-600 bg-white/90 px-4 py-2 rounded-lg shadow">
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default GoogleMapsAutocomplete;