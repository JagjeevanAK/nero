import { Request, Response, NextFunction, RequestHandler } from 'express';
import { createCanvas, loadImage } from 'canvas';
import path from 'path';
import { Registration } from '../register';

export const generateCertificate: RequestHandler = async (req, res, next) => {
    const enabled = process.env.CERTIFICATE_DOWNLOAD_ENABLED === 'ON';
    if (req.method === 'PUT') {
        res.status(200).json({ success: enabled });
        return;
    }
    if (req.method !== 'POST') {
        res.status(405).json({ success: false, error: 'Method not allowed' });
        return;
    }
    if (!enabled) {
        res.status(403).json({ success: false, error: 'Certificate downloads are disabled' });
        return;
    }

    const { name, email, phone, event: eventName } = req.body;

    if (!name || !email || !phone || !eventName) {
        res.status(400).json({ success: false, error: 'Name, email, phone, and event are required' });
        return;
    }

    // Verify user registration exists
    try {
        const existing = await Registration.findOne({ name, email, phone, event_name: eventName });
        if (!existing) {
            res.status(404).json({ success: false, error: 'User not registered for this event' });
            return;
        }
    } catch (err) {
        console.error('Error checking registration:', err);
        res.status(500).json({ success: false, error: 'Error checking registration' });
        return;
    }

    try {
        const templatePath = path.join(__dirname, '..', '..', 'templates', 'certificate_template.png');
        const image = await loadImage(templatePath);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');

        // Draw the template image
        ctx.drawImage(image, 0, 0, image.width, image.height);

        // Configure the text
        ctx.font = 'bold 42px Arial';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';

        // Draw the name
        ctx.fillText(name, image.width / 2, image.height / 2 + 10);

        // Set headers and stream back the PNG
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename="${name}_certificate.png"`);

        canvas.createPNGStream().pipe(res);
    } catch (err) {
        console.error('Error generating certificate:', err);
        res.status(500).send('Error generating certificate');
    }
};
