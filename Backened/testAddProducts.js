// Backend/testAddProducts.js - Test adding products via API

const axios = require('axios');

const API_URL = 'http://localhost:5000/api/products';

const testProducts = [
  // Jagat Store
  {
    name: 'Fresh Vegetables Mix',
    category: 'Jagat Store',
    brand: 'Jagat Fresh',
    weight: '1 kg',
    price: 80,
    oldPrice: 100,
    discount: '20% OFF',
    stock: 50,
    description: 'Fresh seasonal vegetables'
  },
  {
    name: 'Organic Fruits',
    category: 'Jagat Store',
    brand: 'Jagat Fresh',
    weight: '2 kg',
    price: 250,
    stock: 30
  },
  
  // Pharmacy
  {
    name: 'Paracetamol 500mg',
    category: 'Pharmacy',
    brand: 'Crocin',
    weight: '10 tablets',
    price: 15,
    oldPrice: 20,
    discount: '25% OFF',
    stock: 100,
    description: 'Pain relief'
  },
  {
    name: 'Hand Sanitizer',
    category: 'Pharmacy',
    brand: 'Dettol',
    weight: '200ml',
    price: 80,
    stock: 75
  }
];

async function testAddProducts() {
  console.log('🧪 Testing product creation...\n');

  for (const product of testProducts) {
    try {
      console.log(`Creating: ${product.name} in ${product.category}...`);
      
      const response = await axios.post(API_URL, product);
      
      if (response.data.success) {
        console.log(`✅ Created: ${response.data.product.name}`);
        console.log(`   ID: ${response.data.product._id}`);
        console.log(`   Category: ${response.data.product.category}`);
        console.log(`   Price: ₹${response.data.product.price}\n`);
      }
    } catch (error) {
      console.log(`❌ Failed: ${product.name}`);
      console.log(`   Error: ${error.response?.data?.message || error.message}\n`);
    }
  }

  // Test fetching categories
  try {
    console.log('\n📂 Fetching available categories...');
    const response = await axios.get(`${API_URL}/categories/list`);
    
    if (response.data.success) {
      console.log('✅ Categories:', response.data.categories.map(c => c.name || c).join(', '));
    }
  } catch (error) {
    console.log('❌ Failed to fetch categories');
  }

  console.log('\n✅ Test complete!');
}

testAddProducts();