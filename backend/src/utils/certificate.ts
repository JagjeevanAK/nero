import { Request, Response, NextFunction, RequestHandler } from 'express';
import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';
import { Registration } from '../register';
import mongoose, { ConnectionStates } from 'mongoose';

registerFont(path.join(__dirname, '..', '..', 'templates', 'OpenSans-Regular.ttf'), { family: 'Open Sans' });

/**
 * Ensures that a MongoDB connection is active before performing database operations
 * @returns Promise that resolves when connection is ready
 * @throws Error if connection cannot be established
 */
async function ensureDbConnection(): Promise<void> {
    if (mongoose.connection.readyState === 1) { 
        return;
    }

    console.log('MongoDB connection not ready, attempting to connect...');
    
    const { connectToMongoDB } = require('../register');
    
    try {
        await connectToMongoDB();
        // @ts-ignore
        if (mongoose.connection.readyState !== 1) {
            throw new Error('MongoDB connection failed after connection attempt');
        }
        
        console.log('MongoDB connection established successfully');
    } catch (error: unknown) {
        console.error('Failed to establish MongoDB connection:', error);
        throw new Error(`Database connection failed: ${error instanceof Error ? error.message : String(error)}`);
    }
}

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

    const { firstName, lastName, email, phone, event: eventName } = req.body;
    // Normalize for DB lookup
    const firstNameLower = (firstName as string).toLowerCase();
    const lastNameLower = (lastName as string).toLowerCase();
    const emailLower = (email as string).toLowerCase();
    const eventLower = (eventName as string).toLowerCase();
    // Title-case for certificate display
    const toTitle = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    const fullNameTitle = `${toTitle(firstName)} ${toTitle(lastName)}`;

    // Map display titles to DB event_name values
    const eventMap: Record<string, string> = {
        'Group Discussion (GD)': 'Group Discussion',
        'Technical Marathon': 'Technical Marathon',
        'Dock The Flag': 'Dock The Flag',
        'Box Cricket': 'Box Cricket'
    };
    const dbEventName = eventMap[eventName] || eventName;

    if (!firstName || !lastName || !email || !phone || !eventName) {
        res.status(400).json({ success: false, error: 'First name, last name, email, phone, and event are required' });
        return;
    }

    try {
        // Ensure DB connection is active before querying
        await ensureDbConnection();

        // For Box Cricket, verify registration by email/phone/event only; skip name match
        const baseQuery = { email: emailLower, phone: phone.toLowerCase(), event_name: dbEventName.toLowerCase() };
        // if not Box Cricket, include name in lookup
        const query = eventLower === 'box cricket'
          ? baseQuery
          : { ...baseQuery, firstName: firstNameLower, lastName: lastNameLower };
        const existing = await Registration.findOne(query);
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

        ctx.drawImage(image, 0, 0, image.width, image.height);

        ctx.font = 'bold 42px "Open Sans"';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';

        ctx.fillText(fullNameTitle, image.width / 2, image.height / 2 + 10);

        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename="${fullNameTitle.replace(/\s+/g,'_')}_certificate.png"`);

        canvas.createPNGStream().pipe(res);
    } catch (err) {
        console.error('Error generating certificate:', err);
        res.status(500).send('Error generating certificate');
    }
};
