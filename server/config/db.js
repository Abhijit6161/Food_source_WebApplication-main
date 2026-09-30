const mongoose = require('mongoose');

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/foodsource';

  try {
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (process.env.MONGO_URI) {
      console.error(`❌ MongoDB Connection Error: ${error.message}`);
      process.exit(1);
    }

    console.log(`⚠️ Local MongoDB service not detected on 27017 (${error.message}).`);
    console.log(`🚀 Launching In-Memory MongoDB Server for demo mode...`);

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const seedDatabase = require('../seed/seedHelper');

      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`✅ In-Memory MongoDB Connected: ${mongoUri}`);

      await seedDatabase();
      console.log(`🌱 Demo dataset & accounts seeded automatically!`);
    } catch (memError) {
      console.error(`❌ Failed to start In-Memory MongoDB: ${memError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;