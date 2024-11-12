import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, MapPin, ChevronRight, ArrowLeft } from 'lucide-react';
import { cities } from '../data/cities';

const CityPage = () => {
  const { citySlug } = useParams();
  const city = cities.find(c => c.slug === citySlug);

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cidade não encontrada</h1>
          <Link to="/" className="text-amber-500 hover:text-amber-600">
            ← Voltar para página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] mb-8">
        <div className="absolute inset-0">
          <img
            src={city.image}
            alt={`Cidade de ${city.name}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative h-full container mx-auto px-4 flex flex-col items-start justify-center">
          <Link
            to="/"
            className="mb-4 text-white/90 hover:text-white flex items-center gap-2 transition"
          >
            <ArrowLeft size={20} />
            Voltar para página inicial
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">
            Creches em {city.name}
          </h1>
          <p className="text-xl text-white/90">
            Encontre a melhor creche para seu pet por região
          </p>
        </div>
      </div>

      {/* Regions and Neighborhoods */}
      <div className="container mx-auto px-4 pb-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <Building2 className="text-amber-500" size={32} />
            <h2 className="text-2xl font-bold">Bairros de {city.name}</h2>
          </div>

          <div className="grid gap-8">
            {city.regions.map((region) => (
              <div key={region.name} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin className="text-amber-500" size={20} />
                  {region.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {region.neighborhoods.map((neighborhood) => (
                    <Link
                      key={neighborhood}
                      to={`/cidade/${city.slug}/${encodeURIComponent(neighborhood.toLowerCase())}`}
                      className="p-4 bg-gray-50 hover:bg-amber-50 rounded-lg text-gray-700 hover:text-amber-700 transition flex items-center justify-between group"
                    >
                      <span>{neighborhood}</span>
                      <ChevronRight 
                        size={18} 
                        className="text-gray-400 group-hover:text-amber-500 transition"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPage;