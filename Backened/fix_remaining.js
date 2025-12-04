/**
 * 🔧 FIX REMAINING BING IMAGES
 * Finds products with Bing URLs and re-uploads to Cloudinary
 */

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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
  inStock: Boolean,
  description: String,
  stock: Number
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Better URL cleaner - handles all edge cases
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

const uploadToCloudinary = async (imageUrl, product) => {
  try {
    const cleanedUrl = cleanUrl(imageUrl);
    
    console.log(`   📎 Original: ${imageUrl.substring(0, 50)}...`);
    console.log(`   🧹 Cleaned:  ${cleanedUrl.substring(0, 50)}...`);
    
    if (!cleanedUrl || !cleanedUrl.startsWith('http')) {
      return { success: false, error: 'Invalid URL after cleaning' };
    }

    const cleanCategory = (product.category || 'general')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');
    
    const cleanName = `${product.name}-${product.weight || 'default'}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 60);
    
    const publicId = `${cleanCategory}/${cleanName}-${Date.now()}`;

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

    return { success: true, url: result.secure_url, publicId: result.public_id };

  } catch (error) {
    return { success: false, error: error.message };
  }
};

const fixImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('\n🔧 FIXING REMAINING BING IMAGES\n');
    console.log('━'.repeat(60) + '\n');

    // Find all products with Bing URLs
    const bingProducts = await Product.find({
      image: { $regex: /bing\.net/i }
    });

    console.log(`📦 Found ${bingProducts.length} products with Bing URLs\n`);

    if (bingProducts.length === 0) {
      console.log('✅ All images already on Cloudinary!\n');
      process.exit(0);
    }

    let fixed = 0;
    let failed = 0;

    for (let i = 0; i < bingProducts.length; i++) {
      const product = bingProducts[i];
      console.log(`[${i + 1}/${bingProducts.length}] ${product.name} (${product.weight})`);

      const result = await uploadToCloudinary(product.image, product);

      if (result.success) {
        // Update in database
        await Product.findByIdAndUpdate(product._id, {
          image: result.url,
          imagePublicId: result.publicId
        });
        
        console.log(`   ✅ FIXED! New URL: ${result.url.substring(0, 50)}...\n`);
        fixed++;
      } else {
        console.log(`   ❌ FAILED: ${result.error}\n`);
        failed++;
      }

      await sleep(1000);
    }

    console.log('━'.repeat(60));
    console.log(`\n✅ Fixed: ${fixed}`);
    console.log(`❌ Failed: ${failed}\n`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

fixImages();