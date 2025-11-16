// migrate_jagat_store_products.js - Jagat Store Exclusive Category
// Save in Backend folder and run: node migrate_jagat_store_products.js

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
  brand: { type: String, default: 'Jagat Store' },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Array, default: [] },
  weight: { type: String, default: '' },
  oldPrice: { type: Number },
  discount: { type: String },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// ============================================
// JAGAT STORE EXCLUSIVE PRODUCTS (50+ items)
// ============================================

const jagatStoreProducts = [
  // ==========================================
  // FRESH VEGETABLES (10 products)
  // ==========================================
  {
    name: "Fresh Tomato",
    weight: "500 gm",
    price: 25,
    oldPrice: 30,
    discount: "17% OFF",
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-6_5.png",
    inStock: true,
    description: "Fresh red tomatoes, locally sourced"
  },
  {
    name: "Fresh Onion",
    weight: "1 kg",
    price: 35,
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000206_9.jpg",
    inStock: true,
    description: "Premium quality onions"
  },
  {
    name: "Fresh Potato",
    weight: "1 kg",
    price: 30,
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000141_9.jpg",
    inStock: true,
    description: "Farm fresh potatoes"
  },
  {
    name: "Green Capsicum",
    weight: "250 gm",
    price: 28,
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000143_9.jpg",
    inStock: true,
    description: "Fresh green bell peppers"
  },
  {
    name: "Fresh Cucumber",
    weight: "500 gm",
    price: 20,
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000144_9.jpg",
    inStock: true,
    description: "Crispy fresh cucumbers"
  },
  {
    name: "Fresh Carrot",
    weight: "500 gm",
    price: 35,
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000151_9.jpg",
    inStock: true,
    description: "Healthy orange carrots"
  },
  {
    name: "Fresh Spinach (Palak)",
    weight: "250 gm",
    price: 18,
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000157_9.jpg",
    inStock: true,
    description: "Fresh green spinach leaves"
  },
  {
    name: "Fresh Coriander Leaves",
    weight: "100 gm",
    price: 12,
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000158_9.jpg",
    inStock: true,
    description: "Fresh dhania patta"
  },
  {
    name: "Fresh Ginger",
    weight: "250 gm",
    price: 45,
    oldPrice: 55,
    discount: "18% OFF",
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000201_9.jpg",
    inStock: true,
    description: "Premium quality ginger (adrak)"
  },
  {
    name: "Fresh Green Chilli",
    weight: "100 gm",
    price: 15,
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000146_9.jpg",
    inStock: true,
    description: "Spicy green chillies (hari mirch)"
  },

  // ==========================================
  // FRESH FRUITS (10 products)
  // ==========================================
  {
    name: "Fresh Banana",
    weight: "6 pieces",
    price: 42,
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000025_9.jpg",
    inStock: true,
    description: "Ripe yellow bananas (kela)"
  },
  {
    name: "Fresh Apple - Royal Gala",
    weight: "4 pieces (approx 500gm)",
    price: 120,
    oldPrice: 145,
    discount: "17% OFF",
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000263_9.jpg",
    inStock: true,
    description: "Premium quality apples (seb)"
  },
  {
    name: "Fresh Orange",
    weight: "1 kg",
    price: 80,
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000265_9.jpg",
    inStock: true,
    description: "Juicy fresh oranges (santra)"
  },
  {
    name: "Fresh Pomegranate",
    weight: "2 pieces (approx 500gm)",
    price: 150,
    oldPrice: 180,
    discount: "17% OFF",
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000269_9.jpg",
    inStock: true,
    description: "Sweet pomegranate (anar)"
  },
  {
    name: "Fresh Papaya",
    weight: "1 piece (approx 800gm)",
    price: 55,
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000270_9.jpg",
    inStock: true,
    description: "Ripe papaya (papita)"
  },
  {
    name: "Fresh Watermelon",
    weight: "1 piece (approx 3-4kg)",
    price: 45,
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000277_9.jpg",
    inStock: true,
    description: "Sweet red watermelon (tarbooz)"
  },
  {
    name: "Fresh Mango - Alphonso",
    weight: "6 pieces (approx 1kg)",
    price: 299,
    oldPrice: 349,
    discount: "14% OFF",
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000279_9.jpg",
    inStock: true,
    description: "Premium Alphonso mangoes (aam)"
  },
  {
    name: "Fresh Grapes - Green",
    weight: "500 gm",
    price: 85,
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000266_9.jpg",
    inStock: true,
    description: "Seedless green grapes (angoor)"
  },
  {
    name: "Fresh Kiwi",
    weight: "3 pieces",
    price: 99,
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000268_9.jpg",
    inStock: true,
    description: "Fresh kiwi fruits"
  },
  {
    name: "Fresh Pineapple",
    weight: "1 piece (approx 1kg)",
    price: 65,
    category: "Jagat Store",
    brand: "Jagat Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10000271_9.jpg",
    inStock: true,
    description: "Sweet pineapple (ananas)"
  },

  // ==========================================
  // PACKAGED FOODS (10 products)
  // ==========================================
  {
    name: "Jagat Special Namkeen Mix",
    weight: "400 gm",
    price: 89,
    oldPrice: 110,
    discount: "19% OFF",
    category: "Jagat Store",
    brand: "Jagat Foods",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/482725_a.jpg",
    inStock: true,
    description: "Crispy namkeen mixture"
  },
  {
    name: "Jagat Roasted Peanuts",
    weight: "500 gm",
    price: 75,
    category: "Jagat Store",
    brand: "Jagat Foods",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/447840_a.jpg",
    inStock: true,
    description: "Lightly salted roasted moongfali"
  },
  {
    name: "Jagat Poha Thick",
    weight: "1 kg",
    price: 55,
    category: "Jagat Store",
    brand: "Jagat Foods",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10531_a.jpg",
    inStock: true,
    description: "Premium quality thick poha"
  },
  {
    name: "Jagat Besan (Gram Flour)",
    weight: "1 kg",
    price: 95,
    category: "Jagat Store",
    brand: "Jagat Foods",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10200_a.jpg",
    inStock: true,
    description: "Pure gram flour for pakoras"
  },
  {
    name: "Jagat Sooji (Rava)",
    weight: "500 gm",
    price: 42,
    category: "Jagat Store",
    brand: "Jagat Foods",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10533_a.jpg",
    inStock: true,
    description: "Fine quality semolina"
  },
  {
    name: "Jagat Maida (All Purpose Flour)",
    weight: "1 kg",
    price: 48,
    category: "Jagat Store",
    brand: "Jagat Foods",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10201_a.jpg",
    inStock: true,
    description: "Refined wheat flour"
  },
  {
    name: "Jagat Roasted Chana",
    weight: "500 gm",
    price: 65,
    category: "Jagat Store",
    brand: "Jagat Foods",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/447841_a.jpg",
    inStock: true,
    description: "Healthy roasted chickpeas snack"
  },
  {
    name: "Jagat Cornflakes",
    weight: "800 gm",
    price: 149,
    oldPrice: 175,
    discount: "15% OFF",
    category: "Jagat Store",
    brand: "Jagat Foods",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481698_a.jpg",
    inStock: true,
    description: "Crispy breakfast cornflakes"
  },
  {
    name: "Jagat Oats",
    weight: "1 kg",
    price: 165,
    oldPrice: 190,
    discount: "13% OFF",
    category: "Jagat Store",
    brand: "Jagat Foods",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10534_a.jpg",
    inStock: true,
    description: "Healthy rolled oats"
  },
  {
    name: "Jagat Vermicelli (Seviyaan)",
    weight: "400 gm",
    price: 45,
    category: "Jagat Store",
    brand: "Jagat Foods",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10535_a.jpg",
    inStock: true,
    description: "Roasted vermicelli for kheer"
  },

  // ==========================================
  // BEVERAGES (10 products)
  // ==========================================
  {
    name: "Jagat Fresh Juice - Orange",
    weight: "1 Litre",
    price: 120,
    oldPrice: 145,
    discount: "17% OFF",
    category: "Jagat Store",
    brand: "Jagat Beverages",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481699_a.jpg",
    inStock: true,
    description: "Fresh orange juice, no preservatives"
  },
  {
    name: "Jagat Fresh Juice - Mixed Fruit",
    weight: "1 Litre",
    price: 115,
    category: "Jagat Store",
    brand: "Jagat Beverages",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481700_a.jpg",
    inStock: true,
    description: "Blend of fresh fruits"
  },
  {
    name: "Jagat Lassi - Sweet",
    weight: "500 ml",
    price: 45,
    category: "Jagat Store",
    brand: "Jagat Dairy",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481701_a.jpg",
    inStock: true,
    description: "Traditional sweet lassi"
  },
  {
    name: "Jagat Buttermilk (Chaas)",
    weight: "500 ml",
    price: 25,
    category: "Jagat Store",
    brand: "Jagat Dairy",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481702_a.jpg",
    inStock: true,
    description: "Fresh spiced buttermilk"
  },
  {
    name: "Jagat Premium Tea",
    weight: "500 gm",
    price: 185,
    oldPrice: 220,
    discount: "16% OFF",
    category: "Jagat Store",
    brand: "Jagat Beverages",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10536_a.jpg",
    inStock: true,
    description: "Premium quality loose tea leaves"
  },
  {
    name: "Jagat Green Tea",
    weight: "100 Tea Bags",
    price: 299,
    oldPrice: 349,
    discount: "14% OFF",
    category: "Jagat Store",
    brand: "Jagat Beverages",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481703_a.jpg",
    inStock: true,
    description: "Healthy green tea bags"
  },
  {
    name: "Jagat Instant Coffee",
    weight: "100 gm",
    price: 145,
    category: "Jagat Store",
    brand: "Jagat Beverages",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10537_a.jpg",
    inStock: true,
    description: "Rich instant coffee powder"
  },
  {
    name: "Jagat Coconut Water",
    weight: "500 ml",
    price: 55,
    category: "Jagat Store",
    brand: "Jagat Beverages",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481704_a.jpg",
    inStock: true,
    description: "Natural coconut water (nariyal pani)"
  },
  {
    name: "Jagat Mango Drink",
    weight: "1 Litre",
    price: 95,
    category: "Jagat Store",
    brand: "Jagat Beverages",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481705_a.jpg",
    inStock: true,
    description: "Refreshing mango flavored drink"
  },
  {
    name: "Jagat Lemonade",
    weight: "750 ml",
    price: 65,
    category: "Jagat Store",
    brand: "Jagat Beverages",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481706_a.jpg",
    inStock: true,
    description: "Fresh lemon drink (nimbu pani)"
  },

  // ==========================================
  // HOUSEHOLD ESSENTIALS (10 products)
  // ==========================================
  {
    name: "Jagat Detergent Powder",
    weight: "2 kg",
    price: 249,
    oldPrice: 299,
    discount: "17% OFF",
    category: "Jagat Store",
    brand: "Jagat Home",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10538_a.jpg",
    inStock: true,
    description: "Powerful cleaning detergent"
  },
  {
    name: "Jagat Dishwash Liquid",
    weight: "1 Litre",
    price: 125,
    category: "Jagat Store",
    brand: "Jagat Home",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481707_a.jpg",
    inStock: true,
    description: "Grease cutting dishwash gel"
  },
  {
    name: "Jagat Floor Cleaner",
    weight: "1 Litre",
    price: 99,
    oldPrice: 120,
    discount: "18% OFF",
    category: "Jagat Store",
    brand: "Jagat Home",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481708_a.jpg",
    inStock: true,
    description: "Multi-purpose floor cleaner"
  },
  {
    name: "Jagat Toilet Cleaner",
    weight: "1 Litre",
    price: 115,
    category: "Jagat Store",
    brand: "Jagat Home",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481709_a.jpg",
    inStock: true,
    description: "Powerful toilet bowl cleaner"
  },
  {
    name: "Jagat Phenyl",
    weight: "1 Litre",
    price: 65,
    category: "Jagat Store",
    brand: "Jagat Home",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10539_a.jpg",
    inStock: true,
    description: "Disinfectant floor cleaner"
  },
  {
    name: "Jagat Garbage Bags",
    weight: "Pack of 30 (Large)",
    price: 89,
    category: "Jagat Store",
    brand: "Jagat Home",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481710_a.jpg",
    inStock: true,
    description: "Strong dustbin bags"
  },
  {
    name: "Jagat Naphthalene Balls",
    weight: "200 gm",
    price: 45,
    category: "Jagat Store",
    brand: "Jagat Home",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10540_a.jpg",
    inStock: true,
    description: "Moth repellent balls (kapoor)"
  },
  {
    name: "Jagat Air Freshener",
    weight: "300 ml",
    price: 135,
    oldPrice: 160,
    discount: "16% OFF",
    category: "Jagat Store",
    brand: "Jagat Home",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481711_a.jpg",
    inStock: true,
    description: "Room freshener spray"
  },
  {
    name: "Jagat Mosquito Coil",
    weight: "Pack of 10",
    price: 55,
    category: "Jagat Store",
    brand: "Jagat Home",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10541_a.jpg",
    inStock: true,
    description: "Mosquito repellent coils"
  },
  {
    name: "Jagat Scrub Pad",
    weight: "Pack of 6",
    price: 49,
    category: "Jagat Store",
    brand: "Jagat Home",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481712_a.jpg",
    inStock: true,
    description: "Kitchen scrubbing pads"
  },
];

// Migration function
const migrateJagatStore = async () => {
  try {
    console.log('\n🏪 Starting Jagat Store Products Migration...\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const existingCount = await Product.countDocuments({ category: "Jagat Store" });
    console.log(`📦 Existing Jagat Store products: ${existingCount}`);
    
    console.log(`📊 New products to add: ${jagatStoreProducts.length}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    let addedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    for (const productData of jagatStoreProducts) {
      try {
        const existing = await Product.findOne({ 
          name: productData.name,
          weight: productData.weight,
          category: "Jagat Store"
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
    console.log(`   ⏭️  Skipped: ${skippedCount} products`);
    console.log(`   ❌ Errors: ${errorCount} products`);
    console.log(`   📦 Total Jagat Store products: ${await Product.countDocuments({ category: "Jagat Store" })}`);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    console.log('\n📋 Product Categories:');
    console.log('   🥬 Fresh Vegetables: 10 products');
    console.log('   🍎 Fresh Fruits: 10 products');
    console.log('   🍱 Packaged Foods: 10 products');
    console.log('   🥤 Beverages: 10 products');
    console.log('   🧹 Household Essentials: 10 products');
    
    console.log('\n✅ Jagat Store products added successfully!');
    console.log('🚀 Next steps:');
    console.log('   1. Create JagatStore.jsx component');
    console.log('   2. Add route in App.jsx');
    console.log('   3. Update FirstContainer main banner link');
    console.log('   4. Restart backend & frontend\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration Error:', error);
    process.exit(1);
  }
};

// Run migration
console.log('\n╔═══════════════════════════════════════════╗');
console.log('║   JAGAT STORE PRODUCTS MIGRATION          ║');
console.log('║   Exclusive Products - Own Brand          ║');
console.log('╚═══════════════════════════════════════════╝\n');

migrateJagatStore();