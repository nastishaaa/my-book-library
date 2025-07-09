import mongoose from 'mongoose';

export const connection = async () => {
    const uri = process.env.MONGOOSE_URL;

    if (!uri) {
        throw new Error('❌ MONGOOSE_URL is not defined. Add it to .env.local');
    }

    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
    }
};
