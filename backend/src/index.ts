import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { registerUser } from './register';
import { checkDuplicate } from './serarch';
import { generateCertificate } from './utils/certificate';
import { orderRazorpay } from './utils/razorpay';
import { verifyPayment } from './utils/payment-verification';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/register', checkDuplicate, verifyPayment, registerUser);
app.post('/api/download-certificate', generateCertificate);
app.put('/api/download-certificate', generateCertificate);
app.post('/api/order', orderRazorpay);
app.post('/api/payment-verification', verifyPayment);

app.listen(PORT, () => {   
  console.log(`Server is running on port ${PORT}`);
}
);