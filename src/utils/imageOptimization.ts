import { useState, useEffect } from 'react';

interface ImageDimensions {
  width: number;
  height: number;
}

// Function to get image dimensions before loading
export const getImageDimensions = (url: string): Promise<ImageDimensions> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = url;
  });
};

// Function to optimize Unsplash URLs
export const optimizeUnsplashUrl = (url: string, width: number = 800): string => {
  if (url.includes('unsplash.com')) {
    return `${url}&w=${width}&q=75&fm=webp`;
  }
  return url;
};

// Function to generate srcset for responsive images
export const generateSrcSet = (url: string): string => {
  if (!url.includes('unsplash.com')) return url;

  const widths = [320, 640, 960, 1280, 1600];
  return widths
    .map(w => `${optimizeUnsplashUrl(url, w)} ${w}w`)
    .join(', ');
};

// Custom hook for lazy loading images
export const useLazyImage = (src: string, options = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px', ...options }
    );

    const element = document.querySelector(`[data-src="${src}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [src, options]);

  return { isLoaded, error };
};