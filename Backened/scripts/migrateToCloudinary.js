// Backend/scripts/migrateToCloudinary.js
// Run command: node scripts/migrateToCloudinary.js

require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Product Schema (flexible)
const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema);

const migrate = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected\n');

    // Find products with Amazon/external URLs (not yet migrated)
    const products = await Product.find({
      image: { $regex: /amazon|http/, $options: 'i' },
      $or: [
        { imagePublicId: { $exists: false } },
        { imagePublicId: '' },
        { imagePublicId: null }
      ]
    });

    console.log(`📦 Found ${products.length} products to migrate\n`);
    console.log('========================================\n');

    if (products.length === 0) {
      console.log('✅ All images already migrated!');
      process.exit(0);
    }

    let success = 0;
    let failed = 0;
    let skipped = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      
      try {
        const progress = `[${i + 1}/${products.length}]`;
        console.log(`${progress} Processing: ${product.name || 'Unknown'}`);

        // Skip if no valid image URL
        if (!product.image || product.image.startsWith('data:') || product.image.includes('cloudinary')) {
          console.log(`   ⏭️  Skipped (no valid URL or already on Cloudinary)\n`);
          skipped++;
          continue;
        }

        console.log(`   📤 Uploading to Cloudinary...`);

        // Upload to Cloudinary from URL
        const result = await cloudinary.uploader.upload(product.image, {
          folder: 'jagat-store',
          transformation: [
            { width: 500, height: 500, crop: 'limit' },
            { quality: 'auto:good' }
          ],
          timeout: 60000 // 60 second timeout
        });

        // Update product in database
        await Product.findByIdAndUpdate(product._id, {
          image: result.secure_url,
          imagePublicId: result.public_id
        });

        console.log(`   ✅ Done!`);
        console.log(`   🔗 New URL: ${result.secure_url}\n`);
        success++;

        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 500));

      } catch (err) {
        console.log(`   ❌ Failed: ${err.message}\n`);
        failed++;
      }
    }

    console.log('========================================');
    console.log('📊 MIGRATION COMPLETE!\n');
    console.log(`   ✅ Success: ${success}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   📦 Total: ${products.length}`);
    console.log('========================================');

    mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error('❌ Migration Error:', error);
    process.exit(1);
  }
};

// Run migration
console.log('🚀 Starting Cloudinary Migration...\n');
migrate();