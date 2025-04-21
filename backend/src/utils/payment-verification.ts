import { RequestHandler } from "express"
import crypto from "crypto"

export const verifyPayment: RequestHandler = async (req, res, next) => {
    const razorpay_order_id = req.body.razorpay_order_id || req.body.orderId;
    const razorpay_payment_id = req.body.razorpay_payment_id || req.body.paymentId;
    const razorpay_signature = req.body.razorpay_signature || req.body.signature;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
        res.status(500).json({ success: false, error: 'Payment secret missing' });
        return;
    }

    const digest = crypto.createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');
    if (digest === razorpay_signature) {
        next();
    } else {
        res.status(400).json({ success: false, error: 'Payment verification failed' });
    }
}