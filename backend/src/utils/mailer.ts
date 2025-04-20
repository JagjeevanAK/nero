import nodemailer from "nodemailer";
import { Transporter } from "nodemailer";
import path from 'path';
import dotenv from 'dotenv';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
if (!emailUser || !emailPass) {
  throw new Error('EMAIL_USER and EMAIL_PASS must be set in project root .env file');
}

let transporter: Transporter;

// Use explicit SMTP settings instead of deprecated 'service'
transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  pool: true,              // reuse SMTP connections
  maxConnections: 5,       // limit concurrent
  maxMessages: 100,        // limit messages per connection
  rateLimit: true,         // solder to Google’s send limits
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  tls: { rejectUnauthorized: false },
} as SMTPTransport.Options);

transporter.verify((error, success) => {
    if (error) {
        console.log("Email transporter error:", error);
    } else {
        console.log("Email transporter is ready");
    }
});

export default transporter;
