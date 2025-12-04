import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import Fuse from 'fuse.js';
import './SearchBar.css';

// 🔥 MISSPELLING FIXES
const FIX_SPELLING = {
  'choclate': 'chocolate', 'choklet': 'chocolate', 'choklate': 'chocolate',
  'chocolates': 'chocolate', 'choclates': 'chocolate',
  'paner': 'paneer', 'panir': 'paneer',
  'colget': 'colgate', 'colgat': 'colgate',
  'magi': 'maggi', 'maggie': 'maggi',
  'biskut': 'biscuit', 'biscut': 'biscuit', 'biscuits': 'biscuit',
  'shampu': 'shampoo', 'sampoo': 'shampoo', 'shampoos': 'shampoo',
  'noodels': 'noodles', 'nodles': 'noodles', 'noodle': 'noodles',
  'cofee': 'coffee', 'coffe': 'coffee',
  'suger': 'sugar', 'millk': 'milk',
  'retha': 'reetha', 'ritha': 'reetha',
  'manik': 'maanik', 'manic': 'maanik',
  'ilaichi': 'elaichi', 'ilachi': 'elaichi', 'elachi': 'elaichi',
  'zeera': 'jeera', 'zira': 'jeera',
  'dhaniya': 'dhania',
  'soaps': 'soap', 'oils': 'oil', 'juices': 'juice',
  'cookies': 'cookie', 'chips': 'chip',
  'dipers': 'diaper', 'diapers': 'diaper', 'nappy': 'diaper',
  'mosquitto': 'mosquito', 'machhar': 'mosquito', 'machar': 'mosquito',
  'pedegree': 'pedigree', 'pedigri': 'pedigree', 'wiskas': 'whiskas',
  'detol': 'dettol', 'dettole': 'dettol',
  'safola': 'saffola', 'safron': 'saffron',
};

// 🔥 SYNONYMS for search expansion
const SYNONYMS = {
  'elaichi': ['elaichi', 'ilaichi', 'cardamom', 'elachi'],
  'cardamom': ['cardamom', 'elaichi', 'ilaichi'],
  'jeera': ['jeera', 'cumin', 'zeera'],
  'cumin': ['cumin', 'jeera'],
  'haldi': ['haldi', 'turmeric'],
  'turmeric': ['turmeric', 'haldi'],
  'dhania': ['dhania', 'coriander'],
  'coriander': ['coriander', 'dhania'],
  'chocolate': ['chocolate', 'choco', 'cadbury', 'dairy milk'],
  'choco': ['chocolate', 'choco', 'cadbury'],
  'saffron': ['saffron', 'kesar', 'keshar', 'zafran'],
  'kesar': ['kesar', 'saffron', 'keshar'],
  'laung': ['laung', 'clove', 'cloves'],
  'diaper': ['diaper', 'nappy', 'mamy poko', 'pampers'],
  'baby': ['baby', 'johnson', 'infant'],
  'mosquito': ['mosquito', 'good knight', 'all out', 'hit'],
  'dog': ['dog', 'puppy', 'pedigree', 'drools'],
  'cat': ['cat', 'kitten', 'whiskas'],
  'milk': ['milk', 'doodh', 'dudh'],
  'doodh': ['doodh', 'milk'],
  'chai': ['chai', 'tea'],
  'tea': ['tea', 'chai'],
  'oil': ['oil', 'tel', 'refined'],
};

// 🔥 HINDI TO ENGLISH
const HINDI_ENGLISH = {
  'chawal': 'rice', 'chaawal': 'rice', 'chaval': 'rice',
  'atta': 'atta flour', 'aata': 'atta flour',
  'dal': 'dal', 'daal': 'dal',
  'doodh': 'milk', 'dudh': 'milk',
  'paneer': 'paneer', 'dahi': 'curd',
  'ghee': 'ghee', 'makhan': 'butter',
  'aloo': 'potato', 'pyaz': 'onion', 'tamatar': 'tomato',
  'sabun': 'soap', 'tel': 'oil',
  'chai': 'tea', 'pani': 'water', 'paani': 'water',
  'cheeni': 'sugar', 'namak': 'salt',
  'haldi': 'turmeric', 'mirch': 'chilli', 'jeera': 'cumin',
  'gobhi': 'cauliflower', 'palak': 'spinach', 'gajar': 'carrot',
  'seb': 'apple', 'kela': 'banana', 'aam': 'mango',
};

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const isNavigating = useRef(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_URL}/products`);
        
        if (res.ok) {
          const data = await res.json();
          const products = Array.isArray(data) ? data : (data?.products || []);
          console.log(`✅ SearchBar loaded ${products.length} products`);
          setAllProducts(products);
        }
      } catch (err) {
        console.error('❌ Fetch error:', err);
      }
    };
    fetchProducts();
  }, []);

  // Reset on navigation
  useEffect(() => {
    setShowSuggestions(false);
    setSuggestions([]);
    setSearchQuery('');
    isNavigating.current = false;
  }, [location]);

  // Update dropdown position
  const updatePosition = () => {
    if (!inputRef.current) return;
    const rect = inputRef.current.getBoundingClientRect();
    
    setDropdownPos({
      top: rect.bottom + window.scrollY + 5,
      left: isMobile ? 10 : rect.left + window.scrollX,
      width: isMobile ? window.innerWidth - 20 : rect.width
    });
  };

  // Click outside handler
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target) &&
          dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Scroll/resize handlers
  useEffect(() => {
    if (showSuggestions) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [showSuggestions, isMobile]);

  // 🔥 SEARCH SUGGESTIONS
  useEffect(() => {
    if (isNavigating.current || searchQuery.trim().length < 2 || allProducts.length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    let query = searchQuery.toLowerCase().trim();

    // Fix misspellings
    Object.keys(FIX_SPELLING).forEach(wrong => {
      if (query.includes(wrong)) {
        query = query.replace(new RegExp(wrong, 'g'), FIX_SPELLING[wrong]);
      }
    });

    // Handle plurals - remove trailing 's'
    const words = query.split(/\s+/);
    const singularWords = words.map(word => {
      if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) {
        return word.slice(0, -1);
      }
      return word;
    });
    query = [...new Set([...words, ...singularWords])].join(' ');

    // Translate Hindi
    Object.keys(HINDI_ENGLISH).forEach(hindi => {
      if (query === hindi || query.includes(hindi)) {
        query = query.replace(new RegExp(hindi, 'g'), HINDI_ENGLISH[hindi]);
      }
    });

    // Search - STRICT matching first, then fuzzy fallback
    const terms = query.split(/\s+/).filter(t => t.length >= 2);
    let matches = [];

    // Expand with synonyms
    let expandedTerms = new Set(terms);
    terms.forEach(term => {
      if (SYNONYMS[term]) {
        SYNONYMS[term].forEach(syn => expandedTerms.add(syn));
      }
      // Also add singular version if plural
      if (term.length > 3 && term.endsWith('s')) {
        expandedTerms.add(term.slice(0, -1));
      }
    });
    
    // Also add original query (for partial matching)
    expandedTerms.add(searchQuery.toLowerCase());
    
    const allTerms = [...expandedTerms];

    // Strict matching
    allProducts.forEach(product => {
      const name = (product.name || '').toLowerCase();
      const brand = (product.brand || '').toLowerCase();
      const category = (product.category || '').toLowerCase();
      
      let isMatch = false;
      allTerms.forEach(term => {
        if (name.includes(term) || brand.includes(term) || category.includes(term)) {
          isMatch = true;
        }
      });
      
      if (isMatch) {
        matches.push(product.name);
      }
    });

    // If no strict matches, try fuzzy (STRICT)
    if (matches.length === 0) {
      const fuse = new Fuse(allProducts, {
        keys: ['name', 'brand'],
        threshold: 0.25,  // More strict
        includeScore: true,
      });
      
      const fuzzyResults = fuse.search(query);
      matches = fuzzyResults
        .filter(r => r.score <= 0.3)  // Stricter score
        .slice(0, 10)
        .map(r => r.item.name);
    }

    // Get unique names
    const names = [...new Set(matches)].slice(0, 10);

    setSuggestions(names);
    setShowSuggestions(names.length > 0);
    if (names.length > 0) updatePosition();
  }, [searchQuery]);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      isNavigating.current = true;
      setShowSuggestions(false);
      inputRef.current?.blur();
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    isNavigating.current = true;
    setShowSuggestions(false);
    inputRef.current?.blur();
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  // Render dropdown
  const renderDropdown = () => {
    if (!showSuggestions || suggestions.length === 0) return null;

    return createPortal(
      <div 
        ref={dropdownRef}
        style={{
          position: 'absolute',
          top: dropdownPos.top,
          left: dropdownPos.left,
          width: dropdownPos.width,
          maxWidth: isMobile ? 'calc(100vw - 20px)' : '500px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          maxHeight: '350px',
          overflowY: 'auto',
          zIndex: 999999,
          border: '1px solid #e0e0e0',
        }}
      >
        {suggestions.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(item)}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              cursor: 'pointer',
              borderBottom: idx < suggestions.length - 1 ? '1px solid #f5f5f5' : 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9ff'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            <span style={{ color: '#888' }}>🔍</span>
            <span style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>{item}</span>
          </div>
        ))}
      </div>,
      document.body
    );
  };

  return (
    <div className="search-bar-container" ref={searchRef}>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search products, brands..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              isNavigating.current = false;
            }}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true);
                updatePosition();
              }
            }}
          />
          <button type="submit" className="search-button">🔍</button>
        </div>
      </form>
      {renderDropdown()}
    </div>
  );
};

export default SearchBar;