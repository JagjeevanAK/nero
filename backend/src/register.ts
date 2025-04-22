import mongoose, { Schema, Document } from 'mongoose';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { sendWelcomeEmail } from './utils/mail';

dotenv.config();

async function connectToMongoDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB connection already established');
      return;
    }
    
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: 'event',
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2
    });
    
    console.log('Connected to MongoDB database: event');
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Don't exit the process in serverless environment
    if (process.env.VERCEL !== '1') {
      process.exit(1);
    }
  }
}

// Export the connection function
export { connectToMongoDB };

// Initialize database connection
connectToMongoDB();

interface RegistrationDoc extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  college: string;
  yearOfStudy: string;
  event_name: string;
  players: string[];
  reference: string;
  paymentId: string;
  orderId: string;
  signature: string;
  createdAt: Date;
}

const registrationSchema = new Schema<RegistrationDoc>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  yearOfStudy: { type: String, required: true },
  event_name: { type: String, required: true },
  players: { type: [String], default: [] },
  reference: { type: String, default: '' },
  paymentId: { type: String, required: true },
  orderId: { type: String, required: true },
  signature: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model<RegistrationDoc>('Registration', registrationSchema, 'registration');

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, college, yearOfStudy, event_name, players, reference, paymentId, orderId, signature } = req.body;
    const normalizedData = {
      firstName: firstName.trim().toLowerCase(),
      lastName: lastName.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      phone: phone.trim().toLowerCase(),
      college: college.trim().toLowerCase(),
      yearOfStudy: yearOfStudy.trim().toLowerCase(),
      event_name: event_name.trim().toLowerCase(),
      players: (players || []).map((n: string) => n.trim().toLowerCase()),
      reference: (reference || '').trim().toLowerCase(),
      paymentId,
      orderId,
      signature,
    };
    const registration = new Registration(normalizedData);
    const saved = await registration.save();
    
    const fullName = `${saved.firstName} ${saved.lastName}`;
    await sendWelcomeEmail(
      saved.email,
      saved._id.toString(),
      fullName,
      saved.yearOfStudy,
      saved.phone,
      saved.event_name,
      saved.college
    );

    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to register user' });
  }
};

export { Registration };