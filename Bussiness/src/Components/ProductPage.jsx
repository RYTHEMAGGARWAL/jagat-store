import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import api from '../utils/api';
import ProductImage from './ProductImage';
import './ProductPage.css';

const ProductPage = ({ category, title, subtitle }) => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [productQuantities, setProductQuantities] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const PRODUCTS_PER_PAGE = 20; // Load 20 products at a time
  
  const { addToCart, removeFromCart, updateQuantity, getCart, refreshCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Get search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    fetchProducts();
    loadCartQuantities();
  }, [category, searchQuery]);

  // Update displayed products when page changes
  useEffect(() => {
    const endIndex = page * PRODUCTS_PER_PAGE;
    setDisplayedProducts(products.slice(0, endIndex));
    setHasMore(endIndex < products.length);
  }, [products, page]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      setPage(1); // Reset page on new fetch
      
      let url = `/products?category=${encodeURIComponent(category)}`;
      
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      
      console.log('Fetching products:', url);
      const response = await api.get(url);
      
      const fetchedProducts = response.data.products || [];
      console.log('Products fetched:', fetchedProducts.length);
      
      setProducts(fetchedProducts);
      // Initially show only first batch
      setDisplayedProducts(fetchedProducts.slice(0, PRODUCTS_PER_PAGE));
      setHasMore(fetchedProducts.length > PRODUCTS_PER_PAGE);
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
          if (item.product && item.product._id) {
            quantities[item.product._id] = item.quantity;
          }
        });
      }
      
      setProductQuantities(quantities);
    } catch (error) {
      console.error('Error loading cart quantities:', error);
    }
  };

  // Load more products
  const loadMore = useCallback(() => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  }, [hasMore]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 500
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Please login to add items to cart');
        navigate('/login');
        return;
      }

      // Optimistic update
      setProductQuantities(prev => ({
        ...prev,
        [product._id]: 1
      }));

      const result = await addToCart(product._id, 1);

      if (result.success) {
        await refreshCart();
      } else {
        // Revert on error
        setProductQuantities(prev => {
          const newQty = { ...prev };
          delete newQty[product._id];
          return newQty;
        });
        alert('❌ ' + result.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Revert on error
      setProductQuantities(prev => {
        const newQty = { ...prev };
        delete newQty[product._id];
        return newQty;
      });
      
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
      
      await updateQuantity(product._id, newQty);
      await refreshCart();
    } catch (error) {
      console.error('Error increasing quantity:', error);
      await loadCartQuantities();
    }
  };

  const handleDecreaseQuantity = async (product) => {
    try {
      const currentQty = productQuantities[product._id] || 0;
      
      if (currentQty <= 1) {
        // Optimistic update
        setProductQuantities(prev => {
          const newQty = { ...prev };
          delete newQty[product._id];
          return newQty;
        });
        
        await removeFromCart(product._id);
      } else {
        const newQty = currentQty - 1;
        
        // Optimistic update
        setProductQuantities(prev => ({
          ...prev,
          [product._id]: newQty
        }));
        
        await updateQuantity(product._id, newQty);
      }
      
      await refreshCart();
    } catch (error) {
      console.error('Error decreasing quantity:', error);
      await loadCartQuantities();
    }
  };

  // Skeleton loader for initial load
  if (loading) {
    return (
      <div className="product-page">
        <div className="page-header">
          <h1>{title || category}</h1>
          <p>{subtitle || `Shop ${category} products`}</p>
        </div>
        <div className="products-grid">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="product-card skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-brand"></div>
                <div className="skeleton-price"></div>
                <div className="skeleton-button"></div>
              </div>
            </div>
          ))}
        </div>
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
        <>
          <div className="products-grid">
            {displayedProducts.map((product) => {
              const quantity = productQuantities[product._id] || 0;
              const isInCart = quantity > 0;

              return (
                <div key={product._id} className="product-card">
                  <div className="product-image">
                    <ProductImage 
                      src={product.image} 
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

          {/* Load More / Loading indicator */}
          {hasMore && (
            <div className="load-more-container">
              <button className="load-more-btn" onClick={loadMore}>
                Load More Products
              </button>
            </div>
          )}

          {/* Showing count */}
          <div className="products-count">
            Showing {displayedProducts.length} of {products.length} products
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;