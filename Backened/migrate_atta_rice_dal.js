// migrate_atta_rice_dal.js - Atta, Rice & Dal Products Migration
// Save in Backend folder and run: node migrate_atta_rice_dal.js

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

const attaRiceDalProducts = [
  // ATTA (Wheat Flour)
  { name: "Aashirvaad Whole Wheat Atta", weight: "5kg", price: 285, oldPrice: 310, discount: "8% OFF", category: "Atta Rice Dal", brand: "Aashirvaad", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/aashirvaad5kg.png", inStock: true, description: "100% whole wheat atta" },
  { name: "Aashirvaad Whole Wheat Atta", weight: "10kg", price: 550, oldPrice: 600, discount: "8% OFF", category: "Atta Rice Dal", brand: "Aashirvaad", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/aashirvaad10kg.png", inStock: true, description: "Large pack whole wheat atta" },
  { name: "Pillsbury Chakki Fresh Atta", weight: "5kg", price: 275, category: "Atta Rice Dal", brand: "Pillsbury", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/pillsbury5kg.png", inStock: true, description: "Fresh chakki ground atta" },
  { name: "Nature Fresh Whole Wheat Atta", weight: "5kg", price: 250, category: "Atta Rice Dal", brand: "Nature Fresh", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/naturefresh5kg.png", inStock: true, description: "Budget-friendly whole wheat" },
  { name: "Annapurna Atta", weight: "10kg", price: 520, oldPrice: 570, discount: "9% OFF", category: "Atta Rice Dal", brand: "Annapurna", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/annapurna10kg.png", inStock: true, description: "Premium quality atta" },
  
  // RICE
  { name: "India Gate Basmati Rice", weight: "5kg", price: 550, oldPrice: 600, discount: "8% OFF", category: "Atta Rice Dal", brand: "India Gate", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/indiagate5kg.png", inStock: true, description: "Premium basmati rice" },
  { name: "India Gate Basmati Rice", weight: "1kg", price: 120, category: "Atta Rice Dal", brand: "India Gate", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/indiagate1kg.png", inStock: true, description: "Small pack basmati" },
  { name: "Daawat Basmati Rice", weight: "5kg", price: 580, oldPrice: 630, discount: "8% OFF", category: "Atta Rice Dal", brand: "Daawat", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/daawat5kg.png", inStock: true, description: "Long grain basmati" },
  { name: "Kohinoor Basmati Rice", weight: "5kg", price: 600, oldPrice: 650, discount: "8% OFF", category: "Atta Rice Dal", brand: "Kohinoor", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/kohinoor5kg.png", inStock: true, description: "Super basmati rice" },
  { name: "Fortune Rozana Basmati Rice", weight: "5kg", price: 450, category: "Atta Rice Dal", brand: "Fortune", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/fortune5kg.png", inStock: true, description: "Everyday basmati rice" },
  { name: "Sonamasuri Rice", weight: "5kg", price: 320, category: "Atta Rice Dal", brand: "Generic", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/sonamasuri5kg.png", inStock: true, description: "South Indian rice" },
  { name: "Brown Rice", weight: "1kg", price: 150, category: "Atta Rice Dal", brand: "India Gate", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/brownrice1kg.png", inStock: true, description: "Healthy brown rice" },
  
  // DAL (Pulses)
  { name: "Tata Sampann Toor Dal", weight: "1kg", price: 180, oldPrice: 195, discount: "8% OFF", category: "Atta Rice Dal", brand: "Tata Sampann", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/tatasampann_toor.png", inStock: true, description: "Premium arhar dal" },
  { name: "Tata Sampann Moong Dal", weight: "1kg", price: 150, category: "Atta Rice Dal", brand: "Tata Sampann", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/tatasampann_moong.png", inStock: true, description: "Split green gram" },
  { name: "Tata Sampann Chana Dal", weight: "1kg", price: 140, category: "Atta Rice Dal", brand: "Tata Sampann", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/tatasampann_chana.png", inStock: true, description: "Bengal gram dal" },
  { name: "Tata Sampann Masoor Dal", weight: "1kg", price: 145, category: "Atta Rice Dal", brand: "Tata Sampann", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/tatasampann_masoor.png", inStock: true, description: "Red lentils dal" },
  { name: "Tata Sampann Urad Dal", weight: "1kg", price: 160, category: "Atta Rice Dal", brand: "Tata Sampann", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/tatasampann_urad.png", inStock: true, description: "Black gram dal" },
  { name: "Aashirvaad Toor Dal", weight: "1kg", price: 175, oldPrice: 190, discount: "8% OFF", category: "Atta Rice Dal", brand: "Aashirvaad", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/aashirvaad_toor.png", inStock: true, description: "Quality arhar dal" },
  { name: "Aashirvaad Moong Dal", weight: "500g", price: 80, category: "Atta Rice Dal", brand: "Aashirvaad", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/aashirvaad_moong.png", inStock: true, description: "Small pack moong dal" },
  { name: "Fortune Toor Dal", weight: "1kg", price: 170, category: "Atta Rice Dal", brand: "Fortune", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/fortune_toor.png", inStock: true, description: "Everyday arhar dal" },
  { name: "Rajma (Red Kidney Beans)", weight: "500g", price: 85, category: "Atta Rice Dal", brand: "Generic", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/rajma500g.png", inStock: true, description: "Premium rajma" },
  { name: "Kabuli Chana (White Chickpeas)", weight: "500g", price: 75, category: "Atta Rice Dal", brand: "Generic", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/kabulichana500g.png", inStock: true, description: "Large white chickpeas" },
  { name: "Kala Chana (Black Chickpeas)", weight: "500g", price: 70, category: "Atta Rice Dal", brand: "Generic", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/kalachana500g.png", inStock: true, description: "Black chickpeas" },
  { name: "Mix Dal", weight: "1kg", price: 155, category: "Atta Rice Dal", brand: "Tata Sampann", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/mixdal1kg.png", inStock: true, description: "5 dal mix" },
];

const migrate = async () => {
  try {
    console.log('\n🌾 Migrating Atta, Rice & Dal Products...\n');
    let added = 0, skipped = 0;
    for (const p of attaRiceDalProducts) {
      const exists = await Product.findOne({ name: p.name, weight: p.weight, category: "Atta Rice Dal" });
      if (exists) { console.log(`⏭️  ${p.name}`); skipped++; }
      else { await Product.create({ ...p, stock: 50 }); console.log(`✅ ${p.name} - ₹${p.price}`); added++; }
    }
    console.log(`\n✅ Done! Added: ${added}, Skipped: ${skipped}`);
    console.log(`📦 Total: ${await Product.countDocuments({ category: "Atta Rice Dal" })}\n`);
    process.exit(0);
  } catch (err) { console.error('❌ Error:', err); process.exit(1); }
};

migrate();