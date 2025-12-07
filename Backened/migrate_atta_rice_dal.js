// migrate_atta_rice_dal_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_atta_rice_dal_IMPROVED.js

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

// ========== ATTA RICE DAL PRODUCTS ==========
// ADD/EDIT/DELETE products here and run the script
const attaRiceDalProducts = [
  // ATTA (Wheat Flour)
  { 
    name: "Aashirvaad Whole Wheat Atta", 
    weight: "5kg", 
    price: 238, 
    oldPrice: 262, 
    discount: "9% OFF", 
    category: "Atta Rice Dal", 
    brand: "Aashirvaad", 
    image: 	"https://th.bing.com/th/id/OIP.Jy9xCIAIgVmqIg3wRVTcAwHaIt?w=160&h=188&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", 
    inStock: true, 
    description: "100% whole wheat atta, made from MP wheat",
    stock: 50
  },
  { 
    name: "Aashirvaad Whole Wheat Atta", 
    weight: "10kg", 
    price: 445, 
    oldPrice: 499, 
    discount: "11% OFF", 
    category: "Atta Rice Dal", 
    brand: "Aashirvaad", 
    image: "https://tse1.mm.bing.net/th/id/OIP.2eBSaMmlJNEZWJgkORmTNAHaHa?pid=Api&P=0&h=180", 
    inStock: true, 
    description: "100% whole wheat atta, family pack",
    stock: 50
  },
  { 
    name: "Fortune Chakki Fresh Atta", 
    weight: "5kg", 
    price: 222, 
    oldPrice: 293, 
    discount: "24% OFF", 
    category: "Atta Rice Dal", 
    brand: "Fortune", 
    image: "https://tse2.mm.bing.net/th/id/OIP.OuuuZ9O0r8fwlpgTLYq4hQAAAA?pid=Api&H=153&W=160", 
    inStock: true, 
    description: "Freshly chakki ground atta for soft rotis",
    stock: 50
  },
  { 
    name: "Fortune Chakki Fresh Atta", 
    weight: "10kg", 
    price: 430, 
    oldPrice: 485, 
    discount: "11% OFF", 
    category: "Atta Rice Dal", 
    brand: "Fortune", 
    image: "https://tse1.mm.bing.net/th/id/OIP.2RoBCjMr1Ss314LL4i49VgHaKE?pid=Api&P=0&w=400&h=544", 
    inStock: true, 
    description: "Freshly chakki ground atta, family pack",
    stock: 50
  },
  { 
    name: "Nature Fresh Sampoorna Chakki Atta", 
    weight: "5kg", 
    price: 221, 
    oldPrice: 260, 
    discount: "15% OFF", 
    category: "Atta Rice Dal", 
    brand: "Nature Fresh", 
    image: "https://tse1.mm.bing.net/th/id/OIP.cx6xj6_wJkKLTw5BrUyACAAAAA?pid=Api&P=0&w=379&h=500", 
    inStock: true, 
    description: "100% sampoorna whole wheat chakki atta",
    stock: 50
  },
  { 
    name: "Nature Fresh Sampoorna Chakki Atta", 
    weight: "10kg", 
    price: 430, 
    oldPrice: 495, 
    discount: "13% OFF", 
    category: "Atta Rice Dal", 
    brand: "Nature Fresh", 
    image: "https://tse1.mm.bing.net/th/id/OIP.YfDk6btizYusMA5lthXbXwHaHa?pid=Api&H=160&W=160", 
    inStock: true, 
    description: "100% sampoorna whole wheat chakki atta, family pack",
    stock: 50
  },
  { 
    name: "Rishta Chakki Fresh Atta", 
    weight: "5kg", 
    price: 205, 
    oldPrice: 260, 
    discount: "21% OFF",
    category: "Atta Rice Dal", 
    brand: "Rishta", 
    image: "	https://tse2.mm.bing.net/th/id/OIP.HcojeyQaj3yVymQkiPJOZgAAAA?pid=Api&H=160&W=160", 
    inStock: true, 
    description: "Fresh chakki ground atta",
    stock: 50
  },
   { 
    name: "Rishta Chakki Fresh Atta", 
    weight: "10kg", 
    price: 400, 
    oldPrice: 460, 
    discount: "13% OFF",
    category: "Atta Rice Dal", 
    brand: "Rishta", 
    image: "	https://tse2.mm.bing.net/th/id/OIP.HcojeyQaj3yVymQkiPJOZgAAAA?pid=Api&H=160&W=160", 
    inStock: true, 
    description: "Fresh chakki ground atta",
    stock: 50
  },
   { 
    name: "Shakti Bhog Chakki Fresh Atta", 
    weight: "10kg", 
    price: 430, 
    oldPrice: 475, 
    discount: "9% OFF",
    category: "Atta Rice Dal", 
    brand: "Shakti Bhog", 
    image: "https://tse2.mm.bing.net/th/id/OIP.hGPP8fVyYUpTEYUyCzzJUgAAAA?pid=Api&P=0&w=220&h=300", 
    inStock: true, 
    description: "Fresh chakki ground atta",
    stock: 50
  },
   { 
    name: "Aashirvaad High Fiber Atta with Multigrains", 
    weight: "5kg", 
    price: 320, 
    oldPrice: 376, 
    discount: "14% OFF", 
    category: "Atta Rice Dal", 
    brand: "Aashirvaad", 
    image: "https://tse1.mm.bing.net/th/id/OIP.RNI9pu0Wi9QcSNfuSMm3owHaHa?pid=Api&H=160&W=160", 
    inStock: true, 
    description: "100% whole wheat atta with added multigrains",
    stock: 50
  }, { 
    name: "Aashirvaad Select 100% MP Sharbati Atta", 
    weight: "5kg", 
    price: 320, 
    oldPrice: 370, 
    discount: "13% OFF", 
    category: "Atta Rice Dal", 
    brand: "Aashirvaad", 
    image: "	https://tse2.mm.bing.net/th/id/OIP.dQ_0wRYt_5PQBaiEWldKpQHaJw?pid=Api&H=210&W=160", 
    inStock: true, 
    description: "Premium quality MP Sharbati wheat atta",
    stock: 50
  },
  
  { 
    name: "Safal Atta", 
    weight: "10kg", 
    price: 323, 
    oldPrice: 380, 
    discount: "15% OFF", 
    category: "Atta Rice Dal", 
    brand: "Safal", 
    image: "https://tse1.mm.bing.net/th/id/OIP.-_2b0b1Z6b0j0bJQ1Yk9LAHaHa?pid=Api&P=0&w=180&h=180", 
    inStock: true, 
    description: "Premium quality atta",
    stock: 50
  },
  { 
    name: "Mp Sharbati Atta Gol Atta (Own Brand)", 
    weight: "10kg", 
    price: 480, 
    oldPrice: 530, 
    discount: "9% OFF", 
    category: "Atta Rice Dal", 
    brand: "Jagat Store", 
    image: "https://tse2.mm.bing.net/th/id/OIP.qtvTrShBaHIidNKNUbhMHwHaHa?pid=Api&H=160&W=160", 
    inStock: true, 
    description: "Premium quality atta",
    stock: 50
  },
  
  // RICE
  // ========== RICE PRODUCTS - COMPLETE COLLECTION ==========

// INDIA GATE BASMATI RICE (All Variants)
{
  name: "India Gate Dubar Basmati Rice",
  weight: "5kg",
  price: 580,
  oldPrice: 725,
  discount: "20% OFF",
  category: "Atta Rice Dal",
  brand: "India Gate",
  image: "https://tse2.mm.bing.net/th/id/OIP.Bd9FR2RsdCtnTOphgbRCRgHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Premium dubar basmati rice, aged for aroma",
  stock: 50
},
{
  name: "India Gate Dubar Basmati Rice",
  weight: "1kg",
  price: 120,
  oldPrice: 151,
  discount: "20% OFF",
  category: "Atta Rice Dal",
  brand: "India Gate",
  image: 	"https://tse2.mm.bing.net/th/id/OIP.WLp6qeIGK9n2-DHFG1zg_QHaHa?pid=Api&P=0&h=180",
  inStock: true,
  description: "Premium dubar basmati rice - small pack",
  stock: 50
},
{
  name: "India Gate Tibar Basmati Rice",
  weight: "5kg",
  price:625 ,
  oldPrice: 765,
  discount: "18% OFF",
  category: "Atta Rice Dal",
  brand: "India Gate",
  image: "https://tse1.mm.bing.net/th/id/OIP.0PF2yGHcNULctwg2qajESgAAAA?pid=Api&H=160&W=160",
  inStock: true,
  description: "Long grain tibar basmati rice",
  stock: 50
},
{
  name: "India Gate Tibar Basmati Rice",
  weight: "1kg",
  price: 130,
  oldPrice: 157,
  discount: "17% OFF",
  category: "Atta Rice Dal",
  brand: "India Gate",
  image: "	https://tse2.mm.bing.net/th/id/OIP.AXExZSbf05jCr5i9NMLAlwHaHa?pid=Api&P=0&w=400&h=400",
  inStock: true,
  description: "Long grain tibar basmati - small pack",
  stock: 50
},
{
  name: "India Gate Super Basmati Rice",
  weight: "5kg + 1kg Free",
  price: 902,
  oldPrice: 1100,
  discount: "9% OFF",
  category: "Atta Rice Dal",
  brand: "India Gate",
  image: "https://tse1.mm.bing.net/th/id/OIP.alIgwxaGHq47ScPVECHgnwHaHa?pid=Api&P=0&w=400&h=400",
  inStock: true,
  description: "Super premium basmati rice, extra long grain",
  stock: 50
},
{
  name: "India Gate Super Basmati Rice",
  weight: "1kg",
  price: 180,
  oldPrice: 220,
  discount: "18% OFF",
  category: "Atta Rice Dal",
  brand: "India Gate",
  image: "	https://tse2.mm.bing.net/th/id/OIP.Pwo2ySj4nJZDV6dDykh42AHaHa?pid=Api&P=0&w=400&h=400",
  inStock: true,
  description: "Super premium basmati - small pack",
  stock: 50
},
{
  name: "India Gate Feast Rozzana Basmati Rice",
  weight: "5kg",
  price: 420,
  oldPrice: 495,
  discount: "15% OFF",
  category: "Atta Rice Dal",
  brand: "India Gate",
  image: "	https://tse2.mm.bing.net/th/id/OIP.3zmoWSPtlAu094mTC4Wj9QHaHa?pid=Api&P=0&w=400&h=400",
  inStock: true,
  description: "Daily use basmati rice - feast rozzana",
  stock: 50
},
{
  name: "India Gate Feast Rozzana Basmati Rice",
  weight: "1kg",
  price: 88,
  oldPrice: 118,
  discount: "25% OFF",
  category: "Atta Rice Dal",
  brand: "India Gate",
  image: "	https://tse1.mm.bing.net/th/id/OIP.hxytxEg6bcdjIPO6kFdRDgHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Daily use basmati rice - small pack",
  stock: 50
},
 {
  name: "India Gate Mogra Basmati Rice",
  weight: "5kg",
  price: 322,
  oldPrice: 460,
  discount: "30% OFF",
  category: "Atta Rice Dal",
  brand: "India Gate",
  image: "	https://tse1.mm.bing.net/th/id/OIP.XFymxWbukdKKXNwvaUEECQHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Premium mogra basmati rice, small grain",
  stock: 50
},
{
  name: "India Gate Mogra Basmati Rice",
  weight: "10kg",
  price: 605,
  oldPrice: 865,
  discount: "30% OFF",
  category: "Atta Rice Dal",
  brand: "India Gate",
  image: "https://tse1.mm.bing.net/th/id/OIP.32S9ve2pOCeCOtjmb0XazgHaHa?pid=Api&P=0&h=180",
  inStock: true,
  description: "Premium mogra basmati rice - family pack",
  stock: 50
},

// INDIA GATE MINI MOGRA BASMATI RICE
{
  name: "India Gate Mini Mogra Basmati Rice",
  weight: "5kg",
  price: 294,
  oldPrice: 378,
  discount: "22% OFF",
  category: "Atta Rice Dal",
  brand: "India Gate",
  image: "	https://tse2.mm.bing.net/th/id/OIP.RzmwICn3YjjMkgiU5yK-0QHaJD?pid=Api&H=195&W=160",
  inStock: true,
  description: "Mini mogra basmati rice, short grain premium",
  stock: 50
},
{
  name: "India Gate Mini Mogra Basmati Rice",
  weight: "10kg",
  price: 560,
  oldPrice: 735,
  discount: "23% OFF",
  category: "Atta Rice Dal",
  brand: "India Gate",
  image: "https://tse2.mm.bing.net/th/id/OIP.XqHhblEaaMGPkJMkFT9XvAHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Mini mogra basmati rice - family pack",
  stock: 50
},

// DELHI PASAND BASMATI RICE (All Variants)
{
  name: "Delhi Pasand Easy Cook Basmati Rice",
  weight: "5kg",
  price: 304,
  oldPrice: 380,
  discount: "20% OFF",
  category: "Atta Rice Dal",
  brand: "Delhi Pasand",
    image: "https://tse2.mm.bing.net/th/id/OIP.mKKcFudhM482hPMlsHSTowAAAA?pid=Api&H=244&W=160",
  inStock: true,
  description: "Easy cook basmati rice, quick cooking",
  stock: 50
},
{
  name: "Delhi Pasand Easy Cook Basmati Rice",
  weight: "10kg",
  price: 590,
  oldPrice: 740,
  discount: "20% OFF",
  category: "Atta Rice Dal",
  brand: "Delhi Pasand",
  image: "https://tse2.mm.bing.net/th/id/OIP.mKKcFudhM482hPMlsHSTowAAAA?pid=Api&H=244&W=160",
  inStock: true,
  description: "Easy cook basmati rice - family pack",
  stock: 50
},
{
  name: "Delhi Pasand Light Basmati Rice",
  weight: "5kg",
  price: 400,
  oldPrice: 610,
  discount: "21% OFF",
  category: "Atta Rice Dal",
  brand: "Delhi Pasand",
  image: "https://tse2.mm.bing.net/th/id/OIP.Vc48QXrxsBn6TZ6IUpga2wHaJF?pid=Api&P=0&w=400&h=491",
  inStock: true,
  description: "Light texture basmati rice, fluffy grains",
  stock: 50
},
{
  name: "Delhi Pasand Light Basmati Rice",
  weight: "10kg",
  price: 790,
  oldPrice: 1030,
  discount: "23% OFF",
  category: "Atta Rice Dal",
  brand: "Delhi Pasand",
  image: "https://tse2.mm.bing.net/th/id/OIP.Vc48QXrxsBn6TZ6IUpga2wHaJF?pid=Api&P=0&w=400&h=491",
  inStock: true,
  description: "Light texture basmati - family pack",
  stock: 50
},


// DAAWAT BASMATI RICE (Including Brown Rice)

{
  name: "Daawat Brown Basmati Rice",
  weight: "1kg",
  price: 140,
  oldPrice: 175,
  discount: "20% OFF",
  category: "Atta Rice Dal",
  brand: "Daawat",
  image: "https://tse2.mm.bing.net/th/id/OIP.s2jyNQAz1f8GDciYwKNNSQHaHa?pid=Api&P=0&w=400&h=400",
  inStock: true,
  description: "Healthy brown basmati rice, high fiber",
  stock: 50
},

// own brand rice
// ========== JAGAT STORE EXCLUSIVE - RICE COLLECTION ==========

// BASMATI RICE - PREMIUM QUALITY
{
  name: "Jagat Store Basmati Rice Tukda",
  weight: "1kg",
  price: 60,
  oldPrice: 75,
  discount: "20% OFF",
category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "	https://tse2.mm.bing.net/th/id/OIP.4xE1Fb6OUVbidJizS66cbwHaHQ?pid=Api&H=156&W=160",
  inStock: true,
  description: "Premium basmati rice tukda (broken), perfect for daily use and biryani",
  stock: 100
},
{
  name: "Jagat Store Basmati Rice Pona",
  weight: "1kg",
  price: 80,
  oldPrice: 110,
  discount: "25% OFF",
 category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse1.mm.bing.net/th/id/OIP.bNCc18_0QhbuhU01M6NwcAHaHa?pid=Api&P=0&h=180",
  inStock: true,
  description: "Premium basmati rice pona (half grain), ideal for pulao and fried rice",
  stock: 100
},
{
  name: "Jagat Store Basmati Rice Sabut",
  weight: "1kg",
  price: 110,
  oldPrice: 150,
  discount: "25% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse2.mm.bing.net/th/id/OIP.rmBHG-YDxSWjrE-j38-Q-QHaEJ?pid=Api&H=89&W=160",
  inStock: true,
  description: "Premium whole basmati rice sabut, extra long grain for special occasions",
  stock: 100
},

// SPECIAL BASMATI VARIANTS
{
  name: "Jagat Store Golden Sella Basmati Rice",
  weight: "1kg",
  price: 110,
  oldPrice: 150,
  discount: "25% OFF",
 category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "	https://tse1.mm.bing.net/th/id/OIP.HHh7m2_XM0fiXoTu2883KQHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Premium golden sella basmati rice, parboiled for extra nutrition",
  stock: 100
},
{
  name: "Jagat Store Galaxy Basmati Rice",
  weight: "1kg",
  price: 110,
  oldPrice: 150,
  discount: "25% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse1.mm.bing.net/th/id/OIP.31u8aYU-yOTvjF5VimdVCQHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Premium galaxy basmati rice, aromatic long grain",
  stock: 100
},

// NON-BASMATI RICE
{
  name: "Jagat Store Sona Masoori Rice",
  weight: "1kg",
  price: 52,
  oldPrice: 70,
  discount: "25% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse2.mm.bing.net/th/id/OIP.WO-wyPWEB_ykwQbeah5_BQHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Premium sona masoori rice, light and aromatic South Indian rice",
  stock: 100
},
{
  name: "Jagat Store Kheer Rice",
  weight: "1kg",
  price: 50,
  oldPrice: 68,
  discount: "25% OFF",
 category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse2.mm.bing.net/th/id/OIP.Ug66xnQ0kKyp8KhrW6B0zwAAAA?pid=Api&P=0&w=300&h=300",
  inStock: true,
  description: "Special kheer rice, short grain perfect for kheer and desserts",
  stock: 100
},
{
  name: "Jagat Store Dosa Idli Rice",
  weight: "1kg",
  price: 40,
  oldPrice: 60,
  discount: "30% OFF",
 category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse2.mm.bing.net/th/id/OIP.CcG-5ZjpMGIYMVsr3NPKMwHaFC?pid=Api&H=108&W=160",
  inStock: true,
  description: "Premium dosa idli rice, specially selected for South Indian breakfast",
  stock: 100
},




  
  // DAL (Pulses)

// ========== JAGAT STORE EXCLUSIVE - PULSES & DALS COLLECTION ==========
// ALL PRODUCTS IN 500g (HALF KG) PACK

// POPULAR DALS (Yellow Lentils)
{
  name: "Jagat Store Toor Dal (Arhar Dal)",
  weight: "500g",
  price: 72,
  oldPrice: 80,
  discount: "10% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse2.mm.bing.net/th/id/OIP.vBDDe7TWN0IrwOFB_sDJ8QHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Premium toor dal (arhar dal), rich in protein and fiber",
  stock: 100
},
{
  name: "Jagat Store Toor Dal (Arhar Desi Dal (Chilke wali))",
  weight: "500g",
  price: 65,
  oldPrice: 78,
  discount: "18% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse1.mm.bing.net/th/id/OIP.EGEOubSm2oYsMnMYTLtQ_AHaHa?pid=Api&P=0&w=400&h=400",
  inStock: true,
  description: "Premium toor dal (arhar dal), rich in protein and fiber",
  stock: 100
},
{
  name: "Jagat Store Toor Dal (Arhar Dal (Kanpuriya))",
  weight: "500g",
  price: 76,
  oldPrice: 95,
  discount: "10% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "	https://tse1.mm.bing.net/th/id/OIP.4MJS6PHL2JSglyIdyTuVMwHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Premium toor dal (arhar dal), rich in protein and fiber",
  stock: 100
},
{
  name: "Jagat Store Moong Dal Chilka (Khichdi Wali)",
  weight: "500g",
  price: 60,
  oldPrice: 75,
  discount: "18% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "	https://tse1.mm.bing.net/th/id/OIP.6yGvj_lVc7CQrQ-9VRUsQAHaHY?pid=Api&H=159&W=160",
  inStock: true,
  description: "Premium yellow moong dal, easy to digest and nutritious",
  stock: 100
},
{
  name: "Jagat Store Moong Dal Dhuli (Split)",
  weight: "500g",
  price: 70,
  oldPrice: 82,
  discount: "15% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse1.mm.bing.net/th/id/OIP.LlMJST_6biAUOLciDn4fhAHaG6?pid=Api&P=0&w=429&h=400",
  inStock: true,
  description: "Premium split moong dal, perfect for khichdi",
  stock: 100
},
{
  name: "Jagat Store Moong Sabut (Whole Green Gram)",
  weight: "500g",
  price: 60,
  oldPrice: 78,
  discount: "20% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse2.mm.bing.net/th/id/OIP.quQrbUqjIy4VPVvVEXA8YgHaFy?pid=Api&H=124&W=160",
  inStock: true,
  description: "Whole green moong, high in protein and vitamins",
  stock: 100
},
{
  name: "Jagat Store Lal Masoor Dal Sabut(Red Lentils)",
  weight: "500g",
  price: 60,
  oldPrice: 78,
  discount: "22% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "	https://tse2.mm.bing.net/th/id/OIP.Wz8a2nDHoWvcctkxl8KHTwHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Premium red lentils, quick cooking and delicious",
  stock: 100
},
{
  name: "Jagat Store Lal Masoor Dal Dhali hui (Split Red Lentils)",
  weight: "500g",
  price: 75,
  oldPrice: 84,
  discount: "10% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "	https://tse1.mm.bing.net/th/id/OIP.cpCwo6brB5Ys-6lgjT2E5QHaGt?pid=Api&H=144&W=160",
  inStock: true,
  description: "Whole red lentils with skin, rich in iron",
  stock: 100
},
{
  name: "Jagat Store Chana Dal (Bengal Gram)",
  weight: "500g",
  price: 48,
  oldPrice: 70,
  discount: "30% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "	https://tse1.mm.bing.net/th/id/OIP.IbjW7TL8RKYli8Ci2vhurQHaHa?pid=Api&P=0&w=400&h=400",
  inStock: true,
  description: "Premium chana dal, perfect for dal tadka and snacks",
  stock: 100
},
{
  name: "Jagat Store Urad Chilka (Black Gram Dal)",
  weight: "500g",
  price: 70,
  oldPrice: 85,
    discount: "16% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse1.mm.bing.net/th/id/OIP.i9ZZshZsup8LDpPs25l-9QHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Premium urad dal, essential for South Indian dishes",
  stock: 100
},


//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


{
  name: "Jagat Store Urad Sabut (Whole Black Gram)",
  weight: "500g",
  price: 70,
  oldPrice: 85,
  discount: "16% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse1.mm.bing.net/th/id/OIP.TksezVEA5_k3h3VrWZtHfwHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Whole black gram, perfect for dal makhani",
  stock: 100
},
{
  name: "Jagat Store Urad Dhuli (Split & Washed)",
  weight: "500g",
  price: 82,
  oldPrice: 98,
  discount: "16% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse1.mm.bing.net/th/id/OIP.cCjNk9SuO_pMo_Q5joSQKwHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Split and washed urad dal, for idli and dosa batter",
  stock: 100
},
{
  name: "Jagat Store Masoor Sabut Black (Whole Black Lentils)",
  weight: "500g",
  price: 60,
  oldPrice: 75,
  discount: "18% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse2.mm.bing.net/th/id/OIP.hAYfOrKaZ0fgzaTFYWoeYgHaFc?pid=Api&P=0&w=544&h=400",
  inStock: true,
  description: "Premium whole black masoor lentils, rich in protein and iron",
  stock: 100
},
{
  name: "Jagat Store Masoor Desi Black Choti wali (Split Black Lentils)",
  weight: "500g",
  price: 72,
  oldPrice: 90,
  discount: "20% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse2.mm.bing.net/th/id/OIP.HJKHy9d2v6j_PFcFsI8uJQHaHa?pid=Api&P=0&w=400&h=400",
  inStock: true,
  description: "Premium split black masoor lentils, easy to cook and digest",
  stock: 100
},

// CHICKPEAS & GRAMS
{
  name: "Jagat Store Kabuli Chana Chote (Small) (White Chickpeas)",
  weight: "500g",
  price: 68,
  oldPrice: 80,
  discount: "14% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse1.mm.bing.net/th/id/OIP.754m_HmWfF9UCvcui6mTBgHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Small white chickpeas, perfect for chole and salads",
  stock: 100
},
{
  name: "Jagat Store Kabuli Chana Bde (Dollar) (White Chickpeas)",
  weight: "500g",
  price: 78,
  oldPrice: 90,
  discount: "13% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse1.mm.bing.net/th/id/OIP.WSkrgdUAvpaKfxs-DyYanQHaFc?pid=Api&H=117&W=160",
  inStock: true,
  description: "Small white chickpeas, perfect for chole and salads",
  stock: 100
},
{
  name: "Jagat Store Kala Chana (Black Chickpeas)",
  weight: "500g",
  price: 48,
  oldPrice: 60,
  discount: "20% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "	https://tse1.mm.bing.net/th/id/OIP.Ar4452vXCr47cxhQnSOUgwHaEK?pid=Api&H=89&W=160",
  inStock: true,
  description: "Black chickpeas, high in protein and fiber",
  stock: 100
},


// RAJMA (KIDNEY BEANS)
{
  name: "Jagat Store Rajma (Red Kidney Beans)",
  weight: "500g",
  price: 75,
  oldPrice: 92,
  discount: "18% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "	https://tse2.mm.bing.net/th/id/OIP.ARVyKAM7F-NxuJPMmP9VLwHaJ4?pid=Api&P=0&w=400&h=533",
  inStock: true,
  description: "Premium red rajma, perfect for rajma chawal",
  stock: 100
},
{
  name: "Jagat Store Kashmiri Rajma (Jammu Rajma)",
  weight: "500g",
  price: 79,
  oldPrice: 105,
  discount: "14% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "	https://tse1.mm.bing.net/th/id/OIP.30M1YmfAWn_QML5TYP2BOwAAAA?pid=Api&P=0&w=250&h=172",
  inStock: true,
  description: "Premium Kashmiri rajma, large size and authentic taste",
  stock: 100
},
{
  name: "Jagat Store Chitra Rajma (Speckled Kidney Beans)",
  weight: "500g",
  price: 79,
  oldPrice: 105,
  discount: "14% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "	https://tse2.mm.bing.net/th/id/OIP.XFtUcibL763cQczgh3uzYwHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Chitra rajma with unique speckled pattern",
  stock: 100
},

// SPECIAL BEANS & LENTILS
{
  name: "Jagat Store Lobia (Black Eyed Beans)",
  weight: "500g",
  price: 60,
  oldPrice: 78,
  discount: "22% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse2.mm.bing.net/th/id/OIP.e5t_qMkYiJxIpYXiOiEh8AHaJQ?pid=Api&H=199&W=160",
  inStock: true,
  description: "Premium lobia (black eyed peas), nutritious and delicious",
  stock: 100
},
{
  name: "Jagat Store Moth (Matki Beans)",
  weight: "500g",
  price: 60,
  oldPrice: 78,
  discount: "22% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "	https://tse2.mm.bing.net/th/id/OIP.KaS6PzCJMe6r8FOwwJod4AHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Premium moth beans, perfect for sprouting and curries",
  stock: 100
},
{
  name: "Jagat Store Safed Matar (White Peas)",
  weight: "500g",
  price: 56,
  oldPrice: 70,
  discount: "20% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse1.mm.bing.net/th/id/OIP.JrOyoSc0Ww0ReedAvsofqQAAAA?pid=Api&H=160&W=160",
  inStock: true,
  description: "Premium white peas, perfect for ghugni and curries and chole kulche",
  stock: 100
},


// MIXED & SPECIALTY DALS
{
  name: "Jagat Store Mix Dal (Panchratna Dal)",
  weight: "500g",
  price: 70,
  oldPrice: 80,
  discount: "12% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse1.mm.bing.net/th/id/OIP.sDrgDur52M-lY7uXEY7MtQHaF7?pid=Api&H=127&W=160",
  inStock: true,
  description: "Mix of 5 premium dals, nutritious and flavorful",
  stock: 100
},

{
  name: "Jagat Store Loose Chini (Sugar)",
  weight: "1kg",
  price: 45,
  oldPrice: 52,
  discount: "13% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse2.mm.bing.net/th/id/OIP.5d1JqTOppDkeEnUIwNeBHQHaE7?pid=Api&P=0&w=600&h=400",
  inStock: true,
  description: "🏪 Jagat Store | Pure Loose Sugar | Fresh & Clean",
  stock: 200
},
{
  name: "Jagat Store Loose Chini (Sugar)",
  weight: "5kg",
  price: 225,
  oldPrice: 260,
  discount: "13% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse2.mm.bing.net/th/id/OIP.sppRTPyrXdL-_HvnYKjarwHaEK?pid=Api&P=0&w=500&h=281",
  inStock: true,
  description: "🏪 Jagat Store | Pure Loose Sugar | Bulk Pack",
  stock: 100
},

// ========================================
// 🟢 DHAMPUR GREEN SUGAR
// ========================================
{
  name: "Dhampur Green Sulphurless Sugar",
  weight: "1kg",
  price: 56,
  oldPrice: 65,
  discount: "13% OFF",
  category: "Atta Rice Dal",
  brand: "Dhampur Green",
  image: "	https://tse1.mm.bing.net/th/id/OIP.OnaOndFEZf2rEZ6vU_FqSQHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Dhampur Green | Sulphurless White Sugar | Chemical Free",
  stock: 100
},
{
  name: "Dhampur Green Sulphurless Sugar",
  weight: "5kg",
  price: 276,
  oldPrice: 325,
  discount: "15% OFF",
  category: "Atta Rice Dal",
  brand: "Dhampur Green",
  image: "	https://tse2.mm.bing.net/th/id/OIP.vBsrb74wyKTpLZhI-i8JVAHaHa?pid=Api&P=0&w=400&h=400",
  inStock: true,
  description: "Dhampur Green | Sulphurless White Sugar | Family Pack",
  stock: 80
},

// ========================================
// 🟤 DHAMPUR BROWN SUGAR
// ========================================
{
  name: "Dhampur Green Brown Sugar",
  weight: "1kg",
  price: 95,
  oldPrice: 99,
  discount: "4% OFF",
  category: "Atta Rice Dal",
  brand: "Dhampur Green",
  image: "https://tse2.mm.bing.net/th/id/OIP.68jXCKIZKfvARcPfqq3cTQHaHg?pid=Api&P=0&w=400&h=406",
  inStock: true,
  description: "Dhampur Green | Natural Brown Sugar | Unrefined & Healthy",
  stock: 80
},

// ========================================
// 🌻 FORTUNE SUGAR
// ========================================
{
  name: "Fortune Sugar",
  weight: "1kg",
  price: 56,
  oldPrice: 75,
  discount: "25% OFF",
  category: "Atta Rice Dal",
  brand: "Fortune",
  image: "https://tse2.mm.bing.net/th/id/OIP.f5Ru2roPe8bOQ2TzhUSCGgAAAA?pid=Api&P=0&w=225&h=265",
  inStock: true,
  description: "Fortune | Pure White Sugar | Premium Quality",
  stock: 100
},
{
  name: "Fortune Sugar",
  weight: "5kg",
  price: 276,
  oldPrice: 325,
  discount: "15% OFF",
  category: "Atta Rice Dal",
  brand: "Fortune",
  image: "	https://tse2.mm.bing.net/th/id/OIP.9ak2U76Dckic6rsXC0X80AHaIs?pid=Api&P=0&w=400&h=469",
  inStock: true,
  description: "Fortune | Pure White Sugar | Family Pack",
  stock: 80
},

// 🏪 DESI SUGAR - JAGAT STORE
// ========================================
{
  name: "Jagat Store Bura (Powdered Sugar)",
  weight: "1kg",
  price: 65,
  oldPrice: 78,
  discount: "16% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "	https://tse2.mm.bing.net/th/id/OIP.lMm4C7YtVKjgQ-TZRC2h6gHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "🏪 Jagat Store | Desi Bura | Pure & Fresh | For Sweets & Prasad",
  stock: 100
},
{
  name: "Jagat Store Khand (Raw Sugar)",
  weight: "1kg",
  price: 75,
  oldPrice: 90,
  discount: "16% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse2.mm.bing.net/th/id/OIP.ii3ZvH8ONod4p-iOHmPNGgHaHa?pid=Api&P=0&w=400&h=400",
  inStock: true,
  description: "🏪 Jagat Store | Desi Khand | Natural Unrefined Sugar",
  stock: 100
},

{
  name: "Jagat Store Gud (Jaggery)",
  weight: "1kg",
  price: 60,
  oldPrice: 78,
  discount: "22% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "	https://tse2.mm.bing.net/th/id/OIP.jCmUpZ5hb-KlHHH9XcOD-wHaHM?pid=Api&H=155&W=160",
  inStock: true,
  description: "🏪 Jagat Store | Desi Gud | Pure Sugarcane Jaggery | Chemical Free",
  stock: 100
},
{
  name: "Jagat Store Mishri (Rock Sugar)",
  weight: "250g",
  price: 25,
  oldPrice: 30,
  discount: "17% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse2.mm.bing.net/th/id/OIP.z_J4Te9-PSH0_iTYV8zKywHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "🏪 Jagat Store | Desi Mishri | Pure Crystal Sugar | For Prasad & Tea",
  stock: 100
},
{
  name: "Jagat Store Dhaga Mishri (Thread Crystal)",
  weight: "500g",
  price: 54,
  oldPrice: 68,
  discount: "20% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse2.mm.bing.net/th/id/OIP.bS8iV6to5cpf_M9v5G9yJwHaEl?pid=Api&H=98&W=160",
  inStock: true,
  description: "🏪 Jagat Store | Dhaga Mishri | Thread Rock Sugar | Premium Quality",
  stock: 80
},


{
  name: "Tata Salt",
  weight: "1kg",
  price: 28,
  oldPrice: 30,
  discount: "5% OFF",
  category: "Atta Rice Dal",
  brand: "Tata",
  image: "https://tse2.mm.bing.net/th/id/OIP.CeDJC6seXTQ_0-cMVGneDQHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Tata Salt | Desh Ka Namak | Iodized Salt",
  stock: 150
},
{
  name: "Tata Salt Lite (Low Sodium)",
  weight: "1kg",
  price: 48,
  oldPrice: 50,
  discount: "4% OFF",
  category: "Atta Rice Dal",
  brand: "Tata",
  image: "https://tse2.mm.bing.net/th/id/OIP.N-QYtLS1QtcrXj_GL6lhegHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Tata Salt Lite | 15% Less Sodium | Heart Healthy",
  stock: 100
},
{
  name: "Tata Rock Salt (Pink Salt)",
  weight: "1kg",
  price: 89,
  oldPrice: 99,
  discount: "10% OFF",
  category: "Atta Rice Dal",
  brand: "Tata",
  image: "	https://tse2.mm.bing.net/th/id/OIP.Ot2x3xpw0v7KKG-ecaHAvgHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Tata Pink Salt | Himalayan Rock Salt | Natural Minerals",
  stock: 100
},
{
    name: 'Amul Cow Ghee',
    weight: '1L',
    price: 664,
    oldPrice: 685,
    discount: '3% OFF',
    category: 'Atta Rice Dal',
    brand: 'Amul',
    image: '	https://tse2.mm.bing.net/th/id/OIP.MxBzfFcVcaX8b_zLGt-EFwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Amul Cow Ghee | Pure & Natural | Rich Aroma | Traditional Taste | 1L Jar',
    stock: 50
},

// ========================================
// 🟠 CATCH SALT
// ========================================
{
  name: "Catch Himalayan Rock Salt",
  weight: "1kg",
  price: 120,
  oldPrice: 130,
  discount: "7% OFF",
  category: "Atta Rice Dal",
  brand: "Catch",
  image: "	https://tse2.mm.bing.net/th/id/OIP.wawKG52laFSsIuCJkrKsOwHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Catch | Himalayan Pink Rock Salt | 100% Natural",
  stock: 100
},
{
  name: 'Sugar Lite Low Calorie Sugar',
  weight: '500g',
  price: 114,
  oldPrice: 120,
  discount: '5% OFF',
  category: 'Atta Rice Dal',
  brand: 'Sugar Lite',
  image: 'https://tse2.mm.bing.net/th/id/OIP.1OSgUknJHluRadAFCcavdQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Sugar Lite | Low Calorie Sugar | 50% Fewer Calories | 500g',
  stock: 60
},

// ========================================
// 🟢 PURO SALT
// ========================================
{
  name: "Puro Healthy Salt",
  weight: "1kg",
  price: 110,
  oldPrice: 115,
  discount: "4% OFF",
  category: "Atta Rice Dal",
  brand: "Puro",
  image: "https://tse2.mm.bing.net/th/id/OIP.Np4ag4vx4VFR-LpvSTxj9wHaFb?pid=Api&H=117&W=160",
  inStock: true,
  description: "Puro Salt | Unrefined Sea Salt | Triple Refined",
  stock: 100
},

// ========================================
// 🏪 JAGAT STORE SENDHA NAMAK
// ========================================
{
  name: "Jagat Store Sendha Namak (Rock Salt)",
  weight: "500g",
  price: 34,
  oldPrice: 40,
  discount: "15% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse1.mm.bing.net/th/id/OIP.ODZFE0MVZCiyMmn8rRyVdgHaFU?pid=Api&H=114&W=160",
  inStock: true,
  description: "🏪 Jagat Store | Pure Sendha Namak | For Vrat & Daily Use",
  stock: 100
},
{
  name: "Jagat Store Sendha Namak (Rock Salt)",
  weight: "1kg",
  price: 62,
  oldPrice: 72,
  discount: "16% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse1.mm.bing.net/th/id/OIP.hPIpsRgWzECTnOfn8YxIcwHaEK?pid=Api&H=89&W=160",
  inStock: true,
  description: "🏪 Jagat Store | Pure Sendha Namak | For Vrat & Daily Use",
  stock: 100
},

// ========================================
// 🏪 JAGAT STORE KALA NAMAK
// ========================================
{
  name: "Jagat Store Kala Namak (Black Salt)",
  weight: "200g",
  price: 18,
  oldPrice: 28,
  discount: "33% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse1.mm.bing.net/th/id/OIP.5M0Cw59Uz_ZB0wFpRBVS1wHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "🏪 Jagat Store | Pure Kala Namak | For Chaat & Raita",
  stock: 100
},

// ========================================
// 🌶️ CATCH SPRINKLERS
// ========================================
{
  name: "Catch Black Salt Sprinkler",
  weight: "100g",
  price: 45,
  oldPrice: 47,
  discount: "18% OFF",
 category: "Atta Rice Dal",
  brand: "Catch",
  image: "	https://tse1.mm.bing.net/th/id/OIP.-1t8Z2XIKnaxa1lAk1isuAHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Catch | Black Salt Sprinkler | Easy Pour | Table Top",
  stock: 80
},
{
  name: "Catch Table Salt Sprinkler",
  weight: "200g",
  price: 43,
  oldPrice: 45,
  discount: "4% OFF",
  category: "Atta Rice Dal",
  brand: "Catch",
  image: "https://tse1.mm.bing.net/th/id/OIP.nRoirm0I6Ok2L77e3PPFaAHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Catch | Iodized Salt Sprinkler | Easy Pour | Table Top",
  stock: 80
},
{
  name: "Catch Black Pepper Sprinkler",
  weight: "50g",
  price: 55,
  oldPrice: 65,
  discount: "15% OFF",
  category: "Atta Rice Dal",
  brand: "Catch",
  image: "https://tse2.mm.bing.net/th/id/OIP.0bfPGqBna2LMspLlrfhUBgAAAA?pid=Api&H=160&W=80",
  inStock: true,
  description: "Catch | Black Pepper Sprinkler | Freshly Ground | Table Top",
  stock: 80
},
{
  name: "Catch Chaat Masala Sprinkler",
  weight: "50g",
  price: 48,
  oldPrice: 58,
  discount: "17% OFF",
  category: "Atta Rice Dal",
  brand: "Catch",
  image: "https://tse1.mm.bing.net/th/id/OIP.ZoHakgE9a10uuiUcEsoPowAAAA?pid=Api&H=195&W=160",
  inStock: true,
  description: "Catch | Chaat Masala Sprinkler | Tangy & Spicy | Table Top",
  stock: 80
},


















// BESAN (RAJDHANI)
{
  name: 'Rajdhani Besan',
  weight: '500g',
  price: 65,
  oldPrice: 78,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Rajdhani',
  image: '	https://tse1.mm.bing.net/th/id/OIP.LO2tbhcdvJEDvKAeflp_YgHaGw?pid=Api&H=145&W=160',
  inStock: true,
  description: 'Rajdhani Besan | Pure Gram Flour | 500g',
  stock: 150
},
{
  name: 'Rajdhani Besan',
  weight: '1kg',
  price: 125,
  oldPrice: 150,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Rajdhani',
  image: 'https://tse2.mm.bing.net/th/id/OIP.tgp6-GRoIkZekcZ5nlGodgHaJK?pid=Api&H=197&W=160',
  inStock: true,
  description: 'Rajdhani Besan | Pure Gram Flour | 1kg',
  stock: 120
},

// SOOJI (RAJDHANI)
{
  name: 'Rajdhani Sooji',
  weight: '500g',
  price: 45,
  oldPrice: 55,
  discount: '18% OFF',
  category: 'Atta Rice Dal',
  brand: 'Rajdhani',
  image: '	https://tse2.mm.bing.net/th/id/OIP.8KWqUYahsMqIaEY6nIG2-AHaKr?pid=Api&H=230&W=160',
  inStock: true,
  description: 'Rajdhani Sooji | Semolina | Rava | 500g',
  stock: 140
},

// MAIDA (RAJDHANI)
{
  name: 'Rajdhani Maida',
  weight: '500g',
  price: 40,
  oldPrice: 48,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Rajdhani',
  image: 'https://tse1.mm.bing.net/th/id/OIP.fi7e8jIMhCntDx7xH6ZtnAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Rajdhani Maida | All Purpose Flour | Refined | 500g',
  stock: 130
},

// DALIA (RAJDHANI)
{
  name: 'Rajdhani Dalia',
  weight: '500g',
  price: 42,
  oldPrice: 50,
  discount: '16% OFF',
  category: 'Atta Rice Dal',
  brand: 'Rajdhani',
  image: 'https://tse2.mm.bing.net/th/id/OIP.TQqbqMTAxKlB0D4hHKZlSAAAAA?pid=Api&H=162&W=160',
  inStock: true,
  description: 'Rajdhani Dalia | Broken Wheat | High Fiber | 500g',
  stock: 100
},
{
  name: 'Rajdhani Roasted Dalia',
  weight: '500g',
  price: 48,
  oldPrice: 58,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Rajdhani',
  image: '	https://tse2.mm.bing.net/th/id/OIP.xdaoNDygR17zWpFqkCKKhAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Rajdhani Roasted Dalia | Broken Wheat | Ready to Cook | 500g',
  stock: 90
},

// MOONGFALI (PEANUTS)
{
  name: 'Moongfali (Peanuts)',
  weight: '250g',
  price: 35,
  oldPrice: 42,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.BOC0rkJ47sm3w_JQgWySDgHaG5?pid=Api&H=148&W=160',
  inStock: true,
  description: 'Raw Peanuts | Moongfali | Premium Quality | 250g',
  stock: 180
},


// GEHU, BAJRA, MAKKA (LOOSE)
{
  name: 'Gehu (Wheat) Loose',
  weight: '1kg',
  price: 35,
  oldPrice: 42,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.CUalj9eUhzvADo3zFNXf1AHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Premium Wheat Grain | Gehu | Loose | 1kg',
  stock: 200
},
{
  name: 'Bajra (Pearl Millet) Loose',
  weight: '1kg',
  price: 45,
  oldPrice: 55,
  discount: '18% OFF',
  category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.P0TSVuDzCoiAxTtK4hC_qgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Bajra | Pearl Millet | Whole Grain | Loose | 1kg',
  stock: 100
},
{
  name: 'Makka (Corn) Loose',
  weight: '1kg',
  price: 40,
  oldPrice: 48,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.FdRFOR4yYCrFB3C08aDGUgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Makka | Corn Grain | Whole | Loose | 1kg',
  stock: 120
},

// POPCORN MAKKA
{
  name: 'Popcorn Makka Loose',
  weight: '250g',
  price: 30,
  oldPrice: 36,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.BlnyQsmKctAYvVxJgoNm0wHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Popcorn Corn Kernels | Makka | Ready to Pop | 250g',
  stock: 150
},


// POHA (RAJDHANI)
{
  name: 'Rajdhani Poha',
  weight: '500g',
  price: 45,
  oldPrice: 54,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Rajdhani',
  image: 'https://tse2.mm.bing.net/th/id/OIP.xtqRc1B_4yzNeth_MvRvPQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Rajdhani Poha | Flattened Rice | Chiwda | 500g',
  stock: 130
},
{
  name: 'GM Poha',
  weight: '500g',
  price: 45,
  oldPrice: 54,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Rajdhani',
  image: 'https://tse2.mm.bing.net/th/id/OIP.aDsxPFMDA71q4xDK13Gu4gAAAA?pid=Api&H=199&W=160',
  inStock: true,
  description: 'GM Poha | Flattened Rice | Chiwda | 500g',
  stock: 130
},

// POHA (JAGAT STORE LOOSE)
{
  name: 'Poha Mota (Thick) Loose',
  weight: '500g',
  price: 35,
  oldPrice: 42,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.thG78WcOqh37Qpdcr_kuqwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Jagat Store Poha | Thick Flattened Rice | Mota Chiwda | 500g',
  stock: 140
},
{
  name: 'Poha Patla (Thin) Loose',
  weight: '500g',
  price: 35,
  oldPrice: 42,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.bOTYkMvVUCuUto98T_Jz5QAAAA?pid=Api&H=120&W=160',
  inStock: true,
  description: 'Jagat Store Poha | Thin Flattened Rice | Patla Chiwda | 500g',
  stock: 140
},

// SOYABEAN BADI (JAGAT STORE)
{
  name: 'Soyabean Badi Big Size',
  weight: '200g',
  price: 45,
  oldPrice: 55,
  discount: '18% OFF',
  category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.u42l7Rjj1rfF4ZIPEuU4qwHaHB?pid=Api&H=151&W=160',
  inStock: true,
  description: 'Jagat Store Soya Chunks | Big Size Badi | High Protein | 200g',
  stock: 120
},
{
  name: 'Soyabean Badi Small Size',
  weight: '200g',
  price: 42,
  oldPrice: 50,
  discount: '16% OFF',
  category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.J7L9XMJ06LVq3xFVakmR2wHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Jagat Store Soya Chunks | Small Size Badi | High Protein | 200g',
  stock: 120
},

// NUTRELA SOYA (RED & GREEN)
{
  name: 'Nutrela Soya Chunks',
  weight: '200g',
  price: 55,
  oldPrice: 66,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Nutrela',
  image: '	https://tse1.mm.bing.net/th/id/OIP.l8tmITFsbAXx99CSC4y2mAAAAA?pid=Api&H=259&W=160',
  inStock: true,
  description: 'Nutrela Soya Chunks | High Protein | Red Pack | 200g',
  stock: 100
},
{
  name: 'Nutrela Soya Mini Chunks',
  weight: '200g',
  price: 52,
  oldPrice: 62,
  discount: '16% OFF',
  category: 'Atta Rice Dal',
  brand: 'Nutrela',
  image: '	https://tse2.mm.bing.net/th/id/OIP.5lQqSlS_AE2ndjrYdsWUgQHaJF?pid=Api&H=196&W=160',
  inStock: true,
  description: 'Nutrela Soya Mini Chunks | High Protein | Green Pack | 200g',
  stock: 100
},

// JAGAT STORE PASTA
{
  name: 'Jagat Store Pasta Spiral',
  weight: '400g',
  price: 45,
  oldPrice: 55,
  discount: '18% OFF',
  category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.H2lhQtBT9-z9qdtQoOBEzwHaGT?pid=Api&H=136&W=160',
  inStock: true,
  description: 'Jagat Store Spiral Pasta | Fusilli | Macaroni | 400g',
  stock: 110
},
{
  name: 'Jagat Store Pasta Penne',
  weight: '400g',
  price: 45,
  oldPrice: 55,
  discount: '18% OFF',
  category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.CL-WGztMcQgHcJTC-tWV6gHaE8?pid=Api&P=0&w=600&h=400',
  inStock: true,
  description: 'Jagat Store Penne Pasta | Tube Shape | 400g',
  stock: 110
},

// COMPANY PASTA (BRANDED)
{
  name: 'Pasta Penne Branded',
  weight: '70g',
  price: 25,
  oldPrice: 30,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Sunfeast',
  image: 'https://tse2.mm.bing.net/th/id/OIP.mQWONPlHcX2pK-xand8k_QHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Sunfeast Pasta Treat | Masala | Instant | 70g',
  stock: 150
},
{
  name: 'Pasta Spiral Branded',
  weight: '70g',
  price: 25,
  oldPrice: 30,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Sunfeast',
  image: 'https://tse2.mm.bing.net/th/id/OIP.HhRvMYO98oZYLXS0Oi0dcQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Sunfeast Pasta Treat | Masala | Instant | 70g',
  stock: 150
},
{
  name: 'Bambino Macaroni',
  weight: '400g',
  price: 52,
  oldPrice: 62,
  discount: '16% OFF',
  category: 'Atta Rice Dal',
  brand: 'Bambino',
  image: 'https://tse1.mm.bing.net/th/id/OIP.x3o0Wazg0PPd4M8TE5LD9wHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Bambino Premium Macaroni | Pasta | 400g',
  stock: 100
},
{
  name: 'Bambino Macaroni',
  weight: '800g',
  price: 52,
  oldPrice: 62,
  discount: '16% OFF',
  category: 'Atta Rice Dal',
  brand: 'Bambino',
  image: 'https://tse2.mm.bing.net/th/id/OIP.DUsgJROiY8oJSR55bvyjmQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Bambino Premium Macaroni | Pasta | 400g',
  stock: 100
},

// VERMICELLI (BAMBINO)
{
  name: 'Bambino Vermicelli Plain',
  weight: '500g',
  price: 48,
  oldPrice: 58,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Bambino',
  image: '	https://tse2.mm.bing.net/th/id/OIP.OV7xgBHyqmRevChEIPmNOQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Bambino Vermicelli | Plain | Seviyan | 500g',
  stock: 120
},
{
  name: 'Bambino Vermicelli Plain',
  weight: '1kg',
  price: 92,
  oldPrice: 110,
  discount: '16% OFF',
  category: 'Atta Rice Dal',
  brand: 'Bambino',
  image: 'https://tse2.mm.bing.net/th/id/OIP.Cb--16xaWlVGLkFJDhgrgQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Bambino Vermicelli | Plain | Seviyan | 1kg',
  stock: 80
},
{
  name: 'Bambino Vermicelli Roasted',
  weight: '500g',
  price: 52,
  oldPrice: 62,
  discount: '16% OFF',
  category: 'Atta Rice Dal',
  brand: 'Bambino',
  image: '	https://tse1.mm.bing.net/th/id/OIP.pQKjKdC_zHPoAqappMYqCQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Bambino Roasted Vermicelli | Seviyan | 500g',
  stock: 100
},
{
  name: 'Bambino Vermicelli Roasted',
  weight: '1kg',
  price: 99,
  oldPrice: 120,
  discount: '18% OFF',
  category: 'Atta Rice Dal',
  brand: 'Bambino',
  image: 'https://tse2.mm.bing.net/th/id/OIP.58AC4-v5Ygl8NrEsHOb7UAHaKv?pid=Api&H=231&W=160',
  inStock: true,
  description: 'Bambino Roasted Vermicelli | Seviyan | 1kg',
  stock: 70
},

// JAGAT STORE BADI (URAD & MOONG)
{
  name: 'Urad Badi',
  weight: '250g',
  price: 65,
  oldPrice: 78,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP._ejmypahnCQvFTw5eH7TlwHaJ4?pid=Api&H=213&W=160',
  inStock: true,
  description: 'Jagat Store Urad Badi | Black Gram Vadi | 250g',
  stock: 80
},
{
  name: 'Moong Badi',
  weight: '250g',
  price: 70,
  oldPrice: 85,
  discount: '18% OFF',
  category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.1Tmrg2kQFp7r2q9o9jF9GQAAAA?pid=Api&H=146&W=160',
  inStock: true,
  description: 'Jagat Store Moong Badi | Green Gram Vadi | 250g',
  stock: 80
},

// BHUNA CHANA
{
  name: 'Bhuna Chana (Roasted Chickpeas)',
  weight: '200g',
  price: 30,
  oldPrice: 36,
  discount: '17% OFF',
  category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.YoAGcMYzZpgNjbwW0nSVegHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Bhuna Chana | Roasted Chickpeas | Healthy Snack | 200g',
  stock: 150
},
{
  name: 'Bhuna Chana (Roasted Chickpeas)',
  weight: '1kg',
  price: 140,
  oldPrice: 170,
  discount: '18% OFF',
  category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.ckWDrPHUhq2z3e9FsgCSggHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Bhuna Chana | Roasted Chickpeas | Healthy Snack | 1kg',
  stock: 80
},

// AJINOMOTO

{
  name: 'Ajinomoto (MSG) Loose',
  weight: '250g',
  price: 55,
  oldPrice: 65,
  discount: '15% OFF',
   category: 'Atta Rice Dal',
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.yRJJ7QGRxIPL7KOr2CCt4gHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Ajinomoto | Monosodium Glutamate | Taste Enhancer | 250g',
  stock: 80
},

// MAGGI MASALA (TASTEMAKER)
{
  name: 'Maggi Masala-ae-Magic',
  weight: '6g x 10',
  price: 30,
  oldPrice: 36,
  discount: '17% OFF',
    category: 'Atta Rice Dal',
  brand: 'Maggi',
  image: 'https://tse1.mm.bing.net/th/id/OIP.5KuYD2XDFlQ_aPlaeDWNmAHaEl?pid=Api&P=0&w=647&h=400',
  inStock: true,
  description: 'Maggi Masala-ae-Magic | Seasoning | Pack of 10 Sachets',
  stock: 150
},
 { 
    name: "Jagat Store Jaggery Powder", 
    weight: "1kg", 
    price: 75, 
    oldPrice: 90, 
    discount: "15% OFF", 
    category: "Atta Rice Dal", 
    brand: "Jagat Store", 
    image: "https://tse1.mm.bing.net/th/id/OIP.F_oBJygAwbpGYJ6H1JtxlAHaHa?pid=Api&H=160&W=160", 
    inStock: true, 
    description: "Own brand Gud Powder",
    stock: 50
  },
  {
    name: 'Jagat Store Khane Ka Soda',
    weight: '100g',
    price: 15,
    oldPrice: 20,
    discount: '25% OFF',
    category: 'Atta Rice Dal',
    brand: 'Jagat Store',
    image: 'https://tse2.mm.bing.net/th/id/OIP.iyEZE_lFywC6D4V3WgAJBQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Jagat Store Khane Ka Soda | Cooking Soda | For Soft Pakoras & Bhajis | 100g Pack',
    stock: 50
},
{
    name: 'Jagat Store Sama Ke Chawal (Vrat)',
    weight: '250g',
    price: 65,
    oldPrice: 85,
    discount: '24% OFF',
    category: 'Atta Rice Dal',
    brand: 'Jagat Store',
    image: '	https://tse1.mm.bing.net/th/id/OIP.rHL1wLHXl7vFn7cO97EG8AHaEK?pid=Api&P=0&w=711&h=400',
    inStock: true,
    description: 'Jagat Store Sama Ke Chawal | Vrat Special | Barnyard Millet | Fasting Rice | 250g',
    stock: 100
},
{
    name: 'Jagat Store Cholai Bhuni-Rajgiri (Roasted Amaranth)',
    weight: '250g',
    price: 85,
    oldPrice: 105,
    discount: '19% OFF',
    category: 'Atta Rice Dal',
    brand: 'Jagat Store',
    image: 'https://tse1.mm.bing.net/th/id/OIP.jR6pbfIiPZ6ZxbGe2SlYiwHaJC?pid=Api&P=0&w=400&h=488',
    inStock: true,
    description: 'Jagat Store Cholai Bhuni | Roasted Amaranth | Vrat Special | Ready to Eat | 250g',
    stock: 100
},
{
    name: 'Jagat Store Cholai Plain-Rajgiri (Raw Amaranth)',
    weight: '250g',
    price: 65,
    oldPrice: 85,
    discount: '24% OFF',
    category: 'Atta Rice Dal',
    brand: 'Jagat Store',
    image: 'https://tse1.mm.bing.net/th/id/OIP.FTF0m17XDp1NJ4JiI2Br9QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Jagat Store Cholai Plain | Raw Amaranth Seeds | Vrat Special | High Protein | 250g',
    stock: 100
},

{
    name: 'Chaman Achar Masala',
    weight: '200g',
    price: 85,
    oldPrice: 100,
    discount: '15% OFF',
    category: 'Atta Rice Dal',
    brand: 'Chaman',
    image: 'https://tse2.mm.bing.net/th/id/OIP.hYqEJ06KsjUuAO4kwSMQTQHaEl?pid=Api&H=98&W=160',
    inStock: true,
    description: 'Chaman Achar Masala | Traditional Pickle Spice Mix | Authentic Taste | 200g Pack',
    stock: 80
},
{
    name: 'Chaman Achar Masala',
    weight: '500g',
    price: 195,
    oldPrice: 230,
    discount: '15% OFF',
    category: 'Atta Rice Dal',
    brand: 'Chaman',
    image: 'https://tse1.mm.bing.net/th/id/OIP.zSF4QMwLY-QCstxQLYxEawAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Chaman Achar Masala | Traditional Pickle Spice Mix | Authentic Taste | 500g Pack',
    stock: 60
}





];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🌾 Starting Smart Migration for Atta, Rice & Dal Products...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    // Get all existing products in this category
    const existingProducts = await Product.find({ category: "Atta Rice Dal" });
    
    // Create a map of existing products for quick lookup
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    // Create a set of products from our source
    const sourceProductKeys = new Set();
    
    // Process each product from source
    for (const productData of attaRiceDalProducts) {
      const key = `${productData.name}_${productData.weight}`;
      sourceProductKeys.add(key);
      
      const existingProduct = existingMap.get(key);
      
      if (!existingProduct) {
        // ADD NEW PRODUCT
        await Product.create(productData);
        console.log(`✅ ADDED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
        added++;
      } else {
        // CHECK IF UPDATE NEEDED
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
          // UPDATE PRODUCT
          await Product.findByIdAndUpdate(existingProduct._id, productData);
          console.log(`🔄 UPDATED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
          updated++;
        } else {
          console.log(`⏭️  UNCHANGED: ${productData.name} (${productData.weight})`);
          unchanged++;
        }
      }
    }
    
    // DELETE products that are no longer in source
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
    
    // Summary
    console.log('\n' + '━'.repeat(60));
    console.log('\n📊 MIGRATION SUMMARY:');
    console.log(`   ✅ Added: ${added}`);
    console.log(`   🔄 Updated: ${updated}`);
    console.log(`   ⏭️  Unchanged: ${unchanged}`);
    console.log(`   ❌ Deleted: ${deleted}`);
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Atta Rice Dal" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

// Run migration
smartMigrate();