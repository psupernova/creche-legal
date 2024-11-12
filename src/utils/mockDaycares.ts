import { Daycare } from '../types/daycare';

// Predefined locations with their coordinates for simulation
const locationBasedDaycares: Record<string, Omit<Daycare, 'distance' | 'duration'>[]> = {
  'São Paulo': [
    {
      id: 'sp-1',
      name: 'Pet Care SP',
      rating: 4.9,
      features: ['Área verde', 'Veterinário 24h', 'Piscina'],
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80',
      address: 'Rua Augusta, 1200 - Consolação',
      website: 'https://petcaresp.com.br',
      latestReview: {
        text: 'Estrutura incrível e equipe super atenciosa!',
        rating: 5,
        author: 'Pedro Santos',
        date: '2024-03-16'
      }
    },
    {
      id: 'sp-2',
      name: 'Dog & Care',
      rating: 4.8,
      features: ['Day care', 'Adestramento', 'Banho'],
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80',
      address: 'Av. Paulista, 900 - Bela Vista',
      phone: '(11) 99999-8888',
      latestReview: {
        text: 'Meu cachorro adora passar o dia aqui!',
        rating: 5,
        author: 'Marina Lima',
        date: '2024-03-15'
      }
    },
    {
      id: 'sp-3',
      name: 'Happy Dogs SP',
      rating: 4.7,
      features: ['Área verde', 'Câmeras', 'Playground'],
      image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80',
      address: 'Rua Oscar Freire, 678 - Jardins',
      website: 'https://happydogssp.com.br',
      latestReview: {
        text: 'Ambiente muito agradável e seguro!',
        rating: 5,
        author: 'Ana Clara',
        date: '2024-03-14'
      }
    },
    {
      id: 'sp-4',
      name: 'Pet Village',
      rating: 4.6,
      features: ['Day care', 'Hospedagem', 'Natação'],
      image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80',
      address: 'Rua Teodoro Sampaio, 1020 - Pinheiros',
      phone: '(11) 98888-7777',
      latestReview: {
        text: 'Ótima infraestrutura e profissionais dedicados',
        rating: 4,
        author: 'Ricardo Silva',
        date: '2024-03-13'
      }
    }
  ],
  'Zona Sul SP': [
    {
      id: 'sp-sul-1',
      name: 'Pet Resort & Spa',
      rating: 4.9,
      features: ['Spa', 'Piscina aquecida', 'Veterinário'],
      image: 'https://images.unsplash.com/photo-1587559070757-f72a388edbba?auto=format&fit=crop&q=80',
      address: 'Av. Santo Amaro, 2500 - Brooklin',
      website: 'https://petresortspa.com.br',
      latestReview: {
        text: 'Melhor lugar para deixar meu pet!',
        rating: 5,
        author: 'Juliana Costa',
        date: '2024-03-16'
      }
    },
    {
      id: 'sp-sul-2',
      name: 'Dog Paradise',
      rating: 4.8,
      features: ['Área verde', 'Adestramento', 'Playground'],
      image: 'https://images.unsplash.com/photo-1602584386319-fa8eb4361c2c?auto=format&fit=crop&q=80',
      address: 'Rua Joaquim Floriano, 789 - Itaim Bibi',
      phone: '(11) 97777-6666',
      latestReview: {
        text: 'Excelente atendimento e estrutura',
        rating: 5,
        author: 'Fernando Mello',
        date: '2024-03-15'
      }
    }
  ],
  'Zona Oeste SP': [
    {
      id: 'sp-oeste-1',
      name: 'Pet Club Elite',
      rating: 4.9,
      features: ['Day care VIP', 'Hidroterapia', 'Spa'],
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80',
      address: 'Av. Faria Lima, 1500 - Pinheiros',
      website: 'https://petclubelite.com.br',
      latestReview: {
        text: 'Serviço premium e atendimento impecável',
        rating: 5,
        author: 'Patricia Mendes',
        date: '2024-03-16'
      }
    }
  ],
  'Rio de Janeiro': [
    {
      id: 'rj-1',
      name: 'Carioca Pet',
      rating: 4.7,
      features: ['Praia pet', 'Câmeras', 'Veterinário'],
      image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80',
      address: 'Av. Atlântica, 2000 - Copacabana',
      website: 'https://cariocapet.com.br',
      latestReview: {
        text: 'Localização perfeita e ótimo atendimento!',
        rating: 4,
        author: 'Carlos Eduardo',
        date: '2024-03-14'
      }
    },
    {
      id: 'rj-2',
      name: 'Pet Zone RJ',
      rating: 4.8,
      features: ['Área verde', 'Day care', 'Piscina'],
      image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80',
      address: 'Rua Voluntários da Pátria, 340 - Botafogo',
      phone: '(21) 99999-8888',
      latestReview: {
        text: 'Ambiente muito agradável e profissionais atenciosos',
        rating: 5,
        author: 'Mariana Santos',
        date: '2024-03-15'
      }
    }
  ]
};

// Predefined coordinates for regions (for simulation)
const regionCoordinates: Record<string, [number, number]> = {
  'São Paulo': [-23.550520, -46.633308],
  'Zona Sul SP': [-23.601379, -46.667531],
  'Zona Oeste SP': [-23.561684, -46.702072],
  'Rio de Janeiro': [-22.906847, -43.172897]
};

// Function to calculate distance between two points using Haversine formula
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

export const getNearbyDaycares = (lat: number, lng: number): Daycare[] => {
  // Find the closest regions to the searched coordinates
  const regionDistances = Object.entries(regionCoordinates).map(([region, [regionLat, regionLng]]) => ({
    region,
    distance: calculateDistance(lat, lng, regionLat, regionLng)
  }));

  // Sort regions by distance and get the two closest ones
  const closestRegions = regionDistances
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2)
    .map(rd => rd.region);

  // Get daycares from the closest regions
  let nearbyDaycares: Omit<Daycare, 'distance' | 'duration'>[] = [];
  closestRegions.forEach(region => {
    if (locationBasedDaycares[region]) {
      nearbyDaycares = [...nearbyDaycares, ...locationBasedDaycares[region]];
    }
  });

  // Add realistic distances based on the searched location
  return nearbyDaycares.map(daycare => {
    // Generate a more realistic distance based on region
    const baseDistance = Math.random() * 5; // Base distance up to 5km
    const variation = Math.random() * 2 - 1; // Random variation between -1 and 1
    const distance = Math.max(0.1, baseDistance + variation);
    
    // Calculate duration based on distance and typical city traffic
    // Assume average speed of 20km/h in heavy traffic
    const duration = Math.round((distance / 20) * 60);

    return {
      ...daycare,
      distance: Math.round(distance * 10) / 10,
      duration
    };
  }).sort((a, b) => {
    // Sort by distance first
    if (a.distance !== b.distance) {
      return a.distance - b.distance;
    }
    // If distances are equal, sort by rating
    return b.rating - a.rating;
  });
};