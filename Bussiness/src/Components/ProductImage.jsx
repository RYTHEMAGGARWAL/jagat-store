import React, { useState, useRef, useEffect } from 'react';
import './ProductImage.css';

const ProductImage = ({ src, alt, className }) => {
  const [imageState, setImageState] = useState('loading');
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  const defaultPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f5f5f5' width='400' height='400'/%3E%3Ctext fill='%23999' font-family='Arial' font-size='16' dy='10.5' x='50%25' y='50%25' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

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
        rootMargin: '100px',
        threshold: 0.01
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setImageState('loaded');
  };

  const handleImageError = () => {
    setImageState('error');
  };

  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) return defaultPlaceholder;
    
    if (originalSrc.includes('m.media-amazon.com')) {
      return originalSrc
        .replace(/_SL1500_/g, '_SL400_')
        .replace(/_SL1200_/g, '_SL400_')
        .replace(/_SL1000_/g, '_SL400_');
    }
    
    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(src);
  const imageSrc = imageState === 'error' ? defaultPlaceholder : optimizedSrc;

  return (
    <div className={`product-image-wrapper ${className || ''}`} ref={imgRef}>
      {imageState === 'loading' && (
        <div className="image-skeleton"></div>
      )}

      {isInView ? (
        <img
          src={imageSrc}
          alt={alt || 'Product'}
          className={`product-img ${imageState}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="image-placeholder"></div>
      )}
    </div>
  );
};

export default ProductImage;