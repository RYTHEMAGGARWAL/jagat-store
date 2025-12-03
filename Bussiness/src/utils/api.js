import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 second timeout for cold starts
});

// Debug log
console.log('🔑 API Base URL:', import.meta.env.VITE_API_URL);

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor with better error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔄 Retry once on network error (cold start issue)
    if (!error.response && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('🔄 Network error, retrying request...');
      
      // Wait 2 seconds and retry
      await new Promise(resolve => setTimeout(resolve, 2000));
      return api(originalRequest);
    }

    // 🔐 Handle 401 - Token expired/invalid
    if (error.response?.status === 401) {
      console.log('🔐 Token invalid, logging out...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('jagat_gift_added');
      localStorage.removeItem('jagat_gift_product');
      
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    // 🌐 Handle 500 - Server error
    if (error.response?.status === 500) {
      console.log('⚠️ Server error, may need to retry');
    }

    // 📡 Handle network errors
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.log('⏱️ Request timeout - server may be waking up');
    }

    return Promise.reject(error);
  }
);

// 🏥 Health check function - call on app start
export const checkServerHealth = async () => {
  try {
    const response = await axios.get(
      (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '') + '/health',
      { timeout: 45000 } // 45 sec for cold start
    );
    console.log('✅ Server is awake:', response.data);
    return true;
  } catch (error) {
    console.log('⚠️ Server may be sleeping, waking up...');
    return false;
  }
};

export default api;