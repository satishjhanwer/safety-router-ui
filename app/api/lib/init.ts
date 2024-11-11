import { connectDB, disconnectDB } from "./db";
import mongoose from "mongoose";
import { seedDatabase } from "./seed";

export async function initializeDatabase() {
  try {
    console.log("🚀 Starting database initialization...");

    // Ensure clean connection state
    if (mongoose.connection.readyState !== 0) {
      console.log("🔄 Closing existing connections...");
      await disconnectDB();
    }

    // Connect to MongoDB
    const conn = await connectDB();
    if (!conn) throw new Error("Failed to establish database connection");

    const db = mongoose.connection.db;
    console.log(`📦 Connected to database: ${db?.databaseName}`);

    // Create collections if they don't exist
    const requiredCollections = ["users", "prompts"];
    for (const collectionName of requiredCollections) {
      try {
        const exists = await db?.listCollections({ name: collectionName }).hasNext();
        if (!exists) {
          await db?.createCollection(collectionName);
          console.log(`📚 Created collection: ${collectionName}`);
        } else {
          console.log(`📚 Collection exists: ${collectionName}`);
        }
      } catch (error) {
        console.error(`❌ Error creating collection ${collectionName}:`, error);
        throw error;
      }
    }

    // Run database seeding
    await seedDatabase();

    // Verify setup
    const collections = (await db?.collections()) || [];
    console.log("📊 Database status:");
    for (const collection of collections) {
      const count = await collection.countDocuments();
      console.log(`   - ${collection.collectionName}: ${count} documents`);
    }

    console.log("✨ Database initialization completed successfully");
    return true;
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    throw error;
  }
}
