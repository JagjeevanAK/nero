import { Request, Response, NextFunction } from 'express';
import { Registration } from './register';

export const checkDuplicate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, event_name } = req.body;
  const emailLower = (email as string).toLowerCase();
  const eventLower = (event_name as string).toLowerCase();
  try {
    const existing = await Registration.findOne({ email: emailLower, event_name: eventLower });
    if (existing) {
      res.status(409).json({ success: false, error: 'User already registered for this event' });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to check duplicate registration' });
    return;
  }
};