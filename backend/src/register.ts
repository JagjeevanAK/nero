import mongoose, { Schema, Document } from 'mongoose';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { sendWelcomeEmail } from './utils/mail';

dotenv.config();

// Improved MongoDB connection handling to prevent "Topology is closed" errors
async function connectToMongoDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      // If already connected, don't reconnect
      console.log('MongoDB connection already established');
      return;
    }
    
    // Connect to MongoDB with the event database
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: 'event',
      // Add Mongoose 7+ connection options for serverless environments
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2
    });
    
    console.log('Connected to MongoDB database: event');
    
    // Handle connection errors
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    // Handle disconnection (important for serverless)
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
  teamMembers: string[];
  boxCricketPlayers: string[];
  reference: string;
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
  teamMembers: { type: [String], default: [] },
  boxCricketPlayers: { type: [String], default: [] },
  reference: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model<RegistrationDoc>('Registration', registrationSchema, 'registration');

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, college, yearOfStudy, event_name, teamMembers, boxCricketPlayers, reference } = req.body;
    const normalizedData = {
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: email.toLowerCase(),
      phone: phone.toLowerCase(),
      college: college.toLowerCase(),
      yearOfStudy: yearOfStudy.toLowerCase(),
      event_name: event_name.toLowerCase(),
      teamMembers: (teamMembers || []).map((n: string) => n.toLowerCase()),
      boxCricketPlayers: (boxCricketPlayers || []).map((n: string) => n.toLowerCase()),
      reference: (reference || '').toLowerCase(),
    };
    const registration = new Registration(normalizedData);
    const saved = await registration.save();
    
    // send welcome email with full name and await it so function doesn't terminate early
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