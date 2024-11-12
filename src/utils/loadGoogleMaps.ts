let isLoading = false;
let isLoaded = false;

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const loadGoogleMapsApi = (): Promise<void> => {
  if (isLoaded) {
    return Promise.resolve();
  }

  if (isLoading) {
    return new Promise((resolve) => {
      const checkLoaded = setInterval(() => {
        if (isLoaded) {
          clearInterval(checkLoaded);
          resolve();
        }
      }, 100);
    });
  }

  isLoading = true;

  return new Promise((resolve, reject) => {
    try {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.addEventListener('load', () => {
        isLoaded = true;
        isLoading = false;
        resolve();
      });

      script.addEventListener('error', (e) => {
        isLoading = false;
        reject(e);
      });

      document.head.appendChild(script);
    } catch (error) {
      isLoading = false;
      reject(error);
    }
  });
};