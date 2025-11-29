import React, { useState, useRef, useEffect } from 'react';
import './ProductImage.css';

const ProductImage = ({ src, alt, className }) => {
  const [imageState, setImageState] = useState('loading'); // loading | loaded | error
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  // SVG placeholder when image fails to load
  const defaultPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f5f5f5' width='400' height='400'/%3E%3Ctext fill='%23999' font-family='Arial' font-size='16' dy='10.5' x='50%25' y='50%25' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

  // Low quality placeholder (tiny blurred image)
  const blurPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%23e8e8e8' width='40' height='40'/%3E%3C/svg%3E";

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before visible
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setImageState('loaded');
  };

  const handleImageError = () => {
    setImageState('error');
  };

  // Get optimized image URL (if using external URLs)
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) return defaultPlaceholder;
    
    // If it's an Amazon image, try to get smaller version
    if (originalSrc.includes('m.media-amazon.com')) {
      // Replace _SL1500_ or _SL1200_ with _SL400_ for faster loading
      return originalSrc
        .replace(/_SL1500_/g, '_SL400_')
        .replace(/_SL1200_/g, '_SL400_')
        .replace(/_SL1000_/g, '_SL400_');
    }
    
    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(src);

  return (
    <div className={`product-image-wrapper ${className || ''}`} ref={imgRef}>
      {/* Skeleton loader - shows while loading */}
      {imageState === 'loading' && (
        <div className="image-skeleton">
          <div className="skeleton-shimmer"></div>
        </div>
      )}

      {/* Actual image - only loads when in viewport */}
      {isInView && (
        <img
          src={imageState === 'error' ? defaultPlaceholder : optimizedSrc}
          alt={alt}
          className={`product-img ${imageState === 'loaded' ? 'loaded' : 'loading'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Blur placeholder while not in view */}
      {!isInView && (
        <img
          src={blurPlaceholder}
          alt=""
          className="product-img blur-placeholder"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default ProductImage;