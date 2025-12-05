// migrate_snacks_munchies_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_snacks_munchies_IMPROVED.js

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

// ========== SNACKS & MUNCHIES PRODUCTS ==========
const snacksMunchiesProducts = [
  // CHIPS - LAYS
 {
  name: 'Maggi 2-Minute Noodles',
  weight: '70g',
  price: 14,
  oldPrice: 17,
  discount: '18% OFF',
 category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: 'https://tse1.mm.bing.net/th/id/OIP.YlCrzPhIVtJ5uHUF0sH-eAHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maggi 2-Minute Masala Noodles | Single Pack | 70g',
  stock: 300
},
{
  name: 'Maggi 2-Minute Noodles',
  weight: '70g x 4',
  price: 56,
  oldPrice: 68,
  discount: '18% OFF',
category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: '	https://tse2.mm.bing.net/th/id/OIP.MrH6KdkCcD1rSRiVX_EY_gHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maggi 2-Minute Masala Noodles | Pack of 4',
  stock: 200
},
{
  name: 'Maggi 2-Minute Noodles',
  weight: '70g x 6',
  price: 84,
  oldPrice: 102,
  discount: '18% OFF',
  category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: 'https://tse2.mm.bing.net/th/id/OIP.VcjR5Jvl05HKKlAiiSJd5wHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maggi 2-Minute Masala Noodles | Pack of 6',
  stock: 150
},
{
  name: 'Maggi 2-Minute Noodles',
  weight: '70g x 8',
  price: 112,
  oldPrice: 136,
  discount: '18% OFF',
  category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: 'https://tse1.mm.bing.net/th/id/OIP.W-S4ZHXW4Q-zqOhTfyg2QgHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maggi 2-Minute Masala Noodles | Family Pack of 8',
  stock: 120
},

// ATTA MAGGI (WHOLE WHEAT)
{
  name: 'Maggi Atta Noodles',
  weight: '70g',
  price: 15,
  oldPrice: 18,
  discount: '17% OFF',
  category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: '	https://tse2.mm.bing.net/th/id/OIP.vTtbCYEuomwUMPlCMpciogHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maggi Nutri-licious Atta Noodles | Whole Wheat | Single Pack',
  stock: 180
},
{
  name: 'Maggi Atta Noodles',
  weight: '70g x 4',
  price: 60,
  oldPrice: 72,
  discount: '17% OFF',
  category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: 'https://tse1.mm.bing.net/th/id/OIP.8JUuAk13XJHADManzw_lDwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maggi Nutri-licious Atta Noodles | Whole Wheat | Pack of 4',
  stock: 120
},

// MAGGI PASTA (WHITE & RED MASALA)
{
  name: 'Maggi Pazzta Cheese Macaroni',
  weight: '70g',
  price: 25,
  oldPrice: 30,
  discount: '17% OFF',
  category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: 'https://tse1.mm.bing.net/th/id/OIP.p8un027z54cQrGHX7ONUXwHaHa?pid=Api&H=160&W=160',
  inStock: true,
  description: 'Maggi Pazzta | Cheese Macaroni | White Sauce | Instant | 70g',
  stock: 130
},
{
  name: 'Maggi Pazzta Masala Penne',
  weight: '70g',
  price: 25,
  oldPrice: 30,
  discount: '17% OFF',
  category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: 'https://tse1.mm.bing.net/th/id/OIP.0PG3wUETLaUyE0r0fMJXjAHaEK?pid=Api&H=89&W=160',
  inStock: true,
  description: 'Maggi Pazzta | Masala Penne | Red Sauce | Instant | 70g',
  stock: 130
},
{
  name: 'Maggi Pazzta Tomato',
  weight: '70g',
  price: 25,
  oldPrice: 30,
  discount: '17% OFF',
  category: 'Snacks & Munchies',
  brand: 'Maggi',
  image: '	https://tse1.mm.bing.net/th/id/OIP.5TuB8QpoeC2q2EbOLpXtSQHaES?pid=Api&P=0&w=692&h=400',
  inStock: true,
  description: 'Maggi Pazzta | Tomato | Red Sauce | Instant | 70g',
  stock: 130
},












{
    name: 'Haldirams Aloo Bhujia',
    weight: '200g',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.MO4hoqFiQLYRwcxBRsrWXAHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Haldirams Aloo Bhujia | Crispy Potato Sev | Classic Indian Namkeen | 200g Pack',
    stock: 100
  },
  {
    name: 'Haldirams Aloo Bhujia',
    weight: '400g',
    price: 115,
    oldPrice: 135,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.QRb-gRVmYEBPNG5ypagYuwHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Haldirams Aloo Bhujia | Crispy Potato Sev | Classic Indian Namkeen | 400g Pack',
    stock: 80
  },
  {
    name: 'Haldirams Aloo Bhujia',
    weight: '1kg',
    price: 275,
    oldPrice: 320,
    discount: '14% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse3.mm.bing.net/th/id/OIP.f0ewJ2qMJXXSZdAq819CDAHaKc?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Haldirams Aloo Bhujia | Crispy Potato Sev | Classic Indian Namkeen | 1kg Family Pack',
    stock: 50
  },

  // ============ BHUJIA SEV ============
  {
    name: 'Haldirams Bhujia Sev',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse2.mm.bing.net/th/id/OIP._qfw-eOkev8HvnYn8lFBoAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Bhujia Sev | Crispy Besan Sev | Traditional Bikaneri Namkeen | 200g Pack',
    stock: 100
  },
  {
    name: 'Haldirams Bhujia Sev',
    weight: '400g',
    price: 105,
    oldPrice: 125,
    discount: '16% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse2.mm.bing.net/th/id/OIP.hkUF3ED6F9UdjW6wJ9GTXwHaKN?pid=Api&H=220&W=160',
    inStock: true,
    description: 'Haldirams Bhujia Sev | Crispy Besan Sev | Traditional Bikaneri Namkeen | 400g Pack',
    stock: 80
  },
  {
    name: 'Haldirams Bhujia Sev',
    weight: '1kg',
    price: 250,
    oldPrice: 295,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse2.mm.bing.net/th/id/OIP.Z6AO3lhhlFrq95mSBLbWIAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Bhujia Sev | Crispy Besan Sev | Traditional Bikaneri Namkeen | 1kg Family Pack',
    stock: 50
  },

  // ============ MOONG DAL ============
  {
    name: 'Haldirams Moong Dal',
    weight: '200g',
    price: 58,
    oldPrice: 68,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse1.mm.bing.net/th/id/OIP.EZHKm0dxBZTXl1G4FD4PVgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Moong Dal | Crispy Fried Moong Dal | Salted Namkeen | 200g Pack',
    stock: 100
  },
  {
    name: 'Haldirams Moong Dal',
    weight: '400g',
    price: 110,
    oldPrice: 130,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse2.mm.bing.net/th/id/OIP.IOLQF_Ex1Ca33dCgkDL9AwHaKM?pid=Api&H=220&W=160',
    inStock: true,
    description: 'Haldirams Moong Dal | Crispy Fried Moong Dal | Salted Namkeen | 400g Pack',
    stock: 80
  },
  

  // ============ KHATTA MEETHA ============
  {
    name: 'Haldirams Khatta Meetha',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse2.mm.bing.net/th/id/OIP.zXgRNOywUEHkYsAeKBUFiAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Khatta Meetha | Sweet & Tangy Mix | Popular Indian Namkeen | 200g Pack',
    stock: 100
  },
  {
    name: 'Haldirams Khatta Meetha',
    weight: '400g',
    price: 105,
    oldPrice: 125,
    discount: '16% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.fnAfHVJAsJpq-t_CoYR1WAHaJ9?pid=Api&H=215&W=160',
    inStock: true,
    description: 'Haldirams Khatta Meetha | Sweet & Tangy Mix | Popular Indian Namkeen | 400g Pack',
    stock: 80
  },
  {
    name: 'Haldirams Khatta Meetha',
    weight: '1kg',
    price: 250,
    oldPrice: 295,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse1.mm.bing.net/th/id/OIP.VQdWz4UjaUDkQSRkmxWUqwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Khatta Meetha | Sweet & Tangy Mix | Popular Indian Namkeen | 1kg Family Pack',
    stock: 50
  },

  // ============ NAVRATAN MIX ============
  {
    name: 'Haldirams Navratan Mix',
    weight: '200g',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.OQETHVeD5V9evZBJtc62-wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Navratan Mix | Premium 9-in-1 Mixture | Assorted Namkeen | 200g Pack',
    stock: 100
  },
  {
    name: 'Haldirams Navratan Mix',
    weight: '400g',
    price: 115,
    oldPrice: 135,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP._enWbXNZW_ewfELAiJ2OtAAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Navratan Mix | Premium 9-in-1 Mixture | Assorted Namkeen | 400g Pack',
    stock: 80
  },
  {
    name: 'Haldirams Navratan Mix',
    weight: '1kg',
    price: 275,
    oldPrice: 320,
    discount: '14% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse1.mm.bing.net/th/id/OIP.oCUhorxYriMcvpFM-csW4wAAAA?pid=Api&H=241&W=160',
    inStock: true,
    description: 'Haldirams Navratan Mix | Premium 9-in-1 Mixture | Assorted Namkeen | 1kg Family Pack',
    stock: 50
  },

  // ============ CHANA DAL ============
  {
    name: 'Haldirams Chana Dal',
    weight: '200g',
    price: 52,
    oldPrice: 62,
    discount: '16% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse1.mm.bing.net/th/id/OIP.Nk6SFO5pNAwhpQ55POJ-DwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Chana Dal | Crispy Fried Chana | Protein Rich Namkeen | 200g Pack',
    stock: 100
  },
  

  // ============ PEANUTS (MUNGFALI) ============
  {
    name: 'Haldirams Classic Salted Peanuts',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse2.mm.bing.net/th/id/OIP.l4E_rUUIqLYE0QRi1QFImQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Classic Salted Peanuts | Roasted & Salted | Healthy Snack | 200g Pack',
    stock: 100
  },
  {
    name: 'Haldirams Classic Salted Peanuts',
    weight: '400g',
    price: 105,
    oldPrice: 125,
    discount: '16% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse1.mm.bing.net/th/id/OIP.2SRJ7vxjmj7F_uQclOeBSgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Classic Salted Peanuts | Roasted & Salted | Healthy Snack | 400g Pack',
    stock: 80
  },



  // ============ CORNFLAKES MIXTURE ============
  {
    name: 'Haldirams Cornflakes Mixture',
    weight: '200g',
    price: 58,
    oldPrice: 68,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.vWxD3EPelyD7aMDtJ8MzZgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Cornflakes Mixture | Crispy Cornflakes with Namkeen | Light Snack | 200g Pack',
    stock: 100
  },
  {
    name: 'Haldirams Cornflakes Mixture',
    weight: '400g',
    price: 110,
    oldPrice: 130,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse2.mm.bing.net/th/id/OIP.jCVRZkUYORjvPbE9aeDhDwHaJ4?pid=Api&H=213&W=160',
    inStock: true,
    description: 'Haldirams Cornflakes Mixture | Crispy Cornflakes with Namkeen | Light Snack | 400g Pack',
    stock: 80
  },
  


  // ============ DAL BIJI ============
  {
    name: 'Haldirams Dal Biji',
    weight: '200g',
    price: 50,
    oldPrice: 60,
    discount: '17% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.rRUgIqsq4P3-TA3xfLIu2wHaFj?pid=Api&H=119&W=160',
    inStock: true,
    description: 'Haldirams Dal Biji | Crispy Mini Dal Snack | Traditional Namkeen | 200g Pack',
    stock: 100
  },
  {
    name: 'Haldirams Dal Biji',
    weight: '400g',
    price: 95,
    oldPrice: 115,
    discount: '17% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse2.mm.bing.net/th/id/OIP.AC9pnMfYrRil1CHWSpJm7AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Dal Biji | Crispy Mini Dal Snack | Traditional Namkeen | 400g Pack',
    stock: 80
  },

   {
    name: 'Haldirams Plain Bhujia',
    weight: '200g',
    price: 52,
    oldPrice: 62,
    discount: '16% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse1.mm.bing.net/th/id/OIP.obCg8uNh6uQFdxHRTkDw-gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Plain Bhujia | Classic Besan Sev | No Spice | Light Namkeen | 200g Pack',
    stock: 100
  },
  {
    name: 'Haldirams Plain Bhujia',
    weight: '400g',
    price: 99,
    oldPrice: 118,
    discount: '16% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.6r6ezhKR-Q2COr-ekbWeyAHaJ8?pid=Api&H=214&W=160',
    inStock: true,
    description: 'Haldirams Plain Bhujia | Classic Besan Sev | No Spice | Light Namkeen | 400g Pack',
    stock: 80
  },

  // ============ NIMBU MASALA ============
  {
    name: 'Haldirams Nimbu Masala',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse2.mm.bing.net/th/id/OIP.xUlUjEzF-pPhHqDc1N_uggHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Nimbu Masala | Tangy Lemon Flavored Mix | Refreshing Namkeen | 200g Pack',
    stock: 100
  },


  // ============ PUNJABI TADKA ============
  {
    name: 'Haldirams Punjabi Tadka',
    weight: '200g',
    price: 58,
    oldPrice: 68,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse2.mm.bing.net/th/id/OIP.OtiVLWH3iAu117i-Up7AigHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Punjabi Tadka | Spicy North Indian Mix | Bold Flavors | 200g Pack',
    stock: 100
  },


  // ============ LITE MIXTURE ============
  {
    name: 'Haldirams Lite Mixture',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Ou7iH84vRrqZ1F6TrGN-7wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Lite Mixture | Low Oil Namkeen | Healthy Snacking | 200g Pack',
    stock: 100
  },
 

  // ============ MURMURA MIXTURE ============
  {
    name: 'Haldirams Murmura Mixture',
    weight: '200g',
    price: 45,
    oldPrice: 55,
    discount: '18% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse1.mm.bing.net/th/id/OIP.rboAH24z88oCDebz-L-5agHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Murmura Mixture | Puffed Rice Mix | Light & Crispy | 200g Pack',
    stock: 100
  },
 

  // ============ NUT CRACKER ============
  {
    name: 'Haldirams Nut Cracker',
    weight: '200g',
    price: 65,
    oldPrice: 75,
    discount: '13% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse2.mm.bing.net/th/id/OIP.-MS2W6uz8ixOvgjsZAzn2gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Nut Cracker | Crunchy Coated Peanuts | Premium Snack | 200g Pack',
    stock: 100
  },
  {
    name: 'Haldirams Nut Cracker',
    weight: '400g',
    price: 125,
    oldPrice: 145,
    discount: '14% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse2.mm.bing.net/th/id/OIP.TGjpmP0RQyUY_tri1kEgZQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Nut Cracker | Crunchy Coated Peanuts | Premium Snack | 400g Pack',
    stock: 80
  },

  // ============ GUPSHUP ============
  {
    name: 'Haldirams Gupshup',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.sXTj8yNTYnoCaodg7PwKLQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Gupshup | Chatpata Mix Namkeen | Party Snack | 200g Pack',
    stock: 100
  },


  // ============ MASALA SALTED PEANUT ============
  {
    name: 'Haldirams Masala Salted Peanuts',
    weight: '200g',
    price: 58,
    oldPrice: 68,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse1.mm.bing.net/th/id/OIP.T6AGK4qPs-gTlRc-fNuX5AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Masala Salted Peanuts | Spicy Roasted Peanuts | Tasty Snack | 200g Pack',
    stock: 100
  },


  // ============ NUT CRUSHER ROASTED ============
  {
    name: 'Haldirams Nut Crusher Roasted',
    weight: '200g',
    price: 62,
    oldPrice: 72,
    discount: '14% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.9D4SJQa3K_8B-67cD1IOxQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Nut Crusher Roasted | Crushed Spicy Peanuts | Crunchy Snack | 200g Pack',
    stock: 100
  },
  

  // ============ HING JEERA CHANA ============
  {
    name: 'Haldirams Hing Jeera Chana',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse2.mm.bing.net/th/id/OIP.FKS4JhfDpyS7s2awXpa9nwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Hing Jeera Chana | Asafoetida Cumin Chickpeas | Digestive Snack | 200g Pack',
    stock: 100
  },
 

  // ============ KAJU MIXTURE ============
  {
    name: 'Haldirams Kaju Mixture',
    weight: '200g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.UBs1lQQ22EesriNMhHlFowHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Kaju Mixture | Premium Cashew Mix | Rich & Crunchy | 200g Pack',
    stock: 100
  },
  {
    name: 'Haldirams Kaju Mixture',
    weight: '400g',
    price: 185,
    oldPrice: 215,
    discount: '14% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse2.mm.bing.net/th/id/OIP.k0HHg2HQKNoB5GRa8NGROwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Kaju Mixture | Premium Cashew Mix | Rich & Crunchy | 400g Pack',
    stock: 80
  },

  // ============ KASHMIRI MIXTURE ============
  {
    name: 'Haldirams Kashmiri Mixture',
    weight: '200g',
    price: 75,
    oldPrice: 88,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Kx-7fAwDwfXyI3kuFy_1CQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Kashmiri Mixture | Dry Fruits Rich Mix | Premium Namkeen | 200g Pack',
    stock: 100
  },
  {
    name: 'Haldirams Kashmiri Mixture',
    weight: '400g',
    price: 145,
    oldPrice: 170,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse1.mm.bing.net/th/id/OIP.aRV-epewiTDxj0fgblvtVQHaJC?pid=Api&H=195&W=160',
    inStock: true,
    description: 'Haldirams Kashmiri Mixture | Dry Fruits Rich Mix | Premium Namkeen | 400g Pack',
    stock: 80
  },

  // ============ PANCHRATAN ============
  {
    name: 'Haldirams Panchratan',
    weight: '200g',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse2.mm.bing.net/th/id/OIP.1Ze51qXD9bEXFzXrlrRbKQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Panchratan | 5-in-1 Mix Namkeen | Assorted Flavors | 200g Pack',
    stock: 100
  },
  {
    name: 'Haldirams Panchratan',
    weight: '400g',
    price: 115,
    oldPrice: 135,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse2.mm.bing.net/th/id/OIP.p2D0gOHamtIivDPdMP4l5AHaJA?pid=Api&H=194&W=160',
    inStock: true,
    description: 'Haldirams Panchratan | 5-in-1 Mix Namkeen | Assorted Flavors | 400g Pack',
    stock: 80
  },

  // ============ MINI SAMOSA ============
  {
    name: 'Haldirams Mini Samosa',
    weight: '200g',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse2.mm.bing.net/th/id/OIP.cmCa5Sz2_ptuVjvzSj3h-AHaJX?pid=Api&H=202&W=160',
    inStock: true,
    description: 'Haldirams Mini Samosa | Crispy Potato Filled | Tea Time Snack | 200g Pack',
    stock: 100
  },
 

  // ============ MINI KACHORI ============
  {
    name: 'Haldirams Mini Kachori',
    weight: '200g',
    price: 62,
    oldPrice: 72,
    discount: '14% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.iyuyR1I83yujq-ap5uQIuQAAAA?pid=Api&H=200&W=160',
    inStock: true,
    description: 'Haldirams Mini Kachori | Spicy Dal Stuffed | Crispy Snack | 200g Pack',
    stock: 100
  },

  // ============ CHAKLI ============
  {
    name: 'Haldirams Chakli',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.xJ8ZHnJKxApFIYYBVtCDCQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Chakli | Spiral Rice Snack | Crispy & Crunchy | 200g Pack',
    stock: 100
  },
 

  // ============ MATHI ============
  {
    name: 'Haldirams Mathi',
    weight: '200g',
    price: 50,
    oldPrice: 60,
    discount: '17% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse2.mm.bing.net/th/id/OIP._3as0Gx_WFYhLev5AImsWQHaJ4?pid=Api&H=213&W=160',
    inStock: true,
    description: 'Haldirams Mathi | Flaky Crispy Crackers | Traditional Snack | 200g Pack',
    stock: 100
  },
  

  // ============ MURUKKU ============
  {
    name: 'Haldirams Murukku',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse1.mm.bing.net/th/id/OIP.bZ_3PgQQ45knqO_bvAqPnAHaIq?pid=Api&H=187&W=160',
    inStock: true,
    description: 'Haldirams Murukku | South Indian Rice Snack | Crispy Spiral | 200g Pack',
    stock: 100
  },
 

  // ============ CHAIPURI ============
  {
    name: 'Haldirams Chaipuri',
    weight: '200g',
    price: 52,
    oldPrice: 62,
    discount: '16% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse2.mm.bing.net/th/id/OIP.vYprItPhusYDN9fQhZBMIgHaIi?pid=Api&H=184&W=160',
    inStock: true,
    description: 'Haldirams Chaipuri | Perfect Tea Time Snack | Light & Crispy | 200g Pack',
    stock: 100
  },







  {
    name: 'Balaji Aloo Bhujia',
    weight: '1kg',
    price: 210,
    oldPrice: 250,
    discount: '16% OFF',
    category: 'Snacks & Munchies',
    brand: 'Balaji',
    image: '	https://tse2.mm.bing.net/th/id/OIP.HBOqH5W5uucQAMNsDGyUkwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Balaji Aloo Bhujia | Crispy Potato Sev | Gujarat Famous Namkeen | 1kg Family Pack',
    stock: 50
  },

  // ============ KHURJA 1KG ============
  {
    name: 'Balaji Khurja',
    weight: '1kg',
    price: 195,
    oldPrice: 230,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Balaji',
    image: '	https://tse2.mm.bing.net/th/id/OIP.wnUec1o1JjmeJ6aZwUQMBAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Balaji Khurja | Crispy Crunchy Snack | Traditional Gujarati Namkeen | 1kg Family Pack',
    stock: 50
  },

  // ============ NAVRATAN 1KG ============
  {
    name: 'Balaji Navratan Mix',
    weight: '1kg',
    price: 220,
    oldPrice: 260,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Balaji',
    image: 'https://tse1.mm.bing.net/th/id/OIP.IpI-SGu3aishfocu01k1kAHaJ5?pid=Api&H=213&W=160',
    inStock: true,
    description: 'Balaji Navratan Mix | 9-in-1 Premium Mixture | Assorted Namkeen | 1kg Family Pack',
    stock: 50
  },

  // ============ KANPURI 1KG ============
  {
    name: 'Balaji Kanpuri Mixture',
    weight: '1kg',
    price: 205,
    oldPrice: 245,
    discount: '16% OFF',
    category: 'Snacks & Munchies',
    brand: 'Balaji',
    image: 'https://tse1.mm.bing.net/th/id/OIP.oNHi1RlSow3jIdYnD6kX5wHaJM?pid=Api&H=198&W=160',
    inStock: true,
    description: 'Balaji Kanpuri Mixture | Spicy Kanpur Style Mix | Traditional Namkeen | 1kg Family Pack',
    stock: 50
  },

  // ============ HOT MIX 1KG ============
  {
    name: 'Balaji Hot Mix',
    weight: '1kg',
    price: 215,
    oldPrice: 255,
    discount: '16% OFF',
    category: 'Snacks & Munchies',
    brand: 'Balaji',
    image: 'https://tse2.mm.bing.net/th/id/OIP.5y1jfXRiOyT73L-ID4tzHwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Balaji Hot Mix | Extra Spicy Mixture | For Spice Lovers | 1kg Family Pack',
    stock: 50
  },

  // ============ SHALIMAR 1KG ============
  {
    name: 'Balaji Shalimar Mix',
    weight: '1kg',
    price: 200,
    oldPrice: 240,
    discount: '17% OFF',
    category: 'Snacks & Munchies',
    brand: 'Balaji',
    image: '	https://tse1.mm.bing.net/th/id/OIP.79DeVlGlpvJS0ajkD90FowHaKX?pid=Api&H=223&W=160',
    inStock: true,
    description: 'Balaji Shalimar Mix | Premium Quality Mixture | Mild & Tasty | 1kg Family Pack',
    stock: 50
  },

  // ============ AJWAIN SEV 1KG ============
  {
    name: 'Balaji Ajwain Sev',
    weight: '1kg',
    price: 190,
    oldPrice: 225,
    discount: '16% OFF',
    category: 'Snacks & Munchies',
    brand: 'Balaji',
    image: '	https://tse2.mm.bing.net/th/id/OIP.gJUYh8jbiX0fwsSUFv7WBQHaHa?pid=Api&P=0&w=400&h=400https://www.jiomart.com/images/product/original/491349702/balaji-ajwain-sev-400-g-product-images-o491349702-p491349702-0-202205180101.jpg',
    inStock: true,
    description: 'Balaji Ajwain Sev | Carom Seeds Flavored Sev | Digestive Namkeen | 1kg Family Pack',
    stock: 50
  },

  // ============ DAL SEV 1KG ============
  {
    name: 'Balaji Dal Sev',
    weight: '1kg',
    price: 185,
    oldPrice: 220,
    discount: '16% OFF',
    category: 'Snacks & Munchies',
    brand: 'Balaji',
    image: 'https://tse1.mm.bing.net/th/id/OIP.xTA1aCXQvGaouYWwIOJy0gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Balaji Dal Sev | Thin Crispy Besan Sev | Light Namkeen | 1kg Family Pack',
    stock: 50
  },


  // ============ HALDIRAM'S NAMKEEN ============
{
    name: 'Haldirams All In One Namkeen',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse1.mm.bing.net/th/id/OIP.MxFxktl_-vcJBlh9bx-A3QHaGh?pid=Api&H=140&W=160',
    inStock: true,
    description: 'Haldirams All In One Namkeen | Mix of Sev, Boondi & More | Tasty Snack | 200g Pack',
    stock: 100
},
{
    name: 'Haldirams All In One Namkeen',
    weight: '400g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '		https://tse2.mm.bing.net/th/id/OIP.TNTs-FFrF3EoaAzYWUVxPwAAAA?pid=Api&H=196&W=160',
    inStock: true,
    description: 'Haldirams All In One Namkeen | Mix of Sev, Boondi & More | Tasty Snack | 400g Pack',
    stock: 100
},
{
    name: 'Haldirams Fatafat Bhel',
    weight: '200g',
    price: 50,
    oldPrice: 60,
    discount: '17% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.O5go8Qh_ENrEZoj2weB8lAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Fatafat Bhel | Ready to Eat | Tangy & Crunchy | 200g Pack',
    stock: 100
},
{
    name: 'Haldirams Golden Mixture',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Th-j5J5oVZA_J42POfxfpgAAAA?pid=Api&H=200&W=160',
    inStock: true,
    description: 'Haldirams Golden Mixture | Crunchy & Spicy | Premium Namkeen | 200g Pack',
    stock: 100
},
{
    name: 'Haldirams Chana Jor Garam',
    weight: '200g',
    price: 50,
    oldPrice: 60,
    discount: '17% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.RiRBYD3zjckq7IdFV11RYwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Chana Jor Garam | Flattened Spiced Chana | Crunchy Snack | 200g Pack',
    stock: 100
},
{
    name: 'Haldirams Mint Lachha',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse2.mm.bing.net/th/id/OIP.GqSc4hm3qQzieMBNkwIVnwHaGx?pid=Api&H=146&W=160',
    inStock: true,
    description: 'Haldirams Mint Lachha | Refreshing Mint Flavour | Crispy Snack | 200g Pack',
    stock: 100
},
{
    name: 'Haldirams Bhel Puri',
    weight: '200g',
    price: 50,
    oldPrice: 60,
    discount: '17% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.ds3o8wkEbquVNkNxfIZ15AHaJZ?pid=Api&H=202&W=160',
    inStock: true,
    description: 'Haldirams Bhel Puri | Ready to Eat | Tangy & Spicy | 200g Pack',
    stock: 100
},
{
    name: 'Haldirams Chatpata Mixture',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse2.mm.bing.net/th/id/OIP.cY8_K5SXv1Q6P0-C-Hg5wAAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Haldirams Chatpata Mixture | Tangy & Spicy Mix | Perfect Tea Time Snack | 200g Pack',
    stock: 100
},







{
    name: 'Adarsh Khurja Original Namkeen',
    weight: '400g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Snacks & Munchies',
    brand: 'Adarsh',
    image: '	https://tse1.mm.bing.net/th/id/OIP.1PEuvQ36Atug7x9JO7MifQHaJf?pid=Api&P=0&w=400&h=512',
    inStock: true,
    description: 'Adarsh Khurja Original Namkeen | Crispy & Spicy | Traditional Recipe | 400g Pack',
    stock: 100
},
{
    name: 'Shudh Sev Namkeen - Plain',
    weight: '400g',
    price: 85,
    oldPrice: 99,
    discount: '14% OFF',
    category: 'Snacks & Munchies',
    brand: 'Shudh',
    image: 'https://tse2.mm.bing.net/th/id/OIP.aq0K14KLkqmI2fX8pTFJtQHaJ4?pid=Api&H=213&W=160',
    inStock: true,
    description: 'Shudh Sev Namkeen Plain | Thin & Crispy | Perfect Tea Time Snack | 400g Pack',
    stock: 100
},


// ============ HALDIRAM'S BOONDI ============
{
    name: 'Haldirams Boondi - Masala',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: '	https://tse1.mm.bing.net/th/id/OIP.jg6ZXmU27ORvU633bKlLLQHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Haldirams Boondi Masala | Spicy & Crunchy | Perfect Snack | 200g Pack',
    stock: 100
},
{
    name: 'Haldirams Boondi - Plain',
    weight: '200g',
    price: 50,
    oldPrice: 60,
    discount: '17% OFF',
    category: 'Snacks & Munchies',
    brand: 'Haldirams',
    image: 'https://tse1.mm.bing.net/th/id/OIP.ijZsf2dztHP4CyjpVcIjvwHaIq?pid=Api&H=187&W=160',
    inStock: true,
    description: 'Haldirams Boondi Plain | Crispy & Light | For Raita & Snacking | 200g Pack',
    stock: 100
},

// ============ ASHUJI BOONDI ============
{
    name: 'Ashuji Boondi - Masala',
    weight: '350g',
    price: 85,
    oldPrice: 99,
    discount: '14% OFF',
    category: 'Snacks & Munchies',
    brand: 'Ashuji',
    image: '	https://tse1.mm.bing.net/th/id/OIP.nkddgb8jId9N1cn2dA8vrAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Ashuji Boondi Masala | Spicy & Tasty | Traditional Recipe | 350g Pack',
    stock: 100
},
{
    name: 'Ashuji Boondi - Plain',
    weight: '350g',
    price: 80,
    oldPrice: 95,
    discount: '16% OFF',
    category: 'Snacks & Munchies',
    brand: 'Ashuji',
    image: 'https://tse2.mm.bing.net/th/id/OIP.-IInJsUdRx6W4VZbD-j8-QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Ashuji Boondi Plain | Crispy & Light | For Raita & Dahi Vada | 350g Pack',
    stock: 100
},
{
    name: 'Act II Instant Popcorn - Butter',
    weight: '70g',
    price: 40,
    oldPrice: 50,
    discount: '20% OFF',
    category: 'Snacks & Munchies',
    brand: 'Act II',
    image: 'https://tse1.mm.bing.net/th/id/OIP.qPTTKM-Bvgp9Fd9U9u5rlQHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Act II Instant Popcorn Butter | Microwave Ready | Movie Time Snack | 70g Pack',
    stock: 100
},


];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🍿 Starting Smart Migration for Snacks & Munchies...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Snacks & Munchies" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of snacksMunchiesProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Snacks & Munchies" })}`);
    
    console.log('\n📋 Product Categories:');
    console.log('   🥔 Chips (Lays, Kurkure, Bingo): 7 products');
    console.log('   🌾 Namkeen (Haldiram\'s, Bikaji): 6 products');
    console.log('   🥜 Premium & Healthy: 3 products');
    console.log('   🧀 International (Pringles, Doritos): 4 products');
    console.log('   🥜 Nuts & Seeds: 2 products');
    console.log('   🍪 Biscuit Snacks: 3 products');
    console.log('   🍿 Popcorn: 1 product');
    
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();