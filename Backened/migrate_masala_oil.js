// migrate_masala_oil_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_masala_oil_IMPROVED.js

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

// ========== MASALA & OIL PRODUCTS ==========
const masalaOilProducts = [
  // COOKING OILS



  // ========== COMPLETE OIL & REFINED COLLECTION ==========

// ==========================================
// NATURE FRESH OILS
// ==========================================

// NATURE FRESH MUSTARD OIL
{
  name: 'Nature Fresh Mustard Oil Pouch',
  weight: '1L',
  price: 178,
  oldPrice: 205,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Nature Fresh',
  image: '	https://tse1.mm.bing.net/th/id/OIP.tJn07UnQNXqMsTHMMVoXPwHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: 'Premium mustard oil pouch',
  stock: 100
},
{
  name: 'Nature Fresh Mustard Oil Bottle',
  weight: '1L',
  price: 183,
  oldPrice: 210,
  discount: '9% OFF',
  category: 'Masala Oil',
  brand: 'Nature Fresh',
  image: 'https://tse1.mm.bing.net/th/id/OIP.VTiKS1G0uGWjVhXjIHWx9wHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Premium mustard oil bottle',
  stock: 100
},
{
  name: 'Nature Fresh Mustard Oil Can',
  weight: '5L',
  price: 900,
  oldPrice: 1120,
  discount: '9% OFF',
  category: 'Masala Oil',
  brand: 'Nature Fresh',
  image: 'https://tse2.mm.bing.net/th/id/OIP.G-jBGqANORQzCBKmURD4CQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Large can mustard oil',
  stock: 80
},

// NATURE FRESH REFINED OIL
{
  name: 'Nature Fresh Refined Oil Pouch',
  weight: '750ml',
  price: 135,
  oldPrice: 150,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Nature Fresh',
  image: 'https://tse1.mm.bing.net/th/id/OIP.bHNrup-Pt7LSzmJODs4BUwHaHl?pid=Api&H=163&W=160',
  inStock: true,
  description: 'Premium refined vegetable oil pouch',
  stock: 100
},
{
  name: 'Nature Fresh Refined Oil Can',
  weight: '5L',
  price: 705,
  oldPrice: 780,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Nature Fresh',
  image: '	https://tse1.mm.bing.net/th/id/OIP.SeVjDRLfjmJu2xMQjgVShwHaHb?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Large can refined oil',
  stock: 80
},

// NATURE FRESH SUNFLOWER REFINED
{
  name: 'Nature Fresh Sunflower Refined Oil Pouch',
  weight: '1L',
  price: 170,
  oldPrice: 188,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Nature Fresh',
  image: '	https://tse2.mm.bing.net/th/id/OIP.Tv0nd3emYxy2VZ6VHB7zbAHaJ3?pid=Api&P=0&w=400&h=533',
  inStock: true,
  description: 'Premium sunflower refined oil pouch',
  stock: 100
},

// NATURE FRESH GROUNDNUT OIL
{
  name: 'Nature Fresh Groundnut Oil Bottle',
  weight: '1L',
  price: 195,
  oldPrice: 215,
  discount: '9% OFF',
  category: 'Masala Oil',
  brand: 'Nature Fresh',
  image: 'https://tse1.mm.bing.net/th/id/OIP.6ru5q0JqAvwFYfC4mmijdwAAAA?pid=Api&P=0&w=375&h=500',
  inStock: true,
  description: 'Pure groundnut oil bottle',
  stock: 90
},

// ==========================================
// FORTUNE OILS
// ==========================================

// FORTUNE SOYABEAN OIL
{
  name: 'Fortune Mustard Oil Pouch',
  weight: '1L',
  price: 180,
  oldPrice: 205,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Fortune',
  image: '	https://tse2.mm.bing.net/th/id/OIP._BfEUXjXQTBfhATctZfA7QAAAA?pid=Api&H=245&W=160',
  inStock: true,
  description: 'Fortune mustard oil pouch',
  stock: 100
},
{
  name: 'Fortune Mustard Oil Bottle',
  weight: '1L',
  price: 185,
  oldPrice: 210,
  discount: '9% OFF',
  category: 'Masala Oil',
  brand: 'Fortune',
  image: 'https://tse1.mm.bing.net/th/id/OIP.7Yn5MuLfsyrOo47KET4TpAHaGq?pid=Api&H=143&W=160',
  inStock: true,
  description: 'Fortune mustard oil bottle',
  stock: 100
},
{
  name: 'Fortune Mustard Oil Can',
  weight: '5L',
  price: 905,
  oldPrice: 1120,
  discount: '9% OFF',
  category: 'Masala Oil',
  brand: 'Fortune',
  image: '	https://tse2.mm.bing.net/th/id/OIP.PP1xNs_sHLiMy8PPG6WiBAAAAA?pid=Api&H=151&W=160',
  inStock: true,
  description: 'Fortune mustard oil large can',
  stock: 80
},

// FORTUNE REFINED OIL
{
  name: 'Fortune Refined Oil Pouch',
  weight: '750ml',
  price: 130,
  oldPrice: 152,
  discount: '9% OFF',
  category: 'Masala Oil',
  brand: 'Fortune',
  image: '	https://tse2.mm.bing.net/th/id/OIP.vrm48PPX2E5VVoZcpbMG9wHaJ-?pid=Api&H=215&W=160',
  inStock: true,
  description: 'Fortune refined vegetable oil pouch',
  stock: 100
},
{
  name: 'Fortune Refined Oil Can',
  weight: '5L',
  price: 710,
  oldPrice: 785,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Fortune',
  image: 'https://tse1.mm.bing.net/th/id/OIP.ebDc-ZfuRTdj1rwGXbTaOwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Fortune refined oil large can',
  stock: 80
},

// FORTUNE SUNFLOWER OIL
{
  name: 'Fortune Sunflower Oil Pouch',
  weight: '1L',
  price: 175,
  oldPrice: 193,
  discount: '9% OFF',
  category: 'Masala Oil',
  brand: 'Fortune',
  image: 'https://tse2.mm.bing.net/th/id/OIP.0Ap7uNmSBNCTsYgQMXJtqgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Fortune sunflower refined oil pouch',
  stock: 100
},

// FORTUNE RICE BRAN OIL
{
  name: 'Fortune Rice Bran Oil Pouch',
  weight: '1L',
  price: 195,
  oldPrice: 215,
  discount: '9% OFF',
  category: 'Masala Oil',
  brand: 'Fortune',
  image: 'https://tse2.mm.bing.net/th/id/OIP.C2Qrel-13ovGr0pj_bC9_wHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Fortune rice bran health oil pouch',
  stock: 90
},

// FORTUNE GROUNDNUT OIL
{
  name: 'Fortune Groundnut Oil Bottle',
  weight: '1L',
  price: 198,
  oldPrice: 218,
  discount: '9% OFF',
  category: 'Masala Oil',
  brand: 'Fortune',
  image: 'https://tse2.mm.bing.net/th/id/OIP.0-ysSDP5QYF3MqbWHlOaIQAAAA?pid=Api&H=188&W=160',
  inStock: true,
  description: 'Fortune pure groundnut oil bottle',
  stock: 90
},

// ==========================================
// MAANIK REFINED OIL
// ==========================================
{
  name: 'Maanik Refined Oil Pouch',
  weight: '1L',
  price: 132,
  oldPrice: 148,
  discount: '11% OFF',
  category: 'Masala Oil',
  brand: 'Maanik',
  image: '	https://tse2.mm.bing.net/th/id/OIP.1zTQU04T7xhoveGUiFwU_AHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maanik refined vegetable oil pouch',
  stock: 100
},
{
  name: 'Maanik Refined Oil Can',
  weight: '5L',
  price: 695,
  oldPrice: 770,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Maanik',
  image: '	https://tse1.mm.bing.net/th/id/OIP.DOSHdP9PLk2nsNAXTMPHJAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maanik refined oil large can',
  stock: 80
},

// ==========================================
// PREMIUM OILS
// ==========================================

// SAFFOLA
{
  name: 'Saffola Gold Oil',
  weight: '1L',
  price: 220,
  oldPrice: 245,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Saffola',
  image: '	https://tse2.mm.bing.net/th/id/OIP.jx0Q9o67raXlSha7VhU23AHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Saffola gold blended oil for healthy heart',
  stock: 80
},
{
  name: 'Saffola Gold Oil Can',
  weight: '5L',
  price: 1095,
  oldPrice: 1220,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Saffola',
  image: 'https://tse1.mm.bing.net/th/id/OIP.UuR2GrqLw9cmwvEH9cYzJQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Saffola gold oil large can',
  stock: 60
},

// OLEEV (FIGARO)
{
  name: 'Oleev Active Olive Oil Pouch',
  weight: '1L',
  price: 425,
  oldPrice: 475,
  discount: '11% OFF',
  category: 'Masala Oil',
  brand: 'Oleev',
  image: 'https://tse1.mm.bing.net/th/id/OIP.OZVojDSLUBXwWvcjiGbQWQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Oleev active olive pomace oil, green pouch',
  stock: 70
},

// ==========================================
// MUSTARD OILS (KACHI GHANI)
// ==========================================

// BAIL KOLHU
{
  name: 'Bail Kolhu Mustard Oil Pouch',
  weight: '1L',
  price: 180,
  oldPrice: 200,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Bail Kolhu',
  image: '	https://tse2.mm.bing.net/th/id/OIP.B5WZ_cHzdNC2M9ifp7AisAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Bail kolhu pure mustard oil pouch',
  stock: 90
},
{
  name: 'Bail Kolhu Mustard Oil Bottle',
  weight: '1L',
  price: 185,
  oldPrice: 205,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Bail Kolhu',
  image: '	https://tse1.mm.bing.net/th/id/OIP.IHE_bjq2pyn65a9hmvMKJgAAAA?pid=Api&P=0&w=271&h=832',
  inStock: true,
  description: 'Bail kolhu pure mustard oil bottle',
  stock: 90
},
{
  name: 'Bail Kolhu Mustard Oil Can',
  weight: '2L',
  price: 365,
  oldPrice: 405,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Bail Kolhu',
  image: 'https://tse1.mm.bing.net/th/id/OIP.HG8oQBlADDII5-RGYKYuPwHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Bail kolhu mustard oil 2L can',
  stock: 80
},
{
  name: 'Bail Kolhu Mustard Oil Can',
  weight: '5L',
  price: 925,
  oldPrice: 1025,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Bail Kolhu',
  image: 'https://tse1.mm.bing.net/th/id/OIP.BmnAesDBzNouxKI0SdWcxQAAAA?pid=Api&P=0&w=278&h=500',
  inStock: true,
  description: 'Bail kolhu mustard oil large can',
  stock: 70
},

// MOTI 
{
  name: 'Moti Mustard Oil Pouch',
  weight: '1L',
  price: 175,
  oldPrice: 195,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Moti',
  image: 'https://tse1.mm.bing.net/th/id/OIP.mSxX9hvr7sSlrKgZfQQa8AAAAA?pid=Api&P=0&w=224&h=303',
  inStock: true,
  description: 'Moti pure mustard oil pouch',
  stock: 90
},

{
  name: 'Moti Mustard Oil Can',
  weight: '2L',
  price: 355,
  oldPrice: 395,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Moti',
  image: 'https://tse2.mm.bing.net/th/id/OIP.fyhusZiy1A9L6FyUoJFWBQHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Moti mustard oil 2L can',
  stock: 80
},
{
  name: 'Moti Mustard Oil Can',
  weight: '5L',
  price: 895,
  oldPrice: 995,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Moti',
  image: '	https://tse1.mm.bing.net/th/id/OIP.Ms46ovO2Vus_FE76Z1v-rAHaEl?pid=Api&P=0&w=647&h=400',
  inStock: true,
  description: 'Moti mustard oil large can',
  stock: 70
},

// DHARA
{
  name: 'Dhara Mustard Oil Bottle',
  weight: '1L',
  price: 185,
  oldPrice: 205,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Dhara',
  image: '	https://tse2.mm.bing.net/th/id/OIP.zwr3fnqQwlvsGc2GEAFBCwHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Dhara kachi ghani mustard oil bottle',
  stock: 90
},



// RAJDHANI
{
  name: 'Rajdhani Mustard Oil Pouch',
  weight: '1L',
  price: 177,
  oldPrice: 197,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Rajdhani',
  image: '	https://tse2.mm.bing.net/th/id/OIP.HqT4s3v3hsbdUg9IyXjM0wHaJ4?pid=Api&H=213&W=160',
  inStock: true,
  description: 'Rajdhani pure mustard oil pouch',
  stock: 90
},
{
  name: 'Rajdhani Mustard Oil Bottle',
  weight: '1L',
  price: 182,
  oldPrice: 202,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Rajdhani',
  image: 'https://tse1.mm.bing.net/th/id/OIP.Iblf0V-I1q163bMTkHAwxgHaMf?pid=Api&P=0&w=400&h=675',
  inStock: true,
  description: 'Rajdhani pure mustard oil bottle',
  stock: 90
},
{
  name: 'Rajdhani Mustard Oil Can',
  weight: '2L',
  price: 358,
  oldPrice: 398,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Rajdhani',
  image: 'https://tse2.mm.bing.net/th/id/OIP.gb8MgagMSgzoPv3lXYZJCwAAAA?pid=Api&P=0&w=400&h=533',
  inStock: true,
  description: 'Rajdhani mustard oil 2L can',
  stock: 80
},
{
  name: 'Rajdhani Mustard Oil Can',
  weight: '5L',
  price: 905,
  oldPrice: 1005,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Rajdhani',
  image: '	https://tse2.mm.bing.net/th/id/OIP.VBu29wpR8zqabe3uEa1kcgHaLJ?pid=Api&H=240&W=160',
  inStock: true,
  description: 'Rajdhani mustard oil large can',
  stock: 70
},

// HIMALAYAN (PEELI SARSO)
{
  name: 'Himalayan Peeli Sarso Mustard Oil Bottle',
  weight: '1L',
  price: 188,
  oldPrice: 208,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Himalayan',
  image: '	https://tse1.mm.bing.net/th/id/OIP.5jGb-vofyS9CBEj1DrYdwQHaIg?pid=Api&P=0&w=400&h=459',
  inStock: true,
  description: 'Himalayan peeli sarso pure mustard oil bottle',
  stock: 85
},
{
  name: 'Himalayan Peeli Sarso Mustard Oil Bottle',
  weight: '2L',
  price: 420,
  oldPrice: 208,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Himalayan',
  image: 'https://tse1.mm.bing.net/th/id/OIP.9c0f_kw7Qfm7lT0OhO_nkgHaJQ?pid=Api&P=0&w=400&h=500',
  inStock: true,
  description: 'Himalayan peeli sarso pure mustard oil bottle',
  stock: 85
},
{
  name: 'Himalayan Peeli Sarso Mustard Oil Can',
  weight: '5L',
  price: 945,
  oldPrice: 1050,
  discount: '10% OFF',
  category: 'Masala Oil',
  brand: 'Himalayan',
  image: 'https://tse1.mm.bing.net/th/id/OIP.vlpkLh6wpZ6_B82-nQaRggHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Himalayan peeli sarso mustard oil large can',
  stock: 70
},
// ========================================
// 🛢️ PATANJALI MUSTARD OIL
// ========================================
{
  name: 'Patanjali Kachi Ghani Mustard Oil',
  weight: '1L',
  price: 185,
  oldPrice: 210,
  discount: '12% OFF',
  category: 'Masala Oil',
  brand: 'Patanjali',
  image: 'https://tse2.mm.bing.net/th/id/OIP.37gALIOGVasLRc7u4LWDiQHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Patanjali Kachi Ghani Pure Mustard Oil - Cold Pressed',
  stock: 100
},
{
  name: 'Patanjali Kachi Ghani Mustard Oil Can',
  weight: '5L',
  price: 850,
  oldPrice: 960,
  discount: '12% OFF',
  category: 'Masala Oil',
  brand: 'Patanjali',
  image: 'https://tse1.mm.bing.net/th/id/OIP.DQFai7BzV-1zb67KXWA4KwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Patanjali Kachi Ghani Pure Mustard Oil - Cold Pressed',
  stock: 100
},

// ========================================
// 🏪 JAGAT STORE - KALI SARSO OIL (Black Mustard)
// ========================================
{
  name: 'Jagat Store Pure Kali Sarso Oil',
  weight: '1L',
  price: 165,
  oldPrice: 199,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP._Lxp6Ir41EbVRJwthPAxqQHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Kali Sarso Tel | Shudhta Ki Guarantee ✓',
  stock: 150
},


// ========================================
// 🏪 JAGAT STORE - PEELI SARSO OIL (Yellow Mustard)
// ========================================
{
  name: 'Jagat Store Pure Peeli Sarso Oil',
  weight: '1L',
  price: 175,
  oldPrice: 210,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.b0zsE9H66LrGzdpsK51wRAAAAA?pid=Api&P=0&w=162&h=162',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Peeli Sarso Tel | Shudhta Ki Guarantee ✓',
  stock: 150
},


// gheee

// ========================================
// 🧈 GHEE - 1 KG
// ========================================
{
  name: 'Amul Pure Ghee',
  weight: '1kg',
  price: 599,
  oldPrice: 680,
  discount: '12% OFF',
  category: 'Masala Oil',
  brand: 'Amul',
  image: '	https://tse2.mm.bing.net/th/id/OIP.HARr5YmpVJw5bZaQJWK5mQHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Amul Pure Ghee - Rich Aroma & Taste',
  stock: 50
},
{
  name: 'Mother Dairy Pure Ghee',
  weight: '1kg',
  price: 589,
  oldPrice: 670,
  discount: '12% OFF',
  category: 'Masala Oil',
  brand: 'Mother Dairy',
  image: '	https://tse2.mm.bing.net/th/id/OIP.4xE50hy68Mbkro6JgWgNpQHaHP?pid=Api&H=156&W=160',
  inStock: true,
  description: 'Mother Dairy Pure Cow Ghee - Premium Quality',
  stock: 50
},
{
  name: 'Ananda Pure Ghee',
  weight: '1kg',
  price: 560,
  oldPrice: 650,
  discount: '14% OFF',
  category: 'Masala Oil',
  brand: 'Ananda',
  image: '	https://tse2.mm.bing.net/th/id/OIP.u7eOJ25Z5u7lm-LTKAansgHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Ananda Pure Ghee - Made from Fresh Cream',
  stock: 50
},
{
  name: 'Madhusudan Pure Ghee',
  weight: '1kg',
  price: 545,
  oldPrice: 630,
  discount: '13% OFF',
  category: 'Masala Oil',
  brand: 'Madhusudan',
  image: 'https://tse1.mm.bing.net/th/id/OIP.z1RvicHD62K-rlaaiZlQjgHaJQ?pid=Api&P=0&w=400&h=500',
  inStock: true,
  description: 'Madhusudan Pure Ghee - Traditional Taste',
  stock: 50
},
{
  name: 'Paras Pure Ghee',
  weight: '1kg',
  price: 535,
  oldPrice: 620,
  discount: '14% OFF',
  category: 'Masala Oil',
  brand: 'Paras',
  image: '	https://tse2.mm.bing.net/th/id/OIP.bPwRU-OEwUdSVvovw0EbcgAAAA?pid=Api&P=0&w=364&h=458',
  inStock: true,
  description: 'Paras Pure Ghee - Rich & Aromatic',
  stock: 50
},
{
  name: 'Namaste India Pure Ghee',
  weight: '1kg',
  price: 525,
  oldPrice: 610,
  discount: '14% OFF',
  category: 'Masala Oil',
  brand: 'Namaste India',
  image: '	https://tse2.mm.bing.net/th/id/OIP.pS5KWTbehbe_CurQMuRTbwHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Namaste India Pure Desi Ghee - Premium Quality',
  stock: 50
},
{
  name: 'Patanjali Cow Ghee',
  weight: '1kg',
  price: 649,
  oldPrice: 750,
  discount: '13% OFF',
  category: 'Masala Oil',
  brand: 'Patanjali',
  image: '	https://tse2.mm.bing.net/th/id/OIP.nT683tnytSZQkVEc9Fq-bAHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Patanjali Pure Cow Ghee - Desi Gau Ghrit',
  stock: 50
},
{
  name: 'Gowardhan Cow Ghee',
  weight: '1kg',
  price: 639,
  oldPrice: 740,
  discount: '14% OFF',
  category: 'Masala Oil',
  brand: 'Gowardhan',
  image: 'https://tse1.mm.bing.net/th/id/OIP.CsmOr4KA9Un62_-zIU-UaQAAAA?pid=Api&P=0&w=400&h=474',
  inStock: true,
  description: 'Gowardhan Pure Cow Ghee - Rich & Pure',
  stock: 50
},

// ========================================
// 🧈 GHEE - 500g
// ========================================

{
  name: 'Mother Dairy Pure Ghee',
  weight: '500g',
  price: 299,
  oldPrice: 345,
  discount: '13% OFF',
  category: 'Masala Oil',
  brand: 'Mother Dairy',
  image: '	https://tse2.mm.bing.net/th/id/OIP.4xE50hy68Mbkro6JgWgNpQHaHP?pid=Api&P=0&w=409&h=400',
  inStock: true,
  description: 'Mother Dairy Pure Cow Ghee - Premium Quality',
  stock: 60
},
{
  name: 'Ananda Pure Ghee',
  weight: '500g',
  price: 289,
  oldPrice: 335,
  discount: '14% OFF',
  category: 'Masala Oil',
  brand: 'Ananda',
  image: 'https://tse2.mm.bing.net/th/id/OIP.516wwLGa34ItVgE_dXQa3QHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Ananda Pure Ghee - Made from Fresh Cream',
  stock: 60
},
{
  name: 'Madhusudan Pure Ghee',
  weight: '500g',
  price: 279,
  oldPrice: 325,
  discount: '14% OFF',
  category: 'Masala Oil',
  brand: 'Madhusudan',
  image: 'https://tse1.mm.bing.net/th/id/OIP.lIrC6EKMXIU_5fHw4KoWtQHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Madhusudan Pure Ghee - Traditional Taste',
  stock: 60
},
{
  name: 'Paras Pure Ghee',
  weight: '500g',
  price: 275,
  oldPrice: 320,
  discount: '14% OFF',
  category: 'Masala Oil',
  brand: 'Paras',
  image: '	https://tse1.mm.bing.net/th/id/OIP.mN0rYFSiacC5ouNcDNRPXwHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Paras Pure Ghee - Rich & Aromatic',
  stock: 60
},
{
  name: 'Patanjali Cow Ghee',
  weight: '500g',
  price: 335,
  oldPrice: 385,
  discount: '13% OFF',
  category: 'Masala Oil',
  brand: 'Patanjali',
  image: '	https://tse1.mm.bing.net/th/id/OIP.CJPNkjxZ6mDabGuD4G1A8QHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Patanjali Pure Cow Ghee - Desi Gau Ghrit',
  stock: 60
},
{
  name: 'Gowardhan Cow Ghee',
  weight: '500g',
  price: 329,
  oldPrice: 380,
  discount: '13% OFF',
  category: 'Masala Oil',
  brand: 'Gowardhan',
  image: '	https://tse2.mm.bing.net/th/id/OIP.tfKu5iVyTD65pqyzJ4CDSgHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Gowardhan Pure Cow Ghee - Rich & Pure',
  stock: 60
},

// ========================================
// 🧈 GHEE - 200g
// ========================================
{
  name: 'Paras Pure Ghee',
  weight: '200g',
  price: 115,
  oldPrice: 135,
  discount: '15% OFF',
  category: 'Masala Oil',
  brand: 'Paras',
  image: 'https://tse2.mm.bing.net/th/id/OIP.nd5G1XQcPaKlIi0gYf8kXQHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Paras Pure Ghee - Rich & Aromatic',
  stock: 80
},

// ========================================
// 🪔 POOJA GHEE - MANGALDEEP
// ========================================
{
  name: 'Mangaldeep Pooja Ghee',
  weight: '1kg',
  price: 399,
  oldPrice: 470,
  discount: '15% OFF',
  category: 'Masala Oil',
  brand: 'Mangaldeep',
  image: '	https://tse1.mm.bing.net/th/id/OIP.GebYqgWFfWSRZKtOEAYztwHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Mangaldeep Pure Pooja Ghee - For Diya & Hawan',
  stock: 50
},
{
  name: 'Mangaldeep Pooja Ghee',
  weight: '500g',
  price: 210,
  oldPrice: 250,
  discount: '16% OFF',
  category: 'Masala Oil',
  brand: 'Mangaldeep',
  image: '	https://tse1.mm.bing.net/th/id/OIP.XuuOPOaCCCBW4Paj1VKOXgHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Mangaldeep Pure Pooja Ghee - For Diya & Hawan',
  stock: 60
},
{
  name: 'Mangaldeep Pooja Ghee',
  weight: '200g',
  price: 89,
  oldPrice: 110,
  discount: '19% OFF',
  category: 'Masala Oil',
  brand: 'Mangaldeep',
  image: '	https://tse1.mm.bing.net/th/id/OIP.jcL-jSJDVZNFQicUoeoqhgHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Mangaldeep Pure Pooja Ghee - For Diya & Hawan',
  stock: 80
},








  

  // MASALA & SPICES - MDH


// ========================================
// 🌶️ HALDI (Turmeric) - EVEREST
// ========================================
{
  name: 'Everest Turmeric Powder (Haldi)',
  weight: '100g',
  price: 42,
  oldPrice: 50,
  discount: '16% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: '	https://tse2.mm.bing.net/th/id/OIP.3q037bcCJS_2AbX-6XxHFQHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Everest Pure Turmeric Powder - Natural Yellow Color',
  stock: 100
},
{
  name: 'Everest Turmeric Powder (Haldi)',
  weight: '200g',
  price: 80,
  oldPrice: 95,
  discount: '16% OFF',
    category: 'Masala Oil',
  brand: 'Everest',
  image: 'https://tse2.mm.bing.net/th/id/OIP.lrCyaHwtVE1uX1BL9vPCPAHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Everest Pure Turmeric Powder - Natural Yellow Color',
  stock: 80
},

// 🌶️ HALDI - MDH

{
  name: 'MDH Turmeric Powder (Haldi)',
  weight: '200g',
  price: 76,
  oldPrice: 90,
  discount: '16% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: 'https://tse2.mm.bing.net/th/id/OIP.Y-XFFANRYH5xRbSePiJXOwHaMA?pid=Api&P=0&w=400&h=649',
  inStock: true,
  description: 'MDH Pure Turmeric Powder - Asli Masale Sach Sach',
  stock: 80
},

// 🌶️ HALDI - JAGAT STORE
{
  name: 'Jagat Store Pure Haldi Powder',
  weight: '100g',
  price: 32,
  oldPrice: 45,
  discount: '29% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.25V3zUvj7Ksc1ldvhRSlvAHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Haldi | Shudhta Ki Guarantee ✓',
  stock: 150
},
{
  name: 'Jagat Store Pure Haldi Powder',
  weight: '200g',
  price: 60,
  oldPrice: 85,
  discount: '29% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.TzrciVlDLb7hGEGyyk3srgAAAA?pid=Api&P=0&w=250&h=250',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Haldi | Shudhta Ki Guarantee ✓',
  stock: 100
},

// ========================================
// 🌿 DHANIYA (Coriander) - EVEREST
// ========================================
{
  name: 'Everest Coriander Powder (Dhaniya)',
  weight: '100g',
  price: 45,
  oldPrice: 54,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: '	https://tse2.mm.bing.net/th/id/OIP.d6IpX6DGmbdOCQL8DUZ3hwHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Everest Pure Coriander Powder - Fresh Aroma',
  stock: 100
},
{
  name: 'Everest Coriander Powder (Dhaniya)',
  weight: '200g',
  price: 86,
  oldPrice: 102,
  discount: '16% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: '	https://tse1.mm.bing.net/th/id/OIP.5z_idrLc-LsR3wVR8BS6lQHaH3?pid=Api&P=0&w=400&h=424',
  inStock: true,
  description: 'Everest Pure Coriander Powder - Fresh Aroma',
  stock: 80
},

// 🌿 DHANIYA - MDH

{
  name: 'MDH Coriander Powder (Dhaniya)',
  weight: '200g',
  price: 82,
  oldPrice: 98,
  discount: '16% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: 'https://tse2.mm.bing.net/th/id/OIP.NF775V0i-_q8uCKm-qYnTAHaMB?pid=Api&P=0&w=400&h=649',
  inStock: true,
  description: 'MDH Pure Coriander Powder - Asli Masale Sach Sach',
  stock: 80
},

// 🌿 DHANIYA - JAGAT STORE
{
  name: 'Jagat Store Pure Dhaniya Powder',
  weight: '100g',
  price: 35,
  oldPrice: 50,
  discount: '30% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.FNVoeOKNsR354PECPdoKjwHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Dhaniya | Shudhta Ki Guarantee ✓',
  stock: 150
},
{
  name: 'Jagat Store Pure Dhaniya Powder',
  weight: '200g',
  price: 65,
  oldPrice: 95,
  discount: '32% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.141EZ1NfiGe2mIqy38F-OAHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Dhaniya | Shudhta Ki Guarantee ✓',
  stock: 100
},

// ========================================
// 🌶️ LAL MIRCH (Red Chilli) - EVEREST
// ========================================
{
  name: 'Everest Red Chilli Powder (Lal Mirch)',
  weight: '100g',
  price: 55,
  oldPrice: 65,
  discount: '15% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: 'https://tse2.mm.bing.net/th/id/OIP.NPTcp4FN-Xmy87gxL2VyUgHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Everest Hot & Red Chilli Powder - Tikha Lal',
  stock: 100
},
{
  name: 'Everest Red Chilli Powder (Lal Mirch)',
  weight: '200g',
  price: 105,
  oldPrice: 125,
  discount: '16% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: 'https://tse2.mm.bing.net/th/id/OIP.KJ74fJp-O1woPsa14O3BzwHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Everest Hot & Red Chilli Powder - Tikha Lal',
  stock: 80
},

// 🌶️ LAL MIRCH - MDH

{
  name: 'MDH Red Chilli Powder (Lal Mirch)',
  weight: '200g',
  price: 99,
  oldPrice: 118,
  discount: '16% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: 'https://tse2.mm.bing.net/th/id/OIP.C1S12escj1SZ2ny1UQ_lTgHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'MDH Deggi Mirch - Perfect Color & Taste',
  stock: 80
},

// 🌶️ LAL MIRCH - JAGAT STORE
{
  name: 'Jagat Store Pure Lal Mirch Powder',
  weight: '100g',
  price: 42,
  oldPrice: 60,
  discount: '30% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.77_VkvoaCynevs69dQGBzgAAAA?pid=Api&P=0&w=200&h=200',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Lal Mirch | Shudhta Ki Guarantee ✓',
  stock: 150
},
{
  name: 'Jagat Store Pure Lal Mirch Powder',
  weight: '200g',
  price: 78,
  oldPrice: 115,
  discount: '32% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.E27YMVCR7bmMu10ho7iWCQHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Lal Mirch | Shudhta Ki Guarantee ✓',
  stock: 100
},

// ========================================
// 🫘 JEERA (Cumin) - JAGAT STORE
// ========================================
{
  name: 'Jagat Store Pure Jeera Powder',
  weight: '100g',
  price: 55,
  oldPrice: 75,
  discount: '27% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.8KxHXKIdRJt62GqWXauE9AHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Jeera | Shudhta Ki Guarantee ✓',
  stock: 150
},

{
  name: 'Jagat Store Sabut Jeera (Whole Cumin)',
  weight: '100g',
  price: 48,
  oldPrice: 65,
  discount: '26% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.RBqzc_12YHGz_xr-_SgyyQHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Sabut Jeera | Shudhta Ki Guarantee ✓',
  stock: 150
},
{
  name: 'Jagat Store Sabut Jeera (Whole Cumin)',
  weight: '250g',
  price: 110,
  oldPrice: 150,
  discount: '27% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.Vq5Hp-88v6WA6U19A5vssQHaFj?pid=Api&P=0&w=500&h=375',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Sabut Jeera | Shudhta Ki Guarantee ✓',
  stock: 100
},

// ========================================
// 🍛 MDH SPECIAL MASALA - 100g
// ========================================
{
  name: 'MDH Chunky Chat Masala',
  weight: '100g',
  price: 58,
  oldPrice: 70,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: 'https://tse1.mm.bing.net/th/id/OIP.iFxOXhX5GCskHfoQYFTINgAAAA?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'MDH Chunky Chat Masala - Tangy & Tasty',
  stock: 80
},
{
  name: 'MDH Rajma Masala',
  weight: '100g',
  price: 62,
  oldPrice: 75,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: '	https://tse2.mm.bing.net/th/id/OIP.ALZ_MGX1vqAwTDec0tmfawHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'MDH Rajma Masala - Perfect Rajma Every Time',
  stock: 80
},
{
  name: 'MDH Chana Masala',
  weight: '100g',
  price: 60,
  oldPrice: 72,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: '	https://tse2.mm.bing.net/th/id/OIP.ik4f2PRY2MmEi_EgqGAAJwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'MDH Chana Masala - Authentic Chole Taste',
  stock: 80
},
{
  name: 'MDH Pav Bhaji Masala',
  weight: '100g',
  price: 65,
  oldPrice: 78,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: '	https://tse2.mm.bing.net/th/id/OIP.ntoZSwJnQlHO4Phli31dZwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'MDH Pav Bhaji Masala - Mumbai Street Style',
  stock: 80
},

{
  name: 'MDH Kitchen King Masala',
  weight: '100g',
  price: 68,
  oldPrice: 82,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: 'https://tse2.mm.bing.net/th/id/OIP.dO4uIEbojV-zvar8AI3eAgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'MDH Kitchen King - All Purpose Masala',
  stock: 80
},
{
  name: 'MDH Garam Masala',
  weight: '100g',
  price: 75,
  oldPrice: 90,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: '	https://tse2.mm.bing.net/th/id/OIP.8clrllj2UaaSeDPeb8VT5QHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'MDH Garam Masala - Premium Spice Blend',
  stock: 80
},
{
  name: 'MDH Sambhar Masala',
  weight: '100g',
  price: 58,
  oldPrice: 70,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: '	https://tse2.mm.bing.net/th/id/OIP.O2ZReckI_uVuz7ftZ0Om-wHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'MDH Sambhar Masala - South Indian Style',
  stock: 80
},
{
  name: 'MDH Kashmiri Mirch',
  weight: '100g',
  price: 70,
  oldPrice: 85,
  discount: '18% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: '	https://tse2.mm.bing.net/th/id/OIP.eB8UvPtwCWtMNoZbhsuQtgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'MDH Kashmiri Mirch - Red Color Low Heat',
  stock: 80
},
{
  name: 'MDH Sabzi Masala',
  weight: '100g',
  price: 55,
  oldPrice: 66,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: '	https://tse1.mm.bing.net/th/id/OIP.KjVSvJ1aj9d646X6q9tpXgHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'MDH Sabzi Masala - For Tasty Vegetables',
  stock: 80
},
{
  name: 'MDH Dal Makhani Masala',
  weight: '100g',
  price: 62,
  oldPrice: 75,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: 'https://tse1.mm.bing.net/th/id/OIP.VGnwPlbu9-On9Sw-bqwiXwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'MDH Dal Makhani Masala - Restaurant Style',
  stock: 80
},
{
  name: 'MDH Shahi Paneer Masala',
  weight: '100g',
  price: 65,
  oldPrice: 78,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: '	https://tse2.mm.bing.net/th/id/OIP.qeIuorgaCrWWqpXwjbOxHwHaKy?pid=Api&H=232&W=160',
  inStock: true,
  description: 'MDH Shahi Paneer Masala - Rich & Creamy',
  stock: 80
},
{
  name: 'MDH Deggi Mirch',
  weight: '100g',
  price: 70,
  oldPrice: 85,
  discount: '18% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: '	https://tse2.mm.bing.net/th/id/OIP.zlovkV_OVTNdkSsB_0s8vQHaKS?pid=Api&H=222&W=160',
  inStock: true,
  description: 'MDH Deggi Mirch - Red Color Low Heat',
  stock: 80
},
{
  name: 'MDH Meat Masala',
  weight: '100g',
  price: 72,
  oldPrice: 88,
  discount: '18% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: '	https://tse1.mm.bing.net/th/id/OIP.J0ARcKOYDszHJgcfh_Px9AHaJh?pid=Api&H=205&W=160',
  inStock: true,
  description: 'MDH Meat Masala - Perfect for Non-Veg',
  stock: 80
},
{
  name: 'MDH Chicken Masala',
  weight: '100g',
  price: 70,
  oldPrice: 85,
  discount: '18% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: '	https://tse1.mm.bing.net/th/id/OIP.aOyZWfTRUQIfyxTqcyLXhgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'MDH Chicken Masala - Tasty Chicken Curry',
  stock: 80
},
{
  name: 'MDH Kasoori Methi',
  weight: '100g',
  price: 85,
  oldPrice: 102,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'MDH',
  image: '	https://tse1.mm.bing.net/th/id/OIP.r_OKEU6ZwwWqXsUNeB3_aAHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'MDH Kasoori Methi - Dried Fenugreek Leaves',
  stock: 80
},

// ========================================
// 🍛 EVEREST SPECIAL MASALA - 100g
// ========================================
{
  name: 'Everest Chat Masala',
  weight: '100g',
  price: 55,
  oldPrice: 66,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: '	https://tse1.mm.bing.net/th/id/OIP.dscgqqPp2hp8qkfUwusDHwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Everest Chat Masala - Tangy & Spicy',
  stock: 80
},

{
  name: 'Everest Chole Masala',
  weight: '100g',
  price: 58,
  oldPrice: 70,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: '	https://tse1.mm.bing.net/th/id/OIP.fYV-7RAEaTuD_6ua9KMhdQHaJQ?pid=Api&H=199&W=160',
  inStock: true,
  description: 'Everest Chana Masala - Perfect Chole',
  stock: 80
},
{
  name: 'Everest Pav Bhaji Masala',
  weight: '100g',
  price: 62,
  oldPrice: 75,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: 'https://tse2.mm.bing.net/th/id/OIP.TFIo92byGmNQN2NVGPYyDwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Everest Pav Bhaji Masala - Street Food Style',
  stock: 80
},

{
  name: 'Everest Kitchen King Masala',
  weight: '100g',
  price: 65,
  oldPrice: 78,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: '	https://tse1.mm.bing.net/th/id/OIP.Vt4bqJvoYkpZC0oHCsyxagHaJV?pid=Api&H=201&W=160',
  inStock: true,
  description: 'Everest Kitchen King - Multi Purpose Masala',
  stock: 80
},
{
  name: 'Everest Garam Masala',
  weight: '100g',
  price: 72,
  oldPrice: 88,
  discount: '18% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: '	https://tse2.mm.bing.net/th/id/OIP.a7_FRqR2tSyMO1_ENo022wHaIt?pid=Api&H=188&W=160',
  inStock: true,
  description: 'Everest Garam Masala - Whole Spice Blend',
  stock: 80
},
{
  name: 'Everest Sambhar Masala',
  weight: '100g',
  price: 55,
  oldPrice: 66,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: '	https://tse2.mm.bing.net/th/id/OIP.-AX3XT3wjpSlc7RWnj68mQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Everest Sambhar Masala - Authentic South Indian',
  stock: 80
},
{
  name: 'Everest Kashmiri Mirch',
  weight: '100g',
  price: 68,
  oldPrice: 82,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: 'https://tse1.mm.bing.net/th/id/OIP.nCXcFGXYiVcpLWZXrI_k7wHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Everest Kashmiri Mirch - Bright Red Color',
  stock: 80
},
{
  name: 'Everest Sabji Masala',
  weight: '100g',
  price: 52,
  oldPrice: 62,
  discount: '16% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: '	https://tse2.mm.bing.net/th/id/OIP.kNv7_V_kH2T2KchtW4MSnAAAAA?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Everest Sabji Masala - Everyday Vegetables',
  stock: 80
},
{
  name: 'Everest Shahi Biryani Masala',
  weight: '100g',
  price: 75,
  oldPrice: 90,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: 'https://tse1.mm.bing.net/th/id/OIP.1jz-30KYIMWMNMYzf_3SQQAAAA?pid=Api&P=0&w=339&h=500',
  inStock: true,
  description: 'Everest Shahi Biryani Masala - Royal Taste',
  stock: 80
},
{
  name: 'Everest Meat Masala',
  weight: '100g',
  price: 70,
  oldPrice: 85,
  discount: '18% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: 'https://tse2.mm.bing.net/th/id/OIP.WVJeEHHdYTZn28C5L-HfYwHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: 'Everest Meat Masala - Rich Non-Veg Spices',
  stock: 80
},
{
  name: 'Everest Chicken Masala',
  weight: '100g',
  price: 68,
  oldPrice: 82,
  discount: '17% OFF',
  category: 'Masala Oil',
  brand: 'Everest',
  image: 'https://tse1.mm.bing.net/th/id/OIP.966I8Um2OWe2GRDZR2iOOQHaK2?pid=Api&H=234&W=160',
  inStock: true,
  description: 'Everest Chicken Masala - Spicy Chicken',
  stock: 80
},

// ========================================
// 🌿 SEEDS & WHOLE SPICES
// ========================================
{
  name: 'Jagat Store Ajwain (Carom Seeds)',
  weight: '100g',
  price: 40,
  oldPrice: 58,
  discount: '31% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.TBxhF3bWWo2kUKzzjYvOrwHaE8?pid=Api&P=0&h=180',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Ajwain | Shudhta Ki Guarantee ✓',
  stock: 100
},
{
  name: 'Jagat Store Rai (Mustard Seeds Small)',
  weight: '100g',
  price: 25,
  oldPrice: 38,
  discount: '34% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.R7Po_yimGdtLIA79lII2DAHaHe?pid=Api&P=0&w=400&h=404',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Rai | Shudhta Ki Guarantee ✓',
  stock: 100
},
{
  name: 'Jagat Store Sarso Kali (Black Mustard Seeds)',
  weight: '100g',
  price: 28,
  oldPrice: 42,
  discount: '33% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.3nmvRtUJkAwjVtIOzqN5fAAAAA?pid=Api&H=123&W=160',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Kali Sarso | Shudhta Ki Guarantee ✓',
  stock: 100
},
{
  name: 'Jagat Store Sarso Pili (Yellow Mustard Seeds)',
  weight: '100g',
  price: 26,
  oldPrice: 40,
  discount: '35% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.CTGpI6GLw80pZ5B6TbFUXgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Pili Sarso | Shudhta Ki Guarantee ✓',
  stock: 100
},
{
  name: 'Jagat Store Methi Dana (Fenugreek Seeds)',
  weight: '100g',
  price: 32,
  oldPrice: 48,
  discount: '33% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.IU0myvC7YYbK-JLVPdgS7AHaEK?pid=Api&H=89&W=160',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Methi Dana | Shudhta Ki Guarantee ✓',
  stock: 100
},
{
  name: 'Jagat Store Sauf Moti (Big Fennel Seeds)',
  weight: '100g',
  price: 45,
  oldPrice: 65,
  discount: '31% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.cxpRCn584eFK6wJMVzz5BQHaFk?pid=Api&P=0&w=532&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Moti Sauf | Shudhta Ki Guarantee ✓',
  stock: 100
},
{
  name: 'Jagat Store Sauf Barik Meethi (Fine Sweet Fennel)',
  weight: '100g',
  price: 48,
  oldPrice: 70,
  discount: '31% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.WGMTezNkijW9yFlDzCI6YAAAAA?pid=Api&H=160&W=160',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Meethi Sauf Barik | Shudhta Ki Guarantee ✓',
  stock: 100
},
{
  name: 'Jagat Store Kalonji (Nigella Seeds)',
  weight: '100g',
  price: 38,
  oldPrice: 55,
  discount: '31% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.2LdXM38fqStKGsw3IHd6XAHaFj?pid=Api&P=0&w=533&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Kalonji | Shudhta Ki Guarantee ✓',
  stock: 100
},

// ========================================
// 🍋 SOUR & TANGY
// ========================================
{
  name: 'Jagat Store Imli (Tamarind)',
  weight: '100g',
  price: 28,
  oldPrice: 42,
  discount: '33% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.z-sUzwVvmATIjN8f-3NX0QHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Imli | Shudhta Ki Guarantee ✓',
  stock: 100
},
{
  name: 'Jagat Store Amchur Powder (Dry Mango)',
  weight: '100g',
  price: 42,
  oldPrice: 60,
  discount: '30% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.GZ2lxpcJPZoERh-bvM9dugHaE8?pid=Api&H=106&W=160',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Amchur | Shudhta Ki Guarantee ✓',
  stock: 100
},

// ========================================
// 🌶️ GARAM MASALA & LEAVES
// ========================================
{
  name: 'Jagat Store Garam Masala',
  weight: '100g',
  price: 65,
  oldPrice: 95,
  discount: '32% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.hVYjphG9SW-g0s5o_87regHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Asli Garam Masala | Shudhta Ki Guarantee ✓',
  stock: 100
},
{
  name: 'Jagat Store Tej Patta (Bay Leaves)',
  weight: '100g',
  price: 55,
  oldPrice: 80,
  discount: '31% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.3xpfjVrk6mBnq9imQ_q0kgHaE6?pid=Api&P=0&w=604&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Tej Patta | Shudhta Ki Guarantee ✓',
  stock: 100
},

// ========================================
// 💚 CARDAMOM & CLOVES
// ========================================
{
  name: 'Jagat Store Choti Elaichi (Green Cardamom)',
  weight: '100g',
  price: 285,
  oldPrice: 380,
  discount: '25% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.RVjmbH8lVzqB0ZCnytll-AHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Premium Choti Elaichi | Shudhta Ki Guarantee ✓',
  stock: 80
},
{
  name: 'Jagat Store Badi Elaichi (Black Cardamom)',
  weight: '100g',
  price: 195,
  oldPrice: 280,
  discount: '30% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.z2uiLp9_4s1D1U8AZIlqcQHaGl?pid=Api&H=142&W=160',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Premium Badi Elaichi | Shudhta Ki Guarantee ✓',
  stock: 80
},
{
  name: 'Jagat Store Laung (Cloves)',
  weight: '100g',
  price: 175,
  oldPrice: 250,
  discount: '30% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.9r7nWeVx32cOBX4B6Nx1BgHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Premium Laung | Shudhta Ki Guarantee ✓',
  stock: 80
},

// ========================================
// 🖤 PEPPER & CINNAMON
// ========================================
{
  name: 'Jagat Store Kali Mirch Sabut (Black Pepper Whole)',
  weight: '100g',
  price: 125,
  oldPrice: 180,
  discount: '31% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.w7-eRMfOi7WfhL5rWn34SAHaGO?pid=Api&P=0&w=476&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Premium Kali Mirch | Shudhta Ki Guarantee ✓',
  stock: 80
},
{
  name: 'Jagat Store Kali Mirch Pisi (Black Pepper Powder)',
  weight: '100g',
  price: 135,
  oldPrice: 195,
  discount: '31% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.yJwAt9cbaF2MNKpXsyFF1QHaGt?pid=Api&H=144&W=160',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Kali Mirch Powder | Shudhta Ki Guarantee ✓',
  stock: 80
},
{
  name: 'Jagat Store Dalchini (Cinnamon Sticks)',
  weight: '100g',
  price: 85,
  oldPrice: 125,
  discount: '32% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.i9nGL2hfW1kju5xF3pTUvQHaFD?pid=Api&P=0&w=586&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Premium Dalchini | Shudhta Ki Guarantee ✓',
  stock: 100
},

// ========================================
// 🌸 PREMIUM SPICES
// ========================================
{
  name: 'Jagat Store Javitri (Mace)',
  weight: '100g',
  price: 320,
  oldPrice: 450,
  discount: '29% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'h	https://tse1.mm.bing.net/th/id/OIP.6VYUET-31cCBXy7YdXtDJQHaEB?pid=Api&P=0&w=737&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Premium Javitri | Shudhta Ki Guarantee ✓',
  stock: 50
},
{
  name: 'Jagat Store Jaifal (Nutmeg)',
  weight: '100g',
  price: 195,
  oldPrice: 280,
  discount: '30% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.-hgI2ycBs1wGvT-Fi85I4QHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Premium Jaifal | Shudhta Ki Guarantee ✓',
  stock: 80
},
{
  name: 'Jagat Store Chakra Phool (Star Anise)',
  weight: '100g',
  price: 145,
  oldPrice: 210,
  discount: '31% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.n1ZngN0X4FfbWpQWon6zwAHaHt?pid=Api&P=0&w=400&h=417',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Premium Chakra Phool | Shudhta Ki Guarantee ✓',
  stock: 80
},

// ========================================
// 🌿 POWDERS & OTHERS
// ========================================
{
  name: 'Jagat Store Saunf Powder (Fennel Powder)',
  weight: '100g',
  price: 52,
  oldPrice: 75,
  discount: '31% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.i4E6i1yJQanpyIkxtUb0QgHaHM?pid=Api&P=0&w=412&h=400',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Pure Saunf Powder | Shudhta Ki Guarantee ✓',
  stock: 100
},

{
  name: 'Jagat Store Supari (Betel Nut)',
  weight: '100g',
  price: 75,
  oldPrice: 110,
  discount: '32% OFF',
  category: 'Masala Oil',
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.2NH82Eamxa47n3Fy4Z91mQHaEK?pid=Api&H=89&W=160',
  inStock: true,
  description: '🏪 Jagat Store Own Brand | Premium Supari | Shudhta Ki Guarantee ✓',
  stock: 80
}





];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🌶️ Starting Smart Migration for Masala & Oil...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Masala Oil" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of masalaOilProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Masala Oil" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();