import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { cities } from '../data/cities';
import DaycareCard from '../components/DaycareCard';
import { searchNearbyDaycares } from '../utils/googlePlaces';
import { Daycare } from '../types/daycare';
import { getNeighborhoodCoordinates } from '../utils/geocoding';

const NeighborhoodPage = () => {
  const { citySlug, neighborhood } = useParams();
  const [daycares, setDaycares] = useState<Daycare[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const city = cities.find(c => c.slug === citySlug);
  const decodedNeighborhood = neighborhood ? decodeURIComponent(neighborhood) : '';

  useEffect(() => {
    const fetchDaycares = async () => {
      if (!city || !neighborhood) return;

      try {
        setIsLoading(true);
        setError(null);

        const coords = await getNeighborhoodCoordinates(
          `${decodedNeighborhood}, ${city.name}, Brasil`
        );

        if (!coords) {
          throw new Error('Não foi possível encontrar o bairro');
        }

        const results = await searchNearbyDaycares(coords.lat, coords.lng);
        setDaycares(results);
      } catch (err) {
        console.error('Error fetching daycares:', err);
        setError('Erro ao buscar creches. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDaycares();
  }, [city, neighborhood, decodedNeighborhood]);

  if (!city || !neighborhood) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Página não encontrada</h1>
          <Link to="/" className="text-amber-500 hover:text-amber-600">
            ← Voltar para página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <Link
            to={`/cidade/${citySlug}`}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2 mb-4 transition"
          >
            <ArrowLeft size={20} />
            Voltar para {city.name}
          </Link>
          <div className="flex items-center gap-3">
            <MapPin className="text-amber-500" size={28} />
            <h1 className="text-2xl font-bold">
              Creches em {decodedNeighborhood}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        ) : daycares.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">
              Nenhuma creche encontrada neste bairro.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {daycares.map((daycare, index) => (
              <DaycareCard 
                key={daycare.id || `daycare-${index}`}
                daycare={daycare} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NeighborhoodPage;