// check-cloudinary-status.js
// Run: node check-cloudinary-status.js

const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0";

async function checkCloudinaryStatus() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║        🖼️  CLOUDINARY IMAGE STATUS CHECK - JAGAT STORE         ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));

    const allProducts = await Product.find({});
    
    let cloudinaryCount = 0;
    let bingCount = 0;
    let otherUrlCount = 0;
    let noImageCount = 0;
    let brokenUrlCount = 0;

    const failedImages = [];
    const categoryStats = {};

    for (const product of allProducts) {
      const image = product.image || '';
      const category = product.category || 'Unknown';

      // Initialize category stats
      if (!categoryStats[category]) {
        categoryStats[category] = {
          total: 0,
          cloudinary: 0,
          bing: 0,
          other: 0,
          noImage: 0
        };
      }
      categoryStats[category].total++;

      if (!image || image.trim() === '') {
        noImageCount++;
        categoryStats[category].noImage++;
        failedImages.push({
          name: product.name,
          weight: product.weight,
          category: category,
          reason: 'No image URL'
        });
      } else if (image.includes('cloudinary.com')) {
        cloudinaryCount++;
        categoryStats[category].cloudinary++;
      } else if (image.includes('bing.net') || image.includes('tse1.mm') || image.includes('tse2.mm') || image.includes('tse3.mm') || image.includes('tse4.mm')) {
        bingCount++;
        categoryStats[category].bing++;
        failedImages.push({
          name: product.name,
          weight: product.weight,
          category: category,
          reason: 'Bing URL (not uploaded)',
          url: image.substring(0, 60) + '...'
        });
      } else if (image.startsWith('\t') || image.includes('\t')) {
        brokenUrlCount++;
        failedImages.push({
          name: product.name,
          weight: product.weight,
          category: category,
          reason: 'Broken URL (has tab character)',
          url: image.substring(0, 60)
        });
      } else {
        otherUrlCount++;
        categoryStats[category].other++;
      }
    }

    // Print Summary
    console.log('📊 OVERALL SUMMARY');
    console.log('━'.repeat(60));
    console.log(`   📦 Total Products:        ${allProducts.length}`);
    console.log(`   ✅ Cloudinary Images:     ${cloudinaryCount} (${((cloudinaryCount/allProducts.length)*100).toFixed(1)}%)`);
    console.log(`   ⚠️  Bing/External URLs:    ${bingCount} (${((bingCount/allProducts.length)*100).toFixed(1)}%)`);
    console.log(`   🔗 Other URLs:            ${otherUrlCount}`);
    console.log(`   ❌ No Image:              ${noImageCount}`);
    console.log(`   🔴 Broken URLs:           ${brokenUrlCount}`);
    console.log('');

    // Category-wise breakdown
    console.log('\n📂 CATEGORY-WISE BREAKDOWN');
    console.log('━'.repeat(60));
    console.log('Category'.padEnd(25) + 'Total'.padEnd(8) + 'Cloud'.padEnd(8) + 'Bing'.padEnd(8) + 'Other');
    console.log('━'.repeat(60));

    const sortedCategories = Object.entries(categoryStats).sort((a, b) => b[1].total - a[1].total);

    for (const [category, stats] of sortedCategories) {
      const cloudPercent = stats.total > 0 ? ((stats.cloudinary/stats.total)*100).toFixed(0) : 0;
      console.log(
        category.substring(0, 24).padEnd(25) +
        String(stats.total).padEnd(8) +
        `${stats.cloudinary} (${cloudPercent}%)`.padEnd(12) +
        String(stats.bing).padEnd(8) +
        String(stats.other + stats.noImage)
      );
    }

    // Show failed images (first 20)
    if (failedImages.length > 0) {
      console.log('\n\n❌ FAILED/PENDING IMAGES (First 30)');
      console.log('━'.repeat(60));
      
      const showCount = Math.min(30, failedImages.length);
      for (let i = 0; i < showCount; i++) {
        const item = failedImages[i];
        console.log(`${i+1}. ${item.name} (${item.weight})`);
        console.log(`   Category: ${item.category}`);
        console.log(`   Reason: ${item.reason}`);
        if (item.url) console.log(`   URL: ${item.url}`);
        console.log('');
      }

      if (failedImages.length > 30) {
        console.log(`... and ${failedImages.length - 30} more failed images`);
      }
    }

    // Recommendations
    console.log('\n\n💡 RECOMMENDATIONS');
    console.log('━'.repeat(60));
    
    if (bingCount > 0) {
      console.log(`⚠️  ${bingCount} products have Bing URLs - these may break anytime!`);
      console.log('   → Re-run migration script to upload to Cloudinary');
    }
    
    if (brokenUrlCount > 0) {
      console.log(`🔴 ${brokenUrlCount} products have broken URLs (tab characters)`);
      console.log('   → Fix these URLs in database or re-add products');
    }

    if (cloudinaryCount === allProducts.length) {
      console.log('🎉 All images are on Cloudinary! Perfect!');
    }

    await mongoose.disconnect();
    console.log('\n✅ Done!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkCloudinaryStatus();