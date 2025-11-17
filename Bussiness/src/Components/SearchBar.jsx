import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const isNavigatingRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Close dropdown and reset when route changes
  useEffect(() => {
    setShowSuggestions(false);
    setSuggestions([]);
    setSearchQuery('');  // 🔥 Clear input
    isNavigatingRef.current = false;
    
    // 🔥 Blur the input to remove focus
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [location]);

  // Update dropdown position when input moves
  const updateDropdownPosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        (!dropdownRef.current || !dropdownRef.current.contains(event.target))
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update position on scroll/resize
  useEffect(() => {
    if (showSuggestions) {
      updateDropdownPosition();
      window.addEventListener('scroll', updateDropdownPosition);
      window.addEventListener('resize', updateDropdownPosition);
      
      return () => {
        window.removeEventListener('scroll', updateDropdownPosition);
        window.removeEventListener('resize', updateDropdownPosition);
      };
    }
  }, [showSuggestions]);

  // Fetch suggestions as user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      // 🔥 Don't fetch if we're navigating
      if (isNavigatingRef.current) {
        return;
      }

      if (searchQuery.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(
          `${API_URL}/products/search/suggestions?q=${encodeURIComponent(searchQuery)}`
        );
        
        if (response.ok) {
          const data = await response.json();
          
          // 🔥 Check again before setting state
          if (isNavigatingRef.current) {
            return;
          }
          
          const validSuggestions = Array.isArray(data) 
            ? data.filter(item => item && typeof item === 'string' && item.trim().length > 0)
            : [];
          
          setSuggestions(validSuggestions);
          setShowSuggestions(validSuggestions.length > 0 && !isNavigatingRef.current);
          
          if (validSuggestions.length > 0 && !isNavigatingRef.current) {
            updateDropdownPosition();
          }
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error('❌ Fetch Error:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      isNavigatingRef.current = true;
      setShowSuggestions(false);
      setSuggestions([]);
      
      // 🔥 Blur input
      if (inputRef.current) {
        inputRef.current.blur();
      }
      
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // 🔥 Handle suggestion click - COMPLETE RESET
  const handleSuggestionClick = (e, suggestion) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!suggestion) return;
    
    console.log('🖱️ Clicked:', suggestion);
    
    // 🔥 STEP 1: Set navigation flag immediately
    isNavigatingRef.current = true;
    
    // 🔥 STEP 2: Close and clear everything
    setShowSuggestions(false);
    setSuggestions([]);
    
    // 🔥 STEP 3: Blur the input to remove focus
    if (inputRef.current) {
      inputRef.current.blur();
    }
    
    // 🔥 STEP 4: Update query (optional - can keep for display)
    // setSearchQuery(suggestion);  // Comment this out if you want to clear input
    
    // 🔥 STEP 5: Navigate immediately
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  // Render dropdown using Portal
  const renderDropdown = () => {
    // 🔥 Don't show if navigating or no suggestions
    if (!showSuggestions || suggestions.length === 0 || isNavigatingRef.current) {
      return null;
    }

    const dropdown = (
      <div 
        ref={dropdownRef}
        style={{
          position: 'absolute',
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`,
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 999999,
          border: '2px solid #ddd',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={(e) => handleSuggestionClick(e, suggestion)}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              cursor: 'pointer',
              borderBottom: index < suggestions.length - 1 ? '1px solid #f0f0f0' : 'none',
              backgroundColor: 'white',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f7ff';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span style={{ fontSize: '16px', color: '#000' }}>🔍</span>
            <span style={{ 
              fontSize: '14px', 
              color: '#000', 
              fontWeight: '500',
              flex: 1
            }}>
              {suggestion}
            </span>
          </div>
        ))}
      </div>
    );

    return createPortal(dropdown, document.body);
  };

  return (
    <div className="search-bar-container" ref={searchRef}>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder='Search for products, brands...'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              isNavigatingRef.current = false;
            }}
            onFocus={() => {
              if (searchQuery.length >= 2 && suggestions.length > 0 && !isNavigatingRef.current) {
                setShowSuggestions(true);
                updateDropdownPosition();
              }
            }}
            onBlur={() => {
              // 🔥 Small delay to allow click events to fire first
              setTimeout(() => {
                if (!isNavigatingRef.current) {
                  // Only close if not navigating
                  // This is backup cleanup
                }
              }, 150);
            }}
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </div>
      </form>

      {renderDropdown()}
    </div>
  );
};

export default SearchBar;