import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions as user types
  useEffect(() => {
    const fetchSuggestions = async () => {
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
          console.log('✅ Suggestions:', data);
          
          // Filter valid suggestions
          const validSuggestions = Array.isArray(data) 
            ? data.filter(item => item && typeof item === 'string' && item.trim().length > 0)
            : [];
          
          setSuggestions(validSuggestions);
          setShowSuggestions(validSuggestions.length > 0);
        } else {
          console.error('❌ API Error:', response.status);
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
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (!suggestion) return;
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="search-bar-container" ref={searchRef}>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder='Search for products, brands...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (searchQuery.length >= 2 && suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </div>

        {/* Suggestions Dropdown - WITH BLACK TEXT */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ 
                  color: '#000000',  // ✅ Inline black color as backup
                  backgroundColor: 'white'
                }}
              >
                <span 
                  className="suggestion-icon"
                  style={{ color: '#000000' }}  // ✅ Force black icon
                >
                  🔍
                </span>
                <span 
                  className="suggestion-text"
                  style={{ color: '#000000' }}  // ✅ Force black text
                >
                  {suggestion}
                </span>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;