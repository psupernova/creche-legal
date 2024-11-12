export const getNeighborhoodCoordinates = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    const geocoder = new google.maps.Geocoder();
    
    const result = await new Promise<google.maps.GeocoderResult | null>((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          resolve(results[0]);
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });

    if (!result) return null;

    return {
      lat: result.geometry.location.lat(),
      lng: result.geometry.location.lng()
    };
  } catch (error) {
    console.error('Error in getNeighborhoodCoordinates:', error);
    return null;
  }
};