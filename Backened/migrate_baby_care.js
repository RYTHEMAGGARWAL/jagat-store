// migrate_baby_care.js - Baby Care Products Migration
// Save in Backend folder and run: node migrate_baby_care.js

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

const babyCareProducts = [
  // DIAPERS
  { name: "Pampers Baby Dry Pants", weight: "Medium (56 pieces)", price: 899, oldPrice: 999, discount: "10% OFF", category: "Baby Care", brand: "Pampers", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/pampers_medium.png", inStock: true, description: "12 hours dryness" },
  { name: "Pampers Baby Dry Pants", weight: "Large (48 pieces)", price: 899, oldPrice: 999, discount: "10% OFF", category: "Baby Care", brand: "Pampers", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/pampers_large.png", inStock: true, description: "Extra absorption" },
  { name: "Pampers Baby Dry Pants", weight: "Small (62 pieces)", price: 899, oldPrice: 999, discount: "10% OFF", category: "Baby Care", brand: "Pampers", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/pampers_small.png", inStock: true, description: "For newborns" },
  { name: "Mamy Poko Pants", weight: "Medium (54 pieces)", price: 850, oldPrice: 950, discount: "11% OFF", category: "Baby Care", brand: "Mamy Poko", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/mamypoko_medium.png", inStock: true, description: "Extra absorb pants" },
  { name: "Mamy Poko Pants", weight: "Large (46 pieces)", price: 850, oldPrice: 950, discount: "11% OFF", category: "Baby Care", brand: "Mamy Poko", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/mamypoko_large.png", inStock: true, description: "Comfortable fit" },
  { name: "Huggies Wonder Pants", weight: "Medium (56 pieces)", price: 950, oldPrice: 1050, discount: "10% OFF", category: "Baby Care", brand: "Huggies", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/huggies_medium.png", inStock: true, description: "Bubble bed comfort" },
  { name: "Pampers Baby Wipes", weight: "Pack of 72", price: 199, oldPrice: 229, discount: "13% OFF", category: "Baby Care", brand: "Pampers", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/pampers_wipes.png", inStock: true, description: "Gentle fresh wipes" },
  { name: "Himalaya Baby Wipes", weight: "Pack of 72", price: 149, category: "Baby Care", brand: "Himalaya", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/himalaya_wipes.png", inStock: true, description: "Herbal gentle wipes" },
  { name: "Johnson's Baby Wipes", weight: "Pack of 80", price: 180, oldPrice: 210, discount: "14% OFF", category: "Baby Care", brand: "Johnson's", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/johnsons_wipes.png", inStock: true, description: "Extra sensitive wipes" },
  { name: "Johnson's Baby Powder", weight: "400g", price: 245, oldPrice: 275, discount: "11% OFF", category: "Baby Care", brand: "Johnson's", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/johnsons_powder.png", inStock: true, description: "Classic baby powder" },
  { name: "Johnson's Baby Oil", weight: "200ml", price: 185, oldPrice: 210, discount: "12% OFF", category: "Baby Care", brand: "Johnson's", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/johnsons_oil.png", inStock: true, description: "Pure baby oil" },
  { name: "Johnson's Baby Shampoo", weight: "200ml", price: 175, category: "Baby Care", brand: "Johnson's", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/johnsons_shampoo.png", inStock: true, description: "No more tears formula" },
  { name: "Johnson's Baby Soap", weight: "Pack of 3", price: 135, category: "Baby Care", brand: "Johnson's", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/johnsons_soap.png", inStock: true, description: "Mild baby soap" },
  { name: "Johnson's Baby Lotion", weight: "200ml", price: 195, oldPrice: 220, discount: "11% OFF", category: "Baby Care", brand: "Johnson's", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/johnsons_lotion.png", inStock: true, description: "24hr moisture" },
  { name: "Cerelac Wheat", weight: "300g", price: 185, category: "Baby Care", brand: "Nestle", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/cerelac_wheat.png", inStock: true, description: "6+ months baby cereal" },
  { name: "Cerelac Rice", weight: "300g", price: 185, category: "Baby Care", brand: "Nestle", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/cerelac_rice.png", inStock: true, description: "First solid food" },
  { name: "Lactogen 1", weight: "400g", price: 399, oldPrice: 445, discount: "10% OFF", category: "Baby Care", brand: "Nestle", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/lactogen1.png", inStock: true, description: "Infant formula 0-6 months" },
];

const migrate = async () => {
  try {
    console.log('\n👶 Migrating Baby Care Products...\n');
    let added = 0, skipped = 0;
    for (const p of babyCareProducts) {
      const exists = await Product.findOne({ name: p.name, weight: p.weight, category: "Baby Care" });
      if (exists) { console.log(`⏭️  ${p.name}`); skipped++; }
      else { await Product.create({ ...p, stock: 50 }); console.log(`✅ ${p.name} - ₹${p.price}`); added++; }
    }
    console.log(`\n✅ Done! Added: ${added}, Skipped: ${skipped}`);
    console.log(`📦 Total: ${await Product.countDocuments({ category: "Baby Care" })}\n`);
    process.exit(0);
  } catch (err) { console.error('❌ Error:', err); process.exit(1); }
};

migrate();