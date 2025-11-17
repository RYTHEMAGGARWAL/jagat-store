require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI ||  "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0")
  .then(async () => {
    console.log('✅ Connected');
    
    const db = mongoose.connection.db;
    
    // Fix paymentInfo
    const result1 = await db.collection('orders').updateMany(
      {
        $or: [
          { "paymentInfo.method": { $exists: false } },
          { "paymentInfo.method": null }
        ]
      },
      {
        $set: {
          "paymentInfo.method": "COD"
        }
      }
    );
    
    console.log('✅ Fixed paymentInfo:', result1.modifiedCount, 'orders');
    
    // Fix statusHistory
    const result2 = await db.collection('orders').updateMany(
      { statusHistory: { $exists: false } },
      {
        $set: {
          statusHistory: []
        }
      }
    );
    
    console.log('✅ Fixed statusHistory:', result2.modifiedCount, 'orders');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });