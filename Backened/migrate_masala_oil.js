// migrate_masala_oil.js - Masala & Oil Products Migration
// Save in Backend folder and run: node migrate_masala_oil.js

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jagatstore')
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

const masalaOilProducts = [
  // OILS
  { name: "Nature Fresh Refined Soyabean Oil Pouch", weight: "1 Litre", price: 140, category: "Masala Oil", brand: "Nature Fresh", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/7b1c5a2e-3469-460d-b2c6-0d9dd5f72a36.png", inStock: true, description: "Refined soyabean cooking oil" },
  { name: "Nature Fresh Refined Soyabean Oil Can", weight: "5 Litre", price: 730, oldPrice: 800, discount: "9% OFF", category: "Masala Oil", brand: "Nature Fresh", image: "https://tse4.mm.bing.net/th/id/OIP.vHobBjz21taAyqOQkQbkkQAAAA?pid=Api&P=0&h=180", inStock: true, description: "Large can soyabean oil" },
  { name: "Nature Fresh Mustard(Sarso) Oil Can", weight: "5 Litre", price: 925, oldPrice: 985, discount: "6% OFF", category: "Masala Oil", brand: "Nature Fresh", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/68e76b8d-7a21-4b08-9b8c-92ff34d030ce.png", inStock: true, description: "Pure mustard oil large can" },
  { name: "Nature Fresh Mustard(Sarso) Oil Pouch", weight: "1 Litre", price: 180, category: "Masala Oil", brand: "Nature Fresh", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/767b30c2-15db-41bc-8386-e22acffc47d2.png", inStock: true, description: "Pure mustard oil pouch" },
  { name: "Nature Fresh SunFlower Refined Oil", weight: "1 Litre", price: 170, category: "Masala Oil", brand: "Nature Fresh", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/fc364f75-d80d-46e4-92c9-42bdd6093006.png", inStock: true, description: "Light sunflower oil" },
  { name: "Fortune Refined Soyabean Oil Pouch", weight: "1 Litre", price: 140, category: "Masala Oil", brand: "Fortune", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/da/cms-assets/cms/product/7190517b-4ae9-4e86-a8c7-4cf71544c7ed.jpg", inStock: true, description: "Refined soyabean oil" },
  { name: "Fortune Mustard(Sarso) Oil Can", weight: "5 Litre", price: 840, oldPrice: 985, discount: "15% OFF", category: "Masala Oil", brand: "Fortune", image: "https://tse2.mm.bing.net/th/id/OIP.VM1DY6rXC4ARZk1DQAT7hwHaHa?pid=Api&P=0&h=180", inStock: true, description: "Premium mustard oil" },
  { name: "Fortune Sunflower Oil", weight: "1 Litre", price: 175, category: "Masala Oil", brand: "Fortune", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/sunflower123.png", inStock: true, description: "Pure sunflower oil" },
  { name: "Dhara Mustard Oil", weight: "1 Litre", price: 185, category: "Masala Oil", brand: "Dhara", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/dhara456.png", inStock: true, description: "Kachi ghani mustard oil" },
  { name: "Saffola Gold Oil", weight: "1 Litre", price: 220, oldPrice: 240, discount: "8% OFF", category: "Masala Oil", brand: "Saffola", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/saffola789.png", inStock: true, description: "Healthy blended oil" },
  
  // MASALAS
  { name: "MDH Chana Masala", weight: "100g", price: 65, category: "Masala Oil", brand: "MDH", image: "https://m.media-amazon.com/images/I/71YqMZJOH1L._SX679_.jpg", inStock: true, description: "Authentic chana masala spice" },
  { name: "MDH Garam Masala", weight: "100g", price: 70, category: "Masala Oil", brand: "MDH", image: "https://m.media-amazon.com/images/I/71d8KpqYCxL._SX679_.jpg", inStock: true, description: "Traditional garam masala blend" },
  { name: "MDH Chicken Masala", weight: "100g", price: 72, category: "Masala Oil", brand: "MDH", image: "https://m.media-amazon.com/images/I/71chicken123.jpg", inStock: true, description: "Special chicken masala" },
  { name: "MDH Kashmiri Mirch", weight: "100g", price: 68, category: "Masala Oil", brand: "MDH", image: "https://m.media-amazon.com/images/I/71kashmiri456.jpg", inStock: true, description: "Bright red chilli powder" },
  { name: "Everest Turmeric Powder", weight: "200g", price: 85, category: "Masala Oil", brand: "Everest", image: "https://m.media-amazon.com/images/I/71VqL8RJUSL._SX679_.jpg", inStock: true, description: "Pure turmeric powder" },
  { name: "Everest Red Chilli Powder", weight: "200g", price: 90, category: "Masala Oil", brand: "Everest", image: "https://m.media-amazon.com/images/I/71gX7RqLJfL._SX679_.jpg", inStock: true, description: "Spicy red chilli powder" },
  { name: "Everest Garam Masala", weight: "100g", price: 75, category: "Masala Oil", brand: "Everest", image: "https://m.media-amazon.com/images/I/71everest789.jpg", inStock: true, description: "Aromatic garam masala" },
  { name: "Everest Coriander Powder", weight: "200g", price: 80, category: "Masala Oil", brand: "Everest", image: "https://m.media-amazon.com/images/I/71coriander123.jpg", inStock: true, description: "Fresh coriander powder" },
  { name: "Catch Chat Masala", weight: "100g", price: 55, category: "Masala Oil", brand: "Catch", image: "https://m.media-amazon.com/images/I/71chat456.jpg", inStock: true, description: "Tangy chat masala" },
  { name: "Catch Pav Bhaji Masala", weight: "100g", price: 60, category: "Masala Oil", brand: "Catch", image: "https://m.media-amazon.com/images/I/71pavbhaji789.jpg", inStock: true, description: "Special pav bhaji spice" },
  { name: "Tata Salt", weight: "1kg", price: 25, category: "Masala Oil", brand: "Tata", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/tatasalt123.png", inStock: true, description: "Iodized table salt" },
  { name: "Tata Salt Lite", weight: "1kg", price: 45, category: "Masala Oil", brand: "Tata", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/tatasaltlite456.png", inStock: true, description: "Low sodium salt" },
  { name: "Black Pepper Powder", weight: "100g", price: 120, category: "Masala Oil", brand: "Everest", image: "https://m.media-amazon.com/images/I/71pepper789.jpg", inStock: true, description: "Fresh ground black pepper" },
  { name: "Cumin Seeds (Jeera)", weight: "200g", price: 95, category: "Masala Oil", brand: "Everest", image: "https://m.media-amazon.com/images/I/71jeera123.jpg", inStock: true, description: "Whole cumin seeds" },
  { name: "Bay Leaf (Tej Patta)", weight: "50g", price: 65, category: "Masala Oil", brand: "MDH", image: "https://m.media-amazon.com/images/I/71bayleaf456.jpg", inStock: true, description: "Aromatic bay leaves" },
];

const migrate = async () => {
  try {
    console.log('\n🌶️ Migrating Masala & Oil Products...\n');
    let added = 0, skipped = 0;
    for (const p of masalaOilProducts) {
      const exists = await Product.findOne({ name: p.name, weight: p.weight, category: "Masala Oil" });
      if (exists) { console.log(`⏭️  ${p.name}`); skipped++; }
      else { await Product.create({ ...p, stock: 50 }); console.log(`✅ ${p.name} - ₹${p.price}`); added++; }
    }
    console.log(`\n✅ Done! Added: ${added}, Skipped: ${skipped}`);
    console.log(`📦 Total: ${await Product.countDocuments({ category: "Masala Oil" })}\n`);
    process.exit(0);
  } catch (err) { console.error('❌ Error:', err); process.exit(1); }
};

migrate();