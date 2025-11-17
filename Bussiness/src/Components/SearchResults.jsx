import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../Components/CartContext';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
       const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const response = await fetch(
  `${API_URL}/products/search?q=${encodeURIComponent(query)}`
);

        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('❌ Search Error:', err);
        setError('Failed to fetch search results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  // ✅ Get quantity from backend cart
  const getQuantity = (productId) => {
    const item = cartItems.find(item => item.product._id === productId);
    return item ? item.quantity : 0;
  };

  // ✅ Handle add to cart (backend)
  const handleAddToCart = async (product) => {
    const result = await addToCart(product._id, 1);
    if (!result.success) {
      alert(result.message || 'Failed to add to cart');
    }
  };

  // ✅ Handle increase quantity
  const handleIncreaseQuantity = async (productId) => {
    const currentQuantity = getQuantity(productId);
    const result = await updateQuantity(productId, currentQuantity + 1);
    if (!result.success) {
      alert(result.message || 'Failed to update quantity');
    }
  };

  // ✅ Handle decrease quantity
  const handleDecreaseQuantity = async (productId) => {
    const currentQuantity = getQuantity(productId);
    
    if (currentQuantity === 1) {
      const result = await removeFromCart(productId);
      if (!result.success) {
        alert(result.message || 'Failed to remove item');
      }
    } else {
      const result = await updateQuantity(productId, currentQuantity - 1);
      if (!result.success) {
        alert(result.message || 'Failed to update quantity');
      }
    }
  };

  if (loading) {
    return (
      <div className="search-results-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Searching for "{query}"...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-container">
        <div className="error-message">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="search-header">
        <h1>Search Results for: "{query}"</h1>
        <p className="results-count">
          {products.length > 0 
            ? `Found ${products.length} product${products.length !== 1 ? 's' : ''}` 
            : 'No products found'}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h2>No products found</h2>
          <p>Try searching with different keywords or browse our categories</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => {
            const quantity = getQuantity(product._id);
            
            return (
              <div key={product._id} className="product-card">
                <div className="product-image-wrapper">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                  />
                  {product.discount > 0 && (
                    <div className="discount-badge">-{product.discount}%</div>
                  )}
                </div>

                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-brand">{product.brand}</p>
                  
                  <div className="product-pricing">
                    <div className="price-section">
                      <span className="current-price">₹{product.price}</span>
                      {product.oldPrice && product.oldPrice > product.price && (
                        <span className="original-price">₹{product.oldPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* ✅ QUANTITY CONTROLS - BACKEND INTEGRATED */}
                  {quantity > 0 ? (
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn minus"
                        onClick={() => handleDecreaseQuantity(product._id)}
                      >
                        −
                      </button>
                      <span className="quantity-display">{quantity}</span>
                      <button 
                        className="quantity-btn plus"
                        onClick={() => handleIncreaseQuantity(product._id)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      🛒 Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;