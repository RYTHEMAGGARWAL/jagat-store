import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const isNavigatingRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 📱 Track mobile viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🔥 Close dropdown and reset when route changes
  useEffect(() => {
    setShowSuggestions(false);
    setSuggestions([]);
    setSearchQuery('');
    isNavigatingRef.current = false;
    
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [location]);

  // Update dropdown position with viewport constraints
  const updateDropdownPosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const padding = 10; // Padding from screen edges
      
      // Calculate width - on mobile, use almost full screen width
      let dropdownWidth = rect.width;
      let dropdownLeft = rect.left + window.scrollX;
      
      if (isMobile) {
        // On mobile, make dropdown wider and centered
        dropdownWidth = viewportWidth - (padding * 2);
        dropdownLeft = padding;
      } else {
        // On desktop, ensure dropdown doesn't overflow right edge
        if (dropdownLeft + dropdownWidth > viewportWidth - padding) {
          dropdownLeft = viewportWidth - dropdownWidth - padding;
        }
        // Ensure dropdown doesn't overflow left edge
        if (dropdownLeft < padding) {
          dropdownLeft = padding;
        }
      }
      
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: dropdownLeft,
        width: dropdownWidth
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
  }, [showSuggestions, isMobile]);

  // Fetch suggestions as user types
  useEffect(() => {
    const fetchSuggestions = async () => {
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
    
    isNavigatingRef.current = true;
    setShowSuggestions(false);
    setSuggestions([]);
    
    if (inputRef.current) {
      inputRef.current.blur();
    }
    
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  // Render dropdown using Portal - RESPONSIVE VERSION
  const renderDropdown = () => {
    if (!showSuggestions || suggestions.length === 0 || isNavigatingRef.current) {
      return null;
    }

    const dropdown = (
      <div 
        ref={dropdownRef}
        className="suggestions-dropdown-portal"
        style={{
          position: 'absolute',
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`,
          maxWidth: isMobile ? `calc(100vw - 20px)` : '500px',
          backgroundColor: 'white',
          borderRadius: isMobile ? '10px' : '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
          maxHeight: isMobile ? '60vh' : '400px',
          overflowY: 'auto',
          zIndex: 999999,
          border: '2px solid #ddd',
          boxSizing: 'border-box',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={(e) => handleSuggestionClick(e, suggestion)}
            className="suggestion-item-portal"
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '10px' : '12px',
              padding: isMobile ? '12px 14px' : '14px 16px',
              cursor: 'pointer',
              borderBottom: index < suggestions.length - 1 ? '1px solid #f0f0f0' : 'none',
              backgroundColor: 'white',
              transition: 'all 0.2s ease',
              minHeight: isMobile ? '44px' : '48px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f7ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f7ff';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            <span style={{ 
              fontSize: isMobile ? '14px' : '16px', 
              color: '#666',
              flexShrink: 0 
            }}>🔍</span>
            <span style={{ 
              fontSize: isMobile ? '13px' : '14px', 
              color: '#000', 
              fontWeight: '500',
              flex: 1,
              wordBreak: 'break-word',
              lineHeight: '1.4',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
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
              setTimeout(() => {
                if (!isNavigatingRef.current) {
                  // Backup cleanup
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