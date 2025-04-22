import { Request, Response, NextFunction, RequestHandler } from 'express';
import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';
import { Registration } from '../register';
import mongoose, { ConnectionStates } from 'mongoose';
import archiver from 'archiver';

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

    const { firstName, lastName, email, phone, event: eventName, players } = req.body;
    const isBatch = Array.isArray(players) && players.length > 1;
    const firstNameLower = (firstName as string).toLowerCase();
    const lastNameLower = (lastName as string).toLowerCase();
    const emailLower = (email as string).toLowerCase();
    const eventLower = (eventName as string).toLowerCase();
    const toTitle = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    const fullNameTitle = `${toTitle(firstName)} ${toTitle(lastName)}`;
    const eventMap: Record<string, string> = {
        'Group Discussion (GD)': 'Group Discussion',
        'Technical Marathon': 'Technical Marathon',
        'Dock The Flag': 'Dock The Flag',
        'Box Cricket': 'Box Cricket',
        'BGMI Dominator': 'BGMI Dominator'
    };
    const dbEventName = eventMap[eventName] || eventName;

    // Ensure required common fields
    if (!email || !phone || !eventName || !Array.isArray(players) && (!firstName || !lastName)) {
        const msg = isBatch
          ? 'Email, phone, event, and players are required'  
          : 'First name, last name, email, phone, and event are required';
        res.status(400).json({ success: false, error: msg });
        return;
    }

    try {
        await ensureDbConnection();

        const baseQuery = { email: emailLower, phone: phone.toLowerCase(), event_name: dbEventName.toLowerCase() };
        const existing = await Registration.findOne(baseQuery);
        if (!existing) {
            res.status(404).json({ success: false, error: 'User not registered for this event' });
            return;
        }

        // Verify registration exists
        // For batch team events, ensure all submitted players match the registered team
        if (isBatch) {
            const lowerPlayers = (players as string[]).map((p) => p.toLowerCase().trim());
            const missing = lowerPlayers.filter((p) => !existing.players.includes(p));
            if (missing.length > 0) {
                res.status(404).json({ success: false, error: `Player(s) not found: ${missing.join(', ')}` });
                return;
            }
        } else {
            // Single event: verify first and last name match
            if (existing.firstName !== firstNameLower || existing.lastName !== lastNameLower) {
                res.status(404).json({ success: false, error: 'Name does not match registered record' });
                return;
            }
        }
    } catch (err) {
        console.error('Error checking registration:', err);
        res.status(500).json({ success: false, error: 'Error checking registration' });
        return;
    }

    // Batch mode: generate all certificates and zip
    if (isBatch) {
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="${eventName.replace(/\s+/g,'_')}_certificates.zip"`);
        const archive = archiver('zip', { zlib: { level: 9 } });
        archive.on('error', (err) => res.status(500).send({ error: err.message }));
        archive.pipe(res);
        for (const pl of players) {
            const parts = (pl as string).trim().split(' ');
            const f = parts.shift() || '';
            const l = parts.join(' ') || '';
            const canvas = createCanvas(800, 600); // use template size
            const image = await loadImage(path.join(__dirname, '..', '..', 'templates', 'certificate_template.png'));
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, image.width, image.height);
            ctx.font = 'bold 42px "Open Sans"';
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.fillText(`${toTitle(f)} ${toTitle(l)}`, image.width / 2, image.height / 2 + 10);
            const buffer = canvas.toBuffer('image/png');
            const filename = `${eventName.replace(/\s+/g,'_')}_${f}_${l}_certificate.png`;
            archive.append(buffer, { name: filename });
        }
        await archive.finalize();
        return;
    }

    // Single certificate fallback
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
