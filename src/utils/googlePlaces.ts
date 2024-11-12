import { Daycare, DaycareReview } from '../types/daycare';

export const searchNearbyDaycares = async (lat: number, lng: number): Promise<Daycare[]> => {
  try {
    const mapDiv = document.createElement('div');
    const map = new google.maps.Map(mapDiv, {
      center: { lat, lng },
      zoom: 15
    });

    const service = new google.maps.places.PlacesService(map);

    // Realizar múltiplas buscas com diferentes termos e tipos
    const searchQueries = [
      {
        type: ['pet_care'],
        keyword: 'creche cachorro'
      },
      {
        type: ['pet_care'],
        keyword: 'hotel cachorro'
      },
      {
        type: ['pet_care'],
        keyword: 'daycare cachorro'
      },
      {
        type: ['veterinary_care'],
        keyword: 'creche pet'
      }
    ];

    const allResults = await Promise.all(
      searchQueries.map(query =>
        new Promise<google.maps.places.PlaceResult[]>((resolve) => {
          const request = {
            location: { lat, lng },
            radius: 5000, // 5km radius
            type: query.type,
            keyword: query.keyword
          };

          service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
              resolve(results);
            } else {
              resolve([]);
            }
          });
        })
      )
    );

    // Combine results and remove duplicates
    const uniquePlaces = new Map<string, google.maps.places.PlaceResult>();
    allResults.flat().forEach(place => {
      if (place.place_id && !uniquePlaces.has(place.place_id)) {
        uniquePlaces.set(place.place_id, place);
      }
    });

    // Convert to array and get details
    const detailedResults = await Promise.all(
      Array.from(uniquePlaces.values()).map(place =>
        new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
          if (!place.place_id) {
            reject(new Error('No place_id found'));
            return;
          }

          service.getDetails(
            {
              placeId: place.place_id,
              fields: [
                'name',
                'rating',
                'formatted_address',
                'geometry',
                'photos',
                'website',
                'formatted_phone_number',
                'reviews',
                'types',
                'business_status',
                'opening_hours'
              ]
            },
            (result, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && result) {
                resolve(result);
              } else {
                reject(new Error(`Failed to fetch place details: ${status}`));
              }
            }
          );
        }).catch(error => {
          console.error('Error fetching place details:', error);
          return null;
        })
      )
    );

    // Filter and convert to Daycare type
    return detailedResults
      .filter((place): place is google.maps.places.PlaceResult => 
        place !== null && 
        place.geometry?.location !== undefined &&
        (place.business_status === 'OPERATIONAL' || place.business_status === undefined)
      )
      .map(place => {
        const location = place.geometry!.location;
        const distance = calculateDistance(lat, lng, location.lat(), location.lng());

        const features = extractFeatures(place);

        const latestReview: DaycareReview = place.reviews?.[0] ? {
          text: place.reviews[0].text || 'Ótimo estabelecimento',
          rating: place.reviews[0].rating || place.rating || 0,
          author: place.reviews[0].author_name || 'Cliente',
          date: place.reviews[0].time ? 
            new Date(place.reviews[0].time * 1000).toISOString().split('T')[0] : 
            new Date().toISOString().split('T')[0]
        } : {
          text: 'Novo estabelecimento',
          rating: place.rating || 0,
          author: 'Sistema',
          date: new Date().toISOString().split('T')[0]
        };

        return {
          id: place.place_id!,
          name: place.name || 'Estabelecimento Pet',
          distance: Math.round(distance * 10) / 10,
          duration: Math.round((distance / 20) * 60), // Average speed of 20km/h
          rating: place.rating || 0,
          features,
          image: place.photos?.[0]?.getUrl({ maxWidth: 500, maxHeight: 300 }) || 
            'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80',
          address: place.formatted_address || '',
          website: place.website,
          phone: place.formatted_phone_number,
          latestReview
        };
      })
      .sort((a, b) => {
        // Sort by distance first
        if (Math.abs(a.distance - b.distance) > 1) {
          return a.distance - b.distance;
        }
        // If distances are similar, sort by rating
        return b.rating - a.rating;
      });
  } catch (error) {
    console.error('Error in searchNearbyDaycares:', error);
    throw error;
  }
};

// Helper function to extract features from place data
const extractFeatures = (place: google.maps.places.PlaceResult): string[] => {
  const features: Set<string> = new Set();
  
  if (place.types) {
    if (place.types.includes('veterinary_care')) {
      features.add('Veterinário');
    }
    if (place.types.includes('pet_care') || place.types.includes('pet_store')) {
      features.add('Day care');
    }
  }

  place.reviews?.forEach(review => {
    const text = review.text.toLowerCase();
    if (text.includes('piscina')) features.add('Piscina');
    if (text.includes('área verde') || text.includes('area verde')) features.add('Área verde');
    if (text.includes('câmera') || text.includes('camera') || text.includes('monitoramento')) features.add('Câmeras');
    if (text.includes('adestramento')) features.add('Adestramento');
    if (text.includes('banho') || text.includes('tosa')) features.add('Banho e Tosa');
  });

  features.add('Área para exercícios');
  
  if (place.rating && place.rating >= 4.5) {
    features.add('Equipe qualificada');
  }

  return Array.from(features);
};

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};