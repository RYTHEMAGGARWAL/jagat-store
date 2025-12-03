// Components/ServerWakeup.jsx
// Add this component in your App.jsx

import React, { useEffect, useState } from 'react';
import { checkServerHealth } from '../utils/api';

const ServerWakeup = ({ children }) => {
  const [serverReady, setServerReady] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const wakeUpServer = async () => {
      setChecking(true);
      
      // Try to wake up server
      const isHealthy = await checkServerHealth();
      
      if (isHealthy) {
        setServerReady(true);
        setChecking(false);
      } else {
        // Retry after 3 seconds
        setTimeout(async () => {
          await checkServerHealth();
          setServerReady(true);
          setChecking(false);
        }, 3000);
      }
    };

    wakeUpServer();
  }, []);

  // Show loading while server wakes up (only first time)
  if (checking && !serverReady) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid rgba(255,255,255,0.3)',
          borderTop: '4px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <h2 style={{ marginTop: '20px', fontSize: '1.5rem' }}>Jagat Store</h2>
        <p style={{ marginTop: '10px', opacity: 0.8 }}>Loading...</p>
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return children;
};

export default ServerWakeup;