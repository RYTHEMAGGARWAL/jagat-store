// migrate_jagat_store_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_jagat_store_IMPROVED.js

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

// ========== JAGAT STORE EXCLUSIVE PRODUCTS ==========
const jagatStoreProducts = [



{
  name: 'Jagat Store Alsi (Flax Seeds)',
  weight: '100g',
  price: 35,
  oldPrice: 50,
  discount: '30% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.RjlzLst-1o_CtxhleXA85gHaD4?pid=Api&P=0&w=762&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Pure Alsi Seeds | Omega-3 Rich',
  stock: 100
},
{
  name: 'Jagat Store Safed Til (White Sesame)',
  weight: '100g',
  price: 38,
  oldPrice: 55,
  discount: '31% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.M9j1wnaaZ27mIIauTZx12QHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Pure Safed Til | Premium Quality',
  stock: 100
},
{
  name: 'Jagat Store Kale Til (Black Sesame)',
  weight: '100g',
  price: 42,
  oldPrice: 60,
  discount: '30% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.gbrQS02fPHAfA0O4iKdGeQHaEJ?pid=Api&P=0&h=180',
  inStock: true,
  description: '🏪 Jagat Store | Pure Kale Til | Premium Quality',
  stock: 100
},
{
  name: 'Jagat Store Pumpkin Seeds',
  weight: '100g',
  price: 145,
  oldPrice: 199,
  discount: '27% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.4kv1rP8XqYT7lRzv0xaE_gHaE7?pid=Api&H=106&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Pumpkin Seeds | Protein Rich',
  stock: 80
},
{
  name: 'Jagat Store Sunflower Seeds',
  weight: '100g',
  price: 85,
  oldPrice: 120,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.JuoJTfxa5uljUUWf-S2DRgHaE8?pid=Api&P=0&w=599&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Sunflower Seeds | Healthy Snack',
  stock: 80
},
{
  name: 'Jagat Store Kharbuja Beej (Melon Seeds)',
  weight: '100g',
  price: 95,
  oldPrice: 135,
  discount: '30% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.WbwC09RBvNVFhxvow7M8tgHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Magaz | Cooling Seeds',
  stock: 100
},
{
  name: 'Jagat Store Tarbooj Beej (Watermelon Seeds)',
  weight: '100g',
  price: 85,
  oldPrice: 120,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.TZUPUlQMwWTaJACYGQ61hQHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Tarbooj Magaz | Premium',
  stock: 100
},
{
  name: 'Jagat Store Chia Seeds',
  weight: '100g',
  price: 125,
  oldPrice: 175,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.GBUWN6fTktSkXlhkRo0dTgHaE8?pid=Api&H=106&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Chia Seeds | Superfood',
  stock: 80
},

// ========================================
// 🍯 GOOND (EDIBLE GUM)
// ========================================
{
  name: 'Jagat Store Goond (Edible Gum)',
  weight: '100g',
  price: 95,
  oldPrice: 135,
  discount: '30% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.aprXL_sv9R7aHQcxq_Z4vwHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Pure Goond | For Laddu & Panjiri',
  stock: 100
},
{
  name: 'Jagat Store Goond Tira (Thin Gum)',
  weight: '100g',
  price: 85,
  oldPrice: 120,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.UCQxuXbGIALnD5uPnzI2YgHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Goond Tira | Premium Quality',
  stock: 100
},

// ========================================
// 🥜 DRY FRUITS - ANJIR & AKHROT
// ========================================
{
  name: 'Jagat Store Anjir (Dried Figs)',
  weight: '250g',
  price: 195,
  oldPrice: 275,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.nR0vA4CUkEALkd-NF76YZgHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Premium Anjir | Sweet & Soft',
  stock: 80
},
{
  name: 'Jagat Store Akhrot Sabut (Whole Walnut)',
  weight: '250g',
  price: 185,
  oldPrice: 260,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.tFoF1mMCisMZP1z5EwQLpgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Akhrot With Shell | Brain Food',
  stock: 80
},
{
  name: 'Jagat Store Akhrot Giri (Walnut Kernels)',
  weight: '250g',
  price: 345,
  oldPrice: 475,
  discount: '27% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.JCRPE6NQ7S02vzyNZeoCZgHaGt?pid=Api&H=144&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Akhrot Giri | Premium Quality',
  stock: 60
},

// ========================================
// 🌴 CHUHARA (DATES DRY)
// ========================================
{
  name: 'Jagat Store Chuhara Pila (Yellow Dry Dates)',
  weight: '250g',
  price: 85,
  oldPrice: 120,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.fuKQErwBHG8ofjd6dHQwmAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Pila Chuhara | Energy Booster',
  stock: 100
},
{
  name: 'Jagat Store Chuhara Kala (Black Dry Dates)',
  weight: '250g',
  price: 95,
  oldPrice: 135,
  discount: '30% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.NttpHn07ZI950ot7ClRL1QHaHp?pid=Api&H=165&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Kala Chuhara | Premium',
  stock: 100
},

// ========================================
// 🥜 BADAM (ALMONDS)
// ========================================
{
  name: 'Jagat Store Badam Sabut (Whole Almonds)',
  weight: '250g',
  price: 225,
  oldPrice: 310,
  discount: '27% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.LJswLvHTW70PDIFh3uRE1gHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Badam Sabut | Premium Quality',
  stock: 80
},
{
  name: 'Jagat Store Badam 1st Quality (Premium)',
  weight: '250g',
  price: 295,
  oldPrice: 399,
  discount: '26% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.IV1C4AhvxoLazV2r8mFeXQHaJ3?pid=Api&P=0&w=400&h=533',
  inStock: true,
  description: '🏪 Jagat Store | Badam 1st Grade | California Style',
  stock: 60
},

{
  name: 'Jagat Store Badam Tulsi',
  weight: '250g',
  price: 185,
  oldPrice: 260,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.3NG9LlOL6xRgjM1Hv33QVwHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Badam Tulsi | Indian Almonds',
  stock: 80
},
{
  name: 'Jagat Store Badam Nutify',
  weight: '250g',
  price: 185,
  oldPrice: 260,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Nutify',
  image: '	https://tse1.mm.bing.net/th/id/OIP.8lIUTKpHDDVf_sk9U--9JgHaH7?pid=Api&H=171&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Badam Tulsi | Indian Almonds',
  stock: 80
},
{
  name: 'Ramu Badam Gurbandi',
  weight: '250g',
  price: 275,
  oldPrice: 375,
  discount: '27% OFF',
  category: "Jagat Store",
  brand: 'Ramu',
  image: 'https://tse1.mm.bing.net/th/id/OIP.jpsLTgBfxM8RaA2052M08QAAAA?pid=Api&H=235&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Gurbandi Badam | Afghan Premium',
  stock: 60
},

// ========================================
// 🥜 PISTA (PISTACHIO)
// ========================================
{
  name: 'Jagat Store Pista Namkeen (Salted)',
  weight: '250g',
  price: 385,
  oldPrice: 520,
  discount: '26% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.KdK_lDf8lchUf19vccMafwHaGg?pid=Api&P=0&w=455&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Pista Namkeen | Roasted & Salted',
  stock: 60
},
{
  name: 'Jagat Store Pista Hara (Green Pistachio)',
  weight: '100g',
  price: 245,
  oldPrice: 340,
  discount: '28% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.z7mdSZyEVQhp02G0M75bWQHaFj?pid=Api&P=0&w=533&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Pista Hara | For Sweets & Garnish',
  stock: 50
},

// ========================================
// 🥜 KAJU (CASHEW)
// ========================================
{
  name: 'Jagat Store Kaju 1st Quality (Premium)',
  weight: '250g',
  price: 325,
  oldPrice: 450,
  discount: '28% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.NisATEKUh4crVMIQOfH6lQHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Kaju W240 | Whole Premium',
  stock: 60
},
{
  name: 'Jagat Store Kaju 2nd Quality',
  weight: '250g',
  price: 265,
  oldPrice: 365,
  discount: '27% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.SErMTHwhoImZIN9bgl9kOwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Kaju W320 | Value Pack',
  stock: 80
},
{
  name: 'Nutify Kaju Packet',
  weight: '250g',
  price: 265,
  oldPrice: 365,
  discount: '27% OFF',
  category: "Jagat Store",
  brand: 'Nutify',
  image: '	https://tse1.mm.bing.net/th/id/OIP.O7hpAf6wnTtk569ZGdq1wwHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Kaju W320 | Value Pack',
  stock: 80
},
{
  name: 'Jagat Store Kaju Tukda (Broken Cashew)',
  weight: '250g',
  price: 195,
  oldPrice: 275,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.tlnjPH6V3yc8jTnfAqAYJgHaG1?pid=Api&P=0&w=433&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Kaju Tukda | For Cooking',
  stock: 100
},

// ========================================
// 🍇 KISHMISH & MUNAKKA
// ========================================
{
  name: 'Jagat Store Kishmish (Raisins)',
  weight: '250g',
  price: 125,
  oldPrice: 175,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.KS7-IUY80WHQ_8WLMYWnVwHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Kishmish | Green Raisins',
  stock: 100
},
{
  name: 'Jagat Store Munakka (Black Raisins)',
  weight: '250g',
  price: 145,
  oldPrice: 199,
  discount: '27% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.1iO3pF0zHtgbvv7JQgSakQHaFV?pid=Api&P=0&w=556&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Munakka | With Seeds',
  stock: 100
},

// ========================================
// 🌴 COCONUT (GOLA)
// ========================================
{
  name: 'Jagat Store Gola Burada (Coconut Powder)',
  weight: '100g',
  price: 45,
  oldPrice: 65,
  discount: '31% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.lgAju31W7zPIKWN_fk_e7wHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Nariyal Burada | Fresh',
  stock: 100
},
{
  name: 'Jagat Store Gola Sabut (Dry Coconut)',
  weight: '1pc',
  price: 35,
  oldPrice: 50,
  discount: '30% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse3.mm.bing.net/th/id/OIP.q9RoBdvfdzPuwy46J6W08wHaHa?pid=Api&P=0&h=180',
  inStock: true,
  description: '🏪 Jagat Store | Sukha Nariyal | Premium',
  stock: 100
},

// ========================================
// 🌿 AYURVEDIC HERBS
// ========================================
{
  name: 'Jagat Store Arjun Chhal (Arjuna Bark)',
  weight: '100g',
  price: 55,
  oldPrice: 80,
  discount: '31% OFF',
   category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.3cgYoDsEMw-ZqhjHKKqr_AHaE7?pid=Api&H=106&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Arjun Chhal | Heart Health',
  stock: 80
},

{
  name: 'Jagat Store Shatavari (Satavar)',
  weight: '100g',
  price: 125,
  oldPrice: 175,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.Io0SsNi4cvh7TFzOu8qaTQHaJ4?pid=Api&H=213&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Pure Shatavari | Women Health',
  stock: 60
},
{
  name: 'Jagat Store Mulethi (Licorice Root)',
  weight: '100g',
  price: 75,
  oldPrice: 110,
  discount: '32% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.3KkMjX_g7nywVqzeKBSeIQHaEK?pid=Api&H=89&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Mulethi Sticks | Throat Care',
  stock: 100
},
{
  name: 'Jagat Store Ashwagandha',
  weight: '100g',
  price: 145,
  oldPrice: 199,
  discount: '27% OFF',
category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.CGf8BNkTlh3DR8O1_n-jcgHaEK?pid=Api&H=89&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Ashwagandha Root | Immunity Booster',
  stock: 80
},

// ========================================
// 🧴 AYURVEDIC POWDERS
// ========================================
{
  name: 'Jagat Store Mulethi Powder',
  weight: '100g',
  price: 65,
  oldPrice: 95,
  discount: '32% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.Q6AGHv2UG9ujAtlgEq-RPgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Mulethi Powder | For Skin & Health',
  stock: 100
},
{
  name: 'Jagat Store Amla Powder',
  weight: '100g',
  price: 55,
  oldPrice: 80,
  discount: '31% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.wA7r3gSadiAKNNKWMBqiXwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Amla Powder | Vitamin C Rich',
  stock: 100
},
{
  name: 'Jagat Store Shikakai Powder',
  weight: '100g',
  price: 55,
  oldPrice: 80,
  discount: '31% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.4TYrJzQL_5UNE67u6zsRmQHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Shikakai Powder | Hair Wash',
  stock: 100
},
{
  name: 'Jagat Store Reetha Powder',
  weight: '100g',
  price: 55,
  oldPrice: 80,
  discount: '31% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP._qEZ1g9XPMHSR-ByiCkFnAAAAA?pid=Api&H=160&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Reetha Powder | Natural Cleanser',
  stock: 100
},

// ========================================
// 🌸 KESAR (SAFFRON)
// ========================================
{
  name: 'Jagat Store Kesar Baby Saffron',
  weight: '50mg',
  price: 45,
  oldPrice: 65,
  discount: '31% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse2.mm.bing.net/th/id/OIP.w-iO_gdP1m1mMh3dhEPo7QHaE7?pid=Api&H=106&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Pure Kesar | Kashmiri Saffron',
  stock: 50
},
{
  name: 'Jagat Store Kesar Baby Saffron',
  weight: '1g',
  price: 185,
  oldPrice: 250,
  discount: '26% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP._7I3Vnv5dn9-tnVOOZBgAwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Pure Kesar | Kashmiri Saffron',
  stock: 40
},

// ========================================
// 🎨 FOOD COLOURS
// ========================================
{
  name: 'Jagat Store Green Colour (Food Grade)',
  weight: '25g',
  price: 25,
  oldPrice: 35,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.YFUT7WH13KuuUQIma8090AHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Green Food Colour | Edible',
  stock: 100
},
{
  name: 'Jagat Store Red Colour (Food Grade)',
  weight: '25g',
  price: 25,
  oldPrice: 35,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.p1PsZ3_HyUmaTgtKr5wlagHaJ4?pid=Api&H=213&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Red Food Colour | Edible',
  stock: 100
},
{
  name: 'Jagat Store Yellow Colour (Food Grade)',
  weight: '25g',
  price: 25,
  oldPrice: 35,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.ocDujaz4P7fkq-WCowIpIgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Yellow Food Colour | Edible',
  stock: 100
},

// ========================================
// 🫒 OILS
// ========================================
{
  name: 'Jagat Store Castor Oil (Arandi Tel)',
  weight: '100ml',
  price: 65,
  oldPrice: 95,
  discount: '32% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.gerpE61kTS1GdYkZ9UO2MwHaHa?pid=Api&P=0&w=400&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Pure Castor Oil | For Hair & Skin',
  stock: 80
},


// ========================================
// 🌴 KIMIA DATES
// ========================================
{
  name: 'Jagat Store Kimia Khajoor',
  weight: '500g',
  price: 225,
  oldPrice: 310,
  discount: '27% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.ehfbB9fohyc5MiC8HdxxJAHaE8?pid=Api&H=106&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Kimia Dates | Soft & Juicy Iranian',
  stock: 60
},
{
  name: 'Jagat Store Makhana 1st Quality (Premium)',
  weight: '250g',
  price: 285,
  oldPrice: 399,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.cQXPjcquNHU5A2UdO_nHrwHaE8?pid=Api&P=0&w=600&h=400',
  inStock: true,
  description: '🏪 Jagat Store | Makhana Premium | Big Size | Fasting Snack',
  stock: 60
},
{
  name: 'Jagat Store Makhana 2nd Quality',
  weight: '250g',
  price: 195,
  oldPrice: 275,
  discount: '29% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.NDxl94RLBtcTdX8-iyYGsgHaEK?pid=Api&H=89&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Makhana Regular | Medium Size | Value Pack',
  stock: 80
},

{
  name: 'Farmley Premium Makhana',
  weight: '200g',
  price: 215,
  oldPrice: 289,
  discount: '26% OFF',
  category: "Jagat Store",
  brand: 'Farmley',
  image: 'https://tse1.mm.bing.net/th/id/OIP.94u6NCCQ2tFaeus9Lm1pTQHaJ4?pid=Api&H=213&W=160',
  inStock: true,
  description: 'Farmley | Premium Phool Makhana | Handpicked',
  stock: 50
},
{
  name: 'Jagat Store Amla Sabut (Dry Gooseberry)',
  weight: '100g',
  price: 45,
  oldPrice: 65,
  discount: '31% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse2.mm.bing.net/th/id/OIP.OV-E8s0G8VSeCXZ_xfMAyQAAAA?pid=Api&P=0&w=400&h=402',
  inStock: true,
  description: '🏪 Jagat Store | Sukha Amla | Hair & Health',
  stock: 100
},
{
  name: 'Jagat Store Shikakai Sabut (Whole)',
  weight: '100g',
  price: 48,
  oldPrice: 70,
  discount: '31% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: '	https://tse1.mm.bing.net/th/id/OIP.B9y2dxv9DCZ3QFDVYb8jzgHaEx?pid=Api&H=102&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Shikakai Whole | Natural Shampoo',
  stock: 100
},
{
  name: 'Jagat Store Reetha Sabut (Soap Nut)',
  weight: '100g',
  price: 42,
  oldPrice: 60,
  discount: '30% OFF',
  category: "Jagat Store",
  brand: 'Jagat Store',
  image: 'https://tse1.mm.bing.net/th/id/OIP.ihWblcKvXrTPhvDa9HCTxAHaIV?pid=Api&H=179&W=160',
  inStock: true,
  description: '🏪 Jagat Store | Reetha Whole | Natural Cleanser',
  stock: 100
},



];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🏪 Starting Smart Migration for Jagat Store...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Jagat Store" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of jagatStoreProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Jagat Store" })}`);
    
    console.log('\n📋 Product Categories:');
    console.log('   🥬 Fresh Vegetables: 10 products');
    console.log('   🍎 Fresh Fruits: 10 products');
    console.log('   🍱 Packaged Foods: 10 products');
    console.log('   🥤 Beverages: 10 products');
    console.log('   🧹 Household Essentials: 10 products');
    
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();