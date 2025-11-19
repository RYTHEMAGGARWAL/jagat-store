// Backend/routes/productRoutes.js - FIXED CATEGORY FILTERING

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ====================================
// HELPER FUNCTIONS
// ====================================

// Normalize product data
const normalizeProduct = (product) => {
  const normalized = product.toObject ? product.toObject() : product;
  
  if (!normalized.image && normalized.images && normalized.images.length > 0) {
    normalized.image = normalized.images[0].url;
  }
  
  if (!normalized.originalPrice && !normalized.oldPrice && normalized.mrp) {
    normalized.originalPrice = normalized.mrp;
    normalized.oldPrice = normalized.mrp;
  }
  
  if (!normalized.discount && normalized.oldPrice && normalized.price) {
    const discountPercent = Math.round(((normalized.oldPrice - normalized.price) / normalized.oldPrice) * 100);
    if (discountPercent > 0) {
      normalized.discount = `${discountPercent}%`;
    }
  }
  
  return normalized;
};

// Clean search query - remove special characters, commas, &
const cleanSearchQuery = (query) => {
  return query
    .toLowerCase()
    .replace(/[,&]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// ====================================
// SPECIFIC ROUTES FIRST
// ====================================

// ✅ 1. SEARCH SUGGESTIONS
router.get('/search/suggestions', async (req, res) => {
  try {
    const { q } = req.query;
    
    console.log('🔍 Suggestions Query:', q);

    if (!q || q.trim().length < 2) {
      return res.json([]);
    }

    const cleanedQuery = cleanSearchQuery(q);
    const searchWords = cleanedQuery.split(' ').filter(word => word.length >= 2);

    const orConditions = [];
    
    searchWords.forEach(word => {
      orConditions.push({ name: { $regex: word, $options: 'i' } });
    });

    if (cleanedQuery.length >= 2) {
      orConditions.push({ name: { $regex: cleanedQuery, $options: 'i' } });
    }

    const products = await Product.find({
      $or: orConditions
    })
    .select('name')
    .limit(5);

    const suggestionList = products.map(p => p.name);
    
    console.log('✅ Found Suggestions:', suggestionList);

    res.json(suggestionList);
  } catch (error) {
    console.error('❌ Suggestions Error:', error);
    res.status(500).json({ 
      message: 'Suggestions failed', 
      error: error.message 
    });
  }
});

// ✅ 2. SEARCH ROUTE - SMART MATCHING
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    console.log('🔍 Original Search Query:', q);

    if (!q || q.trim().length === 0) {
      return res.json([]);
    }

    const cleanedQuery = cleanSearchQuery(q);
    const searchWords = cleanedQuery.split(' ').filter(word => word.length >= 2);
    
    console.log('🔍 Cleaned Query:', cleanedQuery);
    console.log('🔍 Search Words:', searchWords);

    const orConditions = [];
    
    searchWords.forEach(word => {
      orConditions.push(
        { name: { $regex: word, $options: 'i' } },
        { category: { $regex: word, $options: 'i' } },
        { brand: { $regex: word, $options: 'i' } },
        { description: { $regex: word, $options: 'i' } }
      );
    });

    if (cleanedQuery.length >= 2) {
      orConditions.push(
        { name: { $regex: cleanedQuery, $options: 'i' } },
        { category: { $regex: cleanedQuery, $options: 'i' } },
        { brand: { $regex: cleanedQuery, $options: 'i' } },
        { description: { $regex: cleanedQuery, $options: 'i' } }
      );
    }

    const products = await Product.find({
      $or: orConditions
    }).limit(250);

    console.log('✅ Found Products:', products.length);

    const normalizedProducts = products.map(normalizeProduct);

    res.json(normalizedProducts);
  } catch (error) {
    console.error('❌ Search Error:', error);
    res.status(500).json({ 
      message: 'Search failed', 
      error: error.message 
    });
  }
});

// ✅ 3. CATEGORY ROUTE - EXACT MATCHING
router.get('/category/:category', async (req, res) => {
  try {
    const requestedCategory = req.params.category;
    
    console.log('📂 Category Request:', requestedCategory);
    
    // 🔥 EXACT MATCH ONLY - Case insensitive
    const products = await Product.find({ 
      category: { $regex: `^${requestedCategory}$`, $options: 'i' }
    });
    
    console.log('✅ Found Products in Category:', products.length);
    
    const normalizedProducts = products.map(normalizeProduct);
    
    res.json({
      success: true,
      products: normalizedProducts
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
});

// ====================================
// GENERAL ROUTES AFTER
// ====================================

// ✅ 4. GET ALL PRODUCTS (with filters) - FIXED
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    console.log('📦 GET / - category:', category, 'search:', search);
    
    let query = {};
    
    // 🔥 FIX: EXACT CATEGORY MATCH
    if (category) {
      // Use exact match with case-insensitive regex
      query.category = { $regex: `^${category}$`, $options: 'i' };
      console.log('🔍 Category Query:', query.category);
    }
    
    if (search) {
      const cleanedSearch = cleanSearchQuery(search);
      query.name = { $regex: cleanedSearch, $options: 'i' };
    }
    
    console.log('🔍 Final Query:', JSON.stringify(query));
    
    const products = await Product.find(query);
    
    console.log('✅ Found Products:', products.length);
    
    // Log first 3 for debugging
    if (products.length > 0) {
      console.log('📦 Sample Products:', products.slice(0, 3).map(p => ({
        name: p.name,
        category: p.category
      })));
    }
    
    const normalizedProducts = products.map(normalizeProduct);
    
    res.json({
      success: true,
      products: normalizedProducts
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
});

// ✅ 5. CREATE PRODUCT
router.post('/', async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      price,
      oldPrice,
      weight,
      image,
      stock,
      inStock,
      discount
    } = req.body;
    
    if (!name || !category || !price) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, category, and price'
      });
    }
    
    const product = new Product({
      name,
      brand: brand || '',
      category,
      price,
      oldPrice: oldPrice || price,
      weight: weight || '',
      image: image || '',
      stock: stock || 100,
      inStock: inStock !== undefined ? inStock : true,
      discount: discount || ''
    });
    
    await product.save();
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: normalizeProduct(product)
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product'
    });
  }
});

// ✅ 6. GET PRODUCT BY ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      product: normalizeProduct(product)
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
});

// ✅ 7. UPDATE PRODUCT
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      product: normalizeProduct(product)
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product'
    });
  }
});

// ✅ 8. DELETE PRODUCT
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product'
    });
  }
});

module.exports = router;