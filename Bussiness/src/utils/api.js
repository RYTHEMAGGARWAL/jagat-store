// Frontend/src/utils/api.js - FIXED VERSION

import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

console.log('🔑 API Base URL:', import.meta.env.VITE_API_URL);

// ✅ LOGOUT FLAG - prevents token restore after logout
let isLoggingOut = false;

// 🍪 Helper: Get token from cookie
const getTokenFromCookie = () => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'token' && value) {
      return value;
    }
  }
  return null;
};

// 🍪 Helper: Set token in cookie
const setTokenCookie = (token) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 30);
  
  // Set with multiple variations to ensure it works
  document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/`;
  
  // Also try with secure flags for HTTPS
  if (window.location.protocol === 'https:') {
    document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/; SameSite=None; Secure`;
  }
};

// 🍪 Helper: Remove token cookie - COMPREHENSIVE
const removeTokenCookie = () => {
  const hostname = window.location.hostname;
  
  // Clear with all possible combinations
  const clearVariations = [
    'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/',
    'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;',
    `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname}`,
    `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname}`,
    'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure',
    'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax',
    'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict',
    'token=; max-age=0; path=/',
    'token=; max-age=-1; path=/',
  ];
  
  clearVariations.forEach(cookie => {
    document.cookie = cookie;
  });
  
  console.log('🍪 Token cookie cleared with all variations');
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // ✅ If logging out, don't attach token
    if (isLoggingOut) {
      console.log('🚫 Logout in progress, skipping token');
      return config;
    }
    
    // Get token from localStorage
    let token = localStorage.getItem('token');
    
    // ✅ REMOVED: Auto-restore from cookie (this was causing the bug)
    // Only use localStorage token
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Save token on login/register
    if (response.data?.token && !isLoggingOut) {
      const token = response.data.token;
      localStorage.setItem('token', token);
      setTokenCookie(token);
      console.log('✅ Token saved');
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Retry on network error (cold start)
    if (!error.response && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('🔄 Network error, retrying...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      return api(originalRequest);
    }

    // Handle 401 - but not during logout
    if (error.response?.status === 401 && !isLoggingOut) {
      console.log('🔐 Token invalid');
      // Don't auto-redirect, let the component handle it
    }

    return Promise.reject(error);
  }
);

// 🏥 Health check
export const checkServerHealth = async () => {
  try {
    const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');
    const response = await axios.get(`${baseUrl}/health`, { timeout: 45000 });
    console.log('✅ Server is awake:', response.data);
    return true;
  } catch (error) {
    console.log('⚠️ Server waking up...');
    return false;
  }
};

// ✅ TOKEN HELPERS - Use these in components
export const tokenHelpers = {
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  setToken: (token) => {
    localStorage.setItem('token', token);
    setTokenCookie(token);
  },
  
  // ✅ COMPLETE LOGOUT FUNCTION
  removeToken: async () => {
    console.log('🚪 removeToken called - clearing everything');
    
    // Set logout flag
    isLoggingOut = true;
    
    // ✅ Call backend logout API to clear server-side cookie
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      await fetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('✅ Backend logout API called');
    } catch (e) {
      console.log('⚠️ Backend logout failed:', e.message);
    }
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userOrders');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cart');
    localStorage.removeItem('jagat_cart');
    localStorage.removeItem('jagat_gift_added');
    localStorage.removeItem('jagat_gift_product');
    localStorage.removeItem('jagat_saved_address');
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear cookies
    removeTokenCookie();
    
    // Reset flag after a short delay
    setTimeout(() => {
      isLoggingOut = false;
    }, 1000);
    
    console.log('✅ All auth data cleared');
  },
  
  // Check if logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  }
};

export default api;