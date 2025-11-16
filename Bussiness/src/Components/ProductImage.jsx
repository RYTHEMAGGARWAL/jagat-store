import React, { useState } from 'react';

const ProductImage = ({ src, alt, className }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // SVG placeholder when image fails to load
  const defaultPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23e8e8e8' width='400' height='400'/%3E%3Ctext fill='%23666' font-family='Arial' font-size='20' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EProduct Image%3C/text%3E%3C/svg%3E";

  return (
    <img
      src={imageError ? defaultPlaceholder : src}
      alt={alt}
      className={className}
      onError={handleImageError}
      loading="lazy"
    />
  );
};

export default ProductImage;