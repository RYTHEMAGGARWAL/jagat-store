import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import api from '../utils/api';
import ProductImage from './ProductImage';
import './ProductPage.css';

const ProductPage = ({ category, title, subtitle }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [productQuantities, setProductQuantities] = useState({});
  const { addToCart, removeFromCart, updateQuantity, getCart, refreshCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Fallback image (base64 encoded placeholder)
  const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%23f0f0f0" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="16" text-anchor="middle" dy=".3em" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';

  // Get search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    fetchProducts();
    loadCartQuantities();
  }, [category, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Build API URL with category filter
      let url = `/products?category=${encodeURIComponent(category)}`;
      
      // Add search query if exists
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      
      console.log('Fetching products:', url);
      const response = await api.get(url);
      
      console.log('Products fetched:', response.data);
      setProducts(response.data.products || []);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadCartQuantities = async () => {
    try {
      const cart = await getCart();
      const quantities = {};
      
      if (cart && cart.items) {
        cart.items.forEach(item => {
          quantities[item.product._id] = item.quantity;
        });
      }
      
      setProductQuantities(quantities);
    } catch (error) {
      console.error('Error loading cart quantities:', error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Please login to add items to cart');
        navigate('/login');
        return;
      }

      console.log('Adding product to cart:', product._id);

      // Add to cart
      const result = await addToCart(product._id, 1);

      if (result.success) {
        // Update local quantity
        setProductQuantities(prev => ({
          ...prev,
          [product._id]: 1
        }));
        
        // Refresh cart
        await refreshCart();
      } else {
        alert('❌ ' + result.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response?.status === 401) {
        alert('Please login first');
        navigate('/login');
      } else {
        alert('Failed to add to cart');
      }
    }
  };

  const handleIncreaseQuantity = async (product) => {
    try {
      const currentQty = productQuantities[product._id] || 0;
      const newQty = currentQty + 1;
      
      // Optimistic update
      setProductQuantities(prev => ({
        ...prev,
        [product._id]: newQty
      }));
      
      // Update in backend
      await updateQuantity(product._id, newQty);
      await refreshCart();
    } catch (error) {
      console.error('Error increasing quantity:', error);
      // Revert on error
      await loadCartQuantities();
    }
  };

  const handleDecreaseQuantity = async (product) => {
    try {
      const currentQty = productQuantities[product._id] || 0;
      
      if (currentQty <= 1) {
        // Remove from cart
        await removeFromCart(product._id);
        setProductQuantities(prev => {
          const newQty = { ...prev };
          delete newQty[product._id];
          return newQty;
        });
      } else {
        // Decrease quantity
        const newQty = currentQty - 1;
        setProductQuantities(prev => ({
          ...prev,
          [product._id]: newQty
        }));
        await updateQuantity(product._id, newQty);
      }
      
      await refreshCart();
    } catch (error) {
      console.error('Error decreasing quantity:', error);
      // Revert on error
      await loadCartQuantities();
    }
  };


  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchProducts}>Retry</button>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="page-header">
        <h1>{title || category}</h1>
        <p>{subtitle || `Shop ${category} products`}</p>
      </div>

      {searchQuery && (
        <div className="search-info">
          <p>
            {products.length > 0 
              ? `Found ${products.length} products for "${searchQuery}"`
              : `No products found for "${searchQuery}"`
            }
          </p>
        </div>
      )}

      {products.length === 0 ? (
        <div className="no-products">
          {searchQuery ? (
            <p>No products found matching your search.</p>
          ) : (
            <p>No products available in this category yet.</p>
          )}
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => {
            const quantity = productQuantities[product._id] || 0;
            const isInCart = quantity > 0;

            return (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <ProductImage 
                    src={product.image || FALLBACK_IMAGE} 
                    alt={product.name}
                  />
                  {product.discount && (
                    <span className="discount-badge">{product.discount}</span>
                  )}
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  
                  {product.brand && (
                    <p className="product-brand">{product.brand}</p>
                  )}
                  
                  {product.weight && (
                    <p className="product-quantity">{product.weight}</p>
                  )}

                  <div className="product-pricing">
                    <div className="price-row">
                      <span className="current-price">₹{product.price}</span>
                      {product.oldPrice && product.oldPrice > product.price && (
                        <span className="original-price">₹{product.oldPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="product-actions">
                    {product.inStock && product.stock > 0 ? (
                      <>
                        {!isInCart ? (
                          <button 
                            className="add-to-cart-btn"
                            onClick={() => handleAddToCart(product)}
                          >
                            ADD TO CART
                          </button>
                        ) : (
                          <div className="quantity-controls">
                            <button 
                              className="quantity-btn decrease"
                              onClick={() => handleDecreaseQuantity(product)}
                            >
                              −
                            </button>
                            <span className="quantity-display">{quantity}</span>
                            <button 
                              className="quantity-btn increase"
                              onClick={() => handleIncreaseQuantity(product)}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <button className="out-of-stock-btn" disabled>
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductPage;