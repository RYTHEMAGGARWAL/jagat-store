// migrate_dairy_bread_eggs.js - Dairy, Bread & Eggs Products
// Save in Backend folder and run: node migrate_dairy_bread_eggs.js

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

const dairyBreadEggsProducts = [
  { name: "Amul Milk (FullCream)", weight: "500 ml", price: 35, category: "Dairy Bread Eggs", brand: "Amul", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/628c97e0-5ed4-425d-a667-1d3bfa6f0bde.png", inStock: true, description: "Fresh full cream milk from Amul" },
  { name: "Amul Milk (Toned)", weight: "500 ml", price: 29, category: "Dairy Bread Eggs", brand: "Amul", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/5734b087-3ad9-485f-bbe2-52079cd9e35d.png", inStock: true, description: "Toned milk from Amul" },
  { name: "Amul Cow Milk", weight: "500 ml", price: 30, category: "Dairy Bread Eggs", brand: "Amul", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/ae29e828-f5d9-4f8b-89b6-8c6d6919df7b.png", inStock: true, description: "Pure cow milk from Amul" },
  { name: "MotherDairy Cow Milk", weight: "500 ml", price: 30, category: "Dairy Bread Eggs", brand: "Mother Dairy", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/60065a08-2486-4f67-b2ae-e03670b2c8f3.png", inStock: true, description: "Fresh cow milk from Mother Dairy" },
  { name: "MotherDairy Milk (FullCream)", weight: "500 ml", price: 35, category: "Dairy Bread Eggs", brand: "Mother Dairy", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/c1d65f38-031a-4028-8bf6-a5fc2f0e288d.png", inStock: true, description: "Full cream milk from Mother Dairy" },
  { name: "Amul Masti Curd (Dahi)", weight: "500 ml", price: 35, category: "Dairy Bread Eggs", brand: "Amul", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/da/cms-assets/cms/product/2107cdc3-8d54-41fb-a7ee-89d8573b9f06.jpg", inStock: true, description: "Fresh curd from Amul" },
  { name: "MotherDairy Curd (Dahi)", weight: "500 ml", price: 35, category: "Dairy Bread Eggs", brand: "Mother Dairy", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/2b146201-870b-4bb8-aee7-8ef0377cbe2b.png", inStock: true, description: "Fresh creamy curd" },
  { name: "Amul Butter", weight: "100 gm", price: 62, category: "Dairy Bread Eggs", brand: "Amul", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/613787ac-f983-4cfb-b534-e219c8d47b39.png", inStock: true, description: "Pure butter made from fresh cream" },
  { name: "Amul Butter", weight: "500 gm", price: 295, oldPrice: 305, discount: "3% OFF", category: "Dairy Bread Eggs", brand: "Amul", image: "https://tse2.mm.bing.net/th/id/OIP.sRga9Of05-eQKbJLBtGbswHaHa?pid=Api&P=0&h=180", inStock: true, description: "Large pack pure butter" },
  { name: "Amul Butter", weight: "200 gm", price: 128, category: "Dairy Bread Eggs", brand: "Amul", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/03af3633-5fa5-438f-bece-145ed114d279.png", inStock: true, description: "Medium pack pure butter" },
  { name: "Delicious Butter", weight: "100 gm", price: 22, category: "Dairy Bread Eggs", brand: "Delicious", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/da/cms-assets/cms/product/8a565e7f-22dc-4146-ac66-b099f5110293.jpg", inStock: true, description: "Budget-friendly butter" },
  { name: "Delicious Butter", weight: "500 gm", price: 105, category: "Dairy Bread Eggs", brand: "Delicious", image: "https://tse3.mm.bing.net/th/id/OIP.NbU9NdF84R9X2FMM-_LMyQHaHa?pid=Api&P=0&h=180", inStock: true, description: "Large pack budget butter" },
  { name: "Amul Mozzarella Cheese Diced", weight: "200 gm", price: 129, category: "Dairy Bread Eggs", brand: "Amul", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/da/cms-assets/cms/product/0bd593b2-6433-4a3e-a71d-8964618c5074.jpg", inStock: true, description: "Diced mozzarella cheese" },
  { name: "Amul Cheese Slice", weight: "10pcs", price: 149, category: "Dairy Bread Eggs", brand: "Amul", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/a501e65f-194b-4db2-abc9-6b7bb515349c.png", inStock: true, description: "Cheese slices pack of 10" },
  { name: "Amul Cheese Cube", weight: "1 pack (8pcs)", price: 135, category: "Dairy Bread Eggs", brand: "Amul", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/52377f0e-2ee1-4d3f-a0d6-f34934b71f0f.png", inStock: true, description: "Cheese cubes pack of 8" },
  { name: "Amul Cheese Slice", weight: "5 pcs", price: 85, category: "Dairy Bread Eggs", brand: "Amul", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/a501e65f-194b-4db2-abc9-6b7bb515349c.png", inStock: true, description: "Cheese slices pack of 5" },
  { name: "Amul Cream", weight: "200ml", price: 70, category: "Dairy Bread Eggs", brand: "Amul", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/assets/products/sliding_images/jpeg/740347d8-80b9-40eb-8de4-72b283acb7bc.jpg", inStock: true, description: "Fresh dairy cream" },
  { name: "Amul Cream", weight: "1 Litre", price: 230, category: "Dairy Bread Eggs", brand: "Amul", image: "https://m.media-amazon.com/images/I/51pn7p9gnfL.jpg", inStock: true, description: "Large pack fresh cream" },
  { name: "Ananda Paneer", weight: "200 g", price: 90, oldPrice: 95, discount: "5% OFF", category: "Dairy Bread Eggs", brand: "Ananda", image: "https://tse1.mm.bing.net/th/id/OIP.YlYniI_xVLWB1HuuHKki9gHaEP?pid=Api&P=0&h=180", inStock: true, description: "Fresh paneer" },
  { name: "Amul Cheese Spread", weight: "200 g", price: 110, category: "Dairy Bread Eggs", brand: "Amul", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/d8ee0b72-3ada-4218-a1df-10efd53a11b4.png", inStock: true, description: "Creamy cheese spread" },
  { name: "English Oven Brown Bread", weight: "450g", price: 55, category: "Dairy Bread Eggs", brand: "English Oven", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/0b267148-c2c6-4eae-9ecd-1e9a83569e3a.png", inStock: true, description: "Healthy brown bread" },
  { name: "English Oven Milk Bread", weight: "400 g", price: 40, category: "Dairy Bread Eggs", brand: "English Oven", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/9f363c60-8b58-4e1a-8c20-9647247b7227.png", inStock: true, description: "Soft milk bread" },
  { name: "English Oven White Bread", weight: "600 g", price: 55, category: "Dairy Bread Eggs", brand: "English Oven", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/04cb3d03-fa41-4229-82d1-67beb4d4cd7d.png", inStock: true, description: "Classic white bread" },
  { name: "English Oven MultiGrain Bread", weight: "500 g", price: 70, category: "Dairy Bread Eggs", brand: "English Oven", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/ff8853fd-1be8-48cf-893a-3f1616af322c.png", inStock: true, description: "Healthy multigrain bread" },
  { name: "English Oven Fruit Bun", weight: "2 pcs", price: 20, category: "Dairy Bread Eggs", brand: "English Oven", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/f4418ade-78c5-4405-9973-02c6c6db3289.png", inStock: true, description: "Sweet fruit buns" },
  { name: "English Oven Sandwich Bread", weight: "400 g", price: 40, category: "Dairy Bread Eggs", brand: "English Oven", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/fb337791-9328-4c38-a2ee-bc3bb20d204a.png", inStock: true, description: "Perfect for sandwiches" },
  { name: "English Oven Burger Buns", weight: "6pcs", price: 60, category: "Dairy Bread Eggs", brand: "English Oven", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/b232b090-361c-49ee-99a9-617eeac57aef.png", inStock: true, description: "Soft burger buns pack" },
  { name: "English Oven Pav", weight: "400 g", price: 45, category: "Dairy Bread Eggs", brand: "English Oven", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/951eaf30-2c8f-4032-bca6-51885222aa99.png", inStock: true, description: "Traditional pav bread" },
];

const migrate = async () => {
  try {
    console.log('\n🥛 Migrating Dairy, Bread & Eggs Products...\n');
    let added = 0, skipped = 0;
    for (const p of dairyBreadEggsProducts) {
      const exists = await Product.findOne({ name: p.name, weight: p.weight, category: "Dairy Bread Eggs" });
      if (exists) { console.log(`⏭️  ${p.name}`); skipped++; }
      else { await Product.create({ ...p, stock: 50 }); console.log(`✅ ${p.name} - ₹${p.price}`); added++; }
    }
    console.log(`\n✅ Done! Added: ${added}, Skipped: ${skipped}`);
    console.log(`📦 Total: ${await Product.countDocuments({ category: "Dairy Bread Eggs" })}\n`);
    process.exit(0);
  } catch (err) { console.error('❌ Error:', err); process.exit(1); }
};

migrate();