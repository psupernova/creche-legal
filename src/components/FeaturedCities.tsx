import React, { useState } from 'react';
import { Building2, ChevronRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const cities = [
  {
    name: 'São Paulo',
    image: 'https://images.unsplash.com/photo-1543059080-f9b1272213d5?auto=format&fit=crop&q=80',
    slug: 'sao-paulo',
    regions: [
      {
        name: 'Zona Sul',
        neighborhoods: ['Moema', 'Vila Olímpia', 'Itaim Bibi', 'Campo Belo', 'Brooklin']
      },
      {
        name: 'Zona Oeste',
        neighborhoods: ['Pinheiros', 'Vila Madalena', 'Perdizes', 'Alto de Pinheiros']
      },
      {
        name: 'Zona Norte',
        neighborhoods: ['Santana', 'Tucuruvi', 'Vila Guilherme', 'Casa Verde']
      },
      {
        name: 'Zona Leste',
        neighborhoods: ['Tatuapé', 'Anália Franco', 'Mooca', 'Vila Prudente']
      }
    ]
  },
  {
    name: 'Rio de Janeiro',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80',
    slug: 'rio-de-janeiro',
    regions: [
      {
        name: 'Zona Sul',
        neighborhoods: ['Copacabana', 'Ipanema', 'Leblon', 'Botafogo', 'Flamengo']
      },
      {
        name: 'Zona Norte',
        neighborhoods: ['Tijuca', 'Vila Isabel', 'Grajaú', 'Méier']
      },
      {
        name: 'Zona Oeste',
        neighborhoods: ['Barra da Tijuca', 'Recreio', 'Jacarepaguá']
      },
      {
        name: 'Centro',
        neighborhoods: ['Centro', 'Lapa', 'Santa Teresa']
      }
    ]
  },
  {
    name: 'Curitiba',
    image: 'https://cdn.pixabay.com/photo/2017/08/28/16/23/curitiba-2690289_1280.jpg',
    slug: 'curitiba',
    regions: [
      {
        name: 'Região Central',
        neighborhoods: ['Centro', 'Batel', 'Água Verde', 'Bigorrilho']
      },
      {
        name: 'Região Norte',
        neighborhoods: ['Santa Felicidade', 'Boa Vista', 'Bacacheri']
      },
      {
        name: 'Região Sul',
        neighborhoods: ['Portão', 'Novo Mundo', 'Pinheirinho']
      },
      {
        name: 'Região Leste',
        neighborhoods: ['Cristo Rei', 'Jardim das Américas', 'Cajuru']
      }
    ]
  },
  {
    name: 'Porto Alegre',
    image: 'https://cdn.pixabay.com/photo/2016/07/13/20/44/architecture-1515475_1280.jpg',
    slug: 'porto-alegre',
    regions: [
      {
        name: 'Região Central',
        neighborhoods: ['Centro Histórico', 'Cidade Baixa', 'Bom Fim', 'Moinhos de Vento']
      },
      {
        name: 'Zona Norte',
        neighborhoods: ['Cristo Redentor', 'Lindóia', 'São João']
      },
      {
        name: 'Zona Sul',
        neighborhoods: ['Ipanema', 'Tristeza', 'Cavalhada']
      },
      {
        name: 'Zona Leste',
        neighborhoods: ['Petrópolis', 'Bela Vista', 'Três Figueiras']
      }
    ]
  }
];

const FeaturedCities = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showNeighborhoods, setShowNeighborhoods] = useState(false);

  const handleCityClick = (citySlug: string) => {
    setSelectedCity(citySlug);
    setShowNeighborhoods(true);
  };

  const selectedCityData = cities.find(city => city.slug === selectedCity);

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Cidades em Destaque
      </h2>

      {!showNeighborhoods ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city) => (
            <div 
              key={city.slug}
              className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition cursor-pointer"
              onClick={() => handleCityClick(city.slug)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={city.image}
                  alt={`Cidade de ${city.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {city.name}
                </h3>
              </div>
              <div className="p-4">
                <button
                  className="w-full flex items-center justify-center gap-2 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition"
                >
                  Encontre a creche por bairro
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : selectedCityData && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Building2 className="text-amber-500" size={32} />
              <h3 className="text-2xl font-bold">Bairros de {selectedCityData.name}</h3>
            </div>
            <button
              onClick={() => setShowNeighborhoods(false)}
              className="text-gray-600 hover:text-gray-800 transition"
            >
              ← Voltar para cidades
            </button>
          </div>

          <div className="grid gap-6">
            {selectedCityData.regions.map((region) => (
              <div key={region.name} className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin className="text-amber-500" size={20} />
                  {region.name}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {region.neighborhoods.map((neighborhood) => (
                    <Link
                      key={neighborhood}
                      to={`/cidade/${selectedCityData.slug}/${encodeURIComponent(neighborhood.toLowerCase())}`}
                      className="p-3 bg-gray-50 hover:bg-amber-50 rounded-lg text-gray-700 hover:text-amber-700 transition flex items-center justify-between"
                    >
                      {neighborhood}
                      <ChevronRight size={18} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedCities;