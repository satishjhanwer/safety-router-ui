import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

declare global {
    // eslint-disable-next-line no-var
    var mongoose: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    } | null;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    try {
        if (cached?.conn) {
            console.log('📡 Using cached connection');
            return cached.conn;
        }

        if (!cached?.promise) {
            console.log('🔄 Creating new connection to MongoDB...');
            console.log('📦 URI:', MONGODB_URI);

            const opts = {
                bufferCommands: false,
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            };

            cached!.promise = mongoose.connect(MONGODB_URI, opts)
                .then(() => {
                    console.log('✅ MongoDB connected successfully');
                    return cached;
                });

            mongoose.connection.on('connected', () => {
                console.log('🟢 MongoDB connected');
            });

            mongoose.connection.on('error', (err) => {
                console.error('🔴 MongoDB connection error:', err);
                cached!.conn = null;
                cached!.promise = null;
            });

            mongoose.connection.on('disconnected', () => {
                console.warn('🟡 MongoDB disconnected');
                cached!.conn = null;
                cached!.promise = null;
            });
        }

        cached!.conn = await cached!.promise;
        return cached!.conn;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        cached!.conn = null;
        cached!.promise = null;
        throw error;
    }
}

export async function disconnectDB() {
    try {
        await mongoose.disconnect();
        cached!.conn = null;
        cached!.promise = null;
        console.log('🔌 Disconnected from MongoDB');
    } catch (error) {
        console.error('❌ Error disconnecting from MongoDB:', error);
        throw error;
    }
}

export async function checkConnection() {
    try {
        if (!mongoose.connection || mongoose.connection.readyState !== 1) {
            await connectDB();
        }
        await mongoose.connection.db?.admin().ping();
        return {
            status: 'connected',
            database: mongoose.connection.db?.databaseName,
            collections: await mongoose.connection.db?.collections()
        };
    } catch (error) {
        return {
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}