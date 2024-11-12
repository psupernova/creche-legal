import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import GoogleMapsAutocomplete from './GoogleMapsAutocomplete';
import DaycareCard from './DaycareCard';
import { searchNearbyDaycares } from '../utils/googlePlaces';
import { Daycare } from '../types/daycare';

const INITIAL_RESULTS_COUNT = 6;
const LOAD_MORE_COUNT = 6;

const SearchSection: React.FC = () => {
  const [allResults, setAllResults] = useState<Daycare[]>([]);
  const [visibleResults, setVisibleResults] = useState<Daycare[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlaceSelected = async (place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location) {
      setIsLoading(true);
      setError(null);
      
      try {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        
        const daycares = await searchNearbyDaycares(lat, lng);
        
        setAllResults(daycares);
        setVisibleResults(daycares.slice(0, INITIAL_RESULTS_COUNT));
        setSelectedAddress(place.formatted_address || '');
        setShowResults(true);
      } catch (error) {
        console.error('Error fetching daycares:', error);
        setError('Erro ao buscar creches próximas. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLoadMore = () => {
    const currentCount = visibleResults.length;
    const nextResults = allResults.slice(0, currentCount + LOAD_MORE_COUNT);
    setVisibleResults(nextResults);
  };

  return (
    <section className="relative">
      {/* Hero Section */}
      <div className="relative h-[500px] -mx-4 mb-8">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80"
            alt="Cachorros felizes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative h-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Encontre a Melhor Creche para seu Pet
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Compare avaliações e descubra a melhor creche legal de cachorro perto de você
          </p>
          
          <GoogleMapsAutocomplete onPlaceSelected={handlePlaceSelected} />
        </div>
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="max-w-6xl mx-auto px-4">
          {selectedAddress && (
            <h2 className="text-2xl font-semibold mb-6">
              Creches próximas a: {selectedAddress}
            </h2>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleResults.map((daycare, index) => (
                  <DaycareCard 
                    key={`${daycare.id}-${index}`}
                    daycare={daycare} 
                  />
                ))}
              </div>

              {visibleResults.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    Nenhuma creche encontrada nesta região.
                  </p>
                </div>
              ) : visibleResults.length < allResults.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full transition"
                  >
                    Carregar mais resultados
                    <ChevronDown size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default SearchSection;