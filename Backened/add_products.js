/**
 * ╔════════════════════════════════════════════════════════════════╗
 * ║        UNIVERSAL PRODUCT MIGRATION SCRIPT - JAGAT STORE       ║
 * ║                                                                 ║
 * ║   📌 HOW TO USE:                                               ║
 * ║   1. Neeche products array mein apne products add karo         ║
 * ║   2. Terminal mein run karo: node add_products.js              ║
 * ║   3. Done! Products database mein + images Cloudinary par      ║
 * ╚════════════════════════════════════════════════════════════════╝
 */

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

// ═══════════════════════════════════════════════════════════════════
// 🔧 CLOUDINARY CONFIGURATION (Built-in)
// ═══════════════════════════════════════════════════════════════════
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ═══════════════════════════════════════════════════════════════════
// 🎯 YAHAN APNE PRODUCTS ADD KARO - BAS COPY PASTE KARO
// ═══════════════════════════════════════════════════════════════════

const products = [
 



  
    
  



  // -------- YAHAN AUR PRODUCTS ADD KARO --------
  
];

// ═══════════════════════════════════════════════════════════════════
// ⚠️ NEECHE KUCH CHANGE MAT KARNA - YE AUTOMATIC HAI
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
  inStock: { type: Boolean, default: true },
  description: String,
  stock: { type: Number, default: 50 }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Upload image to Cloudinary
const uploadToCloudinary = async (imageUrl, productName, weight, category) => {
  try {
    // Skip if already Cloudinary URL
    if (imageUrl && imageUrl.includes('cloudinary.com')) {
      return { success: true, url: imageUrl, skipped: true };
    }

    // Skip empty URLs
    if (!imageUrl || imageUrl.trim() === '') {
      return { success: false, url: imageUrl, error: 'Empty URL' };
    }

    // Create clean public_id
    const cleanCategory = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const cleanName = `${productName}-${weight}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 80);

    const publicId = `${cleanCategory}/${cleanName}`;

    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: 'jagatstore/products',
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    });

    return { success: true, url: result.secure_url };

  } catch (error) {
    return { success: false, url: imageUrl, error: error.message };
  }
};

// Main migration function
const migrateProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║        🚀 JAGAT STORE - PRODUCT MIGRATION STARTED             ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');
    console.log('✅ MongoDB Connected');
    console.log(`✅ Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME || '❌ NOT SET'}\n`);

    // Check Cloudinary config
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.log('⚠️  WARNING: Cloudinary credentials missing in .env file!');
      console.log('   Products will be added with original image URLs.\n');
    }

    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;
    let cloudinarySuccess = 0;
    let cloudinaryFail = 0;

    console.log(`📦 Total Products to Add: ${products.length}\n`);
    console.log('━'.repeat(60) + '\n');

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const productLabel = `${product.name} (${product.weight})`;

      try {
        // Check if product already exists
        const existingProduct = await Product.findOne({
          name: product.name,
          weight: product.weight,
          brand: product.brand
        });

        if (existingProduct) {
          console.log(`⏭️  [${i + 1}/${products.length}] SKIPPED (Already Exists): ${productLabel}`);
          skipCount++;
          continue;
        }

        // Upload image to Cloudinary
        console.log(`📤 [${i + 1}/${products.length}] Uploading: ${productLabel}...`);
        
        const uploadResult = await uploadToCloudinary(
          product.image,
          product.name,
          product.weight,
          product.category
        );

        // Create new product
        const newProduct = new Product({
          ...product,
          image: uploadResult.url
        });

        await newProduct.save();

        if (uploadResult.success && !uploadResult.skipped) {
          console.log(`✅ [${i + 1}/${products.length}] ADDED + CLOUDINARY: ${productLabel}`);
          console.log(`   📍 ${uploadResult.url}`);
          cloudinarySuccess++;
        } else if (uploadResult.skipped) {
          console.log(`✅ [${i + 1}/${products.length}] ADDED (Already Cloudinary): ${productLabel}`);
          cloudinarySuccess++;
        } else {
          console.log(`⚠️  [${i + 1}/${products.length}] ADDED (Original URL): ${productLabel}`);
          console.log(`   ❌ Cloudinary: ${uploadResult.error}`);
          cloudinaryFail++;
        }
        
        successCount++;

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.log(`❌ [${i + 1}/${products.length}] FAILED: ${productLabel}`);
        console.log(`   Error: ${error.message}`);
        failCount++;
      }

      console.log('');
    }

    // Summary
    console.log('━'.repeat(60));
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║                    📊 MIGRATION SUMMARY                        ║');
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log(`║   ✅ Products Added:       ${successCount.toString().padEnd(34)}║`);
    console.log(`║   ⏭️  Skipped (Existing):   ${skipCount.toString().padEnd(34)}║`);
    console.log(`║   ❌ Failed:               ${failCount.toString().padEnd(34)}║`);
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log(`║   🖼️  Cloudinary Success:   ${cloudinarySuccess.toString().padEnd(34)}║`);
    console.log(`║   ⚠️  Cloudinary Failed:    ${cloudinaryFail.toString().padEnd(34)}║`);
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log(`║   📦 Total Processed:      ${products.length.toString().padEnd(34)}║`);
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

  } catch (error) {
    console.error('❌ Migration Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB Connection Closed\n');
    process.exit(0);
  }
};

// Run migration
migrateProducts();