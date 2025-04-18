import { Request, Response, NextFunction } from 'express';
import { Registration } from './register';

export const checkDuplicate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, event_name } = req.body;
  try {
    const existing = await Registration.findOne({ email, event_name });
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