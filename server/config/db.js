const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const seedDatabase = require('../seed/seedHelper');

let mongoServer;

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/foodsource';

  try {
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 2500
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`⚠️ Local MongoDB service not detected on port 27017 (${error.message}).`);
    console.log(`🚀 Launching automatic In-Memory MongoDB Server for instant demo mode...`);

    try {
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`✅ In-Memory MongoDB Server Connected successfully at: ${mongoUri}`);

      // Seed initial sample data automatically for in-memory mode
      await seedDatabase();
      console.log(`🌱 Demo dataset & accounts seeded automatically!`);
    } catch (memError) {
      console.error(`❌ Failed to start In-Memory MongoDB: ${memError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
