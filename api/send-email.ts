import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { name, email } = req.body;

  try {
    const response = await resend.emails.send({
      from: 'Neuroverse 2025 <neuroverse2025@gmail.com>',
      to: [email],
      subject: 'Welcome to Neuroverse 2025 🎉',
      html: `
        <h2>Hello ${name},</h2>
        <p>You're successfully registered for <strong>Neuroverse 2025</strong>!</p>
        <p>See you soon 🚀</p>
        <br/>
        <p>– Team Neuroverse</p>
      `,
    });

    return res.status(200).json({ success: true, data: response });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
