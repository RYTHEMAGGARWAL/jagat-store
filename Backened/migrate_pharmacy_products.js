// migrate_pharmacy_products.js - Add Pharmacy & Healthcare Products
// Place in Backend folder and run: node migrate_pharmacy_products.js

require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jagatstore')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, default: 50 },
  brand: { type: String, default: 'Generic' },
  rating: { type: Number, default: 4.0 },
  reviews: { type: Array, default: [] },
  weight: { type: String, default: '' },
  oldPrice: { type: Number },
  discount: { type: String },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// ============================================
// PHARMACY & HEALTHCARE PRODUCTS (40+ items)
// ============================================

const pharmacyProducts = [
  // ==========================================
  // PAIN RELIEF & FEVER (8 products)
  // ==========================================
  {
    name: "Dolo 650mg Tablet",
    weight: "Strip of 15 tablets",
    price: 35,
    category: "Pharmacy",
    brand: "Micro Labs",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-4_9.png",
    inStock: false,
    description: "Paracetamol 650mg for fever and pain relief"
  },
  {
    name: "Dolo 800mg Tablet",
    weight: "Strip of 15 tablets",
    price: 35,
    category: "Pharmacy",
    brand: "Micro Labs",
    image: 	"https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/0a27b202-9f8e-4374-b0cd-b5d013d801f1.png",
    inStock: false,
    description: "Paracetamol 650mg for fever and pain relief"
  },
  {
    name: "Crocin Advance Tablet",
    weight: "Strip of 15 tablets",
    price: 28,
    category: "Pharmacy",
    brand: "GSK",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/v1606318357/cropped/l97yukjxqqhkhg6r3kgv.png",
    inStock: true,
    description: "Fast acting paracetamol for quick pain relief"
  },
  {
    name: "Combiflam Tablet",
    weight: "Strip of 20 tablets",
    price: 42,
    oldPrice: 48,
    discount: "13% OFF",
    category: "Pharmacy",
    brand: "Sanofi",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/wvvkam3a9zpkhnnxdjmw.png",
    inStock: true,
    description: "Ibuprofen + Paracetamol for pain and inflammation"
  },
  {
    name: "Disprin Tablet",
    weight: "Strip of 10 tablets",
    price: 18,
    category: "Pharmacy",
    brand: "Reckitt Benckiser",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/m4yzkse4r5pxb9s43psx.png",
    inStock: true,
    description: "Aspirin for quick pain relief, dissolves fast"
  },
  {
    name: "Nise 100mg Tablet",
    weight: "Strip of 10 tablets",
    price: 35,
    category: "Pharmacy",
    brand: "Dr. Reddy's",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/nnzkmlwkqgbcb1wrhmiy.png",
    inStock: true,
    description: "Nimesulide for pain and inflammation"
  },
  {
    name: "Brufen 400mg Tablet",
    weight: "Strip of 15 tablets",
    price: 38,
    category: "Pharmacy",
    brand: "Abbott",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/lvjflfjvttgcuxe0yfhg.png",
    inStock: true,
    description: "Ibuprofen for fever, pain and inflammation"
  },
  {
    name: "Voveran SR 100 Tablet",
    weight: "Strip of 10 tablets",
    price: 52,
    oldPrice: 60,
    discount: "13% OFF",
    category: "Pharmacy",
    brand: "Novartis",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/kctxckjwnglqajpavdxe.png",
    inStock: true,
    description: "Diclofenac for severe pain and inflammation"
  },
  {
    name: "Saridon Tablet",
    weight: "Strip of 10 tablets",
    price: 25,
    category: "Pharmacy",
    brand: "Piramal",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/ciwxm3yjknvtvfwfuvpz.png",
    inStock: true,
    description: "Fast relief from headache and body pain"
  },

  // ==========================================
  // COLD & COUGH (8 products)
  // ==========================================
  {
    name: "Vicks Vaporub",
    weight: "50ml",
    price: 125,
    oldPrice: 145,
    discount: "14% OFF",
    category: "Pharmacy",
    brand: "Vicks",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/fbwvgvf2ofvnklpnm9mh.png",
    inStock: true,
    description: "Topical ointment for relief from cold and cough"
  },
  {
    name: "Vicks Cough Drops",
    weight: "Pack of 20",
    price: 49,
    category: "Pharmacy",
    brand: "Vicks",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/g3dj3fwkzkgukclwwyqx.png",
    inStock: true,
    description: "Lozenges for throat relief"
  },
  {
    name: "Benadryl Cough Syrup",
    weight: "100ml",
    price: 95,
    category: "Pharmacy",
    brand: "Johnson & Johnson",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/nolnrw0kqjmjk8djlgew.png",
    inStock: true,
    description: "Relief from dry cough and throat irritation"
  },
  {
    name: "Chericof Syrup",
    weight: "100ml",
    price: 85,
    category: "Pharmacy",
    brand: "Mankind",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/u6frbvnsgip0e5uqs6kq.png",
    inStock: true,
    description: "Herbal cough syrup for all age groups"
  },
  {
    name: "Allegra 120mg Tablet",
    weight: "Strip of 10 tablets",
    price: 155,
    oldPrice: 175,
    discount: "11% OFF",
    category: "Pharmacy",
    brand: "Sanofi",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/vewmrpnrslryikyqfkuz.png",
    inStock: true,
    description: "Fexofenadine for allergic rhinitis and cold"
  },
  {
    name: "Cetrizine 10mg Tablet",
    weight: "Strip of 10 tablets",
    price: 18,
    category: "Pharmacy",
    brand: "Generic",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/xmugzbr3dv7z4wa3qplb.png",
    inStock: true,
    description: "Antihistamine for allergy and cold symptoms"
  },
  {
    name: "Sinarest Tablet",
    weight: "Strip of 10 tablets",
    price: 32,
    category: "Pharmacy",
    brand: "Centaur",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/lpx1pjlrbwujndm4t6ib.png",
    inStock: true,
    description: "Relief from cold, headache and body ache"
  },
  {
    name: "Halls Cough Lozenges",
    weight: "Pack of 10",
    price: 25,
    category: "Pharmacy",
    brand: "Halls",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/fefirb1ydz8gcgxsq4hf.png",
    inStock: true,
    description: "Soothing throat lozenges with menthol"
  },

  // ==========================================
  // DIGESTION & STOMACH (6 products)
  // ==========================================
  {
    name: "Eno Fruit Salt",
    weight: "100g",
    price: 85,
    category: "Pharmacy",
    brand: "GSK",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/kcflgidgv4ndolbvlkfm.png",
    inStock: true,
    description: "Fast relief from acidity and indigestion"
  },
  {
    name: "Digene Antacid Tablet",
    weight: "Strip of 15 tablets",
    price: 28,
    category: "Pharmacy",
    brand: "Abbott",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/h4uytkwojgdhqjqnfp8h.png",
    inStock: true,
    description: "Relief from gas, acidity and indigestion"
  },
  {
    name: "Pudin Hara Pearls",
    weight: "10 capsules",
    price: 25,
    category: "Pharmacy",
    brand: "Dabur",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/jfkhnvzcmb06zrclwyjb.png",
    inStock: true,
    description: "Ayurvedic relief from stomach problems"
  },
  {
    name: "Pantop 40mg Tablet",
    weight: "Strip of 15 tablets",
    price: 145,
    oldPrice: 165,
    discount: "12% OFF",
    category: "Pharmacy",
    brand: "Aristo",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/xoprfzkkmq9k5jqk0jbh.png",
    inStock: true,
    description: "Pantoprazole for acidity and GERD"
  },
  {
    name: "Imodium Tablet",
    weight: "Strip of 6 tablets",
    price: 68,
    category: "Pharmacy",
    brand: "Johnson & Johnson",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/qemscr84k8t5vnv4vnbt.png",
    inStock: true,
    description: "Relief from diarrhea"
  },
  {
    name: "ORS Powder",
    weight: "21g Sachet",
    price: 12,
    category: "Pharmacy",
    brand: "Generic",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/tguoakqmfgd9smm8jhcl.png",
    inStock: true,
    description: "Oral rehydration salts for dehydration"
  },

  // ==========================================
  // VITAMINS & SUPPLEMENTS (6 products)
  // ==========================================
  {
    name: "Revital H Capsule",
    weight: "30 capsules",
    price: 299,
    oldPrice: 350,
    discount: "15% OFF",
    category: "Pharmacy",
    brand: "Ranbaxy",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/ddww6zmyfiwpvqkpjfhv.png",
    inStock: true,
    description: "Daily multivitamin for energy and immunity"
  },
  {
    name: "Becosules Capsule",
    weight: "Strip of 20 capsules",
    price: 45,
    category: "Pharmacy",
    brand: "Pfizer",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/zjmgzzhahcfhshpgnwxv.png",
    inStock: true,
    description: "Vitamin B-complex with Vitamin C"
  },
  {
    name: "Shelcal 500 Tablet",
    weight: "Strip of 15 tablets",
    price: 135,
    category: "Pharmacy",
    brand: "Torrent",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/atpwrgxavbslxhjkvhwu.png",
    inStock: true,
    description: "Calcium and Vitamin D3 supplement"
  },
  {
    name: "Vitamin C Chewable Tablet",
    weight: "30 tablets",
    price: 149,
    category: "Pharmacy",
    brand: "HealthKart",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/xvdklvx1aipfq5eub9ay.png",
    inStock: true,
    description: "Vitamin C 500mg for immunity boost"
  },
  {
    name: "Neurobion Forte Tablet",
    weight: "Strip of 30 tablets",
    price: 42,
    category: "Pharmacy",
    brand: "P&G",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/wuqct0ma3okgdqlcl8cc.png",
    inStock: true,
    description: "Vitamin B complex for nerve health"
  },
  {
    name: "Omega 3 Fish Oil Capsule",
    weight: "60 capsules",
    price: 449,
    oldPrice: 549,
    discount: "18% OFF",
    category: "Pharmacy",
    brand: "HealthVit",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/z8mq5ivuq5lzkk8xxhlx.png",
    inStock: true,
    description: "Omega 3 fatty acids for heart health"
  },

  // ==========================================
  // DIABETES CARE (4 products)
  // ==========================================
  {
    name: "Dr. Morepen Glucometer Kit",
    weight: "Kit with 25 strips",
    price: 799,
    oldPrice: 999,
    discount: "20% OFF",
    category: "Pharmacy",
    brand: "Dr. Morepen",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/dtkrcx06uahlwu25chmh.png",
    inStock: true,
    description: "Blood glucose monitoring system"
  },
  {
    name: "Accu-Chek Active Glucometer",
    weight: "With 10 test strips",
    price: 1099,
    oldPrice: 1299,
    discount: "15% OFF",
    category: "Pharmacy",
    brand: "Accu-Chek",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/o1wnrjszbzg3b4mfdzb1.png",
    inStock: true,
    description: "Accurate blood sugar testing device"
  },
  {
    name: "Glucometer Test Strips",
    weight: "50 strips",
    price: 649,
    category: "Pharmacy",
    brand: "Dr. Morepen",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/0a27b202-9f8e-4374-b0cd-b5d013d801f1.png",
    inStock: true,
    description: "Glucose test strips refill pack"
  },
  {
    name: "Diabetic Care Protein Powder",
    weight: "400g",
    price: 599,
    category: "Pharmacy",
    brand: "Ensure",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/azmtqm9xunbpxxqbcbwg.png",
    inStock: true,
    description: "Complete nutrition for diabetics"
  },

  // ==========================================
  // FIRST AID & HEALTHCARE (8 products)
  // ==========================================
  {
    name: "Band Aid Flexible Fabric",
    weight: "Pack of 10",
    price: 59,
    category: "Pharmacy",
    brand: "Johnson & Johnson",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/gdxduwpnf0b72cwgp0ng.png",
    inStock: true,
    description: "Sterile adhesive bandages"
  },
  {
    name: "Dettol Antiseptic Liquid",
    weight: "125ml",
    price: 75,
    category: "Pharmacy",
    brand: "Dettol",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/vx96okbyyxr4iilrwqfv.png",
    inStock: true,
    description: "Antiseptic disinfectant for cuts and wounds"
  },
  {
    name: "Savlon Antiseptic Cream",
    weight: "30g",
    price: 45,
    category: "Pharmacy",
    brand: "Savlon",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/nqbdagwz5jwohpgmpqxs.png",
    inStock: true,
    description: "Antiseptic cream for minor cuts"
  },
  {
    name: "Cotton Wool Roll",
    weight: "100g",
    price: 35,
    category: "Pharmacy",
    brand: "Generic",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/ppfh0oiudrczoxazstiq.png",
    inStock: true,
    description: "Absorbent cotton for medical use"
  },
  {
    name: "Digital Thermometer",
    weight: "1 unit",
    price: 149,
    oldPrice: 199,
    discount: "25% OFF",
    category: "Pharmacy",
    brand: "Dr. Morepen",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/lwtfmqdwdp5cqp7gxjlb.png",
    inStock: true,
    description: "Quick and accurate temperature reading"
  },
  {
    name: "Blood Pressure Monitor",
    weight: "1 unit",
    price: 1299,
    oldPrice: 1599,
    discount: "19% OFF",
    category: "Pharmacy",
    brand: "Omron",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/yydghlfp8fmwexthbgjg.png",
    inStock: true,
    description: "Automatic BP monitoring device"
  },
  {
    name: "Surgical Face Mask",
    weight: "Pack of 50",
    price: 199,
    category: "Pharmacy",
    brand: "Generic",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/dmwlsgwcjdhngppvq6yr.png",
    inStock: true,
    description: "3-ply disposable face masks"
  },
  {
    name: "Hand Sanitizer",
    weight: "500ml",
    price: 149,
    oldPrice: 199,
    discount: "25% OFF",
    category: "Pharmacy",
    brand: "Dettol",
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/qwertyghjklzxcvbnm12.png",
    inStock: true,
    description: "Alcohol-based hand sanitizer"
  },
];

// Migration function
const migratePharmacyProducts = async () => {
  try {
    console.log('\n🚀 Starting Pharmacy Products Migration...\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const existingCount = await Product.countDocuments({ category: "Pharmacy" });
    console.log(`📦 Existing Pharmacy products: ${existingCount}`);
    
    console.log(`📊 New products to add: ${pharmacyProducts.length}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    let addedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    // Group by subcategory
    const categories = {
      'Pain Relief': 0,
      'Cold & Cough': 0,
      'Digestion': 0,
      'Vitamins': 0,
      'Diabetes Care': 0,
      'First Aid': 0
    };
    
    for (const productData of pharmacyProducts) {
      try {
        // Check if product already exists
        const existing = await Product.findOne({ 
          name: productData.name,
          weight: productData.weight,
          category: "Pharmacy"
        });
        
        if (existing) {
          console.log(`⏭️  Skipped: ${productData.name} (${productData.weight})`);
          skippedCount++;
        } else {
          const product = new Product({
            ...productData,
            stock: productData.inStock ? 50 : 0,
            description: productData.description || `${productData.name} - ${productData.weight}`
          });
          
          await product.save();
          console.log(`✅ Added: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
          addedCount++;
        }
      } catch (error) {
        console.error(`❌ Error: ${productData.name} - ${error.message}`);
        errorCount++;
      }
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🎉 MIGRATION COMPLETE!\n');
    console.log('📊 Summary:');
    console.log(`   ✅ Added: ${addedCount} products`);
    console.log(`   ⏭️  Skipped: ${skippedCount} products (already exist)`);
    console.log(`   ❌ Errors: ${errorCount} products`);
    console.log(`   📦 Total Pharmacy products: ${await Product.countDocuments({ category: "Pharmacy" })}`);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    console.log('\n📋 Product Categories:');
    console.log('   💊 Pain Relief & Fever: 8 products');
    console.log('   🤧 Cold & Cough: 8 products');
    console.log('   🍃 Digestion & Stomach: 6 products');
    console.log('   💪 Vitamins & Supplements: 6 products');
    console.log('   🩺 Diabetes Care: 4 products');
    console.log('   🏥 First Aid & Healthcare: 8 products');
    
    console.log('\n✅ Pharmacy products added successfully!');
    console.log('🚀 Next steps:');
    console.log('   1. Restart backend server');
    console.log('   2. Visit /Pharmacy page');
    console.log('   3. Products should appear automatically\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration Error:', error);
    process.exit(1);
  }
};

// Run migration
console.log('\n╔═══════════════════════════════════════════╗');
console.log('║   PHARMACY PRODUCTS MIGRATION             ║');
console.log('║   JagatStore - Healthcare Essentials      ║');
console.log('╚═══════════════════════════════════════════╝\n');

migratePharmacyProducts();