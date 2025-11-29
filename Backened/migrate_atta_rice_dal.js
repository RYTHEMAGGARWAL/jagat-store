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
  price: 75,
  oldPrice: 84,
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
  price: 80,
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
  price: 65,
  oldPrice: 78,
  discount: "15% OFF",
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
  price: 75,
  oldPrice: 95,
  discount: "18% OFF",
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
  price: 65,
  oldPrice: 78,
  discount: "15% OFF",
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
  discount: "21% OFF",
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
  price: 50,
  oldPrice: 75,
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
    discount: "15% OFF",
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
  price: 75,
  oldPrice: 85,
  discount: "13% OFF",
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
  price: 85,
  oldPrice: 98,
  discount: "11% OFF",
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
  oldPrice: 85,
  discount: "12% OFF",
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
  price: 70,
  oldPrice: 90,
  discount: "13% OFF",
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
  price: 70,
  oldPrice: 80,
  discount: "13% OFF",
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
  price: 80,
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
  price: 50,
  oldPrice: 75,
  discount: "13% OFF",
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
  price: 80,
  oldPrice: 92,
  discount: "13% OFF",
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
  price: 95,
  oldPrice: 110,
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
  price: 80,
  oldPrice: 88,
  discount: "15% OFF",
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
  price: 68,
  oldPrice: 78,
  discount: "13% OFF",
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
  price: 65,
  oldPrice: 75,
  discount: "13% OFF",
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
  price: 55,
  oldPrice: 65,
  discount: "15% OFF",
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
  discount: "13% OFF",
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
  price: 42,
  oldPrice: 48,
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
  price: 205,
  oldPrice: 240,
  discount: "15% OFF",
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
  price: 52,
  oldPrice: 60,
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
  price: 255,
  oldPrice: 299,
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
  price: 85,
  oldPrice: 99,
  discount: "14% OFF",
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
  price: 48,
  oldPrice: 55,
  discount: "13% OFF",
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
  price: 235,
  oldPrice: 275,
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
  discount: "17% OFF",
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
  price: 58,
  oldPrice: 70,
  discount: "17% OFF",
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
  price: 72,
  oldPrice: 85,
  discount: "15% OFF",
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
  price: 45,
  oldPrice: 55,
  discount: "18% OFF",
  category: "Atta Rice Dal",
  brand: "Jagat Store",
  image: "https://tse2.mm.bing.net/th/id/OIP.z_J4Te9-PSH0_iTYV8zKywHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "🏪 Jagat Store | Desi Mishri | Pure Crystal Sugar | For Prasad & Tea",
  stock: 100
},
{
  name: "Jagat Store Dhaga Mishri (Thread Crystal)",
  weight: "250g",
  price: 55,
  oldPrice: 68,
  discount: "19% OFF",
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
  oldPrice: 32,
  discount: "13% OFF",
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
  price: 42,
  oldPrice: 48,
  discount: "13% OFF",
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
  price: 45,
  oldPrice: 52,
  discount: "13% OFF",
  category: "Atta Rice Dal",
  brand: "Tata",
  image: "	https://tse2.mm.bing.net/th/id/OIP.Ot2x3xpw0v7KKG-ecaHAvgHaHa?pid=Api&H=160&W=160",
  inStock: true,
  description: "Tata Pink Salt | Himalayan Rock Salt | Natural Minerals",
  stock: 100
},

// ========================================
// 🟠 CATCH SALT
// ========================================
{
  name: "Catch Himalayan Rock Salt",
  weight: "1kg",
  price: 48,
  oldPrice: 58,
  discount: "17% OFF",
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
  price: 275,
  oldPrice: 335,
  discount: '18% OFF',
  category: 'Grocery',
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
  oldPrice: 40,
  discount: "13% OFF",
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
  price: 32,
  oldPrice: 40,
  discount: "20% OFF",
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
  price: 58,
  oldPrice: 72,
  discount: "19% OFF",
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
  price: 25,
  oldPrice: 32,
  discount: "22% OFF",
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
  oldPrice: 55,
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
  weight: "100g",
  price: 38,
  oldPrice: 45,
  discount: "16% OFF",
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