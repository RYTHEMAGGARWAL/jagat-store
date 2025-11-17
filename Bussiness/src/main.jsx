import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// ✅ AGGRESSIVE SERVICE WORKER CLEANUP
(async () => {
  try {
    // Unregister ALL service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      console.log(`🧹 Found ${registrations.length} service worker(s)`);
      
      for (const registration of registrations) {
        const result = await registration.unregister();
        console.log('✅ Unregistered:', result);
      }
    }

    // Clear ALL caches
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      console.log(`🧹 Found ${cacheNames.length} cache(s)`);
      
      for (const cacheName of cacheNames) {
        await caches.delete(cacheName);
        console.log('✅ Deleted cache:', cacheName);
      }
    }

    // Clear localStorage (optional - comment out if you need it)
    // localStorage.clear();
    
    console.log('✅ Cleanup complete!');
  } catch (error) {
    console.error('❌ Cleanup error:', error);
  }
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);