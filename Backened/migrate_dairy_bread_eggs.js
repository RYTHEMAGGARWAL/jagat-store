// migrate_dairy_bread_eggs_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_dairy_bread_eggs_IMPROVED.js

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

// ========== DAIRY BREAD EGGS PRODUCTS ==========
const dairyBreadEggsProducts = [
  // MILK - AMUL

 {
    name: 'Amul Cheese Slices',
    weight: '10 Slices',
    price: 125,
    oldPrice: 140,
    discount: '11% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Amul',
    image: 'https://tse1.mm.bing.net/th/id/OIP.XTlKbQPi5kZSk8FNbWhgnAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Amul Cheese Slices | 10 Slices Pack | Perfect for Sandwiches & Burgers | 200g',
    stock: 100
  },
  {
    name: 'Amul Mozzarella Cheese',
    weight: '200g',
    price: 150,
    oldPrice: 170,
    discount: '12% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Amul',
    image: 'https://tse1.mm.bing.net/th/id/OIP.CW1GV0UUBPoELmwBJR9NfwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Amul Mozzarella Cheese | Perfect for Pizza & Pasta | Stretchy & Melty | 200g Block',
    stock: 80
  },
  {
    name: 'Amul Cheese Cubes',
    weight: '200g',
    price: 115,
    oldPrice: 130,
    discount: '12% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Amul',
    image: 'https://tse1.mm.bing.net/th/id/OIP.YWJgRM4Bsd0IXkQPo67f4gHaES?pid=Api&H=92&W=160',
    inStock: true,
    description: 'Amul Cheese Cubes | 8 Cubes Pack | Ready to Eat | Snacking & Cooking | 200g',
    stock: 100
  },
  {
    name: 'Amul Cheese Spread',
    weight: '200g',
    price: 99,
    oldPrice: 115,
    discount: '14% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Amul',
    image: 'https://tse2.mm.bing.net/th/id/OIP.Sjqh8Wgeoa7-epOFbea7tQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Amul Cheese Spread | Creamy & Smooth | Perfect for Bread & Crackers | 200g Jar',
    stock: 100
  },

  // ════════════════════════════════════════════════════════════════
  // 🧈 AMUL BUTTER
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Amul Butter',
    weight: '100g',
    price: 56,
    oldPrice: 62,
    discount: '10% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Amul',
    image: 'https://tse2.mm.bing.net/th/id/OIP.UiG8BdKDvgh0ev_hfa_6mwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Amul Butter | Pasteurised | Made from Fresh Cream | Utterly Butterly | 100g Pack',
    stock: 150
  },
  {
    name: 'Amul Butter',
    weight: '200g',
    price: 108,
    oldPrice: 120,
    discount: '10% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Amul',
    image: '	https://tse2.mm.bing.net/th/id/OIP.NAttLismaw8dnTYtV7z5cgHaFE?pid=Api&H=109&W=160',
    inStock: true,
    description: 'Amul Butter | Pasteurised | Made from Fresh Cream | Utterly Butterly | 200g Pack',
    stock: 120
  },
  {
    name: 'Amul Butter',
    weight: '500g',
    price: 265,
    oldPrice: 295,
    discount: '10% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Amul',
    image: '	https://tse1.mm.bing.net/th/id/OIP._776ACVrlRRdVDgPil4BPQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Amul Butter | Pasteurised | Made from Fresh Cream | Utterly Butterly | 500g Family Pack',
    stock: 80
  },
    {
    name: 'Amul Butter',
    weight: '20g',
    price: 15,
    oldPrice: 18,
    discount: '10% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Amul',
    image: '	https://tse1.mm.bing.net/th/id/OIP.QlQ6RHjSrAbP6KVzBjUZEwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Amul Butter | Pasteurised | Made from Fresh Cream | Utterly Butterly | 100g Pack',
    stock: 150
  },

  // ════════════════════════════════════════════════════════════════
  // 🧈 DELICIOUS BUTTER
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Delicious Butter',
    weight: '100g',
    price: 52,
    oldPrice: 60,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Delicious',
    image: 'https://tse1.mm.bing.net/th/id/OIP.3dkofF0PohpY0MIFDFXNrAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Delicious Table Butter | Fresh & Creamy | Made from Pure Milk | 100g Pack',
    stock: 150
  },
  {
    name: 'Delicious Butter',
    weight: '500g',
    price: 245,
    oldPrice: 280,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Delicious',
    image: '	https://tse1.mm.bing.net/th/id/OIP.NbU9NdF84R9X2FMM-_LMyQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Delicious Table Butter | Fresh & Creamy | Made from Pure Milk | 500g Family Pack',
    stock: 80
  },



   // ════════════════════════════════════════════════════════════════
  // 🍞 ENGLISH OVEN BREADS
  // ════════════════════════════════════════════════════════════════

  {
    name: 'English Oven Pav',
    weight: '6 Pcs',
    price: 30,
    oldPrice: 35,
    discount: '14% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'English Oven',
    image: 'https://tse1.mm.bing.net/th/id/OIP.v0D5lBXdsr27gQ9deeVJWAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'English Oven Pav | Soft & Fresh | Perfect for Pav Bhaji & Vada Pav | 6 Pieces Pack',
    stock: 100
  },
  {
    name: 'English Oven Burger Bun',
    weight: '4 Pcs',
    price: 45,
    oldPrice: 52,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'English Oven',
    image: '	https://tse2.mm.bing.net/th/id/OIP.LSMS0F419DHdXh4NTvtrYwHaID?pid=Api&H=173&W=160',
    inStock: true,
    description: 'English Oven Burger Bun | Soft Sesame Topped | Perfect for Burgers | 4 Pieces Pack',
    stock: 80
  },
  {
    name: 'English Oven Pizza Base',
    weight: '2 Pcs',
    price: 65,
    oldPrice: 75,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'English Oven',
    image: 'https://tse2.mm.bing.net/th/id/OIP.8ODbr1HlKRDaMjCZf1vRWwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'English Oven Pizza Base | Ready to Use | Thin Crust | Make Pizza at Home | 2 Pieces Pack',
    stock: 60
  },
  {
    name: 'English Oven Brown Bread',
    weight: '400g',
    price: 45,
    oldPrice: 52,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'English Oven',
    image: 'https://tse2.mm.bing.net/th/id/OIP.Vcv4uacyIkRNn386A9983gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'English Oven Brown Bread | High Fiber | Healthy Choice | Whole Wheat | 400g Pack',
    stock: 100
  },
 
  {
    name: 'English Oven Sandwich Bread',
    weight: '400g',
    price: 40,
    oldPrice: 48,
    discount: '17% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'English Oven',
    image: 'https://tse1.mm.bing.net/th/id/OIP.WvsVzIiS8D3lPIHBSeta_QAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'English Oven Sandwich Bread | Soft & Fresh | Perfect for Sandwiches | 400g Pack',
    stock: 100
  },
  {
    name: 'English Oven White Bread Small',
    weight: '200g',
    price: 22,
    oldPrice: 26,
    discount: '15% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'English Oven',
    image: 'https://tse1.mm.bing.net/th/id/OIP.U7AIjf6kyS7wSnGSzLidXQAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'English Oven White Bread Small | Soft & Fluffy | Daily Fresh | 200g Pack',
    stock: 120
  },
  {
    name: 'English Oven White Bread Big',
    weight: '400g',
    price: 38,
    oldPrice: 45,
    discount: '16% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'English Oven',
    image: 'https://tse2.mm.bing.net/th/id/OIP.35yDJGf6w2skZEmw8qLcFAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'English Oven White Bread Big | Soft & Fluffy | Family Pack | 400g Pack',
    stock: 100
  },
  {
    name: 'English Oven Fruit Bun',
    weight: '2 Pcs',
    price: 48,
    oldPrice: 56,
    discount: '14% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'English Oven',
    image: 'https://tse1.mm.bing.net/th/id/OIP.HI6nTheBVMTJXuQwdqiwPAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'English Oven Fruit Bun | Sweet & Soft | With Tutti Frutti | 4 Pieces Pack',
    stock: 80
  },
  {
    name: 'English Oven Fruit Bread',
    weight: '200g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'English Oven',
    image: '	https://tse1.mm.bing.net/th/id/OIP.ZttHatj85_OLomaMm8wdYwHaN-?pid=Api&H=301&W=160',
    inStock: true,
    description: 'English Oven Fruit Bread | Sweet Bread with Dry Fruits | Tea Time Snack | 200g Pack',
    stock: 80
  },


   {
    name: 'English Oven Multigrain Bread',
    weight: '400g',
    price: 70,
    oldPrice: 80,
    discount: '16% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'English Oven',
    image: 'https://tse2.mm.bing.net/th/id/OIP.rbJCzGkGoiT2QGU2NLwEmAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'English Oven Atta Bread | 100% Multigrain | No Maida | Healthy & Tasty | 400g Pack',
    stock: 100
  },

  // ════════════════════════════════════════════════════════════════
  // 🥚 EGGS
  // ════════════════════════════════════════════════════════════════

  {
    name: 'Eggoz Fresh Eggs',
    weight: '6 Pcs',
    price: 54,
    oldPrice: 62,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Eggoz',
    image: '	https://tse2.mm.bing.net/th/id/OIP.pEmHj9W7SDnx3C2gp4tziQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Eggoz Fresh Eggs | Farm Fresh | Protein Rich | 6 Pieces Box',
    stock: 150
  },
  {
    name: 'Farm Fresh Eggs Tray',
    weight: '30 Pcs',
    price: 210,
    oldPrice: 240,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Farm Fresh',
    image: '	https://tse2.mm.bing.net/th/id/OIP.gLXpQTQ4ZwEV0o6zdx_dSgHaFy?pid=Api&H=124&W=160',
    inStock: true,
    description: 'Farm Fresh Eggs Tray | White Eggs | Full Tray | 30 Pieces',
    stock: 100
  },
  {
    name: 'Desi Eggs Tray Nagpal',
    weight: '30 Pcs',
    price: 280,
    oldPrice: 320,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Farm Fresh Nagpal',
    image: '	https://tse2.mm.bing.net/th/id/OIP.PORsudaRnS0sj8xVjkFDQgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Desi Eggs Tray | Country Brown Eggs | Free Range | Natural | 30 Pieces',
    stock: 80
  },
  {
    name: 'Desi Eggs Box Nagpal',
    weight: '6 Pcs',
    price: 65,
    oldPrice: 75,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Farm Fresh Nagpal',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Ulcs1JscNT_Ut4rO4cA4jgHaJQ?pid=Api&H=199&W=160',
    inStock: true,
    description: 'Desi Eggs Box | Country Brown Eggs | Free Range | Natural | 6 Pieces Box',
    stock: 120
  },


  // ============ FROZEN VEGETABLES ============
{
    name: ' Frozen Green Peas',
    weight: '200g',
    price: 42,
    oldPrice: 50,
    discount: '16% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Pea',
    image: '	https://tse2.mm.bing.net/th/id/OIP.aWME-FzlbGzykKaQqxKN7AHaHK?pid=Api&H=154&W=160',
    inStock: true,
    description: ' Frozen Green Peas | Fresh & Nutritious | Ready to Cook | 200g Pack',
    stock: 100
},
{
    name: ' Frozen Green Peas',
    weight: '500g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Pea',
    image: 'https://tse1.mm.bing.net/th/id/OIP.SSNjukkRlwNmFtXONj4QKgHaHf?pid=Api&H=161&W=160',
    inStock: true,
    description: ' Frozen Green Peas | Fresh & Nutritious | Ready to Cook | 500g Pack',
    stock: 100
},
{
    name: ' Frozen Sweet Corn',
    weight: '500g',
    price: 130,
    oldPrice: 150,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Sweet Corn',
    image: '	https://tse1.mm.bing.net/th/id/OIP.3jhrEuImYx5LOZBg4VIv-QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: ' Frozen Sweet Corn | Golden Kernels | Ready to Cook | 500g Pack',
    stock: 100
},
{
    name: 'Maharaja Soya Chaap',
    weight: '500g',
    price: 250,
    oldPrice: 290,
    discount: '14% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Vezlay',
    image: '	https://tse2.mm.bing.net/th/id/OIP.9QwIu4IINjvxm7iwzkLNrAHaHU?pid=Api&H=157&W=160',
    inStock: true,
    description: 'Maharaja Soya Chaap | High Protein | Ready to Cook | 500g Pack',
    stock: 100
},

// ============ McCAIN'S FROZEN SNACKS ============
{
    name: 'McCain French Fries',
    weight: '420g',
    price: 175,
    oldPrice: 199,
    discount: '12% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'McCain',
    image: 'https://tse2.mm.bing.net/th/id/OIP.SVK-gppwOjYJ1gMP3l9KGgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'McCain French Fries | Crispy & Golden | Ready to Fry | 420g Pack',
    stock: 100
},
{
    name: 'McCain Aloo Tikki',
    weight: '400g',
    price: 165,
    oldPrice: 190,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'McCain',
    image: '	https://tse2.mm.bing.net/th/id/OIP.mA7EVUYQ3jrw_86ycFpeWwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'McCain Aloo Tikki | Crispy Outside Soft Inside | Ready to Fry | 400g Pack',
    stock: 100
},
{
    name: 'McCain Burger Tikki',
    weight: '360g',
    price: 185,
    oldPrice: 215,
    discount: '14% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'McCain',
    image: 'https://tse2.mm.bing.net/th/id/OIP._5eoLYt8JTZEk4kXTrn0TgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'McCain Burger Tikki | Perfect for Burgers | Crispy & Tasty | 360g Pack',
    stock: 100
},
{
    name: 'McCain Masala Fries',
    weight: '375g',
    price: 180,
    oldPrice: 210,
    discount: '14% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'McCain',
    image: '	https://tse1.mm.bing.net/th/id/OIP.ZgKdGMLDYyV4SFWlAQdNLgHaIS?pid=Api&H=178&W=160',
    inStock: true,
    description: 'McCain Masala Fries | Spicy & Crispy | Indian Flavour | 375g Pack',
    stock: 100
},
{
    name: 'McCain Veggie Fingers',
    weight: '400g',
    price: 199,
    oldPrice: 230,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'McCain',
    image: '	https://tse1.mm.bing.net/th/id/OIP.4Nve9T92Bu16gXQUl9SdsAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'McCain Veggie Fingers | Crunchy Coating | Mixed Veggies | 400g Pack',
    stock: 100
},
{
    name: 'McCain Chilli Garlic Potato Bites',
    weight: '420g',
    price: 210,
    oldPrice: 245,
    discount: '14% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'McCain',
    image: 'https://tse2.mm.bing.net/th/id/OIP.KTJS1NmsPm2SzxgtcmgE6gHaIT?pid=Api&H=179&W=160',
    inStock: true,
    description: 'McCain Chilli Garlic Potato Bites | Spicy Flavour | Party Snack | 420g Pack',
    stock: 100
},
{
    name: 'McCain Cheese Nuggets',
    weight: '325g',
    price: 225,
    oldPrice: 260,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'McCain',
    image: 'https://tse1.mm.bing.net/th/id/OIP.2drT0aAWZdDYDnwqHCOZawHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'McCain Cheese Nuggets | Cheesy & Crispy | Kids Favourite | 325g Pack',
    stock: 100
},
{
    name: 'McCain Mini Samosa - Cheese Pizza',
    weight: '240g',
    price: 135,
    oldPrice: 155,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'McCain',
    image: 'https://tse1.mm.bing.net/th/id/OIP.DmoQYJu8f3qScigrRLqS0QHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'McCain Mini Samosa Cheese Pizza | Classic Indian Snack | Ready to Fry | 240g Pack',
    stock: 100
},
{
    name: 'McCain Mini Samosa - Cheese Corn',
    weight: '240g',
    price: 145,
    oldPrice: 170,
    discount: '15% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'McCain',
    image: 'https://tse1.mm.bing.net/th/id/OIP.brGhk7xJJAWh3CMSHBlTzAHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'McCain Mini Samosa Cheese Corn | Cheesy Filling | Ready to Fry | 240g Pack',
    stock: 100
},
{
    name: 'McCain Smiles',
    weight: '415g',
    price: 199,
    oldPrice: 225,
    discount: '12% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'McCain',
    image: 'https://tse1.mm.bing.net/th/id/OIP.8f9lNy4T5MU25QX4D4gDpgHaFV?pid=Api&H=115&W=160',
    inStock: true,
    description: 'McCain Smiles | Fun Shaped Potato Snack | Kids Favourite | 415g Pack',
    stock: 100
},


{
    name: 'Nestle a+ Nourish Dahi',
    weight: '200g',
    price: 32,
    oldPrice: 38,
    discount: '16% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Nestle',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Dx1A6DpkCiOtZpBBMJCmTAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle a+ Nourish Dahi | Thick & Creamy | Fresh | 200g Cup',
    stock: 4
},
{
    name: 'Nestle a+ Nourish Dahi',
    weight: '400g',
    price: 58,
    oldPrice: 68,
    discount: '15% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Nestle',
    image: '	https://tse2.mm.bing.net/th/id/OIP.CHhQy72fxOYeL_13CV1K4gHaF4?pid=Api&H=126&W=160',
    inStock: true,
    description: 'Nestle a+ Nourish Dahi | Thick & Creamy | Fresh | 400g Cup',
    stock: 4
},
// ============ NESTLE YOGURT ============
{
    name: 'Nestle a+ Grekyo Greek Yogurt - Plain',
    weight: '100g',
    price: 35,
    oldPrice: 40,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Nestle',
    image: '	https://tse1.mm.bing.net/th/id/OIP.MGwvFTMvD4EEU8sqHBPeGQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle a+ Grekyo Greek Yogurt Plain | High Protein | Thick & Creamy | 100g Cup',
    stock: 3
},

{
    name: 'Nestle a+ Grekyo Greek Yogurt - Strawberry',
    weight: '100g',
    price: 40,
    oldPrice: 45,
    discount: '11% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Nestle',
    image: '	https://tse1.mm.bing.net/th/id/OIP.bPKX4PH2cUbNc4w9Op8LjAHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Nestle a+ Grekyo Greek Yogurt Strawberry | Fruity & Creamy | High Protein | 100g Cup',
    stock: 3
},

{
    name: 'Nestle a+ Grekyo Greek Yogurt - Mango',
    weight: '100g',
    price: 40,
    oldPrice: 45,
    discount: '11% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Nestle',
    image: 'https://tse2.mm.bing.net/th/id/OIP.N81OI-TWevmm600iNseTYwHaHa?pid=Api&H=160&W=160ttps://www.bigbasket.com/media/uploads/p/l/40173498_4-nestle-a-grekyo-greek-yoghurt-mango.jpg',
    inStock: true,
    description: 'Nestle a+ Grekyo Greek Yogurt Mango | Fruity & Creamy | High Protein | 100g Cup',
    stock: 3
},
{
    name: 'Ananda Fresh Paneer',
    weight: '200g',
    price: 85,
    oldPrice: 99,
    discount: '14% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Ananda',
    image: 'https://tse2.mm.bing.net/th/id/OIP.bTnM3qQwa21gKWuosOXY5wHaFG?pid=Api&H=110&W=160',
    inStock: true,
    description: 'Ananda Fresh Paneer | Soft & Creamy | Rich in Protein | 200g Pack',
    stock: 100
},



// 🥛 AMUL CREAM
// ========================================
{
    name: 'Amul Fresh Cream',
    weight: '200g',
    price: 65,
    oldPrice: 75,
    discount: '13% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Amul',
    image: '	https://tse2.mm.bing.net/th/id/OIP.ZQbKrjADEiTMWG4YjEOlMQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Amul Fresh Cream | Rich & Creamy | For Desserts & Curries | 200g Pack',
    stock: 100
},
{
    name: 'Amul Fresh Cream',
    weight: '1L',
    price: 285,
    oldPrice: 330,
    discount: '14% OFF',
    category: 'Dairy Bread & Eggs',
    brand: 'Amul',
    image: 'https://tse1.mm.bing.net/th/id/OIP.TQEZakM--bYFsG0xw5O_5QHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Amul Fresh Cream | Rich & Creamy | Family Pack | 1 Litre',
    stock: 50
},







];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🥛 Starting Smart Migration for Dairy, Bread & Eggs...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Dairy Bread & Eggs" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of dairyBreadEggsProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Dairy Bread & Eggs" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();