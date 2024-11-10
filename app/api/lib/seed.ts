import { connectDB } from './db';
import { User } from '../models/user';
import bcrypt from 'bcryptjs';

const DEFAULT_USER = {
    username: 'admin@safety.ai',
    password: 'admin123',
};

export async function seedDatabase() {
    try {
        const conn = await connectDB();
        console.log('🌱 Starting database seeding...');
        console.log('📦 Connected to database:', conn?.connection?.db?.databaseName);

        // Force the creation of the users collection
        if (!(await conn?.connection.db?.listCollections({ name: 'users' }).hasNext())) {
            await conn?.connection.db?.createCollection('users');
            console.log('📚 Created users collection');
        }

        // Ensure indexes are created
        await User.createIndexes();
        console.log('📑 User indexes created');

        // Check if admin user exists
        const existingUser = await User.findOne({ username: DEFAULT_USER.username });
        
        if (!existingUser) {
            // Hash password
            const hashedPassword = await bcrypt.hash(DEFAULT_USER.password, 10);
            
            // Create admin user
            const newUser = await User.create({
                username: DEFAULT_USER.username,
                password: hashedPassword,
                createdAt: new Date(),
                promptHistory: [],
            });
            
            console.log('✅ Admin user created successfully');
            console.log('👤 Username:', DEFAULT_USER.username);
            console.log('🔑 Password:', DEFAULT_USER.password);
            console.log('📝 User ID:', newUser._id);

            // Verify the user was created
            const verifyUser = await User.findById(newUser._id);
            if (verifyUser) {
                console.log('✅ User creation verified');
            }
        } else {
            console.log('ℹ️ Admin user already exists');
            console.log('👤 Username:', existingUser.username);
            console.log('📝 User ID:', existingUser._id);
        }

        // Log all collections and documents
        const collections = await conn?.connection?.db?.collections() ?? [];
        for (const collection of collections) {
            const count = await collection.countDocuments();
            console.log(`📚 Collection ${collection.collectionName}: ${count} documents`);
        }

        console.log('✨ Database seeding completed');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
} 