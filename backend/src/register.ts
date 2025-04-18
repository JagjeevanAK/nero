import mongoose, { Schema, Document } from 'mongoose';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { sendWelcomeEmail } from './utils/mail';

dotenv.config();

mongoose.connect(process.env.MONGO_URI as string, {
  dbName: 'event'
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});

interface RegistrationDoc extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
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
  name: { type: String, required: true },
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
    const registration = new Registration(req.body);
    const saved = await registration.save();
    
    sendWelcomeEmail(
      saved.email,
      saved._id.toString(),
      saved.name,
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