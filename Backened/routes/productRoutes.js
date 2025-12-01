// Backend/routes/productRoutes.js - WITH CLOUDINARY IMAGE UPLOAD

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { upload, deleteImage } = require('../config/cloudinary'); // ✅ Cloudinary

// ====================================
// HELPER FUNCTIONS
// ====================================

// 🔥 ESCAPE REGEX SPECIAL CHARACTERS
const escapeRegex = (string) => {
  if (!string) return '';
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Normalize product data
const normalizeProduct = (product) => {
  try {
    const normalized = product.toObject ? product.toObject() : { ...product };
    
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
  } catch (err) {
    console.error('Normalize error:', err);
    return product;
  }
};

// Clean search query
const cleanSearchQuery = (query) => {
  if (!query) return '';
  return query
    .toLowerCase()
    .replace(/[,&]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// 🔥 RELEVANCE SCORING FUNCTION
const calculateRelevanceScore = (product, searchQuery, searchWords) => {
  try {
    let score = 0;
    
    const name = String(product.name || '').toLowerCase();
    const category = String(product.category || '').toLowerCase();
    const brand = String(product.brand || '').toLowerCase();
    const description = String(product.description || '').toLowerCase();
    const query = String(searchQuery || '').toLowerCase();

    if (!name || !query) return 0;

    // 🏆 Exact name match
    if (name === query) score += 1000;
    
    // 🥇 Name starts with search query
    if (name.startsWith(query)) score += 500;
    
    // 🥈 Name starts with any search word
    if (Array.isArray(searchWords)) {
      searchWords.forEach(word => {
        if (word && name.startsWith(word)) score += 300;
      });
    }
    
    // 🥉 Search query is a complete word in name
    const nameWords = name.split(/\s+/);
    if (nameWords.some(w => w === query)) score += 200;
    
    // ✅ Each search word appears in name
    if (Array.isArray(searchWords)) {
      searchWords.forEach(word => {
        if (word && nameWords.some(w => w === word || w.startsWith(word))) {
          score += 100;
        }
      });
    }
    
    // ✅ Name contains search query
    if (name.includes(query)) score += 50;
    
    // ✅ Name contains search words
    if (Array.isArray(searchWords)) {
      searchWords.forEach(word => {
        if (word && name.includes(word)) score += 30;
      });
    }
    
    // 📦 Brand match
    if (brand === query) score += 40;
    if (brand.includes(query)) score += 20;
    
    // 📂 Category match (lower priority)
    if (category.includes(query)) score += 10;
    
    // 📝 Description match
    if (description.includes(query)) score += 5;
    
    return score;
  } catch (err) {
    console.error('Score calculation error:', err);
    return 0;
  }
};

// ====================================
// ROUTES
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
    const searchWords = cleanedQuery.split(' ').filter(word => word && word.length >= 2);

    // 🔥 ESCAPE REGEX SPECIAL CHARACTERS
    const escapedQuery = escapeRegex(cleanedQuery);
    const escapedWords = searchWords.map(w => escapeRegex(w));

    const orConditions = [];
    
    escapedWords.forEach(word => {
      orConditions.push({ name: { $regex: word, $options: 'i' } });
    });

    if (escapedQuery.length >= 2) {
      orConditions.push({ name: { $regex: escapedQuery, $options: 'i' } });
    }

    if (orConditions.length === 0) {
      return res.json([]);
    }

    const products = await Product.find({
      $or: orConditions
    })
    .select('name')
    .limit(20);

    // Sort by relevance
    const sortedProducts = products
      .map(p => ({
        name: p.name,
        score: calculateRelevanceScore({ name: p.name }, cleanedQuery, searchWords)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const suggestionList = sortedProducts.map(p => p.name);
    
    console.log('✅ Suggestions:', suggestionList);

    res.json(suggestionList);
  } catch (error) {
    console.error('❌ Suggestions Error:', error);
    res.json([]);
  }
});

// ✅ 2. SEARCH ROUTE
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    console.log('🔍 Search Query:', q);

    if (!q || q.trim().length === 0) {
      return res.json([]);
    }

    const cleanedQuery = cleanSearchQuery(q);
    const searchWords = cleanedQuery.split(' ').filter(word => word && word.length >= 2);
    
    const escapedQuery = escapeRegex(cleanedQuery);
    const escapedWords = searchWords.map(w => escapeRegex(w));

    const orConditions = [];
    
    escapedWords.forEach(word => {
      orConditions.push(
        { name: { $regex: word, $options: 'i' } },
        { category: { $regex: word, $options: 'i' } },
        { brand: { $regex: word, $options: 'i' } },
        { description: { $regex: word, $options: 'i' } }
      );
    });

    if (escapedQuery.length >= 2) {
      orConditions.push(
        { name: { $regex: escapedQuery, $options: 'i' } },
        { category: { $regex: escapedQuery, $options: 'i' } },
        { brand: { $regex: escapedQuery, $options: 'i' } },
        { description: { $regex: escapedQuery, $options: 'i' } }
      );
    }

    if (orConditions.length === 0) {
      return res.json([]);
    }

    const products = await Product.find({
      $or: orConditions
    }).limit(500);

    if (products.length === 0) {
      return res.json([]);
    }

    // Relevance sorting
    const scoredProducts = [];
    
    for (const product of products) {
      try {
        const normalized = normalizeProduct(product);
        const score = calculateRelevanceScore(product, cleanedQuery, searchWords);
        scoredProducts.push({ ...normalized, _relevanceScore: score });
      } catch (err) {
        scoredProducts.push({ ...product.toObject(), _relevanceScore: 0 });
      }
    }

    scoredProducts.sort((a, b) => (b._relevanceScore || 0) - (a._relevanceScore || 0));

    const finalProducts = scoredProducts.slice(0, 250).map(p => {
      const { _relevanceScore, ...product } = p;
      return product;
    });

    console.log('✅ Search Results:', finalProducts.length);

    res.json(finalProducts);
  } catch (error) {
    console.error('❌ Search Error:', error.message);
    res.status(500).json({ message: 'Search failed', error: error.message });
  }
});

// ✅ 3. CATEGORY ROUTE
router.get('/category/:category', async (req, res) => {
  try {
    const requestedCategory = req.params.category;
    
    console.log('📂 Category:', requestedCategory);
    
    const escapedCategory = escapeRegex(requestedCategory);
    
    const products = await Product.find({ 
      category: { $regex: `^${escapedCategory}$`, $options: 'i' }
    });
    
    console.log('✅ Found:', products.length);
    
    const normalizedProducts = products.map(normalizeProduct);
    
    res.json({
      success: true,
      products: normalizedProducts
    });
  } catch (error) {
    console.error('Category Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
});

// ✅ 4. GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    console.log('📦 GET / - category:', category, 'search:', search);
    
    let query = {};
    
    if (category) {
      const escapedCategory = escapeRegex(category);
      query.category = { $regex: `^${escapedCategory}$`, $options: 'i' };
    }
    
    if (search) {
      const cleanedSearch = cleanSearchQuery(search);
      const escapedSearch = escapeRegex(cleanedSearch);
      query.name = { $regex: escapedSearch, $options: 'i' };
    }
    
    const products = await Product.find(query);
    
    console.log('✅ Found:', products.length);
    
    const normalizedProducts = products.map(normalizeProduct);
    
    res.json({
      success: true,
      products: normalizedProducts
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
});

// ✅ 5. CREATE PRODUCT WITH IMAGE UPLOAD 📸
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, brand, category, price, oldPrice, weight, image, stock, inStock, discount, description } = req.body;
    
    console.log('📦 Creating product:', name);
    
    if (!name || !category || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name, Category aur Price required hai!'
      });
    }
    
    const productData = {
      name,
      brand: brand || '',
      category,
      price: parseFloat(price),
      oldPrice: oldPrice ? parseFloat(oldPrice) : parseFloat(price),
      weight: weight || '',
      stock: stock ? parseInt(stock) : 100,
      inStock: inStock === 'true' || inStock === true || inStock === undefined,
      discount: discount || '',
      description: description || ''
    };
    
    // ✅ Cloudinary Image Upload
    if (req.file) {
      productData.image = req.file.path; // Cloudinary URL
      productData.imagePublicId = req.file.filename; // For deletion
      console.log('📸 Image uploaded:', req.file.path);
    } else if (image) {
      // Direct URL provided (for manual entry)
      productData.image = image;
    }
    
    const product = new Product(productData);
    await product.save();
    
    console.log('✅ Product created:', product.name);
    
    res.status(201).json({
      success: true,
      message: 'Product add ho gaya!',
      product: normalizeProduct(product)
    });
  } catch (error) {
    console.error('❌ Create Error:', error);
    res.status(500).json({
      success: false,
      message: 'Product add nahi hua',
      error: error.message
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
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
});

// ✅ 7. UPDATE PRODUCT WITH IMAGE 📸
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Delete old image if new one uploaded
    if (req.file && product.imagePublicId) {
      try {
        await deleteImage(product.imagePublicId);
        console.log('🗑️ Old image deleted');
      } catch (err) {
        console.log('Old image delete error:', err.message);
      }
    }
    
    const updateData = { ...req.body };
    
    // Parse numeric fields
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.oldPrice) updateData.oldPrice = parseFloat(updateData.oldPrice);
    if (updateData.stock) updateData.stock = parseInt(updateData.stock);
    
    // New image uploaded
    if (req.file) {
      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
      console.log('📸 New image uploaded:', req.file.path);
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    console.log('✅ Product updated:', updatedProduct.name);
    
    res.json({
      success: true,
      message: 'Product update ho gaya!',
      product: normalizeProduct(updatedProduct)
    });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product'
    });
  }
});

// ✅ 8. DELETE PRODUCT (Also deletes image from Cloudinary)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Delete image from Cloudinary
    if (product.imagePublicId) {
      try {
        await deleteImage(product.imagePublicId);
        console.log('🗑️ Image deleted from Cloudinary');
      } catch (err) {
        console.log('Image delete error:', err.message);
      }
    }
    
    await Product.findByIdAndDelete(req.params.id);
    
    console.log('✅ Product deleted:', product.name);
    
    res.json({
      success: true,
      message: 'Product delete ho gaya!'
    });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product'
    });
  }
});

module.exports = router;