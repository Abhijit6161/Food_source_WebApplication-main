const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn(`⚠️ Warning: MONGO_URI environment variable is not defined in Render Environment settings.`);
    console.warn(`👉 Please add MONGO_URI in Render Dashboard -> Environment -> Environment Variables.`);
    return;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000
    });
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error(`👉 Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0 in Network Access).`);
  }
};

module.exports = connectDB;