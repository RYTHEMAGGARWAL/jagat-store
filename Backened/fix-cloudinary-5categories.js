// fix-cloudinary-7categories.js
// Run: node fix-cloudinary-7categories.js
// Fixes images for 7 categories

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const MONGO_URI = process.env.MONGO_URI;

// ⭐ ALL 7 CATEGORIES
const TARGET_CATEGORIES = [
  'Pet Care',
  'Baby Care',
  'Cleaning Essentials',
  'Cleaning',
  'Atta, Rice & Dal',
  'Atta Rice Dal',
  'Atta',
  'Rice',
  'Dal',
  'Masala & Oil',
  'Masala',
  'Oil',
  'Masala Oil',
  'Jagat Store',
  'Personal Care'  // 🆕 ADDED
];

// Settings
const BATCH_SIZE = 20;
const DELAY_BETWEEN_UPLOADS = 1000;
const DELAY_BETWEEN_BATCHES = 5000;
const MAX_RETRIES = 2;

// Product Schema
const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema);

// Clean URL
const cleanUrl = (url) => {
  if (!url) return '';
  return url.replace(/^\t+/, '').replace(/\s+/g, '').trim();
};

// Upload to Cloudinary
const uploadToCloudinary = async (imageUrl, product, retryCount = 0) => {
  try {
    const cleanedUrl = cleanUrl(imageUrl);
    
    if (!cleanedUrl || cleanedUrl === '') {
      return { success: false, error: 'Empty URL' };
    }

    if (cleanedUrl.includes('cloudinary.com')) {
      return { success: true, url: cleanedUrl, skipped: true };
    }

    const cleanCategory = (product.category || 'general').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const cleanName = `${product.name}-${product.weight || 'default'}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 80);
    
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

    return { success: true, url: result.secure_url };

  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      console.log(`   ⏳ Retry ${retryCount + 1}/${MAX_RETRIES}...`);
      await sleep(2000);
      return uploadToCloudinary(imageUrl, product, retryCount + 1);
    }
    return { success: false, error: error.message };
  }
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Main function
const fixCloudinaryImages = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    
    console.log('\n╔══════════════════════════════════════════════════════════════════╗');
    console.log('║   🖼️  CLOUDINARY FIX - 7 CATEGORIES                              ║');
    console.log('╚══════════════════════════════════════════════════════════════════╝\n');

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      console.log('❌ Cloudinary credentials not found in .env!');
      process.exit(1);
    }
    console.log(`✅ Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    
    console.log('\n📁 Target Categories:');
    console.log('   1️⃣  Pet Care');
    console.log('   2️⃣  Baby Care');
    console.log('   3️⃣  Cleaning Essentials');
    console.log('   4️⃣  Atta, Rice & Dal');
    console.log('   5️⃣  Masala & Oil');
    console.log('   6️⃣  Jagat Store');
    console.log('   7️⃣  Personal Care 🆕\n');

    // Find products ONLY from target categories with non-Cloudinary images
    const allProducts = await Product.find({
      category: { $regex: new RegExp(TARGET_CATEGORIES.join('|'), 'i') }
    });
    
    const productsToFix = allProducts.filter(p => {
      const img = p.image || '';
      return img && !img.includes('cloudinary.com');
    });

    // Category breakdown
    const categoryCount = {};
    allProducts.forEach(p => {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });
    
    console.log('📊 Products per Category:');
    Object.keys(categoryCount).sort().forEach(cat => {
      console.log(`   • ${cat}: ${categoryCount[cat]}`);
    });

    console.log(`\n📦 Total in 7 Categories: ${allProducts.length}`);
    console.log(`⚠️  Products to Fix: ${productsToFix.length}`);
    
    if (productsToFix.length === 0) {
      console.log('\n✅ All images are already on Cloudinary! Nothing to fix.');
      await mongoose.connection.close();
      process.exit(0);
    }
    
    console.log(`\n🔄 Processing in batches of ${BATCH_SIZE}...\n`);
    console.log('─'.repeat(60));

    let successCount = 0;
    let failCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < productsToFix.length; i += BATCH_SIZE) {
      const batch = productsToFix.slice(i, i + BATCH_SIZE);
      const batchNum = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(productsToFix.length / BATCH_SIZE);

      console.log(`\n📦 BATCH ${batchNum}/${totalBatches}`);
      console.log('─'.repeat(40));

      for (const product of batch) {
        const productLabel = `${product.name} (${product.weight || 'N/A'})`.substring(0, 45);
        
        process.stdout.write(`   📤 ${productLabel}... `);

        const result = await uploadToCloudinary(product.image, product);

        if (result.success) {
          if (result.skipped) {
            console.log('⭐ Already OK');
            skippedCount++;
          } else {
            await Product.findByIdAndUpdate(product._id, { image: result.url });
            console.log('✅ Done!');
            successCount++;
          }
        } else {
          console.log(`❌ ${result.error}`);
          failCount++;
        }

        await sleep(DELAY_BETWEEN_UPLOADS);
      }

      const progress = Math.round(((i + batch.length) / productsToFix.length) * 100);
      console.log(`\n   📊 Progress: ${progress}% | ✅ ${successCount} | ❌ ${failCount}`);

      if (i + BATCH_SIZE < productsToFix.length) {
        console.log(`   ⏳ Waiting ${DELAY_BETWEEN_BATCHES/1000}s...`);
        await sleep(DELAY_BETWEEN_BATCHES);
      }
    }

    // Summary
    console.log('\n\n' + '═'.repeat(60));
    console.log('╔══════════════════════════════════════════════════════════════════╗');
    console.log('║                    📊 FINAL SUMMARY                              ║');
    console.log('╠══════════════════════════════════════════════════════════════════╣');
    console.log(`║   ✅ Uploaded:    ${String(successCount).padEnd(45)}║`);
    console.log(`║   ⭐ Skipped:     ${String(skippedCount).padEnd(45)}║`);
    console.log(`║   ❌ Failed:      ${String(failCount).padEnd(45)}║`);
    console.log(`║   📦 Total:       ${String(productsToFix.length).padEnd(45)}║`);
    console.log('╚══════════════════════════════════════════════════════════════════╝\n');

    if (failCount > 0) {
      console.log('💡 TIP: Run again to retry failed uploads.\n');
    }

    if (successCount > 0) {
      console.log('🎉 Done! Check Cloudinary dashboard.\n');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('📌 Connection closed.\n');
    process.exit(0);
  }
};

fixCloudinaryImages();