// migrate_pharmacy_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_pharmacy_IMPROVED.js

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0")
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

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

// ========== PHARMACY PRODUCTS ==========
const pharmacyProducts = [
  // PAIN RELIEF & FEVER
  { name: "Dolo 650mg Tablet", weight: "15 tablets", price: 35, category: "Pharmacy", brand: "Micro Labs", image: "https://m.media-amazon.com/images/I/61YW8mGZy7L._SL1500_.jpg", inStock: true, description: "Paracetamol 650mg for fever and pain relief", stock: 100 },
  { name: "Dolo 800mg Tablet", weight: "15 tablets", price: 35, category: "Pharmacy", brand: "Micro Labs", image: "https://m.media-amazon.com/images/I/61YW8mGZy7L._SL1500_.jpg", inStock: true, description: "Paracetamol 800mg for fever", stock: 95 },
  { name: "Crocin Advance Tablet", weight: "15 tablets", price: 28, category: "Pharmacy", brand: "GSK", image: "https://m.media-amazon.com/images/I/61HPM8vCpOL._SL1500_.jpg", inStock: true, description: "Fast acting paracetamol", stock: 110 },
  { name: "Combiflam Tablet", weight: "20 tablets", price: 42, oldPrice: 48, discount: "13% OFF", category: "Pharmacy", brand: "Sanofi", image: "https://m.media-amazon.com/images/I/61J9pKkZHLL._SL1500_.jpg", inStock: true, description: "Ibuprofen + Paracetamol", stock: 90 },
  { name: "Disprin Tablet", weight: "10 tablets", price: 18, category: "Pharmacy", brand: "Reckitt Benckiser", image: "https://m.media-amazon.com/images/I/61xWnY8DPSL._SL1500_.jpg", inStock: true, description: "Aspirin for quick pain relief", stock: 100 },
  { name: "Nise 100mg Tablet", weight: "10 tablets", price: 35, category: "Pharmacy", brand: "Dr. Reddy's", image: "https://m.media-amazon.com/images/I/51b9q7RCVNL._SL1080_.jpg", inStock: true, description: "Nimesulide for pain", stock: 85 },
  { name: "Brufen 400mg Tablet", weight: "15 tablets", price: 38, category: "Pharmacy", brand: "Abbott", image: "https://m.media-amazon.com/images/I/61SqhYMQ2wL._SL1500_.jpg", inStock: true, description: "Ibuprofen for fever and pain", stock: 95 },
  { name: "Voveran SR 100 Tablet", weight: "10 tablets", price: 52, oldPrice: 60, discount: "13% OFF", category: "Pharmacy", brand: "Novartis", image: "https://m.media-amazon.com/images/I/51pRQnj8b6L._SL1080_.jpg", inStock: true, description: "Diclofenac for severe pain", stock: 75 },
  { name: "Saridon Tablet", weight: "10 tablets", price: 25, category: "Pharmacy", brand: "Piramal", image: "https://m.media-amazon.com/images/I/61dKZS5HCYL._SL1500_.jpg", inStock: true, description: "Fast relief from headache", stock: 105 },

  // COLD & COUGH
  { name: "Vicks Vaporub", weight: "50ml", price: 125, oldPrice: 145, discount: "14% OFF", category: "Pharmacy", brand: "Vicks", image: "https://m.media-amazon.com/images/I/61bNHM8GqJL._SL1500_.jpg", inStock: true, description: "Relief from cold and cough", stock: 80 },
  { name: "Vicks Cough Drops", weight: "20 pcs", price: 49, category: "Pharmacy", brand: "Vicks", image: "https://m.media-amazon.com/images/I/61O6W8pRz6L._SL1500_.jpg", inStock: true, description: "Lozenges for throat relief", stock: 110 },
  { name: "Benadryl Cough Syrup", weight: "100ml", price: 95, category: "Pharmacy", brand: "Johnson & Johnson", image: "https://m.media-amazon.com/images/I/61hgXN7YM4L._SL1500_.jpg", inStock: true, description: "Relief from dry cough", stock: 70 },
  { name: "Chericof Syrup", weight: "100ml", price: 85, category: "Pharmacy", brand: "Mankind", image: "https://m.media-amazon.com/images/I/51z7qV8KNZL._SL1080_.jpg", inStock: true, description: "Herbal cough syrup", stock: 75 },
  { name: "Allegra 120mg Tablet", weight: "10 tablets", price: 155, oldPrice: 175, discount: "11% OFF", category: "Pharmacy", brand: "Sanofi", image: "https://m.media-amazon.com/images/I/61dRQ8vW7KL._SL1500_.jpg", inStock: true, description: "For allergic rhinitis", stock: 65 },
  { name: "Cetrizine 10mg Tablet", weight: "10 tablets", price: 18, category: "Pharmacy", brand: "Generic", image: "https://m.media-amazon.com/images/I/51qJ8gNQ7jL._SL1080_.jpg", inStock: true, description: "Antihistamine for allergy", stock: 100 },
  { name: "Sinarest Tablet", weight: "10 tablets", price: 32, category: "Pharmacy", brand: "Centaur", image: "https://m.media-amazon.com/images/I/61YzXN8QPXL._SL1500_.jpg", inStock: true, description: "Relief from cold symptoms", stock: 90 },
  { name: "Halls Cough Lozenges", weight: "10 pcs", price: 25, category: "Pharmacy", brand: "Halls", image: "https://m.media-amazon.com/images/I/71WV8cJ7gYL._SL1500_.jpg", inStock: true, description: "Soothing throat lozenges", stock: 95 },

  // DIGESTION & STOMACH
  { name: "Eno Fruit Salt", weight: "100g", price: 85, category: "Pharmacy", brand: "GSK", image: "https://m.media-amazon.com/images/I/61K0vQ8pqLL._SL1500_.jpg", inStock: true, description: "Fast relief from acidity", stock: 100 },
  { name: "Digene Antacid Tablet", weight: "15 tablets", price: 28, category: "Pharmacy", brand: "Abbott", image: "https://m.media-amazon.com/images/I/61qQ5cYjVLL._SL1500_.jpg", inStock: true, description: "Relief from gas and acidity", stock: 110 },
  { name: "Pudin Hara Pearls", weight: "10 capsules", price: 25, category: "Pharmacy", brand: "Dabur", image: "https://m.media-amazon.com/images/I/61pRQ9fXS3L._SL1500_.jpg", inStock: true, description: "Ayurvedic stomach relief", stock: 95 },
  { name: "Pantop 40mg Tablet", weight: "15 tablets", price: 145, oldPrice: 165, discount: "12% OFF", category: "Pharmacy", brand: "Aristo", image: "https://m.media-amazon.com/images/I/51bQ7q8NKQL._SL1080_.jpg", inStock: true, description: "Pantoprazole for acidity", stock: 70 },
  { name: "Imodium Tablet", weight: "6 tablets", price: 68, category: "Pharmacy", brand: "Johnson & Johnson", image: "https://m.media-amazon.com/images/I/51pQ7r8NKQL._SL1080_.jpg", inStock: true, description: "Relief from diarrhea", stock: 75 },
  { name: "ORS Powder", weight: "21g Sachet", price: 12, category: "Pharmacy", brand: "Generic", image: "https://m.media-amazon.com/images/I/51qR8s9OLRL._SL1080_.jpg", inStock: true, description: "Oral rehydration salts", stock: 150 },

  // VITAMINS & SUPPLEMENTS
  { name: "Revital H Capsule", weight: "30 capsules", price: 299, oldPrice: 350, discount: "15% OFF", category: "Pharmacy", brand: "Ranbaxy", image: "https://m.media-amazon.com/images/I/61dLZ7S5jyL._SL1500_.jpg", inStock: true, description: "Daily multivitamin", stock: 80 },
  { name: "Becosules Capsule", weight: "20 capsules", price: 45, category: "Pharmacy", brand: "Pfizer", image: "https://m.media-amazon.com/images/I/61cKY6R4ixL._SL1500_.jpg", inStock: true, description: "Vitamin B-complex with C", stock: 90 },
  { name: "Shelcal 500 Tablet", weight: "15 tablets", price: 135, category: "Pharmacy", brand: "Torrent", image: "https://m.media-amazon.com/images/I/61eNZ8S6kzL._SL1500_.jpg", inStock: true, description: "Calcium and Vitamin D3", stock: 85 },
  { name: "Vitamin C Chewable Tablet", weight: "30 tablets", price: 149, category: "Pharmacy", brand: "HealthKart", image: "https://m.media-amazon.com/images/I/71WU8vR0jQL._SL1500_.jpg", inStock: true, description: "Vitamin C 500mg", stock: 75 },
  { name: "Neurobion Forte Tablet", weight: "30 tablets", price: 42, category: "Pharmacy", brand: "P&G", image: "https://m.media-amazon.com/images/I/61fMY7T5lzL._SL1500_.jpg", inStock: true, description: "Vitamin B complex", stock: 95 },
  { name: "Omega 3 Fish Oil Capsule", weight: "60 capsules", price: 449, oldPrice: 549, discount: "18% OFF", category: "Pharmacy", brand: "HealthVit", image: "https://m.media-amazon.com/images/I/71XW9wS1mRL._SL1500_.jpg", inStock: true, description: "Omega 3 for heart health", stock: 60 },

  // DIABETES CARE
  { name: "Dr. Morepen Glucometer Kit", weight: "Kit with 25 strips", price: 799, oldPrice: 999, discount: "20% OFF", category: "Pharmacy", brand: "Dr. Morepen", image: "https://m.media-amazon.com/images/I/61YZ+xU2nRL._SL1500_.jpg", inStock: true, description: "Blood glucose monitoring", stock: 50 },
  { name: "Accu-Chek Active Glucometer", weight: "With 10 strips", price: 1099, oldPrice: 1299, discount: "15% OFF", category: "Pharmacy", brand: "Accu-Chek", image: "https://m.media-amazon.com/images/I/61aA+yV3oSL._SL1500_.jpg", inStock: true, description: "Accurate blood sugar testing", stock: 45 },
  { name: "Glucometer Test Strips", weight: "50 strips", price: 649, category: "Pharmacy", brand: "Dr. Morepen", image: "https://m.media-amazon.com/images/I/61bB+zW4pTL._SL1500_.jpg", inStock: true, description: "Glucose test strips refill", stock: 70 },
  { name: "Diabetic Care Protein Powder", weight: "400g", price: 599, category: "Pharmacy", brand: "Ensure", image: "https://m.media-amazon.com/images/I/61cC+0X5qUL._SL1500_.jpg", inStock: true, description: "Complete nutrition for diabetics", stock: 55 },

  // FIRST AID & HEALTHCARE
  { name: "Band Aid Flexible Fabric", weight: "10 pcs", price: 59, category: "Pharmacy", brand: "Johnson & Johnson", image: "https://m.media-amazon.com/images/I/61dD+1Y6rVL._SL1500_.jpg", inStock: true, description: "Sterile adhesive bandages", stock: 100 },
  { name: "Dettol Antiseptic Liquid", weight: "125ml", price: 75, category: "Pharmacy", brand: "Dettol", image: "https://m.media-amazon.com/images/I/61eE+2Z7sWL._SL1500_.jpg", inStock: true, description: "Antiseptic disinfectant", stock: 90 },
  { name: "Savlon Antiseptic Cream", weight: "30g", price: 45, category: "Pharmacy", brand: "Savlon", image: "https://m.media-amazon.com/images/I/61fF+3a8tXL._SL1500_.jpg", inStock: true, description: "Antiseptic cream", stock: 95 },
  { name: "Cotton Wool Roll", weight: "100g", price: 35, category: "Pharmacy", brand: "Generic", image: "https://m.media-amazon.com/images/I/51gG+4b9uYL._SL1080_.jpg", inStock: true, description: "Absorbent cotton", stock: 110 },
  { name: "Digital Thermometer", weight: "1 unit", price: 149, oldPrice: 199, discount: "25% OFF", category: "Pharmacy", brand: "Dr. Morepen", image: "https://m.media-amazon.com/images/I/61hH+5c0vZL._SL1500_.jpg", inStock: true, description: "Accurate temperature reading", stock: 75 },
  { name: "Blood Pressure Monitor", weight: "1 unit", price: 1299, oldPrice: 1599, discount: "19% OFF", category: "Pharmacy", brand: "Omron", image: "https://m.media-amazon.com/images/I/61iI+6d1wAL._SL1500_.jpg", inStock: true, description: "Automatic BP monitor", stock: 40 },
  { name: "Surgical Face Mask", weight: "50 pcs", price: 199, category: "Pharmacy", brand: "Generic", image: "https://m.media-amazon.com/images/I/61jJ+7e2xBL._SL1500_.jpg", inStock: true, description: "3-ply disposable masks", stock: 120 },
  { name: "Hand Sanitizer", weight: "500ml", price: 149, oldPrice: 199, discount: "25% OFF", category: "Pharmacy", brand: "Dettol", image: "https://m.media-amazon.com/images/I/61kK+8f3yCL._SL1500_.jpg", inStock: true, description: "Alcohol-based sanitizer", stock: 100 }
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n💊 Starting Smart Migration for Pharmacy...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Pharmacy" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of pharmacyProducts) {
      const key = `${productData.name}_${productData.weight}`;
      sourceProductKeys.add(key);
      
      const existingProduct = existingMap.get(key);
      
      if (!existingProduct) {
        await Product.create(productData);
        console.log(`✅ ADDED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
        added++;
      } else {
        const needsUpdate = 
          existingProduct.price !== productData.price ||
          existingProduct.oldPrice !== productData.oldPrice ||
          existingProduct.discount !== productData.discount ||
          existingProduct.image !== productData.image ||
          existingProduct.description !== productData.description ||
          existingProduct.inStock !== productData.inStock ||
          existingProduct.stock !== productData.stock ||
          existingProduct.brand !== productData.brand;
        
        if (needsUpdate) {
          await Product.findByIdAndUpdate(existingProduct._id, productData);
          console.log(`🔄 UPDATED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
          updated++;
        } else {
          console.log(`⏭️  UNCHANGED: ${productData.name} (${productData.weight})`);
          unchanged++;
        }
      }
    }
    
    console.log('\n' + '━'.repeat(60));
    console.log('🗑️  Checking for products to delete...\n');
    
    let deleted = 0;
    for (const existingProduct of existingProducts) {
      const key = `${existingProduct.name}_${existingProduct.weight}`;
      if (!sourceProductKeys.has(key)) {
        await Product.findByIdAndDelete(existingProduct._id);
        console.log(`❌ DELETED: ${existingProduct.name} (${existingProduct.weight})`);
        deleted++;
      }
    }
    
    console.log('\n' + '━'.repeat(60));
    console.log('\n📊 MIGRATION SUMMARY:');
    console.log(`   ✅ Added: ${added}`);
    console.log(`   🔄 Updated: ${updated}`);
    console.log(`   ⏭️  Unchanged: ${unchanged}`);
    console.log(`   ❌ Deleted: ${deleted}`);
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Pharmacy" })}`);
    
    console.log('\n📋 Product Categories:');
    console.log('   💊 Pain Relief & Fever: 9 products');
    console.log('   🤧 Cold & Cough: 8 products');
    console.log('   🍃 Digestion & Stomach: 6 products');
    console.log('   💪 Vitamins & Supplements: 6 products');
    console.log('   🩺 Diabetes Care: 4 products');
    console.log('   🏥 First Aid & Healthcare: 8 products');
    
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();