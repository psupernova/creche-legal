import React, { useState, useEffect } from 'react';
import { optimizeUnsplashUrl, generateSrcSet } from '../utils/imageOptimization';

interface Props {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: React.FC<Props> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  loading = 'lazy'
}) => {
  const [loaded, setLoaded] = useState(false);
  const optimizedSrc = optimizeUnsplashUrl(src, width);
  const srcSet = generateSrcSet(src);

  useEffect(() => {
    if (priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = optimizedSrc;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [optimizedSrc, priority]);

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      alt={alt}
      className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      width={width}
      height={height}
      loading={loading}
      onLoad={() => setLoaded(true)}
      decoding="async"
    />
  );
};

export default OptimizedImage;