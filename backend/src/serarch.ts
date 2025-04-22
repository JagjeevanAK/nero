import { Request, Response, NextFunction } from 'express';
import { Registration } from './register';

export const checkDuplicate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, event_name, phone } = req.body;
  const emailLower = (email as string).trim().toLowerCase();
  const eventLower = (event_name as string).trim().toLowerCase();
  const phoneLower = (phone as string).trim().toLowerCase();
  try {
    const existing = await Registration.findOne({
      event_name: eventLower,
      $or: [
        { email: emailLower },
        { phone: phoneLower }
      ]
    });
    if (existing) {
      res.status(409).json({ success: false, error: 'User with this email or phone already registered for this event' });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to check duplicate registration' });
    return;
  }
};