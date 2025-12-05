import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import Fuse from 'fuse.js';
import './SearchBar.css';

// 🔥 MISSPELLING FIXES - No duplicates
const FIX_SPELLING = {
  // Common typos
  'choclate': 'chocolate', 'choklet': 'chocolate', 'choklate': 'chocolate',
  'chocolates': 'chocolate', 'choclates': 'chocolate', 'choco': 'chocolate',
  'paner': 'paneer', 'panir': 'paneer', 'pneer': 'paneer',
  'colget': 'colgate', 'colgat': 'colgate', 'colgte': 'colgate',
  'magi': 'maggi', 'maggie': 'maggi', 'megie': 'maggi', 'meggi': 'maggi',
  'biskut': 'biscuit', 'biscut': 'biscuit', 'biscuits': 'biscuit', 'biskit': 'biscuit',
  'shampu': 'shampoo', 'sampoo': 'shampoo', 'shampoos': 'shampoo', 'shampo': 'shampoo',
  'noodels': 'noodles', 'nodles': 'noodles', 'noodle': 'noodles', 'nudels': 'noodles',
  'cofee': 'coffee', 'coffe': 'coffee', 'coffi': 'coffee', 'koffee': 'coffee',
  'suger': 'sugar', 'shugar': 'sugar', 'sugr': 'sugar',
  'millk': 'milk', 'mlk': 'milk', 'milkk': 'milk',
  
  // Spice typos
  'retha': 'reetha', 'ritha': 'reetha', 'reeta': 'reetha',
  'manik': 'maanik', 'manic': 'maanik',
  'ilaichi': 'elaichi', 'ilachi': 'elaichi', 'elachi': 'elaichi', 'elaychi': 'elaichi',
  'zeera': 'jeera', 'zira': 'jeera', 'jira': 'jeera', 'geera': 'jeera',
  'dhaniya': 'dhania', 'dhaniyaa': 'dhania',
  'haldie': 'haldi', 'huldi': 'haldi', 'tumaric': 'turmeric',
  'mirchi': 'mirch', 'merch': 'mirch',
  
  // Plural fixes
  'soaps': 'soap', 'oils': 'oil', 'juices': 'juice',
  'cookies': 'cookie', 'chips': 'chip', 'namkeens': 'namkeen',
  
  // Baby/Pet care
  'dipers': 'diaper', 'diapers': 'diaper', 'nappy': 'diaper', 'nappies': 'diaper',
  'mamy': 'mamy poko', 'mamypoko': 'mamy poko',
  'mosquitto': 'mosquito', 'machhar': 'mosquito', 'machar': 'mosquito',
  'pedegree': 'pedigree', 'pedigri': 'pedigree', 'pedegri': 'pedigree',
  'wiskas': 'whiskas', 'wiskers': 'whiskas', 'whiskers': 'whiskas',
  'droolz': 'drools', 'drool': 'drools',
  
  // Brand typos - FIXED (no duplicates)
  'detol': 'dettol', 'dettole': 'dettol', 'dettal': 'dettol',
  'safola': 'saffola', 'safron': 'saffron', 'safolla': 'saffola',
  'amool': 'amul', 'ammul': 'amul',
  'brittania': 'britannia', 'britania': 'britannia', 'britanya': 'britannia',
  'parkle': 'parle', 'parlay': 'parle',
  'leys': 'lays', 'layz': 'lays',
  'kurkurey': 'kurkure', 'kurkuree': 'kurkure',
  'haldirams': 'haldiram', 'haldiramz': 'haldiram',
  'aashirwad': 'aashirvaad', 'ashirwad': 'aashirvaad',
  'taata': 'tata',
  'nescaffe': 'nescafe', 'nescafee': 'nescafe',
  'bruu': 'bru',
  'sunfist': 'sunfeast', 'sunfeest': 'sunfeast',
  'gooday': 'good day', 'gooddey': 'good day',
  'orio': 'oreo',
  'bourn': 'bourbon', 'bornvita': 'bournvita',
  'horlics': 'horlicks', 'horlix': 'horlicks',
  'compln': 'complan',
  'tropicanna': 'tropicana', 'tropikana': 'tropicana',
  'realz': 'real',
  'fruiti': 'frooti', 'frotie': 'frooti',
  'mazaa': 'maaza', 'mazza': 'maaza',
  'slicee': 'slice', 'slize': 'slice',
  'thumbsup': 'thums up', 'thumps up': 'thums up', 'thumbs up': 'thums up',
  'cocacola': 'coca-cola', 'coka cola': 'coca-cola',
  'pepsie': 'pepsi', 'papsi': 'pepsi',
  'sprit': 'sprite', 'spritee': 'sprite',
  'fenta': 'fanta', 'fantaa': 'fanta',
  'limka': 'limca', 'limkaa': 'limca',
  'redbul': 'red bull',
  'monstor': 'monster', 'monstere': 'monster',
  'bislary': 'bisleri', 'bislry': 'bisleri',
  'baley': 'bailey', 'baileys': 'bailey',
  'aquafyna': 'aquafina', 'aqufina': 'aquafina',
  'harpik': 'harpic', 'harpick': 'harpic',
  'lyzol': 'lizol', 'lizole': 'lizol',
  'domeks': 'domex',
  'vimm': 'vim',
  'rinn': 'rin',
  'surff': 'surf', 'surfe': 'surf',
  'areil': 'ariel', 'aeriel': 'ariel',
  'tidee': 'tide', 'tyde': 'tide',
  'niviya': 'nivea', 'niveya': 'nivea',
  'pondss': 'ponds',
  'himalya': 'himalaya', 'himalaia': 'himalaya',
  'patanjli': 'patanjali', 'patanjly': 'patanjali',
  'dabar': 'dabur', 'daber': 'dabur',
  'jonson': 'johnson', 'jhonson': 'johnson', 'jonhson': 'johnson',
  'pamper': 'pampers', 'pampars': 'pampers',
  'hugies': 'huggies', 'hugges': 'huggies',
  'cetafil': 'cetaphil', 'cetafile': 'cetaphil',
  'mamaerth': 'mamaearth',
  'biotik': 'biotique',
  'loreall': 'loreal',
  'garneir': 'garnier', 'garnir': 'garnier',
  'headnsholder': 'head & shoulders', 'head shoulders': 'head & shoulders',
  'pentene': 'pantene', 'pantne': 'pantene',
  'doov': 'dove', 'dovee': 'dove',
  'luxx': 'lux',
  'lyfeboy': 'lifebuoy', 'lifeboy': 'lifebuoy', 'lifebouy': 'lifebuoy',
  'cintol': 'cinthol', 'cintholl': 'cinthol',
  'savlone': 'savlon', 'savlan': 'savlon',
};

// 🔥 SYNONYMS - Expanded with product data
const SYNONYMS = {
  // Spices
  'elaichi': ['elaichi', 'ilaichi', 'cardamom', 'elachi', 'green cardamom'],
  'cardamom': ['cardamom', 'elaichi', 'ilaichi', 'elachi'],
  'jeera': ['jeera', 'cumin', 'zeera', 'jira', 'cumin seeds'],
  'cumin': ['cumin', 'jeera', 'cumin seeds'],
  'haldi': ['haldi', 'turmeric', 'turmeric powder'],
  'turmeric': ['turmeric', 'haldi', 'turmeric powder'],
  'dhania': ['dhania', 'coriander', 'dhaniya', 'coriander powder'],
  'coriander': ['coriander', 'dhania', 'coriander seeds', 'coriander powder'],
  'mirch': ['mirch', 'chilli', 'chili', 'lal mirch', 'red chilli'],
  'chilli': ['chilli', 'chili', 'mirch', 'red chilli', 'green chilli'],
  'saffron': ['saffron', 'kesar', 'keshar', 'zafran'],
  'kesar': ['kesar', 'saffron', 'keshar'],
  'laung': ['laung', 'clove', 'cloves', 'lavang'],
  
  // Food items
  'chocolate': ['chocolate', 'choco', 'cadbury', 'dairy milk', 'kitkat', 'munch', '5 star'],
  'choco': ['chocolate', 'choco', 'cadbury'],
  'biscuit': ['biscuit', 'cookie', 'cookies', 'parle', 'britannia', 'oreo', 'bourbon'],
  'cookie': ['cookie', 'biscuit', 'cookies'],
  'noodles': ['noodles', 'maggi', 'yippee', 'top ramen'],
  'maggi': ['maggi', 'noodles', '2-minute', 'instant noodles'],
  'chips': ['chips', 'lays', 'kurkure', 'pringles', 'bingo', 'uncle chips'],
  'namkeen': ['namkeen', 'haldiram', 'bhujia', 'mixture', 'snacks'],
  
  // Dairy
  'milk': ['milk', 'doodh', 'dudh', 'amul', 'mother dairy'],
  'doodh': ['doodh', 'milk', 'dudh'],
  'paneer': ['paneer', 'cottage cheese', 'amul paneer'],
  'cheese': ['cheese', 'amul cheese', 'cheese slices', 'mozzarella'],
  'butter': ['butter', 'amul butter', 'makhan'],
  'ghee': ['ghee', 'desi ghee', 'cow ghee', 'amul ghee'],
  'curd': ['curd', 'dahi', 'yogurt', 'amul dahi'],
  'dahi': ['dahi', 'curd', 'yogurt'],
  
  // Drinks
  'chai': ['chai', 'tea', 'tata tea', 'brooke bond', 'red label'],
  'tea': ['tea', 'chai', 'green tea', 'black tea'],
  'coffee': ['coffee', 'nescafe', 'bru', 'instant coffee'],
  'juice': ['juice', 'tropicana', 'real', 'frooti', 'maaza', 'slice'],
  'cold drink': ['cold drink', 'coca-cola', 'pepsi', 'sprite', 'fanta', 'thums up', 'limca'],
  'soda': ['soda', 'sprite', 'limca', '7up', 'carbonated'],
  'water': ['water', 'bisleri', 'aquafina', 'kinley', 'mineral water'],
  
  // Baby care
  'diaper': ['diaper', 'nappy', 'mamy poko', 'pampers', 'huggies'],
  'baby': ['baby', 'johnson', 'infant', 'baby care', 'himalaya baby'],
  'feeding bottle': ['feeding bottle', 'bottle', 'sipper', 'baby bottle'],
  
  // Pet care
  'dog food': ['dog food', 'pedigree', 'drools', 'puppy food', 'dog'],
  'cat food': ['cat food', 'whiskas', 'kitten food', 'cat'],
  'dog': ['dog', 'puppy', 'pedigree', 'drools', 'dog food'],
  'cat': ['cat', 'kitten', 'whiskas', 'cat food'],
  'pet': ['pet', 'dog', 'cat', 'pet food', 'pet care'],
  
  // Cleaning
  'mosquito': ['mosquito', 'good knight', 'all out', 'hit', 'mortein', 'machhar'],
  'floor cleaner': ['floor cleaner', 'lizol', 'domex', 'harpic'],
  'toilet cleaner': ['toilet cleaner', 'harpic', 'domex'],
  'detergent': ['detergent', 'surf', 'ariel', 'tide', 'rin', 'washing powder'],
  'dishwash': ['dishwash', 'vim', 'pril', 'dish wash', 'dish washing'],
  
  // Grains
  'rice': ['rice', 'chawal', 'basmati', 'india gate', 'daawat'],
  'chawal': ['chawal', 'rice', 'basmati'],
  'atta': ['atta', 'flour', 'wheat flour', 'aashirvaad', 'pillsbury', 'shakti bhog'],
  'dal': ['dal', 'daal', 'pulses', 'toor dal', 'moong dal', 'chana dal', 'masoor dal'],
  
  // Oil
  'oil': ['oil', 'cooking oil', 'refined oil', 'sunflower oil', 'mustard oil', 'saffola', 'fortune'],
  'tel': ['tel', 'oil', 'sarson tel', 'mustard oil'],
  
  // Personal care
  'shampoo': ['shampoo', 'head & shoulders', 'pantene', 'dove', 'clinic plus', 'sunsilk'],
  'soap': ['soap', 'dettol', 'lifebuoy', 'lux', 'dove', 'pears', 'cinthol'],
  'toothpaste': ['toothpaste', 'colgate', 'pepsodent', 'close up', 'sensodyne', 'oral b'],
  'cream': ['cream', 'face cream', 'fair & lovely', 'ponds', 'nivea', 'lakme'],
  'lotion': ['lotion', 'body lotion', 'vaseline', 'nivea'],
};

// 🔥 HINDI TO ENGLISH - Expanded
const HINDI_ENGLISH = {
  'chawal': 'rice', 'chaawal': 'rice', 'chaval': 'rice',
  'atta': 'atta', 'aata': 'atta', 'gehu atta': 'wheat flour',
  'dal': 'dal', 'daal': 'dal', 'arhar': 'toor dal', 'chana': 'chana dal',
  'doodh': 'milk', 'dudh': 'milk',
  'paneer': 'paneer', 'dahi': 'curd', 'makhan': 'butter',
  'ghee': 'ghee', 'desi ghee': 'ghee',
  'aloo': 'potato', 'pyaz': 'onion', 'tamatar': 'tomato',
  'sabun': 'soap', 'tel': 'oil', 'sarson': 'mustard',
  'chai': 'tea', 'pani': 'water', 'paani': 'water',
  'cheeni': 'sugar', 'namak': 'salt', 'shakkar': 'sugar',
  'haldi': 'turmeric', 'mirch': 'chilli', 'jeera': 'cumin',
  'gobhi': 'cauliflower', 'palak': 'spinach', 'gajar': 'carrot',
  'seb': 'apple', 'kela': 'banana', 'aam': 'mango', 'santra': 'orange',
  'nimbu': 'lemon', 'adrak': 'ginger', 'lehsun': 'garlic',
  'nariyal': 'coconut', 'badam': 'almond', 'kaju': 'cashew',
  'besan': 'gram flour', 'sooji': 'semolina', 'maida': 'refined flour',
  'dalchini': 'cinnamon', 'laung': 'clove', 'kali mirch': 'black pepper',
  'rai': 'mustard seeds', 'methi': 'fenugreek', 'ajwain': 'carom seeds',
  'til': 'sesame', 'sarson ka tel': 'mustard oil',
  'machhar': 'mosquito', 'kutta': 'dog', 'billi': 'cat',
  'baccha': 'baby', 'dant': 'tooth', 'baal': 'hair',
};

// 🔥 POPULAR SEARCHES - Based on common grocery items
const POPULAR_SEARCHES = [
  'Maggi', 'Milk', 'Bread', 'Eggs', 'Chips', 'Biscuits', 'Rice', 'Atta',
  'Paneer', 'Butter', 'Chocolate', 'Juice', 'Cold Drink', 'Dal', 'Oil',
  'Soap', 'Shampoo', 'Dettol', 'Colgate', 'Diaper'
];

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecent, setShowRecent] = useState(false);
  
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const isNavigating = useRef(false);
  const debounceTimer = useRef(null);
  const isMouseOverDropdown = useRef(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      }
    } catch (e) {
      console.log('Could not load recent searches');
    }
  }, []);

  // Save recent search
  const saveRecentSearch = (query) => {
    try {
      const updated = [query, ...recentSearches.filter(s => s.toLowerCase() !== query.toLowerCase())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    } catch (e) {
      console.log('Could not save recent search');
    }
  };

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

  // Reset on navigation - CRITICAL: Keep dropdown closed after search
  useEffect(() => {
    // First, set navigating flag to prevent any dropdown from showing
    isNavigating.current = true;
    
    // Close everything
    setShowSuggestions(false);
    setShowRecent(false);
    setSuggestions([]);
    setSearchQuery('');
    setSelectedIndex(-1);
    
    // Reset navigating flag after a delay to allow page to settle
    const timer = setTimeout(() => {
      isNavigating.current = false;
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location]);

  // Update dropdown position
  const updatePosition = useCallback(() => {
    if (!inputRef.current) return;
    const rect = inputRef.current.getBoundingClientRect();
    
    setDropdownPos({
      top: rect.bottom + window.scrollY + 5,
      left: isMobile ? 10 : rect.left + window.scrollX,
      width: isMobile ? window.innerWidth - 20 : Math.max(rect.width, 400)
    });
  }, [isMobile]);

  // Click outside handler
  useEffect(() => {
    const handleClick = (e) => {
      const isInsideSearch = searchRef.current?.contains(e.target);
      const isInsideDropdown = dropdownRef.current?.contains(e.target);
      
      if (!isInsideSearch && !isInsideDropdown) {
        setShowSuggestions(false);
        setShowRecent(false);
      }
    };
    
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Scroll/resize handlers
  useEffect(() => {
    if (showSuggestions || showRecent) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [showSuggestions, showRecent, updatePosition]);

  // 🔥 IMPROVED SEARCH SUGGESTIONS with debouncing
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Don't do anything if navigating
    if (isNavigating.current) {
      return;
    }

    // If search query is empty or too short, just hide suggestions
    if (searchQuery.trim().length < 1 || allProducts.length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      // Don't auto-show recent here - only show on focus
      return;
    }

    setShowRecent(false);

    debounceTimer.current = setTimeout(() => {
      let query = searchQuery.toLowerCase().trim();
      const originalQuery = query;

      // Fix misspellings
      Object.keys(FIX_SPELLING).forEach(wrong => {
        if (query.includes(wrong)) {
          query = query.replace(new RegExp(wrong, 'g'), FIX_SPELLING[wrong]);
        }
      });

      // Handle plurals
      const words = query.split(/\s+/);
      const singularWords = words.map(word => {
        if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) {
          return word.slice(0, -1);
        }
        return word;
      });

      // Translate Hindi
      Object.keys(HINDI_ENGLISH).forEach(hindi => {
        if (query === hindi || query.includes(hindi)) {
          query = query.replace(new RegExp(hindi, 'g'), HINDI_ENGLISH[hindi]);
        }
      });

      // Expand with synonyms
      let expandedTerms = new Set([...words, ...singularWords]);
      words.forEach(term => {
        if (SYNONYMS[term]) {
          SYNONYMS[term].forEach(syn => expandedTerms.add(syn));
        }
      });
      expandedTerms.add(query);
      expandedTerms.add(originalQuery);

      const allTerms = [...expandedTerms];

      // Score and match products
      let scoredProducts = [];

      allProducts.forEach(product => {
        const name = (product.name || '').toLowerCase();
        const brand = (product.brand || '').toLowerCase();
        const category = (product.category || '').toLowerCase();
        const description = (product.description || '').toLowerCase();
        
        let score = 0;
        let matched = false;

        allTerms.forEach(term => {
          // Exact name match (highest priority)
          if (name === term) {
            score += 100;
            matched = true;
          }
          // Name starts with term
          else if (name.startsWith(term)) {
            score += 50;
            matched = true;
          }
          // Name contains term
          else if (name.includes(term)) {
            score += 30;
            matched = true;
          }
          // Brand match
          else if (brand === term || brand.includes(term)) {
            score += 25;
            matched = true;
          }
          // Category match
          else if (category.includes(term)) {
            score += 15;
            matched = true;
          }
          // Description match
          else if (description.includes(term)) {
            score += 5;
            matched = true;
          }
        });

        if (matched) {
          scoredProducts.push({ ...product, score });
        }
      });

      // If no matches, try fuzzy search
      if (scoredProducts.length === 0) {
        const fuse = new Fuse(allProducts, {
          keys: [
            { name: 'name', weight: 0.5 },
            { name: 'brand', weight: 0.3 },
            { name: 'category', weight: 0.2 }
          ],
          threshold: 0.35,
          includeScore: true,
        });
        
        const fuzzyResults = fuse.search(query);
        scoredProducts = fuzzyResults
          .filter(r => r.score <= 0.4)
          .slice(0, 12)
          .map(r => ({ ...r.item, score: (1 - r.score) * 50 }));
      }

      // Sort by score and get unique products
      scoredProducts.sort((a, b) => b.score - a.score);
      
      // Get unique product names with their best version
      const uniqueProducts = [];
      const seenNames = new Set();
      
      scoredProducts.forEach(product => {
        const nameKey = product.name.toLowerCase();
        if (!seenNames.has(nameKey)) {
          seenNames.add(nameKey);
          uniqueProducts.push(product);
        }
      });

      const results = uniqueProducts.slice(0, 8);

      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setSelectedIndex(-1);
      if (results.length > 0) updatePosition();
    }, 150);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery, allProducts, updatePosition]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    const items = showRecent 
      ? [...recentSearches, ...POPULAR_SEARCHES.slice(0, 4)]
      : suggestions;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : items.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < items.length) {
        const selected = showRecent ? items[selectedIndex] : items[selectedIndex].name;
        handleSuggestionClick(selected);
      } else if (searchQuery.trim()) {
        handleSearch(e);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setShowRecent(false);
      inputRef.current?.blur();
    }
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery.trim());
      
      // Set navigating flag FIRST
      isNavigating.current = true;
      
      // Close all dropdowns immediately
      setShowSuggestions(false);
      setShowRecent(false);
      
      // Blur the input to prevent refocus issues
      inputRef.current?.blur();
      
      // Navigate
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    const query = typeof suggestion === 'string' ? suggestion : suggestion.name;
    saveRecentSearch(query);
    
    // Set navigating flag FIRST
    isNavigating.current = true;
    
    // Close all dropdowns immediately
    setShowSuggestions(false);
    setShowRecent(false);
    
    // Blur the input to prevent refocus issues
    inputRef.current?.blur();
    
    // Navigate
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  // Clear recent searches
  const clearRecentSearches = (e) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Render recent searches dropdown
  const renderRecentDropdown = () => {
    if (!showRecent || searchQuery.trim().length > 0) return null;
    
    const hasRecent = recentSearches.length > 0;
    const popularToShow = POPULAR_SEARCHES.slice(0, hasRecent ? 4 : 8);

    return createPortal(
      <div 
        ref={dropdownRef}
        onMouseEnter={() => { isMouseOverDropdown.current = true; }}
        onMouseLeave={() => { isMouseOverDropdown.current = false; }}
        style={{
          position: 'absolute',
          top: dropdownPos.top,
          left: dropdownPos.left,
          width: dropdownPos.width,
          maxWidth: isMobile ? 'calc(100vw - 20px)' : '500px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 999999,
          border: '1px solid #eee',
        }}
      >
        {/* Recent Searches */}
        {hasRecent && (
          <div style={{ padding: '12px 16px 8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                🕐 Recent Searches
              </span>
              <button
                onClick={clearRecentSearches}
                style={{ 
                  fontSize: '11px', 
                  color: '#999', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => e.target.style.color = '#f44'}
                onMouseLeave={(e) => e.target.style.color = '#999'}
              >
                Clear
              </button>
            </div>
            {recentSearches.map((item, idx) => (
              <div
                key={`recent-${idx}`}
                onClick={() => handleSuggestionClick(item)}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  transition: 'all 0.15s',
                  backgroundColor: selectedIndex === idx ? '#f0f7ff' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9ff';
                  setSelectedIndex(idx);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span style={{ color: '#aaa', fontSize: '14px' }}>🔍</span>
                <span style={{ fontSize: '14px', color: '#333' }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Popular Searches */}
        <div style={{ padding: hasRecent ? '8px 16px 12px' : '12px 16px' }}>
          <span style={{ 
            fontSize: '12px', 
            fontWeight: '600', 
            color: '#666', 
            textTransform: 'uppercase', 
            letterSpacing: '0.5px',
            display: 'block',
            marginBottom: '8px'
          }}>
            🔥 Popular Searches
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {popularToShow.map((item, idx) => (
              <div
                key={`popular-${idx}`}
                onClick={() => handleSuggestionClick(item)}
                style={{ 
                  padding: '8px 14px',
                  cursor: 'pointer',
                  borderRadius: '20px',
                  transition: 'all 0.15s',
                  backgroundColor: selectedIndex === (recentSearches.length + idx) ? '#e8f4ff' : '#f5f5f5',
                  fontSize: '13px',
                  color: '#444',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e8f4ff';
                  e.currentTarget.style.color = '#1a73e8';
                  setSelectedIndex(recentSearches.length + idx);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                  e.currentTarget.style.color = '#444';
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>,
      document.body
    );
  };

  // Render product suggestions dropdown
  const renderDropdown = () => {
    if (!showSuggestions || suggestions.length === 0) return null;

    return createPortal(
      <div 
        ref={dropdownRef}
        onMouseEnter={() => { isMouseOverDropdown.current = true; }}
        onMouseLeave={() => { isMouseOverDropdown.current = false; }}
        style={{
          position: 'absolute',
          top: dropdownPos.top,
          left: dropdownPos.left,
          width: dropdownPos.width,
          maxWidth: isMobile ? 'calc(100vw - 20px)' : '500px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          maxHeight: '420px',
          overflowY: 'auto',
          zIndex: 999999,
          border: '1px solid #eee',
        }}
      >
        {/* Product Suggestions */}
        {suggestions.map((product, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(product.name)}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              cursor: 'pointer',
              borderBottom: idx < suggestions.length - 1 ? '1px solid #f5f5f5' : 'none',
              transition: 'all 0.15s',
              backgroundColor: selectedIndex === idx ? '#f0f7ff' : 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9ff';
              setSelectedIndex(idx);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            {/* Product Image */}
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              overflow: 'hidden',
              backgroundColor: '#f9f9f9',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '📦';
                  }}
                />
              ) : (
                <span style={{ fontSize: '20px' }}>📦</span>
              )}
            </div>

            {/* Product Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ 
                fontSize: '14px', 
                color: '#222', 
                fontWeight: '500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {product.name}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#888',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '2px',
              }}>
                {product.brand && product.brand !== 'Generic' && (
                  <span style={{ 
                    backgroundColor: '#f0f0f0', 
                    padding: '2px 6px', 
                    borderRadius: '4px',
                    fontSize: '11px',
                  }}>
                    {product.brand}
                  </span>
                )}
                {product.weight && (
                  <span>{product.weight}</span>
                )}
              </div>
            </div>

            {/* Price */}
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#16a34a'
              }}>
                ₹{product.price}
              </div>
              {product.oldPrice && product.oldPrice > product.price && (
                <div style={{ 
                  fontSize: '11px', 
                  color: '#999',
                  textDecoration: 'line-through'
                }}>
                  ₹{product.oldPrice}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* View All Results */}
        <div
          onClick={handleSearch}
          style={{ 
            padding: '14px 16px',
            cursor: 'pointer',
            textAlign: 'center',
            borderTop: '1px solid #eee',
            backgroundColor: '#fafafa',
            borderRadius: '0 0 16px 16px',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f7ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fafafa';
          }}
        >
          <span style={{ 
            fontSize: '14px', 
            color: '#1a73e8',
            fontWeight: '500'
          }}>
            🔍 View all results for "{searchQuery}"
          </span>
        </div>
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
              setSelectedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              // Don't show dropdown immediately after navigation
              if (isNavigating.current) return;
              
              // Use a longer delay to prevent accidental opening
              setTimeout(() => {
                // Double-check we're not navigating
                if (isNavigating.current) return;
                
                // Only show recent if input is still focused and query is empty
                if (document.activeElement === inputRef.current) {
                  if (searchQuery.trim().length === 0) {
                    setShowRecent(true);
                    updatePosition();
                  } else if (suggestions.length > 0) {
                    setShowSuggestions(true);
                    updatePosition();
                  }
                }
              }, 150);
            }}
            onBlur={() => {
              setTimeout(() => {
                if (!isMouseOverDropdown.current) {
                  setShowSuggestions(false);
                  setShowRecent(false);
                }
              }, 200);
            }}
          />
          <button type="submit" className="search-button">🔍</button>
        </div>
      </form>
      {renderRecentDropdown()}
      {renderDropdown()}
    </div>
  );
};

export default SearchBar;