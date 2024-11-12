import React from 'react';
import { MapPin, Clock, Star, Globe, Phone } from 'lucide-react';
import { Daycare } from '../types/daycare';

interface Props {
  daycare: Daycare;
}

const DaycareCard: React.FC<Props> = ({ daycare }) => {
  const handleContactClick = () => {
    if (daycare.website) {
      window.open(daycare.website, '_blank');
    } else if (daycare.phone) {
      window.location.href = `tel:${daycare.phone}`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={daycare.image}
          alt={`Creche ${daycare.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="text-yellow-400" size={16} />
          <span className="text-sm font-semibold">{daycare.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {daycare.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3">{daycare.address}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={18} />
            <span>{daycare.distance} km de distância</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={18} />
            <span>{daycare.duration} min de carro</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {daycare.features.map((feature) => (
            <span
              key={feature}
              className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Latest Review */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-1 mb-2">
            <Star className="text-yellow-400" size={14} />
            <span className="text-sm font-medium">{daycare.latestReview.rating}</span>
            <span className="text-gray-500 text-sm ml-2">
              {new Date(daycare.latestReview.date).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <p className="text-sm text-gray-600 italic">"{daycare.latestReview.text}"</p>
          <p className="text-sm text-gray-500 mt-1">- {daycare.latestReview.author}</p>
        </div>

        <button
          onClick={handleContactClick}
          className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition flex items-center justify-center gap-2"
        >
          {daycare.website ? (
            <>
              <Globe size={18} />
              Visitar Site
            </>
          ) : (
            <>
              <Phone size={18} />
              {daycare.phone}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DaycareCard;