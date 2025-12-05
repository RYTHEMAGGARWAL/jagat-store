// migrate_sauces_spreads_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_sauces_spreads_IMPROVED.js

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

// ========== SAUCES & SPREADS PRODUCTS ==========
const saucesAndSpreadsProducts = [
  // TOMATO KETCHUP



// ========================================
// 🧄 MOTHERS GINGER GARLIC PASTE
// ========================================
{
    name: 'Mothers Recipe Ginger Garlic Paste',
    weight: '200g',
    price: 55,
    oldPrice: 70,
    discount: '21% OFF',
    category: 'Sauces & Spreads',
    brand: 'Mothers Recipe',
    image: '	https://tse1.mm.bing.net/th/id/OIP.8ugaHYJiZ_ipBAGhygB6xgAAAA?pid=Api&H=184&W=160',
    inStock: true,
    description: 'Mothers Recipe Ginger Garlic Paste | Ready to Use | No Preservatives | 200g',
    stock: 100
},


// ========================================
// 🧄 SMITH & JONES GINGER GARLIC PASTE
// ========================================
{
    name: 'Smith & Jones Ginger Garlic Paste',
    weight: '200g',
    price: 50,
    oldPrice: 65,
    discount: '23% OFF',
    category: 'Sauces & Spreads',
    brand: 'Smith & Jones',
    image: '	https://tse2.mm.bing.net/th/id/OIP.l37VKV0aX6CA0l3_a0z14AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Smith & Jones Ginger Garlic Paste | Ready to Cook | Fresh Taste | 200g',
    stock: 100
},


// ========================================
// 🍅 MOTHERS IMLI (TAMARIND) PASTE
// ========================================
{
    name: 'Mothers Recipe Imli Paste (Tamarind)',
    weight: '200g',
    price: 45,
    oldPrice: 60,
    discount: '25% OFF',
    category: 'Sauces & Spreads',
    brand: 'Mothers Recipe',
    image: 'https://tse2.mm.bing.net/th/id/OIP.VK7dX3jghf6MalcIRFTICgAAAA?pid=Api&H=184&W=160',
    inStock: true,
    description: 'Mothers Recipe Imli Paste | Tamarind Concentrate | For Chutney & Curries | 200g',
    stock: 100
},



// ========================================
// 🍅 KISSAN TOMATO KETCHUP
// ========================================
{
    name: 'Kissan Fresh Tomato Ketchup - Refill',
    weight: '500ml',
    price: 115,
    oldPrice: 140,
    discount: '18% OFF',
    category: 'Sauces & Spreads',
    brand: 'Kissan',
    image: 'https://tse1.mm.bing.net/th/id/OIP.wt313nJTaLPoZ50cdqVIkgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kissan Fresh Tomato Ketchup | Refill Pack | No Added Preservatives | 500ml',
    stock: 100
},
{
    name: 'Kissan Fresh Tomato Ketchup - Refill',
    weight: '1L',
    price: 199,
    oldPrice: 240,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Kissan',
    image: '	https://tse1.mm.bing.net/th/id/OIP.QWSUEVTEPGMFaduakwi6lQHaL6?pid=Api&H=257&W=160',
    inStock: true,
    description: 'Kissan Fresh Tomato Ketchup | Refill Pack | No Added Preservatives | 1 Litre',
    stock: 80
},

// ========================================
// 🍅 TOPS TOMATO KETCHUP
// ========================================
{
    name: 'Tops Tomato Ketchup',
    weight: '500ml',
    price: 85,
    oldPrice: 105,
    discount: '19% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Cl2323Z_yUSu8AyydHXIywHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Tomato Ketchup | Rich & Tangy | Family Pack | 500ml Bottle',
    stock: 100
},

// ========================================
// 🍅 MAGGI TOMATO SAUCE
// ========================================
{
    name: 'Maggi Rich Tomato Sauce',
    weight: '500ml',
    price: 125,
    oldPrice: 150,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Maggi',
    image: 'https://tse2.mm.bing.net/th/id/OIP.GCx9kB64PZ991w0Ye8WLagHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Maggi Rich Tomato Sauce | Thick & Tasty | Glass Bottle | 500ml',
    stock: 100
},
{
    name: 'Maggi Rich Tomato Sauce',
    weight: '1L',
    price: 215,
    oldPrice: 260,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Maggi',
    image: '	https://tse1.mm.bing.net/th/id/OIP.rpewA2kOwWwIBgO-MVCIhgHaEl?pid=Api&H=98&W=160',
    inStock: true,
    description: 'Maggi Rich Tomato Sauce | Thick & Tasty | Glass Bottle | 1 Litre',
    stock: 80
},

// ========================================
// 🌶️ MAGGI HOT & SWEET SAUCE
// ========================================
{
    name: 'Maggi Hot & Sweet Tomato Chilli Sauce',
    weight: '500ml',
    price: 135,
    oldPrice: 165,
    discount: '18% OFF',
    category: 'Sauces & Spreads',
    brand: 'Maggi',
    image: 'https://tse1.mm.bing.net/th/id/OIP.9CfN7iDJPWO4a9SoZdoqugHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Maggi Hot & Sweet Sauce | Tomato Chilli | Spicy & Tangy | 500ml',
    stock: 100
},
{
    name: 'Maggi Hot & Sweet Tomato Chilli Sauce',
    weight: '1L',
    price: 235,
    oldPrice: 285,
    discount: '18% OFF',
    category: 'Sauces & Spreads',
    brand: 'Maggi',
    image: '	https://tse1.mm.bing.net/th/id/OIP.6abusUy5qbH7QrZPAFwgygHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Maggi Hot & Sweet Sauce | Tomato Chilli | Spicy & Tangy | 1 Litre',
    stock: 80
},

// ========================================
// 🍓 KISSAN MIXED FRUIT JAM
// ========================================
{
    name: 'Kissan Mixed Fruit Jam',
    weight: '200g',
    price: 75,
    oldPrice: 92,
    discount: '18% OFF',
    category: 'Sauces & Spreads',
    brand: 'Kissan',
    image: '	https://tse2.mm.bing.net/th/id/OIP.PzOqAWraqntjT6F_YrWmjgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kissan Mixed Fruit Jam | Real Fruit | No Artificial Flavours | 200g Jar',
    stock: 120
},
{
    name: 'Kissan Mixed Fruit Jam',
    weight: '500g',
    price: 165,
    oldPrice: 199,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Kissan',
    image: 'https://tse1.mm.bing.net/th/id/OIP.YYVu8LLrTZSb4yhIbw501wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kissan Mixed Fruit Jam | Real Fruit | No Artificial Flavours | 500g Jar',
    stock: 100
},
{
    name: 'Kissan Mixed Fruit Jam',
    weight: '750g',
    price: 235,
    oldPrice: 285,
    discount: '18% OFF',
    category: 'Sauces & Spreads',
    brand: 'Kissan',
    image: '	https://tse2.mm.bing.net/th/id/OIP.snUmTnFnPuGik8RRM7NdoAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Kissan Mixed Fruit Jam | Real Fruit | No Artificial Flavours | 750g Jar',
    stock: 80
},

// ========================================
// 🍲 KNORR SOUPS - ₹10 SACHETS
// ========================================
{
    name: 'Knorr Chatpata Tomato Soup',
    weight: '11g',
    price: 10,
    oldPrice: 12,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Knorr',
    image: '	https://tse1.mm.bing.net/th/id/OIP.GqVisPNWVYEBi3Uls8I4WwAAAA?pid=Api&H=201&W=160',
    inStock: true,
    description: 'Knorr Classic Tomato Soup | Instant | Just Add Water | Single Serve | 11g',
    stock: 200
},
{
    name: 'Knorr Sweet Corn Soup',
    weight: '11g',
    price: 10,
    oldPrice: 12,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Knorr',
    image: '	https://tse1.mm.bing.net/th/id/OIP.uPmav11dZGkOrqNz_AvD4gAAAA?pid=Api&H=180&W=160',
    inStock: true,
    description: 'Knorr Sweet Corn Soup | Instant | Just Add Water | Single Serve | 11g',
    stock: 200
},
{
    name: 'Knorr Mix Veg Soup',
    weight: '11g',
    price: 10,
    oldPrice: 12,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Knorr',
    image: 'https://tse1.mm.bing.net/th/id/OIP.krFY1Y1Xet9hXvrD7Cw78AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Knorr Mix Veg Soup | Instant | Just Add Water | Single Serve | 11g',
    stock: 200
},
{
    name: 'Knorr Hot & Sour Soup',
    weight: '11g',
    price: 10,
    oldPrice: 12,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Knorr',
    image: 'https://tse1.mm.bing.net/th/id/OIP.RNB3B_3-6r3hFWVUZpsofwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Knorr Hot & Sour Soup | Instant | Just Add Water | Single Serve | 11g',
    stock: 200
},

// ========================================
// 🌶️ CHING'S SCHEZWAN CHUTNEY
// ========================================
{
    name: 'Ching\'s Schezwan Chutney - Jar',
    weight: '250g',
    price: 95,
    oldPrice: 115,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Ching\'s',
    image: '	https://tse1.mm.bing.net/th/id/OIP.XvKWZ83KyIsXSw3cTYITjQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Ching\'s Schezwan Chutney | Spicy & Tangy | For Noodles & Snacks | 250g Jar',
    stock: 100
},
{
    name: 'Nestle Milkmaid',
    weight: '400g',
    price: 185,
    oldPrice: 220,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Nestle',
    image: 'https://tse1.mm.bing.net/th/id/OIP.cr2qDdEOjM-JJMSaKwqqvgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nestle Milkmaid | Sweetened Condensed Milk | For Desserts | 400g Tin',
    stock: 80
},





// ========================================
// 🍫 HERSHEY'S CHOCOLATE SYRUP
// ========================================
{
    name: 'Hershey\'s Chocolate Syrup',
    weight: '200g',
    price: 175,
    oldPrice: 210,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Hershey\'s',
    image: 'https://tse2.mm.bing.net/th/id/OIP.TLzAqrLU6cjKz4JmyePY9AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Hershey\'s Chocolate Syrup | Genuine Chocolate Taste | For Desserts & Shakes | 200g',
    stock: 80
},
{
    name: 'Hershey\'s Chocolate Syrup',
    weight: '500g',
    price: 350,
    oldPrice: 420,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Hershey\'s',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Xl123VW2LCiGL0KMyIOGRQHaL4?pid=Api&H=256&W=160',
    inStock: true,
    description: 'Hershey\'s Chocolate Syrup | Genuine Chocolate Taste | For Desserts & Shakes | 500g',
    stock: 60
},

// ========================================
// 🍓 HERSHEY'S STRAWBERRY SYRUP
// ========================================
{
    name: 'Hershey\'s Strawberry Syrup',
    weight: '200g',
    price: 175,
    oldPrice: 210,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Hershey\'s',
    image: '	https://tse2.mm.bing.net/th/id/OIP.4WwX2lmFTajnyYWLQjeavgAAAA?pid=Api&H=186&W=160',
    inStock: true,
    description: 'Hershey\'s Strawberry Syrup | Fruity & Sweet | For Desserts & Milkshakes | 200g',
    stock: 80
},

// ========================================
// 🍫 NUTELLA HAZELNUT SPREAD
// ========================================
{
    name: 'Nutella Hazelnut Spread',
    weight: '180g',
    price: 299,
    oldPrice: 350,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Nutella',
    image: 'https://tse2.mm.bing.net/th/id/OIP.0XHQ6LGEZLRp0R6d4dXwtwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nutella Hazelnut Spread | With Cocoa | For Bread & Pancakes | 180g Jar',
    stock: 80
},
{
    name: 'Nutella Hazelnut Spread',
    weight: '350g',
    price: 499,
    oldPrice: 585,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Nutella',
    image: 'https://tse2.mm.bing.net/th/id/OIP.Zk9EPEvbIZf3MVKAIdTtpwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nutella Hazelnut Spread | With Cocoa | For Bread & Pancakes | 350g Jar',
    stock: 60
},













// Dr. Oetker Products - 250g
{
    name: 'Dr. Oetker Mayonnaise Original',
    weight: '250g',
    price: 99,
    oldPrice: 115,
    discount: '14% OFF',
    category: 'Sauces & Spreads',
    brand: 'Dr. Oetker',
    image: 'https://tse2.mm.bing.net/th/id/OIP.Yq-CCKAHJ3ooJfXT4p6htAHaHe?pid=Api&H=161&W=160',
    inStock: true,
    description: 'Dr. Oetker Mayonnaise Original | Creamy & Rich | Perfect for Sandwiches | 250g Pack',
    stock: 80
},
{
    name: 'Dr. Oetker Pizza Topping',
    weight: '250g',
    price: 110,
    oldPrice: 130,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Dr. Oetker',
    image: 'https://tse2.mm.bing.net/th/id/OIP.AqKcvR_K_-wFsx29dq8TLQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Dr. Oetker Pizza Topping | Cheesy & Tangy | Perfect for Homemade Pizzas | 250g Pack',
    stock: 70
},
{
    name: 'Dr. Oetker Burger Mayonnaise',
    weight: '250g',
    price: 105,
    oldPrice: 125,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Dr. Oetker',
    image: '	https://tse2.mm.bing.net/th/id/OIP.sBrT1ZjFqj4dlWhMGUcHpwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Dr. Oetker Burger Mayonnaise | Classic Burger Taste | Creamy & Delicious | 250g Pack',
    stock: 65
},
{
    name: 'Dr. Oetker Tandoori Mayonnaise',
    weight: '250g',
    price: 105,
    oldPrice: 125,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Dr. Oetker',
    image: 'https://tse1.mm.bing.net/th/id/OIP.V_rzVOscMM8RfBnejBQjuAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Dr. Oetker Tandoori Mayonnaise | Spicy Indian Flavour | Perfect for Wraps | 250g Pack',
    stock: 60
},
{
    name: 'Dr. Oetker Sandwich Spread Carrot & Cucumber',
    weight: '250g',
    price: 99,
    oldPrice: 120,
    discount: '18% OFF',
    category: 'Sauces & Spreads',
    brand: 'Dr. Oetker',
    image: '	https://tse2.mm.bing.net/th/id/OIP.pwFlgKr8pFHHpVVFbnV0GgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Dr. Oetker Sandwich Spread Carrot & Cucumber | Fresh & Crunchy | Healthy Choice | 250g Pack',
    stock: 55
},

// Dr. Oetker - 750g
{
    name: 'Dr. Oetker Mayonnaise Original Refill',
    weight: '750g',
    price: 275,
    oldPrice: 320,
    discount: '14% OFF',
    category: 'Sauces & Spreads',
    brand: 'Dr. Oetker',
    image: '	https://tse1.mm.bing.net/th/id/OIP.SGTsxtHyunzdRtwiIvZVBAHaIU?pid=Api&H=179&W=160',
    inStock: true,
    description: 'Dr. Oetker Mayonnaise Original | Creamy & Rich | Family Pack | 750g Jar',
    stock: 50
},

// Veeba Products - 250g
{
    name: 'Veeba Tandoori Mayonnaise',
    weight: '250g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Sauces & Spreads',
    brand: 'Veeba',
    image: '	https://tse1.mm.bing.net/th/id/OIP.cPjQpQKNFGqtUcG_rikIdQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Veeba Tandoori Mayonnaise | Smoky & Spicy | Perfect for Indian Snacks | 250g Pack',
    stock: 75
},

{
    name: 'Veeba Veg Mayonnaise',
    weight: '250g',
    price: 89,
    oldPrice: 105,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Veeba',
    image: 'https://tse1.mm.bing.net/th/id/OIP.4jmF85E7Zl_xGIv-o6J9yQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Veeba Veg Mayonnaise | 100% Vegetarian | Eggless Formula | 250g Pack',
    stock: 90
},
{
    name: 'Veeba Burger Mayonnaise',
    weight: '250g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Sauces & Spreads',
    brand: 'Veeba',
    image: '	https://tse2.mm.bing.net/th/id/OIP.Qcaphu23Hp4JR8-RtvyG6wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Veeba Burger Mayonnaise | Classic Creamy Taste | Perfect for Burgers | 250g Pack',
    stock: 70
},
{
    name: 'Veeba Sandwich Spread Thousand Island',
    weight: '250g',
    price: 99,
    oldPrice: 115,
    discount: '14% OFF',
    category: 'Sauces & Spreads',
    brand: 'Veeba',
    image: 'https://tse2.mm.bing.net/th/id/OIP.jc6S7Rlo4dReo382O-4UvgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Veeba Sandwich Spread Thousand Island | Tangy & Sweet | Classic Dressing | 250g Pack',
    stock: 65
},
{
    name: 'Veeba Sandwich Spread Carrot & Cucumber',
    weight: '250g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Sauces & Spreads',
    brand: 'Veeba',
    image: 'https://tse1.mm.bing.net/th/id/OIP.ACLDnqHxH6TFOLdCETaLBgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Veeba Sandwich Spread Carrot & Cucumber | Fresh Veggie Chunks | Healthy Spread | 250g Pack',
    stock: 55
},
{
    name: 'Veeba Cheesy Pasta Sauce',
    weight: '250g',
    price: 110,
    oldPrice: 130,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Veeba',
    image: 'https://tse2.mm.bing.net/th/id/OIP.18rfJrmF-PmS9ThmX42bYgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Veeba Cheesy Pasta Sauce | Rich & Creamy | Ready to Use | 250g Pack',
    stock: 80
},
{
    name: 'Veeba Pasta & Pizza Sauce',
    weight: '250g',
    price: 99,
    oldPrice: 115,
    discount: '14% OFF',
    category: 'Sauces & Spreads',
    brand: 'Veeba',
    image: '	https://tse2.mm.bing.net/th/id/OIP.5edMPWOg9eN5bZrGcpv2awHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Veeba Pasta & Pizza Sauce | Italian Herbs | Tangy Tomato Base | 250g Pack',
    stock: 85
},
{
    name: 'Veeba Sandwich Spread Cheese & Chilli',
    weight: '250g',
    price: 99,
    oldPrice: 115,
    discount: '14% OFF',
    category: 'Sauces & Spreads',
    brand: 'Veeba',
    image: '	https://tse2.mm.bing.net/th/id/OIP.P1jCXH9jMgYkc7BVJeoWtQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Veeba Sandwich Spread Cheese & Chilli | Spicy Cheesy Flavour | Perfect for Snacks | 250g Pack',
    stock: 60
},
{
    name: 'Veeba Pasta & Pizza Sauce No Onion No Garlic',
    weight: '250g',
    price: 105,
    oldPrice: 125,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Veeba',
    image: 'https://tse1.mm.bing.net/th/id/OIP.THjos2GKfWvF1GGfFU1LSwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Veeba Pasta & Pizza Sauce | No Onion No Garlic | Jain Friendly | 250g Pack',
    stock: 45
},

// Veeba - 750g
{
    name: 'Veeba Mayonnaise Original Refill Pack',
    weight: '750g',
    price: 249,
    oldPrice: 290,
    discount: '14% OFF',
    category: 'Sauces & Spreads',
    brand: 'Veeba',
    image: 'https://tse1.mm.bing.net/th/id/OIP.fBQbec-bUEgjADFwE9Mj7wAAAA?pid=Api&H=224&W=160',
    inStock: true,
    description: 'Veeba Mayonnaise Original | Refill Pack | Creamy & Delicious | 750g Pack',
    stock: 40
},
{
    name: 'Veeba Tomato Ketchup No Onion No Garlic',
    weight: '750ml',
    price: 185,
    oldPrice: 215,
    discount: '14% OFF',
    category: 'Sauces & Spreads',
    brand: 'Veeba',
    image: '	https://tse2.mm.bing.net/th/id/OIP.sbbiXzxjbsCqUSmUGwwSQgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Veeba Tomato Ketchup | No Onion No Garlic | Jain Friendly | Refill Pack | 750ml',
    stock: 55
},



// ========================================
// 🥒 TOPS ACHAR - 1kg
// ========================================
{
    name: 'Tops Green Chilli Pickle (achar)',
    weight: '1kg',
    price: 175,
    oldPrice: 210,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: 'https://tse2.mm.bing.net/th/id/OIP.iqBX6ekijaxlK3fgKbtiEgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Green Chilli Pickle | Spicy & Tangy | Traditional Recipe | 1kg Jar',
    stock: 60
},
{
    name: 'Tops Lime Pickle (achar)',
    weight: '1kg',
    price: 170,
    oldPrice: 200,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: 'https://tse1.mm.bing.net/th/id/OIP.9EdEIOj4iFktgupXEvqJwgHaK7?pid=Api&H=235&W=160',
    inStock: true,
    description: 'Tops Lime Pickle | Tangy & Zesty | Traditional Recipe | 1kg Jar',
    stock: 55
},
{
    name: 'Tops Stuffed Red Chilli Pickle (achar)',
    weight: '1kg',
    price: 195,
    oldPrice: 230,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: '	https://tse1.mm.bing.net/th/id/OIP.WszmQIngF8c9PtnAfOZAJwHaEl?pid=Api&H=98&W=160',
    inStock: true,
    description: 'Tops Stuffed Red Chilli Pickle | Spicy & Flavourful | Premium Quality | 1kg Jar',
    stock: 45
},
{
    name: 'Tops Mixed Pickle (achar)',
    weight: '1kg',
    price: 180,
    oldPrice: 215,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: 'https://tse1.mm.bing.net/th/id/OIP.m1iPqWYNfaiHfeenHRDaVQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Mixed Pickle | Blend of Vegetables | Traditional Recipe | 1kg Jar',
    stock: 70
},
{
    name: 'Tops Mango Pickle (achar)',
    weight: '1kg',
    price: 175,
    oldPrice: 205,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: '	https://tse1.mm.bing.net/th/id/OIP.FK4ks3phGdlID2MC9lMxswHaMf?pid=Api&H=269&W=160',
    inStock: true,
    description: 'Tops Mango Pickle | Aam Ka Achar | Tangy & Spicy | 1kg Jar',
    stock: 65
},

// ========================================
// 🥒 TOPS ACHAR - 500g
// ========================================
{
    name: 'Tops Garlic Pickle (achar)',
    weight: '500g',
    price: 110,
    oldPrice: 130,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: 'https://tse1.mm.bing.net/th/id/OIP.PJkhKcuSFPQ83QtNce3SgwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Garlic Pickle | Lehsun Ka Achar | Bold & Flavourful | 500g Jar',
    stock: 50
},
{
    name: 'Tops Mixed Pickle (achar)',
    weight: '500g',
    price: 99,
    oldPrice: 115,
    discount: '14% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: '	https://tse2.mm.bing.net/th/id/OIP.Cb9N-9T0b9WP9v-PrW_nNQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Mixed Pickle | Blend of Vegetables | Traditional Recipe | 500g Jar',
    stock: 80
},
{
    name: 'Tops Mango Pickle (achar)',
    weight: '500g',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: '	https://tse2.mm.bing.net/th/id/OIP.n8-wz1NyE9dItapMRSfv8AAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Mango Pickle | Aam Ka Achar | Tangy & Spicy | 500g Jar',
    stock: 75
},
{
    name: 'Tops Green Chilli Pickle (achar)',
    weight: '500g',
    price: 95,
    oldPrice: 112,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: '	https://tse1.mm.bing.net/th/id/OIP.b3Licobz13PckuGMgvmpzAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Green Chilli Pickle | Spicy & Tangy | Traditional Recipe | 500g Jar',
    stock: 65
},
{
    name: 'Tops Lime Pickle (achar)',
    weight: '500g',
    price: 92,
    oldPrice: 108,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: '	https://tse1.mm.bing.net/th/id/OIP.iQiQx50jCbK0NWRVxkgV3AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Lime Pickle | Tangy & Zesty | Traditional Recipe | 500g Jar',
    stock: 60
},


// ========================================
// 🥒 JAIN FOODS ACHAR - 1kg
// ========================================
{
    name: 'Jain Foods Pachranga Mixed Pickle',
    weight: '1kg',
    price: 185,
    oldPrice: 220,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Jain Foods',
    image: 'https://tse1.mm.bing.net/th/id/OIP.iLv-eAQvMpmgnFv9tRKy8QHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Jain Foods Pachranga Mixed Pickle | 5 Vegetable Blend | Traditional Recipe | 1kg Jar',
    stock: 55
},
{
    name: 'Jain Foods Mango Pickle',
    weight: '1kg',
    price: 180,
    oldPrice: 210,
    discount: '14% OFF',
    category: 'Sauces & Spreads',
    brand: 'Jain Foods',
    image: 'https://tse1.mm.bing.net/th/id/OIP.fyTdSqEmq780jlAGnl1-bAHaF7?pid=Api&H=127&W=160',
    inStock: true,
    description: 'Jain Foods Mango Pickle | Aam Ka Achar | Authentic Taste | 1kg Jar',
    stock: 60
},
{
    name: 'Jain Foods Lime Pickle',
    weight: '1kg',
    price: 175,
    oldPrice: 205,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Jain Foods',
    image: 'https://tse1.mm.bing.net/th/id/OIP.MGmtsDNvgoZz2O9iJN2DIgHaEo?pid=Api&H=99&W=160',
    inStock: true,
    description: 'Jain Foods Lime Pickle | Nimbu Ka Achar | Tangy & Zesty | 1kg Jar',
    stock: 50
},
{
    name: 'Jain Foods Tenti Pickle',
    weight: '1kg',
    price: 190,
    oldPrice: 225,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Jain Foods',
    image: '	https://tse1.mm.bing.net/th/id/OIP.4JA0P7NWu5Mc-5WX-qf4YwHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Jain Foods Tenti Pickle | Ker Sangri Special | Rajasthani Flavour | 1kg Jar',
    stock: 45
},






// ========================================
// 🥒 NILONS ACHAR - 1kg
// ========================================
{
    name: 'Nilons Mango Pickle',
    weight: '1kg',
    price: 165,
    oldPrice: 195,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Nilons',
    image: 'https://tse1.mm.bing.net/th/id/OIP._u0j6OnTQaEwKYlK2nUZLAHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Nilons Mango Pickle | Aam Ka Achar | Tangy & Spicy | 1kg Jar',
    stock: 65
},
{
    name: 'Nilons Mixed Pickle',
    weight: '1kg',
    price: 170,
    oldPrice: 200,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Nilons',
    image: '	https://tse1.mm.bing.net/th/id/OIP.5QpTt574Wm5Sf71qomgPUgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Nilons Mixed Pickle | Blend of Vegetables | Traditional Recipe | 1kg Jar',
    stock: 60
},
{
    name: 'Nilons Mirch Pickle',
    weight: '1kg',
    price: 175,
    oldPrice: 205,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Nilons',
    image: '	https://tse1.mm.bing.net/th/id/OIP.o5XjDVHxWAljTcFFJY13oQHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Nilons Mirch Pickle | Spicy Red Chilli | Hot & Flavourful | 1kg Jar',
    stock: 50

},


// ========================================
// 🌿 KEYA SEASONINGS - 35g
// ========================================
{
    name: 'Keya Oregano',
    weight: '35g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Keya',
    image: 'https://tse1.mm.bing.net/th/id/OIP.rksy4oDJzMeOQuFOnBRo2AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Keya Oregano | Italian Herb | Perfect for Pizza & Pasta | 35g Pack',
    stock: 100
},
{
    name: 'Keya Chilli Flakes',
    weight: '35g',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Keya',
    image: 'https://tse1.mm.bing.net/th/id/OIP.awhwc43iiVOsM_fB_HQQUAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Keya Chilli Flakes | Crushed Red Pepper | Adds Spicy Kick | 35g Pack',
    stock: 95
},
{
    name: 'Keya Pink Salt',
    weight: '35g',
    price: 60,
    oldPrice: 72,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Keya',
    image: 'https://tse1.mm.bing.net/th/id/OIP.m8UsKNtEVaOlKF3sEl0yAgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Keya Himalayan Pink Salt | Natural & Pure | Rich in Minerals | 35g Pack',
    stock: 85
},
{
    name: 'Keya Peri Peri Seasoning',
    weight: '35g',
    price: 65,
    oldPrice: 78,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Keya',
    image: 'https://tse2.mm.bing.net/th/id/OIP.MZ2AuvWZPk9KQ_IE04VzeAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Keya Peri Peri Seasoning | Spicy African Flavour | Perfect for Fries | 35g Pack',
    stock: 90
},

// ========================================
// 🌿 KEYA SEASONINGS - 90g
// ========================================
{
    name: 'Keya Oregano',
    weight: '90g',
    price: 125,
    oldPrice: 150,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Keya',
    image: '	https://tse2.mm.bing.net/th/id/OIP.9MlEvt3dONXxuh_69cBhSAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Keya Oregano | Italian Herb | Perfect for Pizza & Pasta | 90g Pack',
    stock: 70
},
{
    name: 'Keya Black Salt',
    weight: '90g',
    price: 125,
    oldPrice: 150,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Keya',
    image: '	https://tse2.mm.bing.net/th/id/OIP.BdTDR0rDkv2D9KtNQwIK-wHaH7?pid=Api&H=171&W=160',
    inStock: true,
    description: 'Keya Black Salt | Natural & Pure | Rich in Minerals | 90g Pack',
    stock: 65
},
{
    name: 'Keya Pink Salt',
    weight: '90g',
    price: 135,
    oldPrice: 160,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Keya',
    image: 'https://tse2.mm.bing.net/th/id/OIP.qlE28gGjz0AsDA-0IJjXcAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Keya Himalayan Pink Salt | Natural & Pure | Rich in Minerals | 90g Pack',
    stock: 60
},
{
    name: 'Keya Peri Peri Seasoning',
    weight: '90g',
    price: 145,
    oldPrice: 175,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Keya',
    image: 'https://tse2.mm.bing.net/th/id/OIP.mr_vHO4pxVcfJtb5mXudmwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Keya Peri Peri Seasoning | Spicy African Flavour | Perfect for Fries | 90g Pack',
    stock: 55
},

// ========================================
// 🧁 WEIKFIELD BAKING ESSENTIALS
// ========================================
{
    name: 'Weikfield Baking Soda',
    weight: '100g',
    price: 32,
    oldPrice: 40,
    discount: '20% OFF',
    category: 'Sauces & Spreads',
    brand: 'Weikfield',
    image: '	https://tse2.mm.bing.net/th/id/OIP.6FaFwu9fys5NU7twJ__UAwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Weikfield Baking Soda | For Fluffy Cakes | Pure & Premium | 100g Pack',
    stock: 120
},
{
    name: 'Weikfield Baking Powder',
    weight: '100g',
    price: 45,
    oldPrice: 55,
    discount: '18% OFF',
    category: 'Sauces & Spreads',
    brand: 'Weikfield',
    image: '	https://tse1.mm.bing.net/th/id/OIP.W8i42N8YAQC54z71GOHSsQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Weikfield Baking Powder | Double Action | Perfect Rise Every Time | 100g Pack',
    stock: 110
},
{
    name: 'Weikfield Cocoa Powder',
    weight: '50g',
    price: 65,
    oldPrice: 78,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Weikfield',
    image: 'https://tse1.mm.bing.net/th/id/OIP.at1VaSqrB20408ut1Ky0PgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Weikfield Cocoa Powder | Rich Chocolate Flavour | For Cakes & Desserts | 50g Pack',
    stock: 90
},

// ========================================
// 🎨 AJANTA FOOD COLOUR
// ========================================
{
    name: 'Ajanta Food Colour Red Orange',
    weight: '10g',
    price: 20,
    oldPrice: 25,
    discount: '20% OFF',
    category: 'Sauces & Spreads',
    brand: 'Ajanta',
    image: '	https://tse2.mm.bing.net/th/id/OIP.p1PsZ3_HyUmaTgtKr5wlagHaJ4?pid=Api&H=213&W=160',
    inStock: true,
    description: 'Ajanta Food Colour Red Orange | Safe & Edible | For Sweets & Dishes | 10g Pack',
    stock: 150
},
{
    name: 'Ajanta Food Colour Lemon Yellow',
    weight: '10g',
    price: 20,
    oldPrice: 25,
    discount: '20% OFF',
    category: 'Sauces & Spreads',
    brand: 'Ajanta',
    image: 'https://tse2.mm.bing.net/th/id/OIP.uCpHkg1DhC47QnWYzJHyewHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Ajanta Food Colour Lemon Yellow | Safe & Edible | For Sweets & Dishes | 10g Pack',
    stock: 140
},
{
    name: 'Ajanta Food Colour Green',
    weight: '10g',
    price: 20,
    oldPrice: 25,
    discount: '20% OFF',
    category: 'Sauces & Spreads',
    brand: 'Ajanta',
    image: '	https://tse1.mm.bing.net/th/id/OIP.YFUT7WH13KuuUQIma8090AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Ajanta Food Colour Green | Safe & Edible | For Sweets & Dishes | 10g Pack',
    stock: 140
},



// ========================================
// 🍜 TOPS NOODLES
// ========================================
{
    name: 'Tops Noodles',
    weight: '650g',
    price: 95,
    oldPrice: 115,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: 'https://tse1.mm.bing.net/th/id/OIP.W1NhUVBafW3S1Fq8OPjTIgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Noodles | Hakka Style | Quick & Easy to Cook | 650g Pack',
    stock: 80
},
{
    name: 'Tops Noodles',
    weight: '300g',
    price: 52,
    oldPrice: 62,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: '	https://tse2.mm.bing.net/th/id/OIP.NK636rKi8-oKMH8o4TryxwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Noodles | Hakka Style | Quick & Easy to Cook | 300g Pack',
    stock: 100
},

// ========================================
// 🌶️ TOPS SAUCES - 650g
// ========================================
{
    name: 'Tops Soya Sauce',
    weight: '650g',
    price: 110,
    oldPrice: 130,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: 'https://tse2.mm.bing.net/th/id/OIP.V_WWoa8ocU6WqlxkOlF9KwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Soya Sauce | Authentic Chinese Flavour | Perfect for Stir Fry | 650g Bottle',
    stock: 70
},
{
    name: 'Tops Red Chilli Sauce',
    weight: '650g',
    price: 105,
    oldPrice: 125,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: '	https://tse2.mm.bing.net/th/id/OIP.G1ThX_xSAUV14XgWAHR99gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Red Chilli Sauce | Hot & Spicy | Perfect for Snacks | 650g Bottle',
    stock: 65
},
{
    name: 'Tops Green Chilli Sauce',
    weight: '650g',
    price: 105,
    oldPrice: 125,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: '	https://tse2.mm.bing.net/th/id/OIP.PUU1XsujaRsGD-I00ZMmnQAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Green Chilli Sauce | Tangy & Spicy | Perfect for Momos | 650g Bottle',
    stock: 60
},
{
    name: 'Tops White Vinegar',
    weight: '650g',
    price: 75,
    oldPrice: 90,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: '	https://tse1.mm.bing.net/th/id/OIP.Kp8i2acFBKbZ0TmRbtr8KQAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Vinegar | White Vinegar | For Cooking & Pickles | 650g Bottle',
    stock: 75
},

// ========================================
// 🌶️ TOPS SAUCES - 200g
// ========================================
{
    name: 'Tops Soya Sauce',
    weight: '200g',
    price: 45,
    oldPrice: 55,
    discount: '18% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: 'https://tse2.mm.bing.net/th/id/OIP.0Ynb_E82uA0I43XoWMQD9QAAAA?pid=Api&H=204&W=160',
    inStock: true,
    description: 'Tops Soya Sauce | Authentic Chinese Flavour | Perfect for Stir Fry | 200g Bottle',
    stock: 90
},
{
    name: 'Tops Red Chilli Sauce',
    weight: '200g',
    price: 42,
    oldPrice: 50,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: '	https://tse2.mm.bing.net/th/id/OIP.Td7pOoBHD2BytGse-yK3_gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Red Chilli Sauce | Hot & Spicy | Perfect for Snacks | 200g Bottle',
    stock: 85
},
{
    name: 'Tops Green Chilli Sauce',
    weight: '200g',
    price: 42,
    oldPrice: 50,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: '	https://tse2.mm.bing.net/th/id/OIP.MKZ5eu44851g3RcdzTX8zgHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Green Chilli Sauce | Tangy & Spicy | Perfect for Momos | 200g Bottle',
    stock: 80
},
{
    name: 'Tops White Vinegar',
    weight: '200g',
    price: 30,
    oldPrice: 38,
    discount: '21% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: '	https://tse1.mm.bing.net/th/id/OIP.s28k8Dm__Nn7K05qxb0FNgAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Vinegar | White Vinegar | For Cooking & Pickles | 200g Bottle',
    stock: 95
},

// ========================================
// 🌶️ KEYA SCHEZWAN CHUTNEY
// ========================================
{
    name: 'Keya Schezwan Chilli Garlic Chutney',
    weight: '220g',
    price: 99,
    oldPrice: 120,
    discount: '18% OFF',
    category: 'Sauces & Spreads',
    brand: 'Keya',
    image: '	https://tse2.mm.bing.net/th/id/OIP.GaCUqFNkvypd4o-8vzRCZAAAAA?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Keya Schezwan Chilli Garlic Chutney | Spicy Indo-Chinese | Perfect for Noodles & Momos | 220g Jar',
    stock: 70
},

// ========================================
// 🌸 DABUR KEORA WATER
// ========================================
{
    name: 'Dabur Keora Water',
    weight: '250ml',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Sauces & Spreads',
    brand: 'Dabur',
    image: '	https://tse2.mm.bing.net/th/id/OIP.IRNI__Bl1gKqmFtW5YzsMQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Dabur Keora Water | Natural Flavour | For Sweets & Desserts | 250ml Bottle',
    stock: 85
},
{
    name: 'Chings Hakka Noodles',
    weight: '150g',
    price: 35,
    oldPrice: 42,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Chings',
    image: '	https://tse1.mm.bing.net/th/id/OIP.x-E08o1RQOcy6oYzFRK--AHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Chings Hakka Noodles | Desi Chinese | Quick & Easy to Cook | 150g Pack',
    stock: 120
},
{
    name: 'Keya Hakka Noodles',
    weight: '140g',
    price: 32,
    oldPrice: 40,
    discount: '20% OFF',
    category: 'Sauces & Spreads',
    brand: 'Keya',
    image: '	https://tse2.mm.bing.net/th/id/OIP.z5xxiDYaBMvTPSPKhRw-KwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Keya Hakka Noodles | Non-Fried | Quick & Healthy | 140g Pack',
    stock: 100
},
// ========================================
// 🥜 DR. OETKER PEANUT BUTTER - 450g
// ========================================
{
    name: 'Dr. Oetker Peanut Butter Creamy',
    weight: '450g',
    price: 225,
    oldPrice: 270,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Dr. Oetker',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Ea2TGBYFjr21WxGaMMBw4gHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Dr. Oetker Peanut Butter Creamy | Smooth & Rich | High Protein | 450g Jar',
    stock: 65
},
{
    name: 'Dr. Oetker Peanut Butter Crunchy',
    weight: '450g',
    price: 230,
    oldPrice: 275,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Dr. Oetker',
    image: '	https://tse1.mm.bing.net/th/id/OIP.WM1hMl1cLd5SPq_Q8yr_LwHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Dr. Oetker Peanut Butter Crunchy | With Peanut Bits | High Protein | 450g Jar',
    stock: 60
},

// ========================================
// 🥜 DR. OETKER PEANUT BUTTER - 900g
// ========================================
{
    name: 'Dr. Oetker Peanut Butter Creamy',
    weight: '900g',
    price: 420,
    oldPrice: 499,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Dr. Oetker',
    image: 'https://tse1.mm.bing.net/th/id/OIP.pr7bHSzVUjYhFHA2XXgGJAHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Dr. Oetker Peanut Butter Creamy | Smooth & Rich | High Protein | Family Pack | 900g Jar',
    stock: 45
},
{
    name: 'Dr. Oetker Peanut Butter Crunchy',
    weight: '900g',
    price: 430,
    oldPrice: 510,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Dr. Oetker',
    image: 'https://tse1.mm.bing.net/th/id/OIP.afkLSuJpQ_gI0okdPSvGJAHaCS?pid=Api&H=49&W=160',
    inStock: true,
    description: 'Dr. Oetker Peanut Butter Crunchy | With Peanut Bits | High Protein | Family Pack | 900g Jar',
    stock: 40
},// ========================================
// 🌽 CORNSTARCH
// ========================================
{
    name: 'Weikfield Corn Starch/Flour',
    weight: '100g',
    price: 42,
    oldPrice: 50,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Weikfield',
    image: '	https://tse1.mm.bing.net/th/id/OIP.CnpcLWlZU-QeTF8IFpK6TwAAAA?pid=Api&P=0&w=360&h=360',
    inStock: true,
    description: 'Weikfield Corn Starch | Pure Corn Flour | For Cooking & Baking | 100g Pack',
    stock: 110
},
{
    name: 'Brown & Polson Corn Starch',
    weight: '100g',
    price: 45,
    oldPrice: 55,
    discount: '18% OFF',
    category: 'Sauces & Spreads',
    brand: 'Brown & Polson',
    image: 'https://tse2.mm.bing.net/th/id/OIP.5O1qtt54IEYWChdSwlZeqQHaHa?pid=Api&P=0&w=400&h=400',
    inStock: true,
    description: 'Brown & Polson Corn Starch | Premium Quality | For Cooking & Baking | 100g Pack',
    stock: 100
},

// ========================================
// 🍮 VANILLA CUSTARD
// ========================================
{
    name: 'Tops Vanilla Custard Powder',
    weight: '100g',
    price: 48,
    oldPrice: 58,
    discount: '17% OFF',
    category: 'Sauces & Spreads',
    brand: 'Tops',
    image: '	https://tse1.mm.bing.net/th/id/OIP.oW9x4GKJMJENHOn21BJI5wHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'Tops Vanilla Custard Powder | Creamy & Delicious | Perfect for Desserts | 100g Pack',
    stock: 90
},
{
    name: 'Brown & Polson Vanilla Custard Powder',
    weight: '100g',
    price: 52,
    oldPrice: 62,
    discount: '16% OFF',
    category: 'Sauces & Spreads',
    brand: 'Brown & Polson',
    image: 'https://tse2.mm.bing.net/th/id/OIP.xtK-j9cj9fbxCc5O8RRhtQHaMA?pid=Api&H=259&W=160',
    inStock: true,
    description: 'Brown & Polson Vanilla Custard Powder | Premium Quality | Smooth & Creamy | 100g Pack',
    stock: 85
},

// ========================================
// 🍋 JAIN SHIKANJI MASALA
// ========================================
{
    name: 'Jain Shikanji Masala',
    weight: '100g',
    price: 55,
    oldPrice: 68,
    discount: '19% OFF',
    category: 'Sauces & Spreads',
    brand: 'Jain',
    image: 'https://tse2.mm.bing.net/th/id/OIP.1MxUkY9_zK66DLxJ1cKAqgHaKq?pid=Api&H=230&W=160',
    inStock: true,
    description: 'Jain Shikanji Masala | Instant Lemonade Mix | Refreshing Summer Drink | 100g Pack',
    stock: 95
}



















 
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🍯 Starting Smart Migration for Sauces & Spreads...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Sauces & Spreads" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of saucesAndSpreadsProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Sauces & Spreads" })}`);
    
    console.log('\n📋 Product Categories:');
    console.log('   🍅 Tomato Ketchup: 3 products');
    console.log('   🌶️  Chilli & Soy Sauce: 4 products');
    console.log('   🥪 Mayonnaise: 3 products');
    console.log('   🥜 Peanut Butter: 3 products');
    console.log('   🍓 Jams: 4 products');
    console.log('   🍫 Chocolate Spread: 3 products');
    console.log('   🍝 Pasta Sauce: 2 products');
    console.log('   🍯 Honey & Vinegar: 5 products');
    
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();