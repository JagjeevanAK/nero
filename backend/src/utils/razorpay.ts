import { RequestHandler } from 'express';
import Razorpay from 'razorpay';

export const orderRazorpay: RequestHandler = async (req, res, next) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID as string,
        key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });
    try{
        const options = req.body;

        const order = await razorpay.orders.create(options);
        if (!order) {
            res.status(500).json({ success: false, error: 'Failed to create order' });
            return;
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ success: false, error: 'Failed to create order' });
    }
}