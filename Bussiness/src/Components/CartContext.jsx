import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

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

  // Fetch cart on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCart();
    }
  }, []);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setCartItems([]);
        setTotalItems(0);
        return;
      }

      console.log('Fetching cart from backend...');
      const response = await api.get('/cart');
      console.log('Cart response:', response.data);
      
      if (response.data.success && response.data.cart) {
        const items = response.data.cart.items || [];
        console.log('Cart items:', items);
        setCartItems(items);
        
        // Calculate total items
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        setTotalItems(total);
      } else {
        setCartItems([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  // Get cart (returns cart data)
  const getCart = async () => {
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
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return { success: false, message: 'Please login first' };
      }

      console.log('Adding to cart:', { productId, quantity });

      const response = await api.post('/cart/add', {
        productId,
        quantity
      });

      console.log('Add to cart response:', response.data);

      if (response.data.success) {
        await fetchCart(); // Refresh cart
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
    try {
      console.log('Updating quantity:', { productId, quantity });

      const response = await api.put('/cart/update', {
        productId,
        quantity
      });

      console.log('Update quantity response:', response.data);

      if (response.data.success) {
        await fetchCart(); // Refresh cart
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
    try {
      console.log('Removing from cart:', productId);

      const response = await api.delete(`/cart/remove/${productId}`);

      console.log('Remove from cart response:', response.data);

      if (response.data.success) {
        await fetchCart(); // Refresh cart
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

  // Clear cart
  const clearCart = async () => {
    try {
      const response = await api.delete('/cart/clear');
      
      if (response.data.success) {
        setCartItems([]);
        setTotalItems(0);
        return { success: true, message: 'Cart cleared' };
      }

      return { success: false, message: 'Failed to clear cart' };
    } catch (error) {
      console.error('Error clearing cart:', error);
      return { success: false, message: 'Failed to clear cart' };
    }
  };

  // Refresh cart (alias for fetchCart)
  const refreshCart = async () => {
    await fetchCart();
  };

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
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
    refreshCart,
    fetchCart,
    getCart,
    getCartTotal,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };