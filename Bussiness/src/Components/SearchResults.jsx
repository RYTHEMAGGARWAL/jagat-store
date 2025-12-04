import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../Components/CartContext';
import Fuse from 'fuse.js';
import './SearchResults.css';

// 🔥 MISSPELLING FIXES - Common typos
const FIX_SPELLING = {
  // Chocolate
  'choclate': 'chocolate', 'choklet': 'chocolate', 'choklate': 'chocolate',
  'choclet': 'chocolate', 'chocolat': 'chocolate', 'chocolates': 'chocolate',
  
  // Paneer
  'paner': 'paneer', 'panir': 'paneer', 'pneer': 'paneer',
  
  // Colgate
  'colget': 'colgate', 'colgat': 'colgate', 'coalgate': 'colgate',
  
  // Maggi
  'magi': 'maggi', 'maggie': 'maggi', 'megie': 'maggi',
  
  // Biscuit
  'biskut': 'biscuit', 'biscut': 'biscuit', 'biscit': 'biscuit', 'biscuits': 'biscuit',
  
  // Shampoo
  'shampu': 'shampoo', 'sampoo': 'shampoo', 'shampoos': 'shampoo',
  
  // Elaichi/Cardamom
  'ilaichi': 'elaichi', 'ilachi': 'elaichi', 'elachi': 'elaichi',
  
  // Noodles
  'noodels': 'noodles', 'nodles': 'noodles', 'noodle': 'noodles',
  
  // Diaper
  'dipers': 'diaper', 'diapers': 'diaper', 'diper': 'diaper', 'nappy': 'diaper',
  
  // Mosquito
  'mosquitto': 'mosquito', 'machhar': 'mosquito', 'machar': 'mosquito',
  
  // Pet food
  'pedegree': 'pedigree', 'pedigri': 'pedigree', 'wiskas': 'whiskas',
  
  // Common products
  'cofee': 'coffee', 'coffe': 'coffee', 'suger': 'sugar', 'bred': 'bread',
  'millk': 'milk', 'oill': 'oil', 'sope': 'soap', 'soaps': 'soap',
  'jucie': 'juice', 'juices': 'juice', 'chees': 'cheese',
  
  // Saffron
  'safron': 'saffron', 'keasr': 'kesar', 'keshar': 'kesar',
  
  // Detol
  'detol': 'dettol', 'dettole': 'dettol',
  
  // Handwash
  'handwas': 'handwash', 'hand wash': 'handwash',
  
  // Oil brands
  'safola': 'saffola', 'fortunee': 'fortune',
  
  // Others
  'retha': 'reetha', 'ritha': 'reetha',
  'manik': 'maanik', 'manic': 'maanik',
};

// 🔥 RELATED BRANDS/PRODUCTS - Same purpose items
const RELATED_BRANDS = {
  // ============ SANITARY PADS ============
  'whisper': ['stayfree', 'kotex', 'sofy', 'carefree', 'sanitary'],
  'stayfree': ['whisper', 'kotex', 'sofy', 'carefree', 'sanitary'],
  'kotex': ['whisper', 'stayfree', 'sofy', 'sanitary'],
  'sofy': ['whisper', 'stayfree', 'kotex', 'sanitary'],
  'sanitary': ['whisper', 'stayfree', 'kotex', 'sofy', 'pad', 'napkin'],
  
  // ============ DIAPERS ============
  'mamy poko': ['pampers', 'huggies', 'diaper', 'baby'],
  'pampers': ['mamy poko', 'huggies', 'diaper', 'baby'],
  'huggies': ['mamy poko', 'pampers', 'diaper', 'baby'],
  'diaper': ['mamy poko', 'pampers', 'huggies', 'baby', 'nappy'],
  
  // ============ BABY PRODUCTS ============
  'baby': ['johnson', 'himalaya baby', 'cerelac', 'mamy poko', 'pampers', 'huggies', 'diaper'],
  'johnson': ['baby', 'himalaya baby', 'sebamed'],
  'cerelac': ['baby food', 'nestle', 'baby'],
  
  // ============ PET FOOD ============
  'pedigree': ['drools', 'whiskas', 'dog food', 'pet', 'puppy'],
  'drools': ['pedigree', 'whiskas', 'dog food', 'pet', 'puppy'],
  'whiskas': ['pedigree', 'drools', 'cat food', 'pet', 'kitten'],
  'dog food': ['pedigree', 'drools', 'puppy', 'pet'],
  'cat food': ['whiskas', 'pet', 'kitten'],
  'pet': ['pedigree', 'drools', 'whiskas', 'dog', 'cat'],
  'puppy': ['pedigree', 'drools', 'dog food'],
  
  // ============ MOSQUITO REPELLENT ============
  'good knight': ['all out', 'maxo', 'hit', 'mortein', 'mosquito'],
  'all out': ['good knight', 'maxo', 'hit', 'mortein', 'mosquito'],
  'maxo': ['good knight', 'all out', 'hit', 'mosquito'],
  'hit': ['good knight', 'all out', 'mortein', 'cockroach', 'mosquito'],
  'mortein': ['good knight', 'all out', 'hit', 'mosquito'],
  'mosquito': ['good knight', 'all out', 'maxo', 'hit', 'mortein', 'coil', 'refill'],
  
  // ============ PEST CONTROL ============
  'cockroach': ['hit', 'laxman rekha', 'roach'],
  'rat': ['pci', 'rat killer', 'mouse'],
  'pci': ['rat', 'mouse', 'trap'],
  
  // ============ COLD DRINKS ============
  'coke': ['coca cola', 'pepsi', 'sprite', 'fanta', 'thums up', 'limca', '7up'],
  'coca cola': ['pepsi', 'sprite', 'fanta', 'thums up', 'limca'],
  'pepsi': ['coca cola', 'coke', 'sprite', 'fanta', 'thums up', 'mountain dew'],
  'sprite': ['7up', 'limca', 'coke', 'pepsi', 'fanta'],
  'fanta': ['mirinda', 'coke', 'pepsi', 'sprite'],
  'thums up': ['coca cola', 'coke', 'pepsi'],
  
  // ============ NOODLES ============
  'maggi': ['yippee', 'top ramen', 'knorr', 'ching', 'noodles', 'pasta'],
  'yippee': ['maggi', 'top ramen', 'knorr', 'noodles'],
  'noodles': ['maggi', 'yippee', 'top ramen', 'pasta', 'chowmein'],
  'pasta': ['maggi', 'noodles', 'macaroni', 'penne'],
  
  // ============ CHIPS & SNACKS ============
  'lays': ['uncle chips', 'kurkure', 'bingo', 'pringles', 'chips'],
  'kurkure': ['lays', 'uncle chips', 'bingo', 'chips'],
  'uncle chips': ['lays', 'kurkure', 'bingo', 'chips'],
  'haldiram': ['bikaner', 'balaji', 'bikaji', 'namkeen', 'bhujia'],
  'chips': ['lays', 'uncle chips', 'kurkure', 'bingo', 'pringles'],
  'namkeen': ['haldiram', 'bikaner', 'bhujia', 'mixture'],
  
  // ============ BISCUITS ============
  'parle': ['britannia', 'sunfeast', 'oreo', 'hide seek', 'biscuit'],
  'britannia': ['parle', 'sunfeast', 'oreo', 'mcvities', 'biscuit', 'cake', 'rusk'],
  'oreo': ['bourbon', 'hide seek', 'parle', 'britannia', 'cream biscuit'],
  'rusk': ['britannia', 'parle', 'toast', 'biscuit'],
  
  // ============ CHOCOLATE ============
  'chocolate': ['cadbury', 'dairy milk', 'kitkat', 'munch', '5 star', 'perk', 'nestle', 'ferrero'],
  'dairy milk': ['cadbury', 'kitkat', 'munch', '5 star', 'perk', 'chocolate'],
  'cadbury': ['dairy milk', 'kitkat', 'nestle', 'amul', 'chocolate'],
  'kitkat': ['dairy milk', 'munch', '5 star', 'cadbury', 'chocolate'],
  'munch': ['kitkat', 'dairy milk', '5 star', 'cadbury', 'chocolate'],
  '5 star': ['kitkat', 'dairy milk', 'munch', 'cadbury', 'chocolate'],
  
  // ============ COOKING OIL ============
  'fortune': ['saffola', 'sundrop', 'dhara', 'nature fresh', 'oil'],
  'saffola': ['fortune', 'sundrop', 'oleev', 'oil'],
  'nature fresh': ['fortune', 'saffola', 'oil', 'mustard'],
  'mustard oil': ['nature fresh', 'fortune', 'kachi ghani', 'sarso'],
  'refined oil': ['fortune', 'saffola', 'sundrop', 'nature fresh'],
  'oil': ['fortune', 'saffola', 'sundrop', 'nature fresh', 'mustard', 'refined'],
  
  // ============ SOAP & HANDWASH ============
  'dettol': ['lifebuoy', 'savlon', 'himalaya', 'soap', 'handwash', 'antiseptic'],
  'lifebuoy': ['dettol', 'savlon', 'soap', 'handwash'],
  'lux': ['dove', 'pears', 'santoor', 'fiama', 'soap'],
  'dove': ['lux', 'pears', 'nivea', 'soap', 'shampoo'],
  'santoor': ['lux', 'pears', 'soap', 'handwash'],
  'soap': ['dettol', 'lifebuoy', 'lux', 'dove', 'pears', 'santoor', 'savlon'],
  'handwash': ['dettol', 'lifebuoy', 'santoor', 'savlon'],
  
  // ============ TOOTHPASTE ============
  'colgate': ['pepsodent', 'closeup', 'sensodyne', 'oral b', 'toothpaste'],
  'pepsodent': ['colgate', 'closeup', 'sensodyne', 'toothpaste'],
  'closeup': ['colgate', 'pepsodent', 'sensodyne', 'toothpaste'],
  'toothpaste': ['colgate', 'pepsodent', 'closeup', 'sensodyne'],
  
  // ============ SHAMPOO ============
  'head shoulders': ['pantene', 'dove', 'clinic plus', 'sunsilk', 'shampoo'],
  'pantene': ['head shoulders', 'dove', 'loreal', 'tresemme', 'shampoo'],
  'clinic plus': ['head shoulders', 'sunsilk', 'pantene', 'shampoo'],
  'shampoo': ['head shoulders', 'pantene', 'dove', 'clinic plus', 'sunsilk'],
  
  // ============ DETERGENT ============
  'surf excel': ['tide', 'ariel', 'rin', 'nirma', 'detergent'],
  'tide': ['surf excel', 'ariel', 'rin', 'detergent'],
  'ariel': ['surf excel', 'tide', 'rin', 'detergent'],
  'rin': ['surf excel', 'tide', 'ariel', 'nirma', 'detergent'],
  'detergent': ['surf excel', 'tide', 'ariel', 'rin', 'nirma'],
  
  // ============ TEA & COFFEE ============
  'tata tea': ['brooke bond', 'red label', 'taj mahal', 'lipton', 'tea'],
  'red label': ['tata tea', 'brooke bond', 'taj mahal', 'tea'],
  'brooke bond': ['tata tea', 'red label', 'lipton', 'tea'],
  'tea': ['tata tea', 'brooke bond', 'red label', 'taj mahal', 'lipton', 'chai'],
  'nescafe': ['bru', 'sunrise', 'continental', 'coffee'],
  'bru': ['nescafe', 'sunrise', 'continental', 'coffee'],
  'coffee': ['nescafe', 'bru', 'sunrise', 'continental'],
  
  // ============ ATTA & FLOUR ============
  'aashirvaad': ['pillsbury', 'annapurna', 'shakti bhog', 'atta', 'flour'],
  'pillsbury': ['aashirvaad', 'annapurna', 'atta', 'flour'],
  'atta': ['aashirvaad', 'pillsbury', 'annapurna', 'flour', 'wheat'],
  
  // ============ RICE & DAL ============
  'india gate': ['daawat', 'kohinoor', 'lal qilla', 'rice', 'basmati'],
  'daawat': ['india gate', 'kohinoor', 'rice', 'basmati'],
  'rice': ['basmati', 'biryani', 'chawal', 'india gate', 'daawat'],
  'basmati': ['rice', 'biryani', 'india gate', 'daawat'],
  'dal': ['toor', 'moong', 'masoor', 'urad', 'chana', 'arhar'],
  'toor': ['dal', 'moong', 'masoor', 'arhar'],
  'moong': ['dal', 'toor', 'masoor', 'urad'],
  'chana': ['dal', 'chole', 'rajma', 'chickpea'],
  
  // ============ SPICES ============
  'laung': ['cloves', 'elaichi', 'dalchini', 'kali mirch', 'jeera', 'masala', 'spice'],
  'cloves': ['laung', 'elaichi', 'cardamom', 'cinnamon', 'dalchini', 'spice'],
  'elaichi': ['cardamom', 'laung', 'cloves', 'dalchini', 'kali mirch', 'masala'],
  'cardamom': ['elaichi', 'cloves', 'laung', 'cinnamon', 'dalchini', 'spice'],
  'dalchini': ['cinnamon', 'elaichi', 'laung', 'cloves', 'kali mirch', 'masala'],
  'cinnamon': ['dalchini', 'cardamom', 'elaichi', 'cloves', 'laung', 'spice'],
  'jeera': ['cumin', 'haldi', 'dhania', 'mirch', 'masala', 'spice'],
  'haldi': ['turmeric', 'jeera', 'dhania', 'mirch', 'masala', 'spice'],
  'masala': ['spice', 'garam masala', 'jeera', 'haldi', 'dhania', 'mirch', 'mdh', 'everest'],
  'mdh': ['everest', 'masala', 'spice', 'chicken masala', 'garam masala'],
  'everest': ['mdh', 'masala', 'spice', 'chicken masala'],
  
  // ============ SAFFRON / KESAR ============
  'saffron': ['kesar', 'keshar', 'zafran'],
  'kesar': ['saffron', 'keshar', 'zafran'],
  
  // ============ DRY FRUITS ============
  'badam': ['almond', 'kaju', 'cashew', 'pista', 'akhrot', 'dry fruit'],
  'almond': ['badam', 'cashew', 'kaju', 'pistachio', 'walnut', 'dry fruit'],
  'kaju': ['cashew', 'badam', 'almond', 'pista', 'dry fruit'],
  'cashew': ['kaju', 'almond', 'badam', 'pistachio', 'walnut'],
  'dry fruit': ['badam', 'kaju', 'pista', 'akhrot', 'kishmish'],
  
  // ============ HEALTH DRINKS ============
  'horlicks': ['bournvita', 'complan', 'boost', 'health drink'],
  'bournvita': ['horlicks', 'complan', 'boost', 'health drink'],
  'complan': ['horlicks', 'bournvita', 'boost', 'health drink'],
  'boost': ['horlicks', 'bournvita', 'complan', 'health drink'],
  
  // ============ HAIR CARE ============
  'parachute': ['coconut oil', 'hair oil', 'dabur', 'bajaj'],
  'hair oil': ['parachute', 'coconut', 'dabur', 'bajaj', 'navratna'],
  'dabur': ['parachute', 'hair oil', 'bajaj', 'patanjali'],
  'reetha': ['shikakai', 'amla', 'hair care', 'herbal'],
  'shikakai': ['reetha', 'amla', 'hair care', 'herbal'],
  'amla': ['reetha', 'shikakai', 'hair oil', 'herbal'],
  
  // ============ MILK & DAIRY ============
  'amul': ['mother dairy', 'nestle', 'britannia', 'milk', 'butter', 'cheese'],
  'mother dairy': ['amul', 'nestle', 'milk'],
  'milk': ['amul', 'mother dairy', 'doodh'],
  'paneer': ['tofu', 'cheese', 'dairy'],
  'curd': ['dahi', 'yogurt', 'dairy'],
  'butter': ['amul', 'britannia', 'margarine'],
  'cheese': ['amul', 'britannia', 'processed cheese'],
};

// 🔥 HINDI TO ENGLISH
const HINDI_ENGLISH = {
  // Grains
  'chawal': 'rice',
  'chaawal': 'rice',
  'chaval': 'rice',
  'atta': 'atta wheat flour',
  'aata': 'atta wheat flour',
  'gehu': 'wheat',
  'maida': 'maida flour',
  'suji': 'suji semolina rava',
  'sooji': 'suji semolina',
  'besan': 'besan gram flour',
  'poha': 'poha flattened rice',
  
  // Pulses
  'dal': 'dal lentil',
  'daal': 'dal lentil',
  'chana': 'chana gram',
  'rajma': 'rajma kidney bean',
  'moong': 'moong dal',
  'masoor': 'masoor dal',
  'urad': 'urad dal',
  
  // Dairy
  'doodh': 'milk',
  'dudh': 'milk',
  'dahi': 'curd yogurt',
  'makhan': 'butter',
  'ghee': 'ghee',
  'malai': 'cream',
  
  // Vegetables
  'aloo': 'potato',
  'aaloo': 'potato',
  'pyaz': 'onion',
  'pyaaz': 'onion',
  'tamatar': 'tomato',
  'gobhi': 'cauliflower',
  'gobi': 'cauliflower',
  'palak': 'spinach',
  'bhindi': 'okra ladyfinger',
  'gajar': 'carrot',
  'matar': 'peas',
  'mirch': 'chilli pepper',
  'adrak': 'ginger',
  'lahsun': 'garlic',
  
  // Fruits
  'seb': 'apple',
  'kela': 'banana',
  'aam': 'mango',
  'santara': 'orange',
  'angoor': 'grapes',
  'nimbu': 'lemon lime',
  
  // Spices & Cooking
  'namak': 'salt',
  'cheeni': 'sugar',
  'chini': 'sugar',
  'shakkar': 'sugar',
  'gur': 'jaggery',
  'gud': 'jaggery',
  'tel': 'oil',
  'haldi': 'turmeric',
  'jeera': 'cumin',
  'dhania': 'coriander',
  'masala': 'spice masala',
  'elaichi': 'cardamom elaichi',
  'laung': 'clove cloves',
  'dalchini': 'cinnamon',
  'kali mirch': 'black pepper',
  'rai': 'mustard seeds',
  'methi': 'fenugreek',
  'kesar': 'saffron kesar',
  'saffron': 'kesar saffron',
  'zafran': 'kesar saffron',
  'keshar': 'kesar saffron',
  'ajwain': 'carom seeds ajwain',
  'saunf': 'fennel seeds',
  
  // Beverages
  'chai': 'tea',
  'paani': 'water', 'pani': 'water',
  'nimbu pani': 'lemonade',
  'lassi': 'lassi buttermilk',
  
  // Personal Care
  'sabun': 'soap', 'saboon': 'soap',
  'toothpaste': 'toothpaste',
  
  // Baby & Home
  'baccha': 'baby', 'bacha': 'baby',
  'machhar': 'mosquito', 'machar': 'mosquito',
  'cockroach': 'cockroach roach',
  'chuha': 'rat mouse',
  
  // Dry Fruits
  'badam': 'almond badam',
  'kaju': 'cashew kaju',
  'pista': 'pistachio',
  'akhrot': 'walnut',
  'kishmish': 'raisin',
  'mungfali': 'peanut groundnut',
  
  // Snacks
  'namkeen': 'namkeen snacks mixture',
  'bhujia': 'bhujia namkeen',
  'mathri': 'mathri snack',
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const PRODUCTS_PER_PAGE = 20;
  
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

  // 🔥 Infinite scroll observer
  const lastProductRef = useCallback(node => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    }, { threshold: 0.5 });
    
    if (node) observer.current.observe(node);
  }, [loadingMore, hasMore]);

  // Load more products
  useEffect(() => {
    if (page === 1) return;
    
    setLoadingMore(true);
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const newProducts = products.slice(start, end);
    
    setTimeout(() => {
      setDisplayedProducts(prev => [...prev, ...newProducts]);
      setHasMore(end < products.length);
      setLoadingMore(false);
    }, 200);
  }, [page, products]);

  // 🔥 MAIN SEARCH FUNCTION
  useEffect(() => {
    const doSearch = async () => {
      if (!query) {
        setProducts([]);
        setDisplayedProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setPage(1);

      let searchText = query.toLowerCase().trim();
      console.log('🔍 Original:', searchText);

      // 🔥 Step 1: Fix spelling mistakes
      Object.keys(FIX_SPELLING).forEach(wrong => {
        if (searchText.includes(wrong)) {
          searchText = searchText.replace(new RegExp(wrong, 'g'), FIX_SPELLING[wrong]);
        }
      });
      
      // 🔥 Step 1.5: Handle plurals - remove trailing 's' for common words
      const words = searchText.split(/\s+/);
      const singularWords = words.map(word => {
        // If word ends with 's' and is longer than 3 chars, try singular form
        if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) {
          return word.slice(0, -1);
        }
        return word;
      });
      searchText = [...new Set([...words, ...singularWords])].join(' ');
      
      // 🔥 Step 2: Translate Hindi to English
      Object.keys(HINDI_ENGLISH).forEach(hindi => {
        if (searchText === hindi || searchText.includes(hindi)) {
          searchText = searchText.replace(new RegExp(hindi, 'g'), HINDI_ENGLISH[hindi]);
        }
      });

      console.log('🔄 Processed:', searchText);

      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${API_URL}/products`);
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        let allProducts = Array.isArray(data) ? data : (data?.products || []);
        
        console.log(`✅ Total products: ${allProducts.length}`);

        // 🔥 SYNONYM EXPANSION - Search all variations
        const SYNONYMS = {
          // Spices
          'elaichi': ['elaichi', 'ilaichi', 'ilachi', 'cardamom', 'elachi'],
          'cardamom': ['cardamom', 'elaichi', 'ilaichi'],
          'jeera': ['jeera', 'cumin', 'zeera', 'zira'],
          'cumin': ['cumin', 'jeera', 'zeera'],
          'haldi': ['haldi', 'turmeric', 'halid'],
          'turmeric': ['turmeric', 'haldi'],
          'dhania': ['dhania', 'coriander', 'dhaniya'],
          'coriander': ['coriander', 'dhania'],
          'adrak': ['adrak', 'ginger', 'adarak'],
          'ginger': ['ginger', 'adrak'],
          'lahsun': ['lahsun', 'garlic', 'lasun', 'lahasun'],
          'garlic': ['garlic', 'lahsun'],
          'mirch': ['mirch', 'chilli', 'chili', 'pepper', 'mirchi'],
          'chilli': ['chilli', 'mirch', 'pepper'],
          'namak': ['namak', 'salt'],
          'salt': ['salt', 'namak'],
          'cheeni': ['cheeni', 'sugar', 'chini'],
          'sugar': ['sugar', 'cheeni', 'chini'],
          'laung': ['laung', 'clove', 'cloves'],
          'dalchini': ['dalchini', 'cinnamon'],
          
          // Chocolate
          'chocolate': ['chocolate', 'choco', 'cadbury', 'dairy milk'],
          'choco': ['chocolate', 'choco', 'cadbury'],
          
          // Saffron/Kesar
          'saffron': ['saffron', 'kesar', 'keshar', 'zafran'],
          'kesar': ['kesar', 'saffron', 'keshar', 'zafran'],
          
          // Baby/Diaper
          'diaper': ['diaper', 'diapers', 'nappy', 'mamy poko', 'pampers', 'huggies'],
          'nappy': ['nappy', 'diaper', 'diapers'],
          'baby': ['baby', 'infant', 'baccha', 'johnson'],
          
          // Pet
          'dog': ['dog', 'puppy', 'pedigree', 'drools', 'pet'],
          'cat': ['cat', 'kitten', 'whiskas', 'pet'],
          'pet': ['pet', 'dog', 'cat', 'pedigree', 'whiskas', 'drools'],
          'puppy': ['puppy', 'dog', 'pedigree', 'drools'],
          
          // Mosquito
          'mosquito': ['mosquito', 'machhar', 'machar', 'good knight', 'all out', 'hit'],
          'machhar': ['machhar', 'mosquito', 'machar'],
          
          // Dairy
          'doodh': ['doodh', 'milk', 'dudh'],
          'milk': ['milk', 'doodh', 'dudh'],
          'dahi': ['dahi', 'curd', 'yogurt'],
          'curd': ['curd', 'dahi', 'yogurt'],
          'paneer': ['paneer', 'cottage cheese'],
          
          // Oil
          'oil': ['oil', 'tel', 'refined', 'mustard'],
          'tel': ['tel', 'oil'],
          'sarso': ['sarso', 'mustard oil', 'sarson'],
          
          // Tea/Coffee
          'chai': ['chai', 'tea'],
          'tea': ['tea', 'chai'],
          'coffee': ['coffee', 'nescafe', 'bru'],
        };

        // Expand search terms with synonyms
        let expandedTerms = new Set(searchText.split(/\s+/).filter(t => t.length >= 2));
        
        searchText.split(/\s+/).forEach(term => {
          if (SYNONYMS[term]) {
            SYNONYMS[term].forEach(syn => expandedTerms.add(syn));
          }
        });
        
        // Also add from original query
        query.toLowerCase().split(/\s+/).forEach(term => {
          expandedTerms.add(term);
          if (SYNONYMS[term]) {
            SYNONYMS[term].forEach(syn => expandedTerms.add(syn));
          }
        });

        console.log('🔍 Expanded terms:', [...expandedTerms]);

        // 🔥 Step 3: SIMPLE SEARCH - Find products matching ANY term
        const allSearchTerms = [...expandedTerms];
        
        // Also add original query terms
        query.toLowerCase().split(/\s+/).forEach(t => {
          if (t.length >= 2) allSearchTerms.push(t);
        });
        
        // Add singular versions of plural words
        allSearchTerms.forEach(term => {
          if (term.length > 3 && term.endsWith('s')) {
            allSearchTerms.push(term.slice(0, -1));
          }
        });
        
        const uniqueTerms = [...new Set(allSearchTerms)].filter(t => t.length >= 2);
        console.log('🔍 All search terms:', uniqueTerms);

        // Find products matching ANY term
        const matchedProducts = [];
        const matchedIds = new Set();
        
        allProducts.forEach(product => {
          const name = (product.name || '').toLowerCase();
          const brand = (product.brand || '').toLowerCase();
          const category = (product.category || '').toLowerCase();
          
          // Check if ANY term matches
          let matchCount = 0;
          let matchScore = 0;
          
          uniqueTerms.forEach(term => {
            if (name.includes(term)) {
              matchCount++;
              matchScore += term.length; // Longer matches = better
            }
            if (brand.includes(term)) {
              matchCount++;
              matchScore += term.length / 2;
            }
            if (category.includes(term)) {
              matchScore += 1;
            }
          });
          
          if (matchCount > 0) {
            matchedProducts.push({ product, matchCount, matchScore });
            matchedIds.add(product._id);
          }
        });

        // Sort by match count, then by score
        matchedProducts.sort((a, b) => {
          if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
          return b.matchScore - a.matchScore;
        });
        
        console.log(`🎯 Direct matches: ${matchedProducts.length}`);

        // 🔥 Step 4: If NO matches, use fuzzy search (STRICT)
        let finalMatched = matchedProducts.map(m => m.product);
        
        if (finalMatched.length === 0) {
          console.log('🔄 No matches, trying fuzzy search...');
          
          const fuse = new Fuse(allProducts, {
            keys: [
              { name: 'name', weight: 0.6 },
              { name: 'brand', weight: 0.3 },
              { name: 'category', weight: 0.1 },
            ],
            threshold: 0.25,  // More strict! (was 0.4)
            distance: 80,     // Shorter distance (was 150)
            includeScore: true,
          });
          
          // Try all terms
          uniqueTerms.forEach(term => {
            const results = fuse.search(term);
            results.forEach(r => {
              if (!matchedIds.has(r.item._id) && r.score <= 0.3) {  // Stricter score
                finalMatched.push(r.item);
                matchedIds.add(r.item._id);
              }
            });
          });
          
          console.log(`🔍 Fuzzy matches: ${finalMatched.length}`);
        }

        // 🔥 Step 5: Add RELATED BRAND products (Whisper → Stayfree, Laung → Elaichi, etc.)
        let relatedProducts = [];
        
        const searchLower = searchText.toLowerCase();
        const queryLower = query.toLowerCase().trim();
        
        // Find related brands from search terms
        let relatedBrands = [];
        
        // Check all search terms for related brands
        uniqueTerms.forEach(term => {
          if (RELATED_BRANDS[term]) {
            relatedBrands = [...relatedBrands, ...RELATED_BRANDS[term]];
          }
        });
        
        // Also check if any part of query matches
        Object.keys(RELATED_BRANDS).forEach(brand => {
          if (searchLower.includes(brand) || queryLower.includes(brand)) {
            relatedBrands = [...relatedBrands, ...RELATED_BRANDS[brand]];
          }
        });
        
        // Remove duplicates
        relatedBrands = [...new Set(relatedBrands)];
        console.log('🔗 Related brands:', relatedBrands);

        // Find products from related brands
        if (relatedBrands.length > 0) {
          allProducts.forEach(product => {
            if (matchedIds.has(product._id)) return;
            
            const name = (product.name || '').toLowerCase();
            const brand = (product.brand || '').toLowerCase();
            
            // Check if product matches any related brand
            const isRelated = relatedBrands.some(rb => 
              name.includes(rb) || brand.includes(rb)
            );
            
            if (isRelated) {
              relatedProducts.push(product);
              matchedIds.add(product._id);
            }
          });
          
          console.log(`➕ Related products: ${relatedProducts.length}`);
        }

        // 🔥 Step 6: If STILL few results (< 15), add category products
        let categoryProducts = [];
        const totalSoFar = finalMatched.length + relatedProducts.length;
        
        if (totalSoFar < 15 && finalMatched.length > 0) {
          // Get categories from matched products
          const matchedCategories = new Set();
          finalMatched.forEach(p => {
            if (p.category) {
              matchedCategories.add(p.category.toLowerCase().trim());
            }
          });

          if (matchedCategories.size > 0) {
            console.log('📦 Adding from categories:', [...matchedCategories]);

            allProducts.forEach(product => {
              const cat = (product.category || '').toLowerCase().trim();
              if (matchedCategories.has(cat) && !matchedIds.has(product._id)) {
                categoryProducts.push(product);
                matchedIds.add(product._id);
              }
            });

            console.log(`➕ Category products: ${categoryProducts.length}`);
          }
        }

        // Combine: matched first, then related, then category
        const finalProducts = [...finalMatched, ...relatedProducts, ...categoryProducts];

        console.log(`✅ Total results: ${finalProducts.length}`);

        setProducts(finalProducts);
        setDisplayedProducts(finalProducts.slice(0, PRODUCTS_PER_PAGE));
        setHasMore(finalProducts.length > PRODUCTS_PER_PAGE);
        
      } catch (err) {
        console.error('❌ Error:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    doSearch();
  }, [query]);

  // Cart functions
  const getQuantity = (productId) => {
    const item = cartItems.find(item => item?.product?._id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = async (product) => {
    await addToCart(product._id, 1);
  };

  const handleIncrease = async (productId) => {
    const qty = getQuantity(productId);
    await updateQuantity(productId, qty + 1);
  };

  const handleDecrease = async (productId) => {
    const qty = getQuantity(productId);
    if (qty === 1) {
      await removeFromCart(productId);
    } else {
      await updateQuantity(productId, qty - 1);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="search-results-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Searching "{query}"...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="search-results-container">
        <div className="error-message">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="search-header">
        <h1>Search Results for: "{query}"</h1>
        <p className="results-count">
          {products.length > 0 
            ? `Found ${products.length} product${products.length !== 1 ? 's' : ''}` 
            : 'No products found'}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h2>No products found</h2>
          <p>Try different keywords</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {displayedProducts.map((product, index) => {
              const quantity = getQuantity(product._id);
              const isLast = index === displayedProducts.length - 1;
              
              return (
                <div 
                  key={product._id} 
                  className="product-card"
                  ref={isLast ? lastProductRef : null}
                >
                  <div className="product-image-wrapper">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="product-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                      }}
                    />
                    {product.discount && (
                      <div className="discount-badge">{product.discount}</div>
                    )}
                  </div>

                  <div className="product-info">
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-brand">{product.brand}</p>
                    
                    {product.weight && (
                      <p className="product-weight">{product.weight}</p>
                    )}
                    
                    <div className="product-pricing">
                      <span className="current-price">₹{product.price}</span>
                      {product.oldPrice && product.oldPrice > product.price && (
                        <span className="original-price">₹{product.oldPrice}</span>
                      )}
                    </div>

                    {quantity > 0 ? (
                      <div className="quantity-controls">
                        <button className="qty-btn" onClick={() => handleDecrease(product._id)}>−</button>
                        <span className="qty-num">{quantity}</span>
                        <button className="qty-btn" onClick={() => handleIncrease(product._id)}>+</button>
                      </div>
                    ) : (
                      <button className="add-btn" onClick={() => handleAddToCart(product)}>
                        🛒 ADD TO CART
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {loadingMore && (
            <div className="loading-more">
              <div className="spinner-small"></div>
              <p>Loading more...</p>
            </div>
          )}

          {!hasMore && products.length > PRODUCTS_PER_PAGE && (
            <div className="end-results">
              <p>✓ All {products.length} products loaded</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;