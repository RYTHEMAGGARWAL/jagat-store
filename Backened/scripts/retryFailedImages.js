// Backend/scripts/retryFailedImages.js
// Run: node scripts/retryFailedImages.js

require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Product Schema
const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema);

// Default placeholder image
const PLACEHOLDER_URL = "https://res.cloudinary.com/dvvlsytlf/image/upload/v1/jagat-store/placeholder.jpg";

const retryFailed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected\n');

    // Find products still having Amazon URLs (failed ones)
    const failedProducts = await Product.find({
      image: { $regex: /amazon|http/, $options: 'i' },
      image: { $not: /cloudinary/ }
    });

    console.log(`📦 Found ${failedProducts.length} failed products\n`);

    if (failedProducts.length === 0) {
      console.log('🎉 All images already migrated! Nothing to retry.');
      process.exit(0);
    }

    let success = 0;
    let failed = 0;
    const failedList = [];

    for (let i = 0; i < failedProducts.length; i++) {
      const product = failedProducts[i];
      const progress = `[${i + 1}/${failedProducts.length}]`;
      
      console.log(`${progress} Retrying: ${product.name || 'Unknown'}`);
      console.log(`   Old URL: ${product.image}`);

      try {
        // Try uploading with longer timeout
        const result = await cloudinary.uploader.upload(product.image, {
          folder: 'jagat-store',
          transformation: [
            { width: 500, height: 500, crop: 'limit' },
            { quality: 'auto:good' }
          ],
          timeout: 120000, // 2 minute timeout
          resource_type: 'image'
        });

        await Product.findByIdAndUpdate(product._id, {
          image: result.secure_url,
          imagePublicId: result.public_id
        });

        console.log(`   ✅ Success!`);
        console.log(`   New URL: ${result.secure_url}\n`);
        success++;

        await new Promise(r => setTimeout(r, 1000)); // 1 sec delay

      } catch (err) {
        console.log(`   ❌ Failed again: ${err.message}`);
        
        // Option: Set placeholder for failed images
        // Uncomment below lines if you want to set placeholder
        /*
        await Product.findByIdAndUpdate(product._id, {
          image: PLACEHOLDER_URL,
          imagePublicId: 'jagat-store/placeholder'
        });
        console.log(`   📷 Set placeholder image instead\n`);
        */
        
        failedList.push({
          id: product._id,
          name: product.name,
          oldUrl: product.image,
          error: err.message
        });
        
        failed++;
        console.log('\n');
      }
    }

    console.log('========================================');
    console.log('📊 RETRY COMPLETE!\n');
    console.log(`   ✅ Success: ${success}`);
    console.log(`   ❌ Still Failed: ${failed}`);
    console.log('========================================\n');

    if (failedList.length > 0) {
      console.log('📋 FAILED PRODUCTS LIST (Manual upload required):\n');
      failedList.forEach((item, idx) => {
        console.log(`${idx + 1}. ${item.name}`);
        console.log(`   ID: ${item.id}`);
        console.log(`   URL: ${item.oldUrl}`);
        console.log(`   Error: ${item.error}\n`);
      });
    }

    mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

console.log('🔄 Retrying Failed Images...\n');
retryFailed();