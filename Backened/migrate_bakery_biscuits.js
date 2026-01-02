// migrate_bakery_biscuits_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_bakery_biscuits_IMPROVED.js

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

// ========== BAKERY & BISCUITS PRODUCTS ==========
// ADD/EDIT/DELETE products here and run the script
const bakeryBiscuitsProducts = [
  // MARIE BISCUITS

// ============ JUGAL RUSK ============
{
    name: 'Jugal Premium Rusk',
    weight: '500g',
    price: 69,
    oldPrice: 96,
    discount: '28% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: '	https://tse1.mm.bing.net/th/id/OIP.jfWcz-ntBGltw10KujC5mwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Jugal Premium Rusk | Crispy & Crunchy | Perfect with Tea | 300g Pack',
    stock: 100
},
{
    name: 'Jugal Custom Rusk',
    weight: '400g',
    price: 72,
    oldPrice: 96,
    discount: '25% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: 'https://tse1.mm.bing.net/th/id/OIP.gbC_i037Zhxkz-eZdTG05AHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Jugal Custom Rusk | Extra Crispy | Tea Time Snack | 350g Pack',
    stock: 100
},

// ============ MADHURIMA RUSK ============
{
    name: 'Madhurima Premium Rusk',
    weight: '500g',
    price: 74,
    oldPrice: 93,
    discount: '20% OFF',
    category: 'Bakery Biscuits',
    brand: 'Madhurima',
    image: 'https://tse2.mm.bing.net/th/id/OIP.hTIpXh8hLTh2GOHHcHZc5gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Madhurima Premium Rusk | Crispy & Tasty | Perfect with Chai | 300g Pack',
    stock: 100
},
{
    name: 'Madhurima Ilaichi Rusk',
    weight: '500g',
    price: 69,
    oldPrice: 93,
    discount: '25% OFF',
    category: 'Bakery Biscuits',
    brand: 'Madhurima',
    image: 'https://tse1.mm.bing.net/th/id/OIP.S5XgpOe0Vvxwwgetiy5C4QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Madhurima Ilaichi Rusk | Crunchy & Delicious | Tea Time Snack | 350g Pack',
    stock: 100
},

// ============ MADHURIMA CAKE RUSK - EGGLESS ============
{
    name: 'Madhurima Cake Rusk Eggless - Cherry',
    weight: '350g',
    price: 110,
    oldPrice: 155,
    discount: '28% OFF',
    category: 'Bakery Biscuits',
    brand: 'Madhurima',
    image: 'https://tse1.mm.bing.net/th/id/OIP.UeR5SiQMo0tt-03t3CdANAHaEN?pid=Api&H=90&W=160',
    inStock: true,
    description: 'Madhurima Cake Rusk Eggless | Cherry Flavour | Soft & Crunchy | 300g Pack',
    stock: 100
},
{
    name: 'Madhurima Cake Rusk Eggless - Plain',
     weight: '350g',
    price: 110,
    oldPrice: 155,
    discount: '28% OFF',
    category: 'Bakery Biscuits',
    brand: 'Madhurima',
    image: 'https://tse1.mm.bing.net/th/id/OIP.PG6_t7AQnOn79e1S4zPgFAHaDp?pid=Api&H=78&W=160',
    inStock: true,
    description: 'Madhurima Cake Rusk Eggless | Plain Flavour | Soft & Tasty | 300g Pack',
    stock: 100
},

// ============ MADHURIMA CAKE RUSK - EGG ============
{
    name: 'Madhurima Cake Rusk - Cherry',
   weight: '350g',
    price: 110,
    oldPrice: 155,
    discount: '28% OFF',
    category: 'Bakery Biscuits',
    brand: 'Madhurima',
    image: 'https://tse2.mm.bing.net/th/id/OIP.FpgE8mqndT0q4EJEB9RIegHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Madhurima Cake Rusk | Cherry Flavour with Egg | Rich & Crunchy | 300g Pack',
    stock: 100
},
{
    name: 'Madhurima Cake Rusk - Plain',
      weight: '350g',
    price: 110,
    oldPrice: 155,
    discount: '28% OFF',
    category: 'Bakery Biscuits',
    brand: 'Madhurima',
    image: '	https://tse2.mm.bing.net/th/id/OIP.zz51z-q7MJfl9PnDIc0XkwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Madhurima Cake Rusk | Plain Flavour with Egg | Soft & Tasty | 300g Pack',
    stock: 100
},

// ============ FAN BISCUITS ============
{
    name: 'Madhurima Fan Puff - Big',
    weight: '400g',
    price: 70,
    oldPrice: 93,
    discount: '24% OFF',
    category: 'Bakery Biscuits',
    brand: 'Madhurima',
    image: 'https://tse2.mm.bing.net/th/id/OIP.IRykBknbg-Uxeg8CI7nUHwHaKW?pid=Api&H=223&W=160',
    inStock: true,
    description: 'Madhurima Fan Biscuit Big | Crispy & Sweet | Traditional Taste | 400g Pack',
    stock: 100
},
{
    name: 'Muskan Fan Puff - Small',
    weight: '350g',
    price: 70,
    oldPrice: 93,
    discount: '24% OFF',
    category: 'Bakery Biscuits',
    brand: 'Muskan',
    image: '	https://tse1.mm.bing.net/th/id/OIP.EkvbD3DPbTJhF1g-rqw8YQAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Muskan Fan Biscuit Small | Crunchy & Tasty | Tea Time Snack | 200g Pack',
    stock: 100
},

// ============ JUGAL TRADITIONAL SNACKS ============
{
    name: 'Jugal Mattapare',
    weight: '400g',
    price: 101,
    oldPrice: 135,
    discount: '25% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: '	https://tse1.mm.bing.net/th/id/OIP.8ARbbVRrlhZ24sN4T-V_YQHaKL?pid=Api&H=219&W=160',
    inStock: true,
    description: 'Jugal Mattapare | Sweet & Crispy | Traditional Indian Snack | 250g Pack',
    stock: 100
},
{
    name: 'Jugal Mathi',
    weight: '400g',
    price: 101,
    oldPrice: 135,
    discount: '25% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: '	https://tse2.mm.bing.net/th/id/OIP.dpqBmhVVO6_fMKSEjrcpvgHaFF?pid=Api&H=109&W=160',
    inStock: true,
    description: 'Jugal Mathi | Flaky & Crispy | Namkeen Snack | 250g Pack',
    stock: 100
},

// ============ JUGAL BUTTER BAKERY BISCUITS ============
{
    name: 'Jugal Butter Badam Elaichi Biscuit',
    weight: '350g',
    price: 90,
    oldPrice: 105,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: '			https://tse2.mm.bing.net/th/id/OIP.NCttG7aNbDeiD51Le_kYBwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Jugal Butter Badam Elaichi | Rich Butter & Cardamom Flavour | Premium Biscuit | 350g Pack',
    stock: 100
},
{
    name: 'Jugal Butter Pista Biscuit',
    weight: '350g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: '	https://tse1.mm.bing.net/th/id/OIP.6bHG5_1a6K4k9Fp8eHfCZgHaDf?pid=Api&H=75&W=160',
    inStock: true,
    description: 'Jugal Butter Pista Biscuit | Rich Pistachio Flavour | Melt in Mouth | 350g Pack',
    stock: 100
},
{
    name: 'Jugal Kaju Nutty Biscuit',
    weight: '350g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: 'https://tse2.mm.bing.net/th/id/OIP.UzGRf94zCa_GPQv5K9jwvQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Jugal Kaju Nutty Biscuit | Crunchy Cashew Flavour | Premium Quality | 350g Pack',
    stock: 100
},
{
    name: 'Jugal Badam Nutty Biscuit',
    weight: '350g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: 'https://tse2.mm.bing.net/th/id/OIP.fIDvvBiKhlhKCPu0xAE0hAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Jugal Badam Nutty Biscuit | Rich Almond Flavour | Healthy & Tasty | 350g Pack',
    stock: 100
},
{
    name: 'Jugal Besan Khatai Biscuit',
    weight: '350g',
    price: 85,
    oldPrice: 100,
    discount: '15% OFF',
    category: 'Bakery Biscuits',
    brand: 'Jugal',
    image: 'https://tse2.mm.bing.net/th/id/OIP.hWalFiW1Ac8juCnxuGMa3QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Jugal Besan Khatai | Traditional Gram Flour Biscuit | Melt in Mouth | 350g Pack',
    stock: 100
},
// ============ KIDYS BAKERY BISCUITS ============
{
    name: 'Kidys Dryfruit Biscuit',
    weight: '350g',
    price: 110,
    oldPrice: 130,
    discount: '15% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: 'https://tse1.mm.bing.net/th/id/OIP.73UlWAdACu1OZ_Hk3JmAMAHaIW?pid=Api&H=180&W=160',
    inStock: true,
    description: 'Kidys Dryfruit Biscuit | Loaded with Nuts | Rich & Crunchy | 350g Pack',
    stock: 100
},
{
    name: 'Kidys Badam Biscuit',
    weight: '350g',
    price: 75,
    oldPrice: 90,
    discount: '17% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: 'https://tse1.mm.bing.net/th/id/OIP.70y9j535981Wkcc-U3XK_AAAAA?pid=Api&H=274&W=160',
    inStock: true,
    description: 'Kidys Badam Biscuit | Big Size | Crispy & Tasty | 350g Pack',
    stock: 100
},
{
    name: 'Kidys Kaju Biscuit',
    weight: '350g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: 'https://tse2.mm.bing.net/th/id/OIP.HvQQMJUjPAYbvfZ6nRMrVwHaIW?pid=Api&H=180&W=160',
    inStock: true,
    description: 'Kidys Kaju Biscuit | Rich Cashew Flavour | Melt in Mouth | 350g Pack',
    stock: 100
},
{
    name: 'Kidys Jeera Biscuit',
    weight: '350g',
    price: 70,
    oldPrice: 85,
    discount: '18% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: '	https://tse1.mm.bing.net/th/id/OIP.Tk6KxwxwQaLAifSl4popEgAAAA?pid=Api&H=271&W=160',
    inStock: true,
    description: 'Kidys Jeera Biscuit | Cumin Flavour | Crispy & Namkeen | 350g Pack',
    stock: 100
},
{
    name: 'Kidys Ajwain Biscuit',
    weight: '350g',
    price: 70,
    oldPrice: 85,
    discount: '18% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: '	https://tse1.mm.bing.net/th/id/OIP.5rZvCCYa6ihfoh8bPhCihAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kidys Ajwain Biscuit | Carom Seeds Flavour | Digestive & Crunchy | 350g Pack',
    stock: 100
},
{
    name: 'Kidys Coconut Biscuit',
    weight: '350g',
    price: 80,
    oldPrice: 95,
    discount: '16% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: 'https://tse1.mm.bing.net/th/id/OIP.MwdBgKbsbEolhtH478NS0wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kidys Coconut Biscuit | Rich Coconut Flavour | Sweet & Crispy | 350g Pack',
    stock: 100
},
{
    name: 'Kidys Chocolate Chips Biscuit',
    weight: '350g',
    price: 90,
    oldPrice: 105,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: 'https://tse2.mm.bing.net/th/id/OIP.qfxdcmIHJOIc5SESSw9pvQHaER?pid=Api&P=0&w=694&h=400',
    inStock: true,
    description: 'Kidys Chocolate Chips Biscuit | Loaded with Choco Chips | Kids Favourite | 350g Pack',
    stock: 100
},


/////////////////////////////////////////////////////////
{
    name: 'Kidys Atta Biscuit',
    weight: '350g',
    price: 65,
    oldPrice: 80,
    discount: '19% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: '	https://tse1.mm.bing.net/th/id/OIP.mH_d5zcH_hUngw5EqemRewHaIW?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Kidys Atta Biscuit | Whole Wheat | Healthy & Digestive | 350g Pack',
    stock: 100
},
{
    name: 'Kidys Khajur Atta Biscuit',
    weight: '350g',
    price: 85,
    oldPrice: 100,
    discount: '15% OFF',
    category: 'Bakery Biscuits',
    brand: 'Kidys',
    image: '	https://tse2.mm.bing.net/th/id/OIP.yknc7_Rl-l79gkQzRZZitgHaER?pid=Api&H=92&W=160',
    inStock: true,
    description: 'Kidys Khajur Atta Biscuit | Dates & Whole Wheat | Natural Sweetness | 350g Pack',
    stock: 100
},
// ============ SINGLE PACK BISCUITS ============
{
    name: 'Britannia Good Day Butter Cookies',
    weight: '75g',
    price: 35,
    oldPrice: 40,
    discount: '13% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://tse2.mm.bing.net/th/id/OIP.sS-VKfvVCppsCa0JqMLNFQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Britannia Good Day Butter Cookies | Rich Butter Taste | Tea Time Snack | 75g Pack',
    stock: 100
},
{
    name: 'Sunfeast Dark Fantasy Choco Fills',
    weight: '75g',
    price: 45,
    oldPrice: 50,
    discount: '10% OFF',
    category: 'Bakery Biscuits',
    brand: 'Sunfeast',
    image: 'https://tse1.mm.bing.net/th/id/OIP.C5y72thy0hmGpsfr9Xqg6QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Sunfeast Dark Fantasy Choco Fills | Rich Chocolate Centre | Premium Biscuit | 75g Pack',
    stock: 100
},
{
    name: 'Britannia Marigold Biscuit',
    weight: '80g',
    price: 45,
    oldPrice: 50,
    discount: '10% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: '	https://tse2.mm.bing.net/th/id/OIP.ftuPPx2fpgPHrrUfbn_OAQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Britannia Marie Gold | Light & Crispy | Low Fat Biscuit | 80g Pack',
    stock: 100
},
{
    name: 'Parle Krack Jack Biscuit',
    weight: '75g',
    price: 45,
    oldPrice: 50,
    discount: '10% OFF',
    category: 'Bakery Biscuits',
    brand: 'Parle',
    image: '	https://tse2.mm.bing.net/th/id/OIP.e7aS2MvBM6JFIAX_zBEt1wHaGS?pid=Api&H=135&W=160',
    inStock: true,
    description: 'Parle Krack Jack | Sweet & Salty | Unique Taste | 75g Pack',
    stock: 100
},
{
    name: 'Parle Monaco Biscuit',
    weight: '75g',
    price: 45,
    oldPrice: 50,
    discount: '10% OFF',
    category: 'Bakery Biscuits',
    brand: 'Parle',
    image: 'https://tse2.mm.bing.net/th/id/OIP.CgCjzkeGUx_tv2VKGzucJwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Parle Monaco | Salted & Crispy | Light Snack | 75g Pack',
    stock: 100
},
{
    name: 'Cremica Coconut Biscuit',
    weight: '75g',
    price: 45,
    oldPrice: 50,
    discount: '10% OFF',
    category: 'Bakery Biscuits',
    brand: 'Cremica',
    image: '	https://tse2.mm.bing.net/th/id/OIP.xHT6MuZqXS5xGivvR1WG0gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cremica Coconut Biscuit | Rich Coconut Flavour | Crunchy & Sweet | 75g Pack',
    stock: 100
},
{
    name: 'Priyagold Butter Bite Biscuit',
    weight: '75g',
    price: 45,
    oldPrice: 50,
    discount: '10% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://tse1.mm.bing.net/th/id/OIP.WVLeU_BkT5iKAl_4fUHRHQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Priyagold Butter Bite | Buttery & Crunchy | Tea Time Snack | 75g Pack',
    stock: 100
},
{
    name: 'Priyagold Butter Delight Biscuit',
    weight: '75g',
    price: 45,
    oldPrice: 50,
    discount: '10% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: '	https://tse2.mm.bing.net/th/id/OIP.dUZle17AVlL9PFBiEQQBzAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Britannia Butter Delight | Rich Butter Taste | Melt in Mouth | 75g Pack',
    stock: 100
},
{
    name: 'Cremica Jeera Biscuit',
    weight: '75g',
    price: 45,
    oldPrice: 50,
    discount: '10% OFF',
    category: 'Bakery Biscuits',
    brand: 'Cremica',
    image: 'https://tse1.mm.bing.net/th/id/OIP.j5FthSixTeXtsKfKoU8AmQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cremica Jeera Biscuit | Cumin Flavour | Crispy & Namkeen | 75g Pack',
    stock: 100
},
{
    name: 'Parle Hide & Seek Biscuit',
    weight: '75g',
    price: 45,
    oldPrice: 50,
    discount: '10% OFF',
    category: 'Bakery Biscuits',
    brand: 'Parle',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Rf6ZFsYWqKqaFPCgviBghQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Parle Hide & Seek | Chocolate Chip Cookies | Kids Favourite | 75g Pack',
    stock: 100
},
{
    name: 'Britannia Jim Jam Biscuit',
    weight: '75g',
    price: 45,
    oldPrice: 50,
    discount: '10% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: '	https://tse2.mm.bing.net/th/id/OIP.VwHAHzoEHgAJY5Vd9MrX0gHaGb?pid=Api&H=138&W=160',
    inStock: true,
    description: 'Britannia Jim Jam | Filled with Jam | Sweet & Tasty | 75g Pack',
    stock: 100
},
{
    name: 'Britannia Milk Bikis Biscuit',
    weight: '75g',
    price: 45,
    oldPrice: 50,
    discount: '10% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://tse1.mm.bing.net/th/id/OIP.ZwTCOWaCckEA-qfyJ-_9MQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Britannia Milk Bikis | Milk Goodness | Kids Favourite | 75g Pack',
    stock: 100
},
{
    name: 'Britannia Bourbon Cream Biscuit',
    weight: '75g',
    price: 45,
    oldPrice: 50,
    discount: '10% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://tse2.mm.bing.net/th/id/OIP.2lJ745V1ePikQNhQcZAqCQHaH7?pid=Api&H=171&W=160',
    inStock: true,
    description: 'Britannia Bourbon | Chocolate Cream Filled | Rich & Tasty | 75g Pack',
    stock: 100
},
{
    name: 'Cadbury Oreo Cream Biscuit',
    weight: '50g',
    price: 30,
    oldPrice: 30,
    discount: '0% OFF',
    category: 'Bakery Biscuits',
    brand: 'Cadbury',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Bv7GzXiEusME7LdI-I_7SQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Cadbury Oreo | Vanilla Cream Filled | Twist Lick Dunk | 50g Pack',
    stock: 100
},
{
    name: 'Britannia Nutrichoice Sugar Free Digestive',
    weight: '50g',
    price: 25,
    oldPrice: 30,
    discount: '17% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://tse1.mm.bing.net/th/id/OIP.GlVI7dETFxwKM51gi1JMLwHaEl?pid=Api&H=98&W=160',
    inStock: true,
    description: 'Britannia Nutrichoice Sugar Free Digestive | Diabetic Friendly | Healthy Biscuit | 50g Pack',
    stock: 100
},
{
    name: 'Britannia Nutrichoice Sugar Free Cracker',
    weight: '50g',
    price: 25,
    oldPrice: 30,
    discount: '17% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://tse2.mm.bing.net/th/id/OIP.9Wvqt757bqserYDARP5_SwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Britannia Nutrichoice Sugar Free Cracker | Zero Added Sugar | Light & Crispy | 50g Pack',
    stock: 100
},

// ============ BUNCH OF PACKS ============
{
    name: 'Britannia Tiger Krunch Biscuit Pack',
    weight: '60g (5 x 12g)',
    price: 25,
    oldPrice: 30,
    discount: '17% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://tse1.mm.bing.net/th/id/OIP.FAB1TvM30vq3FwL06fvHRAAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Britannia Tiger Krunch | 5 Packs of 12g | Choco Chips | Kids Favourite',
    stock: 100
},
{
    name: 'Parle G Biscuit Pack',
    weight: '120g (5 x 24g)',
    price: 25,
    oldPrice: 30,
    discount: '17% OFF',
    category: 'Bakery Biscuits',
    brand: 'Parle',
    image: 'https://tse2.mm.bing.net/th/id/OIP.xd3Kg0PIoioUjO2byatG3AHaD8?pid=Api&P=0&w=750&h=400',
    inStock: true,
    description: 'Parle G Original Glucose | 5 Packs of 24g | India\'s Favourite Biscuit',
    stock: 100
},
{
    name: 'Parle Gold Biscuit Pack',
    weight: '120g (5 x 24g)',
    price: 25,
    oldPrice: 30,
    discount: '17% OFF',
    category: 'Bakery Biscuits',
    brand: 'Parle',
    image: '	https://tse2.mm.bing.net/th/id/OIP.1AwhPjZ2pds8MDENQoSeGwHaES?pid=Api&H=92&W=160',
    inStock: true,
    description: 'Parle Gold | 5 Packs of 24g | India\'s Favourite Biscuit',
    stock: 100
},
{
    name: 'Cadbury Oreo Biscuit Pack',
    weight: '120g (10 x 12g)',
    price: 50,
    oldPrice: 60,
    discount: '17% OFF',
    category: 'Bakery Biscuits',
    brand: 'Cadbury',
    image: 'https://tse1.mm.bing.net/th/id/OIP.cDeM4OmBrZ1arUyCMpFVXgHaEN?pid=Api&H=90&W=160',
    inStock: true,
    description: 'Cadbury Oreo | 10 Packs of 12g | Vanilla Cream | Party Pack',
    stock: 100
},
{
    name: 'Britannia Good Day Biscuit Pack',
    weight: '120g (10 x 12g)',
    price: 50,
    oldPrice: 60,
    discount: '17% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://tse1.mm.bing.net/th/id/OIP.JQk6yYGmKNSdTcJLSsthDwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Britannia Good Day | 10 Packs of 12g | Butter Cookies | Party Pack',
    stock: 100
},


// ============ BIG PACKS ============
{
    name: 'Parle G Original Glucose Biscuit',
    weight: '800g',
    price: 100,
    oldPrice: 115,
    discount: '13% OFF',
    category: 'Bakery Biscuits',
    brand: 'Parle',
    image: 'https://tse2.mm.bing.net/th/id/OIP.sN0vugtKH7-NvmDXjXltCQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Parle G Original Glucose | Family Pack | India\'s Favourite | 800g Pack',
    stock: 100
},
{
    name: 'Parle G Gold Biscuit',
    weight: '1kg',
    price: 150,
    oldPrice: 175,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Parle',
    image: 'https://tse1.mm.bing.net/th/id/OIP.h3Xm9Lm2uAmASnckzCPNUwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Parle G Gold | Premium Glucose Biscuit | Extra Butter | 1kg Pack',
    stock: 100
},
{
    name: 'Britannia Nutrichoice Digestive Biscuit',
    weight: '1kg',
    price: 199,
    oldPrice: 235,
    discount: '15% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://tse2.mm.bing.net/th/id/OIP.KFmF1IJRqXiRx69uWJ1ANAHaEg?pid=Api&H=97&W=160',
    inStock: true,
    description: 'Britannia Nutrichoice Digestive | High Fibre | Healthy Biscuit | 1kg Pack',
    stock: 100
},







// ============ BRITANNIA CAKES (WITH EGG) ============
{
    name: 'Britannia Fruit Cake',
    weight: '75g',
    price: 30,
    oldPrice: 35,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: '	https://tse1.mm.bing.net/th/id/OIP.saLE5zC72uzsSEENs2mnLgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Britannia Fruit Cake | Loaded with Dry Fruits | Soft & Moist | 75g Pack',
    stock: 100
},

{
    name: 'Britannia Chocolate Cake',
    weight: '75g',
    price: 30,
    oldPrice: 35,
    discount: '14% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: '	https://tse2.mm.bing.net/th/id/OIP.cdPaBZI6InUCcIZzSyNYsgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Britannia Chocolate Cake | Rich Chocolate Flavour | Soft & Fluffy | 75g Pack',
    stock: 100
},


// ============ BRITANNIA CAKES (EGGLESS) ============
{
    name: 'Britannia Fruit Cake - Eggless',
    weight: '75g',
    price: 32,
    oldPrice: 38,
    discount: '16% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: '	https://tse2.mm.bing.net/th/id/OIP.PyMa5_a_N60hLJoSbMpaWwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Britannia Fruit Cake Eggless | Dry Fruits | 100% Vegetarian | 75g Pack',
    stock: 100
},

{
    name: 'Britannia Chocolate Cake - Eggless',
    weight: '75g',
    price: 32,
    oldPrice: 38,
    discount: '16% OFF',
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    image: 'https://tse1.mm.bing.net/th/id/OIP.nkqdChT9G7xAsV7Hma42DAAAAA?pid=Api&H=68&W=160',
    inStock: true,
    description: 'Britannia Chocolate Cake Eggless | Rich Chocolate | 100% Vegetarian | 75g Pack',
    stock: 100
},
// ============ WINKIES SWISS ROLL ============

{
    name: 'Winkies Swiss Roll - Strawberry',
    weight: '165g',
    price: 35,
    oldPrice: 42,
    discount: '17% OFF',
    category: 'Bakery Biscuits',
    brand: 'Winkies',
    image: '	https://tse1.mm.bing.net/th/id/OIP.60PjU-r1TzYEiCvG7F3HqwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Winkies Swiss Roll Strawberry | Cream Filled | Soft & Fluffy | 165g Pack',
    stock: 100
},

{
    name: 'Winkies Swiss Roll - Chocolate',
    weight: '165g',
    price: 35,
    oldPrice: 42,
    discount: '17% OFF',
    category: 'Bakery Biscuits',
    brand: 'Winkies',
    image: 'https://tse2.mm.bing.net/th/id/OIP.vJE1UYvBFVskCFG0-63NTQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Winkies Swiss Roll Chocolate | Choco Cream Filled | Soft & Tasty | 165g Pack',
    stock: 100
},
























 
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🍪 Starting Smart Migration for Bakery & Biscuits Products...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    // Get all existing products in this category
    const existingProducts = await Product.find({ category: "Bakery Biscuits" });
    
    // Create a map of existing products for quick lookup
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    // Create a set of products from our source
    const sourceProductKeys = new Set();
    
    // Process each product from source
    for (const productData of bakeryBiscuitsProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Bakery Biscuits" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

// Run migration
smartMigrate();