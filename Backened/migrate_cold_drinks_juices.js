// migrate_cold_drinks_juices.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_cold_drinks_juices.js

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
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

// ========== COLD DRINKS & JUICES PRODUCTS ==========
const coldDrinksJuicesProducts = [
  
  // ════════════════════════════════════════════════════════════════
  // 🥤 THUMS UP
  // ════

  // ════════════════════════════════════════════════════════════════
  // 🥤 THUMS UP
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Thums Up',
    weight: '750ml',
    price: 38,
    oldPrice: 42,
    discount: '10% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Thums Up',
    image: '	https://tse1.mm.bing.net/th/id/OIP.QzC9RERFdPhqqSJkC6KIyQHaIo?pid=Api&H=186&W=160',
    inStock: true,
    description: 'Thums Up | Strong Cola Taste | Refreshing Drink | 750ml Bottle',
    stock: 150
  },
  
  {
    name: 'Thums Up',
    weight: '1L',
    price: 52,
    oldPrice: 58,
    discount: '10% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Thums Up',
    image: 'https://tse1.mm.bing.net/th/id/OIP.NN20GxWnsiVTy-8RWrY9bgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Thums Up | Strong Cola Taste | Refreshing Drink | 1 Litre Bottle',
    stock: 120
  },
  {
    name: 'Thums Up',
    weight: '2L',
    price: 87,
    oldPrice: 95,
    discount: '8% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Thums Up',
    image: '	https://tse2.mm.bing.net/th/id/OIP.fspMjDhmIzdMWYiTOeqmJQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Thums Up | Strong Cola Taste | Refreshing Drink | 2 Litre Family Pack',
    stock: 80
  },

  // ════════════════════════════════════════════════════════════════
  // 🥤 COCA-COLA
  // ════════════════════════════════════════════════════════════════

  
  {
    name: 'Coca-Cola',
    weight: '1L',
    price: 52,
    oldPrice: 58,
    discount: '10% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Coca-Cola',
    image: '	https://tse1.mm.bing.net/th/id/OIP.1QZyK-KfBQccjlxbCzMumQHaHg?pid=Api&H=162&W=160',
    inStock: true,
    description: 'Coca-Cola | Original Taste | Refreshing Drink | 1 Litre Bottle',
    stock: 120
  },
  {
    name: 'Coca-Cola',
    weight: '2L',
    price: 87,
    oldPrice: 95,
    discount: '8% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Coca-Cola',
    image: '	https://tse1.mm.bing.net/th/id/OIP.y7tYmr2yB6a3qXmr6HrxBwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Coca-Cola | Original Taste | Refreshing Drink | 2 Litre Family Pack',
    stock: 80
  },

  // ════════════════════════════════════════════════════════════════
  // 🥤 SPRITE
  // ════════════════════════════════════════════════════════════════

  
  {
    name: 'Sprite',
    weight: '750ml',
    price: 38,
    oldPrice: 42,
    discount: '10% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Sprite',
    image: 'https://tse1.mm.bing.net/th/id/OIP.gUeNuL-Ir7yvSNK3EP9qHwHaHT?pid=Api&H=157&W=160',
    inStock: true,
    description: 'Sprite | Clear Lemon Lime | Refreshing Drink | 750ml Bottle',
    stock: 150
  },
 
  {
    name: 'Sprite',
    weight: '2L',
    price: 87,
    oldPrice: 95,
    discount: '8% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Sprite',
    image: 'https://tse2.mm.bing.net/th/id/OIP.OGoWWYLsjIqu_GoXD8cdPQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Sprite | Clear Lemon Lime | Refreshing Drink | 2 Litre Family Pack',
    stock: 80
  },

  // ════════════════════════════════════════════════════════════════
  // 🥤 FANTA
  // ════════════════════════════════════════════════════════════════

  
  {
    name: 'Fanta Orange',
    weight: '750ml',
    price: 38,
    oldPrice: 42,
    discount: '10% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Fanta',
    image: '	https://tse2.mm.bing.net/th/id/OIP.b4HerH4mHbGy5to1h1JF0gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Fanta Orange | Fruity Orange Taste | Refreshing Drink | 750ml Bottle',
    stock: 150
  },
  {
    name: 'Fanta Orange',
    weight: '2L',
    price: 87,
    oldPrice: 95,
    discount: '8% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Fanta',
    image: '	https://tse1.mm.bing.net/th/id/OIP.N4PrmSivFmJlHNStOvvGBQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Fanta Orange | Fruity Orange Taste | Refreshing Drink | 2 Litre Family Pack',
    stock: 80
  },

  // ════════════════════════════════════════════════════════════════
  // 🥤 LIMCA
  // ════════════════════════════════════════════════════════════════


  {
    name: 'Limca',
    weight: '750ml',
    price: 38,
    oldPrice: 42,
    discount: '10% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Limca',
    image: '	https://tse1.mm.bing.net/th/id/OIP.BLaQhv9prHH7vE4gLuabUgAAAA?pid=Api&H=230&W=160',
    inStock: true,
    description: 'Limca | Lime & Lemon | Refreshing Drink | 750ml Bottle',
    stock: 150
  },
  {
    name: 'Limca',
    weight: '2L',
    price: 87,
    oldPrice: 95,
    discount: '8% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Limca',
    image: 'https://tse1.mm.bing.net/th/id/OIP.KJlX-vB7NAsl7OLfWrVTiwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Limca | Lime & Lemon | Refreshing Drink | 2 Litre Family Pack',
    stock: 80
  },

  // ════════════════════════════════════════════════════════════════
  // 🥤 PEPSI
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Pepsi',
    weight: '2L',
    price: 87,
    oldPrice: 95,
    discount: '8% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Pepsi',
    image: '	https://tse2.mm.bing.net/th/id/OIP.snZvrjZmIme7y8KMDXVVKQHaG0?pid=Api&H=147&W=160',
    inStock: true,
    description: 'Pepsi | Bold Cola Taste | Refreshing Drink | 2 Litre Family Pack',
    stock: 80
  },

 

  // ════════════════════════════════════════════════════════════════
  // 🥤 MOUNTAIN DEW
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Mountain Dew',
    weight: '2L',
    price: 87,
    oldPrice: 95,
    discount: '8% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Mountain Dew',
    image: '	https://tse1.mm.bing.net/th/id/OIP.r8yuotBIjCukwB5XlehmJQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Mountain Dew | Citrus Blast | Energy Drink | 2 Litre Family Pack',
    stock: 80
  },

  // ════════════════════════════════════════════════════════════════
  // 🧃 MAAZA
  // ════════════════════════════════════════════════════════════════

 
  {
    name: 'Maaza Mango',
    weight: '1L',
    price: 65,
    oldPrice: 75,
    discount: '13% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Maaza',
    image: 'https://tse2.mm.bing.net/th/id/OIP.LITeqXJ91oFpD21641hvbQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Maaza | Mango Drink | Rich Mango Flavor | 1 Litre Bottle',
    stock: 100
  },


  // ════════════════════════════════════════════════════════════════
  // 🧃 FROOTI
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Frooti Mango',
    weight: '1L',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Frooti',
    image: 'https://tse1.mm.bing.net/th/id/OIP.r_OT-WoZYors1D46ZkZNywHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Frooti | Fresh N Juicy Mango | PET Bottle | 1 Litre',
    stock: 100
  },
    {
    name: 'Frooti Mango',
    weight: '2L',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Frooti',
    image: 'https://tse1.mm.bing.net/th/id/OIP.9mEqB9EmTcDXwjNJAbJ4dQHaEI?pid=Api&H=89&W=160',
    inStock: true,
    description: 'Frooti | Fresh N Juicy Mango | PET Bottle | 2 Litre',
    stock: 100
  },

  // ════════════════════════════════════════════════════════════════
  // 💧 BISLERI WATER
  // ════════════════════════════════════════════════════════════════


  {
    name: 'Bisleri Water',
    weight: '1L',
    price: 22,
    oldPrice: 25,
    discount: '12% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Bisleri',
    image: 'https://tse2.mm.bing.net/th/id/OIP.9O8lB18u6Cxi7oibmUTbDAHaES?pid=Api&H=92&W=160',
    inStock: true,
    description: 'Bisleri Mineral Water | Pure & Safe | 1 Litre Bottle',
    stock: 400
  },
  {
    name: 'Bisleri Water',
    weight: '2L',
    price: 35,
    oldPrice: 40,
    discount: '13% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Bisleri',
    image: '	https://tse1.mm.bing.net/th/id/OIP.klmRMzshBAszqQGiPrhE8wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Bisleri Mineral Water | Pure & Safe | 2 Litre Bottle',
    stock: 200
  },

 

  // ════════════════════════════════════════════════════════════════
  // 🥤 STING ENERGY
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Sting Energy Drink',
    weight: '250ml',
    price: 20,
    oldPrice: 22,
    discount: '9% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Sting',
    image: 'https://tse2.mm.bing.net/th/id/OIP.f0uveOLaSE72l6Xoiah17wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Sting Energy Drink | Berry Blast | Caffeine Boost | 250ml Can',
    stock: 150
  },

  // ════════════════════════════════════════════════════════════════
  // 🥤 RED BULL
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Red Bull Energy Drink',
    weight: '250ml',
    price: 115,
    oldPrice: 125,
    discount: '8% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Red Bull',
    image: '	https://tse2.mm.bing.net/th/id/OIP.yJQ_codj4f8RNakhJbJFsgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Red Bull Energy Drink | Gives You Wings | 250ml Can',
    stock: 80
  },

  // ════════════════════════════════════════════════════════════════
  // 🥤 HELL ENERGY
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Hell Energy Drink',
    weight: '250ml',
    price: 85,
    oldPrice: 99,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Hell',
    image: '	https://tse2.mm.bing.net/th/id/OIP.FC0ehUqbfVzvWNMF49xwbgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Hell Energy Drink Classic | Strong Energy Boost | 250ml Can',
    stock: 80
  },

  // ════════════════════════════════════════════════════════════════
  // 🥛 CREAMBELL MILKSHAKE
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Creambell Milkshake Kesar Badam',
    weight: '200ml',
    price: 30,
    oldPrice: 35,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Creambell',
    image: 'https://tse2.mm.bing.net/th/id/OIP.SxdDjWULYxqUCiI4LJDdsQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Creambell Milkshake | Kesar Badam Flavor | Rich & Creamy | 200ml',
    stock: 100
  },
  {
    name: 'Creambell Milkshake Chocolate',
    weight: '200ml',
    price: 30,
    oldPrice: 35,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Creambell',
    image: '	https://tse2.mm.bing.net/th/id/OIP.3Fnynx59BRHR1_2VVBt9GQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Creambell Milkshake | Chocolate Flavor | Rich & Creamy | 200ml',
    stock: 100
  },
  {
    name: 'Creambell Cold Coffee',
    weight: '200ml',
    price: 30,
    oldPrice: 35,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Creambell',
    image: 'https://tse1.mm.bing.net/th/id/OIP.ZpvzpGbIm8zUD7U21-mz_gHaEK?pid=Api&H=89&W=160',
    inStock: true,
    description: 'Creambell Cold Coffee | Refreshing Coffee | Chilled | 200ml',
    stock: 100
  },

  // ════════════════════════════════════════════════════════════════
  // 📦 FROOTI BULK PACK
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Frooti Mango Pack',
    weight: '200ml x 10',
    price: 120,
    oldPrice: 144,
    discount: '17% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Frooti',
    image: '	https://tse2.mm.bing.net/th/id/OIP.ECZzEw1_sLETC44cAyvgyQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Frooti Mango Drink | 12 Pack | 200ml x 10 | Party Pack',
    stock: 50
  },

  // ════════════════════════════════════════════════════════════════
  // 📦 JALJEERA BULK PACK
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Jaljeera Masala Drink',
    weight: '200ml',
    price: 10,
    oldPrice: 18,
    discount: '17% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Lahori',
    image: 'https://tse1.mm.bing.net/th/id/OIP.xhFpT-quH4izu_XStfHNdwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Jaljeera Masala Drink | Refreshing Indian Drink | 200ml',
    stock: 150
  },
 

  // ════════════════════════════════════════════════════════════════
  // 🥤 CATCH SODA
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Catch Soda Plain',
    weight: '750ml',
    price: 20,
    oldPrice: 25,
    discount: '20% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Catch',
    image: 'https://tse1.mm.bing.net/th/id/OIP.f7Bx225Ji0ucCsbdvmDvqQAAAA?pid=Api&H=527&W=160',
    inStock: true,
    description: 'Catch Soda Plain | Sparkling Water | Mixer | 750ml Bottle',
    stock: 150
  },
  {
    name: 'Catch Lemon Soda',
    weight: '750ml',
    price: 22,
    oldPrice: 28,
    discount: '21% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Catch',
    image: '	https://tse1.mm.bing.net/th/id/OIP.Pf347q2IAUQQwei2J_jvSwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Catch Lemon Soda | Refreshing Lemon Flavor | Mixer | 750ml Bottle',
    stock: 150
  },

  // ════════════════════════════════════════════════════════════════
  // 🧃 REAL FRUIT JUICES
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Real Mixed Fruit Juice',
    weight: '1L',
    price: 99,
    oldPrice: 115,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Real',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Ph2r1XstfMzgBRogsgtvOAHaEl?pid=Api&H=98&W=160',
    inStock: true,
    description: 'Real Mixed Fruit Juice | No Added Sugar | 1 Litre Pack',
    stock: 80
  },
  {
    name: 'Real Litchi Juice',
    weight: '1L',
    price: 99,
    oldPrice: 115,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Real',
    image: 'https://tse2.mm.bing.net/th/id/OIP.RKKSJvVIpYY7d0LNWyeZVAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Real Litchi Juice | Sweet & Refreshing | 1 Litre Pack',
    stock: 80
  },
  {
    name: 'Real Pomegranate (Anar) Juice',
    weight: '1L',
    price: 110,
    oldPrice: 130,
    discount: '15% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Real',
    image: 'https://tse2.mm.bing.net/th/id/OIP.93ia6flsxhXBue7apzB9RQHaJ1?pid=Api&H=212&W=160',
    inStock: true,
    description: 'Real Pomegranate Juice | Anar | Rich in Antioxidants | 1 Litre Pack',
    stock: 80
  },
  {
    name: 'Real Cranberry Juice',
    weight: '1L',
    price: 115,
    oldPrice: 135,
    discount: '15% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Real',
    image: 'https://tse2.mm.bing.net/th/id/OIP.KjEnADL1JcGV5JWftC2_nAHaH7?pid=Api&H=171&W=160 ',
    inStock: true,
    description: 'Real Cranberry Juice | Tangy & Healthy | 1 Litre Pack',
    stock: 80
  },
  {
    name: 'Real Guava Juice',
    weight: '1L',
    price: 99,
    oldPrice: 115,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Real',
    image: '	https://tse1.mm.bing.net/th/id/OIP.fIcX6zKIFS6ERfgIajh3gQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Real Guava Juice | Amrud | Sweet & Delicious | 1 Litre Pack',
    stock: 80
  }, 
  
  {
    name: 'Diet Coke Can',
    weight: '750ml',
    price: 45,
    oldPrice: 52,
    discount: '13% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Coca-Cola',
    image: 'https://tse2.mm.bing.net/th/id/OIP.fbFxhr1LLR1vEXx7RTZIYwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Diet Coke | Zero Sugar | Zero Calories | Refreshing | Can',
    stock: 80
  },

  // ════════════════════════════════════════════════════════════════
  // 🥤 PEPSI BLACK (SUGAR FREE)
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Pepsi Black',
    weight: '250ml',
    price: 25,
    oldPrice: 29,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Pepsi',
    image: '	https://tse2.mm.bing.net/th/id/OIP.NKkMMxLGt3DpJ1QMsrDmMwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Pepsi Black | Zero Sugar | Bold Cola Taste | 250ml Can',
    stock: 100
  },
 

  // ════════════════════════════════════════════════════════════════
  // 🥛 YAKULT (PROBIOTIC)
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Yakult Probiotic Drink',
    weight: '65ml x 5',
    price: 90,
    oldPrice: 105,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Yakult',
    image: 'https://tse1.mm.bing.net/th/id/OIP.1IUAa_JK74koDAExfNuz0gHaE8?pid=Api&H=106&W=160',
    inStock: true,
    description: 'Yakult Probiotic Drink | Good Bacteria | Gut Health | 65ml x 5 Pack',
    stock: 80
  },
   {
    name: 'Yakult Probiotic Drink Light',
    weight: '65ml x 5',
    price: 90,
    oldPrice: 105,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Yakult',
    image: 'https://tse2.mm.bing.net/th/id/OIP.mnWLoXIaqdwPYgDlb5vSrgHaDf?pid=Api&H=75&W=160',
    inStock: true,
    description: 'Yakult Probiotic Drink Light | Good Bacteria | Gut Health | 65ml x 5 Pack',
    stock: 80
  },

  // ════════════════════════════════════════════════════════════════
  // 🥥 REAL COCONUT WATER
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Real Coconut Water',
    weight: '1L',
    price: 99,
    oldPrice: 115,
    discount: '14% OFF',
    category: 'Cold Drinks & Juices',
    brand: 'Real',
    image: '	https://tse1.mm.bing.net/th/id/OIP.C-RdZZW8mttAinN1bUHEIAHaHr?pid=Api&H=165&W=160',
    inStock: true,
    description: 'Real Coconut Water | 100% Natural | No Added Sugar | Refreshing | 1 Litre',
    stock: 80
  }
 

];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🥤 Starting Smart Migration for Cold Drinks & Juices...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Cold Drinks & Juices" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of coldDrinksJuicesProducts) {
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
          console.log(`⭐ UNCHANGED: ${productData.name} (${productData.weight})`);
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
    console.log(`   ⭐ Unchanged: ${unchanged}`);
    console.log(`   ❌ Deleted: ${deleted}`);
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Cold Drinks & Juices" })}`);
    
    console.log('\n📋 Product Categories:');
    console.log('   🥤 Thums Up: 4 products');
    console.log('   🥤 Coca-Cola: 4 products');
    console.log('   🥤 Sprite: 4 products');
    console.log('   🥤 Fanta: 3 products');
    console.log('   🥤 Limca: 3 products');
    console.log('   🥤 Pepsi: 3 products');
    console.log('   🥤 7Up: 3 products');
    console.log('   🥤 Mountain Dew: 3 products');
    console.log('   🧃 Maaza: 3 products');
    console.log('   🧃 Slice: 3 products');
    console.log('   🧃 Frooti: 3 products');
    console.log('   💧 Bisleri Water: 3 products');
    console.log('   💧 Kinley Water: 3 products');
    console.log('   🥤 Sting Energy: 1 product');
    console.log('   🥤 Red Bull: 1 product');
    
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();