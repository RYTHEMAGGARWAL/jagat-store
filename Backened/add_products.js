/**
 * ╔════════════════════════════════════════════════════════════════╗
 * ║     🚀 JAGAT STORE - ADD/UPDATE PRODUCTS + CLOUDINARY         ║
 * ║                                                                 ║
 * ║   📌 HOW TO USE:                                               ║
 * ║   1. Products array mein apne products add karo (neeche)       ║
 * ║   2. Run karo: node add-products.js                            ║
 * ║   3. Done! Products DB mein + Images Cloudinary par ✅          ║
 * ║                                                                 ║
 * ║   ✨ NEW: Existing products bhi UPDATE hote hain!              ║
 * ╚════════════════════════════════════════════════════════════════╝
 */

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

// ═══════════════════════════════════════════════════════════════════
// 🔧 CONFIGURATION (Auto from .env)
// ═══════════════════════════════════════════════════════════════════
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const MONGO_URI = process.env.MONGO_URI;

// ═══════════════════════════════════════════════════════════════════
// 🎯 YAHAN APNE PRODUCTS ADD KARO
// ═══════════════════════════════════════════════════════════════════

const products = [
  
  // ✅ EXAMPLE - Aise add karo:
  // {
  //   name: "Product Name",
  //   weight: "500g",
  //   price: 99,
  //   oldPrice: 120,
  //   discount: "18% OFF",
  //   category: "Grocery",
  //   brand: "Brand Name",
  //   image: "https://any-image-url.com/image.jpg",
  //   description: "Product description here",
  //   stock: 100
  // },

  // 👇 APNE PRODUCTS YAHAN ADD KARO 👇
  


  
];

// ═══════════════════════════════════════════════════════════════════
// ⚠️ NEECHE KUCH CHANGE MAT KARNA - AUTOMATIC HAI
// ═══════════════════════════════════════════════════════════════════

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  weight: String,
  price: Number,
  oldPrice: Number,
  discount: String,
  category: String,
  brand: String,
  image: String,
  imagePublicId: String,
  inStock: { type: Boolean, default: true },
  description: String,
  stock: { type: Number, default: 100 }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Clean URL - handles all edge cases
const cleanUrl = (url) => {
  if (!url) return '';
  
  let cleaned = url
    .replace(/^\s+/, '')           // Leading spaces
    .replace(/\s+$/, '')           // Trailing spaces
    .replace(/^\t+/, '')           // Leading tabs
    .replace(/\t+$/, '')           // Trailing tabs
    .replace(/^h+(?=https?)/, '')  // Extra 'h' before http/https  
    .replace(/\s+/g, '')           // All spaces in between
    .trim();
  
  // Fix common typos
  if (cleaned.startsWith('ttps://')) {
    cleaned = 'h' + cleaned;
  }
  if (cleaned.startsWith('tps://')) {
    cleaned = 'ht' + cleaned;
  }
  
  return cleaned;
};

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Upload to Cloudinary with retry
const uploadToCloudinary = async (imageUrl, product, retryCount = 0) => {
  try {
    const cleanedUrl = cleanUrl(imageUrl);
    
    if (!cleanedUrl) {
      return { success: false, url: '', error: 'Empty URL' };
    }

    // Already Cloudinary? Skip upload but mark success
    if (cleanedUrl.includes('cloudinary.com')) {
      return { success: true, url: cleanedUrl, publicId: null, skipped: true };
    }

    // Create unique public ID
    const cleanCategory = (product.category || 'general')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');
    
    const cleanName = `${product.name}-${product.weight || 'default'}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 60);
    
    const timestamp = Date.now();
    const publicId = `${cleanCategory}/${cleanName}-${timestamp}`;

    // Upload with optimization
    const result = await cloudinary.uploader.upload(cleanedUrl, {
      folder: 'jagatstore/products',
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
      timeout: 60000,
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    });

    return { 
      success: true, 
      url: result.secure_url, 
      publicId: result.public_id 
    };

  } catch (error) {
    // Retry up to 2 times
    if (retryCount < 2) {
      console.log(`      ⏳ Retry ${retryCount + 1}/2...`);
      await sleep(2000);
      return uploadToCloudinary(imageUrl, product, retryCount + 1);
    }
    return { success: false, url: imageUrl, error: error.message };
  }
};

// Main Function
const addProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║     🚀 JAGAT STORE - ADD/UPDATE PRODUCTS + CLOUDINARY         ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');
    
    console.log('✅ MongoDB Connected');
    console.log(`✅ Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME || '❌ NOT SET'}\n`);

    if (products.length === 0) {
      console.log('⚠️  No products to add! Add products in the array first.\n');
      process.exit(0);
    }

    console.log(`📦 Products to Process: ${products.length}\n`);
    console.log('━'.repeat(60) + '\n');

    let addedCount = 0;
    let updatedCount = 0;
    let failedCount = 0;
    let cloudinarySuccess = 0;
    let cloudinaryFail = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const label = `${product.name} (${product.weight || 'N/A'})`.substring(0, 45);

      console.log(`[${i + 1}/${products.length}] ${label}`);

      try {
        // Check if already exists
        const existingProduct = await Product.findOne({
          name: product.name,
          weight: product.weight,
          brand: product.brand
        });

        // Upload image to Cloudinary
        console.log(`   📤 Uploading image to Cloudinary...`);
        
        const uploadResult = await uploadToCloudinary(product.image, product);

        // Prepare product data
        const productData = {
          name: product.name,
          weight: product.weight || '',
          price: product.price,
          oldPrice: product.oldPrice || product.price,
          discount: product.discount || '',
          category: product.category,
          brand: product.brand || '',
          description: product.description || `${product.name} | ${product.brand || ''} | ${product.weight || ''}`,
          stock: product.stock || 100,
          inStock: true,
          image: uploadResult.success ? uploadResult.url : product.image,
          imagePublicId: uploadResult.publicId || null
        };

        if (existingProduct) {
          // ✨ UPDATE existing product
          await Product.findByIdAndUpdate(existingProduct._id, productData);
          
          if (uploadResult.success && !uploadResult.skipped) {
            console.log(`   🔄 UPDATED + Cloudinary uploaded!`);
            console.log(`   🔗 ${uploadResult.url.substring(0, 60)}...`);
            cloudinarySuccess++;
          } else if (uploadResult.skipped) {
            console.log(`   🔄 UPDATED (Already Cloudinary URL)`);
            cloudinarySuccess++;
          } else {
            console.log(`   ⚠️  UPDATED but Cloudinary failed: ${uploadResult.error}`);
            cloudinaryFail++;
          }
          updatedCount++;
          
        } else {
          // ➕ ADD new product
          const newProduct = new Product(productData);
          await newProduct.save();

          if (uploadResult.success && !uploadResult.skipped) {
            console.log(`   ✅ ADDED + Cloudinary uploaded!`);
            console.log(`   🔗 ${uploadResult.url.substring(0, 60)}...`);
            cloudinarySuccess++;
          } else if (uploadResult.skipped) {
            console.log(`   ✅ ADDED (Already Cloudinary URL)`);
            cloudinarySuccess++;
          } else {
            console.log(`   ⚠️  ADDED but Cloudinary failed: ${uploadResult.error}`);
            cloudinaryFail++;
          }
          addedCount++;
        }

        console.log('');

        // Small delay
        await sleep(800);

      } catch (error) {
        console.log(`   ❌ FAILED: ${error.message}\n`);
        failedCount++;
      }
    }

    // Summary
    console.log('\n' + '━'.repeat(60));
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║                      📊 SUMMARY                                ║');
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log(`║   ✅ Products Added (New):    ${String(addedCount).padEnd(31)}║`);
    console.log(`║   🔄 Products Updated:        ${String(updatedCount).padEnd(31)}║`);
    console.log(`║   ❌ Failed:                  ${String(failedCount).padEnd(31)}║`);
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log(`║   🖼️  Cloudinary Success:      ${String(cloudinarySuccess).padEnd(31)}║`);
    console.log(`║   ⚠️  Cloudinary Failed:       ${String(cloudinaryFail).padEnd(31)}║`);
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    if (addedCount > 0 || updatedCount > 0) {
      console.log('🎉 Products processed successfully!\n');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Done!\n');
    process.exit(0);
  }
};

// Run
addProducts();