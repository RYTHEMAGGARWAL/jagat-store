import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api, { tokenHelpers } from '../utils/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  // ✅ Check if user is logged in
  const isLoggedIn = useCallback(() => {
    return tokenHelpers.isLoggedIn();
  }, []);

  // Fetch cart from backend
  const fetchCart = async () => {
    // ✅ Double check token before fetching
    if (!isLoggedIn()) {
      console.log('⚠️ No token, clearing cart state');
      setCartItems([]);
      setTotalItems(0);
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching cart from backend...');
      const response = await api.get('/cart');
      console.log('Cart response:', response.data);
      
      if (response.data.success && response.data.cart) {
        const items = (response.data.cart.items || []).filter(item => item?.product);
        console.log('Cart items:', items);
        setCartItems(items);
        
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        setTotalItems(total);
      } else {
        setCartItems([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      // ✅ If 401 error, clear cart
      if (error.response?.status === 401) {
        console.log('🔒 Unauthorized, clearing cart');
        setCartItems([]);
        setTotalItems(0);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart on mount
  useEffect(() => {
    if (isLoggedIn()) {
      fetchCart();
    } else {
      setCartItems([]);
      setTotalItems(0);
    }
  }, []);

  // ✅ Listen for storage changes (logout from another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        if (!e.newValue) {
          console.log('🔄 Token removed, clearing cart');
          setCartItems([]);
          setTotalItems(0);
        } else {
          fetchCart();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // ✅ Listen for custom logout event
  useEffect(() => {
    const handleLogout = () => {
      console.log('🚪 Logout event received, clearing cart');
      setCartItems([]);
      setTotalItems(0);
    };

    window.addEventListener('user-logout', handleLogout);
    return () => window.removeEventListener('user-logout', handleLogout);
  }, []);

  // Get cart
  const getCart = async () => {
    if (!isLoggedIn()) return { items: [] };
    
    try {
      const response = await api.get('/cart');
      return response.data.cart || { items: [] };
    } catch (error) {
      console.error('Error getting cart:', error);
      return { items: [] };
    }
  };

  // Add to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!isLoggedIn()) {
      alert('Please login first');
      return { success: false, message: 'Please login first' };
    }

    try {
      console.log('Adding to cart:', { productId, quantity });
      const response = await api.post('/cart/add', { productId, quantity });
      console.log('Add to cart response:', response.data);

      if (response.data.success) {
        await fetchCart();
        return { success: true, message: 'Added to cart' };
      }

      return { success: false, message: response.data.message };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add to cart' 
      };
    }
  };

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    if (!isLoggedIn()) {
      return { success: false, message: 'Please login first' };
    }

    try {
      console.log('Updating quantity:', { productId, quantity });
      const response = await api.put('/cart/update', { productId, quantity });
      console.log('Update quantity response:', response.data);

      if (response.data.success) {
        await fetchCart();
        return { success: true, message: 'Quantity updated' };
      }

      return { success: false, message: response.data.message };
    } catch (error) {
      console.error('Error updating quantity:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update quantity' 
      };
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    if (!isLoggedIn()) {
      return { success: false, message: 'Please login first' };
    }

    try {
      console.log('Removing from cart:', productId);
      const response = await api.delete(`/cart/remove/${productId}`);
      console.log('Remove from cart response:', response.data);

      if (response.data.success) {
        await fetchCart();
        return { success: true, message: 'Item removed' };
      }

      return { success: false, message: response.data.message };
    } catch (error) {
      console.error('Error removing from cart:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to remove item' 
      };
    }
  };

  // Clear cart (API call)
  const clearCart = async () => {
    try {
      if (!isLoggedIn()) {
        setCartItems([]);
        setTotalItems(0);
        return { success: true, message: 'Cart cleared' };
      }

      const response = await api.delete('/cart/clear');
      
      if (response.data.success) {
        setCartItems([]);
        setTotalItems(0);
        return { success: true, message: 'Cart cleared' };
      }

      return { success: false, message: 'Failed to clear cart' };
    } catch (error) {
      console.error('Error clearing cart:', error);
      setCartItems([]);
      setTotalItems(0);
      return { success: false, message: 'Failed to clear cart' };
    }
  };

  // ✅ Reset cart state locally (for logout - no API call)
  const resetCart = () => {
    console.log('🔄 Resetting cart state (logout)');
    setCartItems([]);
    setTotalItems(0);
  };

  // Refresh cart
  const refreshCart = async () => {
    if (isLoggedIn()) {
      await fetchCart();
    } else {
      setCartItems([]);
      setTotalItems(0);
    }
  };

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      if (!item?.product?.price) return total;
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  // Get total items
  const getTotalItems = () => {
    return totalItems;
  };

  const value = {
    cartItems,
    totalItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    resetCart,
    refreshCart,
    fetchCart,
    getCart,
    getCartTotal,
    getTotalItems,
    isLoggedIn
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };