// fix-cloudinary-images.js
// Run: node fix-cloudinary-images.js
// This script uploads all Bing/external images to Cloudinary

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

// Settings
const BATCH_SIZE = 20;           // Products per batch
const DELAY_BETWEEN_UPLOADS = 1000;  // 1 second between each upload
const DELAY_BETWEEN_BATCHES = 5000;  // 5 seconds between batches
const MAX_RETRIES = 2;

// Product Schema
const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema);

// Clean URL (remove tab characters, whitespace)
const cleanUrl = (url) => {
  if (!url) return '';
  return url.replace(/^\t+/, '').replace(/\s+/g, '').trim();
};

// Upload to Cloudinary with retry
const uploadToCloudinary = async (imageUrl, product, retryCount = 0) => {
  try {
    const cleanedUrl = cleanUrl(imageUrl);
    
    if (!cleanedUrl || cleanedUrl === '') {
      return { success: false, error: 'Empty URL' };
    }

    // Skip if already Cloudinary
    if (cleanedUrl.includes('cloudinary.com')) {
      return { success: true, url: cleanedUrl, skipped: true };
    }

    // Create public ID
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

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Main function
const fixCloudinaryImages = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║     🖼️  CLOUDINARY IMAGE FIX - JAGAT STORE                     ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    // Check Cloudinary config
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      console.log('❌ Cloudinary credentials not found in .env!');
      process.exit(1);
    }
    console.log(`✅ Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME}`);

    // Find products with non-Cloudinary images
    const allProducts = await Product.find({});
    
    const productsToFix = allProducts.filter(p => {
      const img = p.image || '';
      return img && !img.includes('cloudinary.com');
    });

    console.log(`\n📦 Total Products: ${allProducts.length}`);
    console.log(`⚠️  Products to Fix: ${productsToFix.length}`);
    console.log(`\n🔄 Processing in batches of ${BATCH_SIZE}...\n`);
    console.log('━'.repeat(60));

    let successCount = 0;
    let failCount = 0;
    let skippedCount = 0;

    // Process in batches
    for (let i = 0; i < productsToFix.length; i += BATCH_SIZE) {
      const batch = productsToFix.slice(i, i + BATCH_SIZE);
      const batchNum = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(productsToFix.length / BATCH_SIZE);

      console.log(`\n📦 BATCH ${batchNum}/${totalBatches} (Products ${i + 1}-${Math.min(i + BATCH_SIZE, productsToFix.length)})`);
      console.log('━'.repeat(40));

      for (const product of batch) {
        const productLabel = `${product.name} (${product.weight || 'N/A'})`.substring(0, 50);
        
        process.stdout.write(`   📤 ${productLabel}... `);

        const result = await uploadToCloudinary(product.image, product);

        if (result.success) {
          if (result.skipped) {
            console.log('⏭️ Already Cloudinary');
            skippedCount++;
          } else {
            // Update product in database
            await Product.findByIdAndUpdate(product._id, {
              image: result.url
            });
            console.log('✅ Uploaded!');
            successCount++;
          }
        } else {
          console.log(`❌ Failed: ${result.error}`);
          failCount++;
        }

        // Delay between uploads
        await sleep(DELAY_BETWEEN_UPLOADS);
      }

      // Progress update
      const progress = Math.round(((i + batch.length) / productsToFix.length) * 100);
      console.log(`\n   📊 Progress: ${progress}% | ✅ ${successCount} | ❌ ${failCount}`);

      // Delay between batches
      if (i + BATCH_SIZE < productsToFix.length) {
        console.log(`   ⏳ Waiting ${DELAY_BETWEEN_BATCHES/1000}s before next batch...`);
        await sleep(DELAY_BETWEEN_BATCHES);
      }
    }

    // Final Summary
    console.log('\n\n' + '═'.repeat(60));
    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log('║                    📊 FINAL SUMMARY                            ║');
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log(`║   ✅ Successfully Uploaded:  ${String(successCount).padEnd(30)}║`);
    console.log(`║   ⏭️  Skipped (Already OK):   ${String(skippedCount).padEnd(30)}║`);
    console.log(`║   ❌ Failed:                 ${String(failCount).padEnd(30)}║`);
    console.log(`║   📦 Total Processed:        ${String(productsToFix.length).padEnd(30)}║`);
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    if (failCount > 0) {
      console.log('💡 TIP: Run this script again to retry failed uploads.');
      console.log('   Some images may fail due to source URL issues.\n');
    }

    if (successCount > 0) {
      console.log('🎉 Images uploaded! Check your Cloudinary dashboard.');
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
fixCloudinaryImages();