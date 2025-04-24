import mongoose, { Schema, Document } from 'mongoose';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { sendWelcomeEmail } from './utils/mail';

dotenv.config();

declare global {
  var mongooseConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

export async function connectToMongoDB(): Promise<typeof mongoose> {
  if (global.mongooseConnection?.conn) {
    return global.mongooseConnection.conn;
  }
  if (!global.mongooseConnection) {
    global.mongooseConnection = { conn: null, promise: null };
  }
  if (!global.mongooseConnection.promise) {
    global.mongooseConnection.promise = (async (): Promise<typeof mongoose> => {
      mongoose.set('debug', process.env.MONGOOSE_DEBUG === 'true');
      while (true) {
        try {
          const instance = await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: 'event',
            serverSelectionTimeoutMS: 60000,
            socketTimeoutMS: 60000,
            connectTimeoutMS: 60000,
            heartbeatFrequencyMS: 300000,
            maxPoolSize: 10,
            minPoolSize: 2,
            retryWrites: true,
            retryReads: true,
            w: 'majority'
          });
          global.mongooseConnection!.conn = instance;
          console.log('Connected to MongoDB database: event');
          return instance;
        } catch (err) {
          console.error('MongoDB connection failed, retrying in 5s', err);
          await new Promise(res => setTimeout(res, 5000));
        }
      }
    })();
  }
  return global.mongooseConnection.promise as Promise<typeof mongoose>;
}

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

export const Registration = mongoose.model<RegistrationDoc>('Registration', registrationSchema, 'registration');

export const registerUser = async (req: Request, res: Response) => {
  try {
    await connectToMongoDB();
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
      signature
    };
    const registration = new Registration(normalizedData);
    let saved: RegistrationDoc | undefined;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        saved = await registration.save();
        break;
      } catch (saveErr) {
        console.error(`Registration save attempt ${attempt} failed:`, saveErr);
        if (attempt === 3) throw saveErr;
        await new Promise(res => setTimeout(res, 1000 * attempt));
      }
    }
    
    if (!saved) {
      throw new Error('Failed to save registration after multiple attempts');
    }
    
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
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: 'Failed to register user' });
  }
};