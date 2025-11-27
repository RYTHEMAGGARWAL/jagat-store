// ScrollToTop.jsx
// Save in Components folder - REPLACE OLD FILE

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, search } = useLocation(); // 👈 search bhi add kiya

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search]); // 👈 search bhi dependency mein add kiya

  return null;
};

export default ScrollToTop;