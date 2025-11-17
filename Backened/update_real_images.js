// update_real_images.js - Add Real Working Image URLs
require('dotenv').config();
const mongoose = require('mongoose');

console.log('\n🖼️  UPDATING PHARMACY PRODUCTS WITH REAL IMAGES\n');

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0")
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  });

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  category: String
});

const Product = mongoose.model('Product', productSchema);

// Real working image URLs from reliable CDNs
const imageUpdates = {
  // Pain Relief Medicines
  "Dolo 650mg Tablet": "https://5.imimg.com/data5/SELLER/Default/2023/1/HS/DN/LR/7897167/dolo-650-tablet.jpg",
  "Crocin Advance Tablet": "https://www.netmeds.com/images/product-v1/600x600/11051/crocin_advance_tablet_15s_0.jpg",
  "Combiflam Tablet": "https://www.netmeds.com/images/product-v1/600x600/13481/combiflam_tablet_20s_0.jpg",
  "Disprin Tablet": "https://www.netmeds.com/images/product-v1/600x600/1065476/disprin_tablet_100s_0_2.jpg",
  "Brufen 400mg Tablet": "https://www.netmeds.com/images/product-v1/600x600/323960/brufen_400_tablet_15s_0_1.jpg",
  
  // Cold & Cough
  "Vicks Vaporub": "https://www.netmeds.com/images/product-v1/600x600/37566/vicks_vaporub_50ml_0_2.jpg",
  "Benadryl Cough Syrup": "https://www.netmeds.com/images/product-v1/600x600/1121635/benadryl_dr_syrup_150_ml_0_3.jpg",
  "Sinarest Tablet": "https://www.netmeds.com/images/product-v1/600x600/1123142/sinarest_new_tablet_10s_0_3.jpg",
  
  // Vitamins & Supplements
  "Revital H Capsule": "https://www.netmeds.com/images/product-v1/600x600/323766/revital_h_capsule_30s_0_2.jpg",
  "Supradyn Daily Tablet": "https://www.netmeds.com/images/product-v1/600x600/913324/supradyn_daily_multivitamin_tablet_15s_0_1.jpg",
  
  // Digestion
  "Gelusil Tablet": "https://www.netmeds.com/images/product-v1/600x600/51143/gelusil_mps_tablet_20s_0_2.jpg",
  "Pudin Hara": "https://www.netmeds.com/images/product-v1/600x600/24125/pudin_hara_active_liquid_30_ml_0_2.jpg",
  
  // First Aid
  "Dettol Antiseptic Liquid": "https://www.netmeds.com/images/product-v1/600x600/21365/dettol_antiseptic_liquid_125_ml_0_0.jpg",
  "Savlon Antiseptic Cream": "https://www.netmeds.com/images/product-v1/600x600/1096843/savlon_antiseptic_cream_60_gm_0_2.jpg",
  "Band Aid": "https://www.netmeds.com/images/product-v1/600x600/1110856/band_aid_flexible_fabric_adhesive_bandages_10s_0.jpg",
  
  // Diabetes Care
  "Sugar Free Gold": "https://www.netmeds.com/images/product-v1/600x600/327172/sugar_free_gold_low_calorie_sweetener_500_pellets_0_0.jpg"
};

async function updateRealImages() {
  try {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    let updated = 0;
    let notFound = 0;
    
    for (const [productName, imageUrl] of Object.entries(imageUpdates)) {
      try {
        const result = await Product.updateMany(
          { 
            name: { $regex: productName, $options: 'i' },
            category: 'Pharmacy'
          },
          { 
            $set: { image: imageUrl }
          }
        );
        
        if (result.modifiedCount > 0) {
          console.log(`✅ Updated: ${productName}`);
          console.log(`   Image: ${imageUrl.substring(0, 50)}...`);
          updated += result.modifiedCount;
        } else {
          console.log(`⏭️  Not found: ${productName}`);
          notFound++;
        }
      } catch (error) {
        console.log(`❌ Error updating ${productName}: ${error.message}`);
      }
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📊 Summary:');
    console.log(`   ✅ Updated: ${updated} products`);
    console.log(`   ⏭️  Not found: ${notFound} products`);
    
    console.log('\n💡 For remaining products without images:');
    console.log('   They will show placeholder until you add real images\n');
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ Update Complete!');
    console.log('🔄 Restart frontend to see changes\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateRealImages();