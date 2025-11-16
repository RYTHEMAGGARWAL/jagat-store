// migrateProducts.js - Migrate ALL Hardcoded Products to MongoDB
// Place in Backened folder and run: node migrateProducts.js

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
// ALL PRODUCTS FROM YOUR FILES:
// ============================================

const allProducts = [
  // ==========================================
  // DAIRY BREAD EGGS (35 products)
  // ==========================================
  {
    name: "Amul Milk (FullCream)",
    weight: "500 ml",
    price: 35,
    oldPrice: null,
    discount: null,
    category: "Dairy Bread Eggs",
    brand: "Amul",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/628c97e0-5ed4-425d-a667-1d3bfa6f0bde.png",
    inStock: true,
    description: "Fresh full cream milk from Amul"
  },
  {
    name: "Amul Milk (Toned)",
    weight: "500 ml",
    price: 29,
    category: "Dairy Bread Eggs",
    brand: "Amul",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/5734b087-3ad9-485f-bbe2-52079cd9e35d.png",
    inStock: true,
    description: "Toned milk from Amul"
  },
  {
    name: "Amul Cow Milk",
    weight: "500 ml",
    price: 30,
    category: "Dairy Bread Eggs",
    brand: "Amul",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/ae29e828-f5d9-4f8b-89b6-8c6d6919df7b.png",
    inStock: true,
    description: "Pure cow milk from Amul"
  },
  {
    name: "MotherDairy Cow Milk",
    weight: "500 ml",
    price: 30,
    category: "Dairy Bread Eggs",
    brand: "Mother Dairy",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/60065a08-2486-4f67-b2ae-e03670b2c8f3.png",
    inStock: true,
    description: "Fresh cow milk from Mother Dairy"
  },
  {
    name: "MotherDairy Milk (FullCream)",
    weight: "500 ml",
    price: 35,
    category: "Dairy Bread Eggs",
    brand: "Mother Dairy",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/c1d65f38-031a-4028-8bf6-a5fc2f0e288d.png",
    inStock: true,
    description: "Full cream milk from Mother Dairy"
  },
  {
    name: "Amul Masti Curd (Dahi)",
    weight: "500 ml",
    price: 35,
    category: "Dairy Bread Eggs",
    brand: "Amul",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/da/cms-assets/cms/product/2107cdc3-8d54-41fb-a7ee-89d8573b9f06.jpg",
    inStock: true,
    description: "Fresh curd from Amul"
  },
  {
    name: "MotherDairy Curd (Dahi)",
    weight: "500 ml",
    price: 35,
    category: "Dairy Bread Eggs",
    brand: "Mother Dairy",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/2b146201-870b-4bb8-aee7-8ef0377cbe2b.png",
    inStock: true,
    description: "Fresh creamy curd"
  },
  {
    name: "Amul Butter",
    weight: "100 gm",
    price: 62,
    category: "Dairy Bread Eggs",
    brand: "Amul",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/613787ac-f983-4cfb-b534-e219c8d47b39.png",
    inStock: true,
    description: "Pure butter made from fresh cream"
  },
  {
    name: "Amul Butter",
    weight: "500 gm",
    price: 295,
    oldPrice: 305,
    discount: "3% OFF",
    category: "Dairy Bread Eggs",
    brand: "Amul",
    image: "https://tse2.mm.bing.net/th/id/OIP.sRga9Of05-eQKbJLBtGbswHaHa?pid=Api&P=0&h=180",
    inStock: true,
    description: "Large pack pure butter"
  },
  {
    name: "Amul Butter",
    weight: "200 gm",
    price: 128,
    category: "Dairy Bread Eggs",
    brand: "Amul",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/03af3633-5fa5-438f-bece-145ed114d279.png",
    inStock: true,
    description: "Medium pack pure butter"
  },
  {
    name: "Delicious Butter",
    weight: "100 gm",
    price: 22,
    category: "Dairy Bread Eggs",
    brand: "Delicious",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/da/cms-assets/cms/product/8a565e7f-22dc-4146-ac66-b099f5110293.jpg",
    inStock: true,
    description: "Budget-friendly butter"
  },
  {
    name: "Delicious Butter",
    weight: "500 gm",
    price: 105,
    category: "Dairy Bread Eggs",
    brand: "Delicious",
    image: "https://tse3.mm.bing.net/th/id/OIP.NbU9NdF84R9X2FMM-_LMyQHaHa?pid=Api&P=0&h=180",
    inStock: true,
    description: "Large pack budget butter"
  },
  {
    name: "Amul Mozzarella Cheese Diced",
    weight: "200 gm",
    price: 129,
    category: "Dairy Bread Eggs",
    brand: "Amul",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/da/cms-assets/cms/product/0bd593b2-6433-4a3e-a71d-8964618c5074.jpg",
    inStock: true,
    description: "Diced mozzarella cheese"
  },
  {
    name: "Amul Cheese Slice",
    weight: "10pcs",
    price: 149,
    category: "Dairy Bread Eggs",
    brand: "Amul",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/a501e65f-194b-4db2-abc9-6b7bb515349c.png",
    inStock: true,
    description: "Cheese slices pack of 10"
  },
  {
    name: "Amul Cheese Cube",
    weight: "1 pack (8pcs)",
    price: 135,
    category: "Dairy Bread Eggs",
    brand: "Amul",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/52377f0e-2ee1-4d3f-a0d6-f34934b71f0f.png",
    inStock: true,
    description: "Cheese cubes pack of 8"
  },
  {
    name: "Amul Cheese Slice",
    weight: "5 pcs",
    price: 85,
    category: "Dairy Bread Eggs",
    brand: "Amul",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/a501e65f-194b-4db2-abc9-6b7bb515349c.png",
    inStock: true,
    description: "Cheese slices pack of 5"
  },
  {
    name: "Amul Cream",
    weight: "200ml",
    price: 70,
    category: "Dairy Bread Eggs",
    brand: "Amul",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/app/assets/products/sliding_images/jpeg/740347d8-80b9-40eb-8de4-72b283acb7bc.jpg",
    inStock: true,
    description: "Fresh dairy cream"
  },
  {
    name: "Amul Cream",
    weight: "1 Litre",
    price: 230,
    category: "Dairy Bread Eggs",
    brand: "Amul",
    image: "https://m.media-amazon.com/images/I/51pn7p9gnfL.jpg",
    inStock: true,
    description: "Large pack fresh cream"
  },
  {
    name: "Ananda Paneer",
    weight: "200 g",
    price: 90,
    oldPrice: 95,
    discount: "5% OFF",
    category: "Dairy Bread Eggs",
    brand: "Ananda",
    image: "https://tse1.mm.bing.net/th/id/OIP.YlYniI_xVLWB1HuuHKki9gHaEP?pid=Api&P=0&h=180",
    inStock: true,
    description: "Fresh paneer"
  },
  {
    name: "Amul Cheese Spread",
    weight: "200 g",
    price: 110,
    category: "Dairy Bread Eggs",
    brand: "Amul",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/d8ee0b72-3ada-4218-a1df-10efd53a11b4.png",
    inStock: true,
    description: "Creamy cheese spread"
  },
  {
    name: "English Oven Brown Bread",
    weight: "450g",
    price: 55,
    category: "Dairy Bread Eggs",
    brand: "English Oven",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/0b267148-c2c6-4eae-9ecd-1e9a83569e3a.png",
    inStock: true,
    description: "Healthy brown bread"
  },
  {
    name: "English Oven Milk Bread",
    weight: "400 g",
    price: 40,
    category: "Dairy Bread Eggs",
    brand: "English Oven",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/9f363c60-8b58-4e1a-8c20-9647247b7227.png",
    inStock: true,
    description: "Soft milk bread"
  },
  {
    name: "English Oven White Bread",
    weight: "600 g",
    price: 55,
    category: "Dairy Bread Eggs",
    brand: "English Oven",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/04cb3d03-fa41-4229-82d1-67beb4d4cd7d.png",
    inStock: true,
    description: "Classic white bread"
  },
  {
    name: "English Oven MultiGrain Bread",
    weight: "500 g",
    price: 70,
    category: "Dairy Bread Eggs",
    brand: "English Oven",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/ff8853fd-1be8-48cf-893a-3f1616af322c.png",
    inStock: true,
    description: "Healthy multigrain bread"
  },
  {
    name: "English Oven Fruit Bun",
    weight: "2 pcs",
    price: 20,
    category: "Dairy Bread Eggs",
    brand: "English Oven",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/f4418ade-78c5-4405-9973-02c6c6db3289.png",
    inStock: true,
    description: "Sweet fruit buns"
  },
  {
    name: "English Oven Sandwich Bread",
    weight: "400 g",
    price: 40,
    category: "Dairy Bread Eggs",
    brand: "English Oven",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/fb337791-9328-4c38-a2ee-bc3bb20d204a.png",
    inStock: true,
    description: "Perfect for sandwiches"
  },
  {
    name: "English Oven Burger Buns",
    weight: "6pcs",
    price: 60,
    category: "Dairy Bread Eggs",
    brand: "English Oven",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/b232b090-361c-49ee-99a9-617eeac57aef.png",
    inStock: true,
    description: "Soft burger buns pack"
  },
  {
    name: "English Oven Pav",
    weight: "400 g",
    price: 45,
    category: "Dairy Bread Eggs",
    brand: "English Oven",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/951eaf30-2c8f-4032-bca6-51885222aa99.png",
    inStock: true,
    description: "Traditional pav bread"
  },

  // ==========================================
  // PET CARE (25 products)
  // ==========================================
  {
    name: "Pedigree Adult Dog Dry Food (Chicken and Vegetables)",
    weight: "1kg",
    price: 232,
    oldPrice: 249,
    discount: "7% OFF",
    category: "Pet Care",
    brand: "Pedigree",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/0a27b202-9f8e-4374-b0cd-b5d013d801f1.png",
    inStock: false,
    description: "Complete nutrition for adult dogs"
  },
  {
    name: "Pedigree Adult Dog Dry Food (Chicken and Vegetables)",
    weight: "2.8kg",
    price: 610,
    oldPrice: 655,
    discount: "7% OFF",
    category: "Pet Care",
    brand: "Pedigree",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/0a27b202-9f8e-4374-b0cd-b5d013d801f1.png",
    inStock: true,
    description: "Large pack adult dog food"
  },
  {
    name: "Pedigree Puppy Dog Dry Food (Chicken and Milk)",
    weight: "1 kg",
    price: 270,
    oldPrice: 290,
    discount: "7% OFF",
    category: "Pet Care",
    brand: "Pedigree",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/5fd12876-6de4-46eb-a53a-e17887b2a6a5.png",
    inStock: true,
    description: "Complete nutrition for puppies"
  },
  {
    name: "Drools Adult (Chicken and Vegetables)",
    weight: "3kg",
    price: 605,
    oldPrice: 650,
    discount: "7% OFF",
    category: "Pet Care",
    brand: "Drools",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/9d4592ce-fcf8-4438-b0c7-4fa7c1a59141.png",
    inStock: true,
    description: "Premium adult dog food"
  },
  {
    name: "Pedigree Adult Wet Food (Chicken & Liver)",
    weight: "70g (30pcs)",
    price: 1350,
    oldPrice: 1500,
    discount: "10% OFF",
    category: "Pet Care",
    brand: "Pedigree",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/7269b332-e28f-4dcc-8fd2-f9de5eb55214.png",
    inStock: false,
    description: "Wet food pouches pack"
  },
  {
    name: "Pedigree Adult (Chicken and Vegetables)",
    weight: "370 g",
    price: 105,
    oldPrice: 110,
    discount: "5% OFF",
    category: "Pet Care",
    brand: "Pedigree",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/0a27b202-9f8e-4374-b0cd-b5d013d801f1.png",
    inStock: true,
    description: "Small pack dry food"
  },
  {
    name: "Whiskas Adult Dry Cat Food- Ocean Fish Flavour",
    weight: "480g",
    price: 190,
    oldPrice: 200,
    discount: "5% OFF",
    category: "Pet Care",
    brand: "Whiskas",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/71e3a9df-dd5d-437e-8ef5-3d702d2b5078.png",
    inStock: true,
    description: "Delicious ocean fish cat food"
  },
  {
    name: "Whiskas Kitten Dry Cat Food",
    weight: "480g",
    price: 195,
    oldPrice: 205,
    discount: "5% OFF",
    category: "Pet Care",
    brand: "Whiskas",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/b8a70e1c-2e3b-423e-8c7e-0e2a0b8e5e5e.png",
    inStock: true,
    description: "Complete nutrition for kittens"
  },

  // ==========================================
  // MASALA & OIL (First 20 products - add more later)
  // ==========================================
  {
    name: "Nature Fresh Refined Soyabean Oil Pouch",
    weight: "1 Litre",
    price: 140,
    category: "Masala Oil",
    brand: "Nature Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/7b1c5a2e-3469-460d-b2c6-0d9dd5f72a36.png",
    inStock: true,
    description: "Refined soyabean cooking oil"
  },
  {
    name: "Nature Fresh Refined Soyabean Oil Can",
    weight: "5 Litre",
    price: 730,
    oldPrice: 1050,
    discount: "10% OFF",
    category: "Masala Oil",
    brand: "Nature Fresh",
    image: "https://tse4.mm.bing.net/th/id/OIP.vHobBjz21taAyqOQkQbkkQAAAA?pid=Api&P=0&h=180",
    inStock: true,
    description: "Large can soyabean oil"
  },
  {
    name: "Nature Fresh Mustard(Sarso) Oil Can",
    weight: "5 Litre",
    price: 925,
    oldPrice: 985,
    discount: "10% OFF",
    category: "Masala Oil",
    brand: "Nature Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/68e76b8d-7a21-4b08-9b8c-92ff34d030ce.png",
    inStock: true,
    description: "Pure mustard oil large can"
  },
  {
    name: "Nature Fresh Mustard(Sarso) Oil Pouch",
    weight: "1 Litre",
    price: 180,
    category: "Masala Oil",
    brand: "Nature Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/767b30c2-15db-41bc-8386-e22acffc47d2.png",
    inStock: true,
    description: "Pure mustard oil pouch"
  },
  {
    name: "Nature Fresh SunFlower Refined Oil",
    weight: "1 Litre",
    price: 170,
    category: "Masala Oil",
    brand: "Nature Fresh",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/fc364f75-d80d-46e4-92c9-42bdd6093006.png",
    inStock: true,
    description: "Light sunflower oil"
  },
  {
    name: "Fortune Refined Soyabean Oil Pouch",
    weight: "1 Litre",
    price: 140,
    category: "Masala Oil",
    brand: "Fortune",
    image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/da/cms-assets/cms/product/7190517b-4ae9-4e86-a8c7-4cf71544c7ed.jpg",
    inStock: true,
    description: "Refined soyabean oil"
  },
  {
    name: "Fortune Mustard(Sarso) Oil Can",
    weight: "5 Litre",
    price: 840,
    oldPrice: 985,
    discount: "10% OFF",
    category: "Masala Oil",
    brand: "Fortune",
    image: "https://tse2.mm.bing.net/th/id/OIP.VM1DY6rXC4ARZk1DQAT7hwHaHa?pid=Api&P=0&h=180",
    inStock: true,
    description: "Premium mustard oil"
  },
  {
    name: "MDH Chana Masala",
    weight: "100g",
    price: 65,
    category: "Masala Oil",
    brand: "MDH",
    image: "https://m.media-amazon.com/images/I/71YqMZJOH1L._SX679_.jpg",
    inStock: true,
    description: "Authentic chana masala spice"
  },
  {
    name: "MDH Garam Masala",
    weight: "100g",
    price: 70,
    category: "Masala Oil",
    brand: "MDH",
    image: "https://m.media-amazon.com/images/I/71d8KpqYCxL._SX679_.jpg",
    inStock: true,
    description: "Traditional garam masala blend"
  },
  {
    name: "Everest Turmeric Powder",
    weight: "200g",
    price: 85,
    category: "Masala Oil",
    brand: "Everest",
    image: "https://m.media-amazon.com/images/I/71VqL8RJUSL._SX679_.jpg",
    inStock: true,
    description: "Pure turmeric powder"
  },
  {
    name: "Everest Red Chilli Powder",
    weight: "200g",
    price: 90,
    category: "Masala Oil",
    brand: "Everest",
    image: "https://m.media-amazon.com/images/I/71gX7RqLJfL._SX679_.jpg",
    inStock: true,
    description: "Spicy red chilli powder"
  },
];

// Migration function
const migrateProducts = async () => {
  try {
    console.log('\n🚀 Starting Product Migration...\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Check existing products
    const existingCount = await Product.countDocuments();
    console.log(`📦 Existing products in database: ${existingCount}`);
    
    if (existingCount > 0) {
      console.log('\n⚠️  WARNING: Products already exist in database!');
      console.log('Options:');
      console.log('1. Skip migration (keep existing)');
      console.log('2. Add new products (merge)');
      console.log('3. Clear all and migrate (fresh start)\n');
      console.log('Continuing with ADD mode (will skip duplicates)...\n');
    }
    
    console.log(`📊 Total products to migrate: ${allProducts.length}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    let addedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    // Group by category
    const categories = {};
    allProducts.forEach(p => {
      if (!categories[p.category]) categories[p.category] = 0;
      categories[p.category]++;
    });
    
    console.log('📋 Products by Category:');
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`   • ${cat}: ${count} products`);
    });
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Migrate each product
    for (const productData of allProducts) {
      try {
        // Check if product already exists
        const existing = await Product.findOne({ 
          name: productData.name,
          weight: productData.weight 
        });
        
        if (existing) {
          console.log(`⏭️  Skipped: ${productData.name} (${productData.weight}) - Already exists`);
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
    console.log(`   ⏭️  Skipped: ${skippedCount} products (duplicates)`);
    console.log(`   ❌ Errors: ${errorCount} products`);
    console.log(`   📦 Total in database: ${await Product.countDocuments()}`);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Show category summary
    console.log('\n📋 Database Categories:');
    const dbCategories = await Product.distinct('category');
    for (const cat of dbCategories) {
      const count = await Product.countDocuments({ category: cat });
      console.log(`   • ${cat}: ${count} products`);
    }
    
    console.log('\n✅ Migration successful!');
    console.log('🚀 Next steps:');
    console.log('   1. Replace component files');
    console.log('   2. Restart frontend');
    console.log('   3. Test each category page\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration Error:', error);
    process.exit(1);
  }
};

// Optional: Function to clear all products
const clearAllProducts = async () => {
  try {
    console.log('\n🗑️  Clearing all products...');
    const result = await Product.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} products\n`);
  } catch (error) {
    console.error('❌ Error clearing products:', error);
  }
};

// Run migration
console.log('\n╔═══════════════════════════════════════════╗');
console.log('║   PRODUCT MIGRATION SCRIPT                ║');
console.log('║   JagatStore - Full System Migration      ║');
console.log('╚═══════════════════════════════════════════╝\n');

// Uncomment next line to CLEAR ALL products before migration:
// clearAllProducts().then(() => migrateProducts());

// Run migration (adds new, skips existing):
migrateProducts();