import transporter from "./mailer";
import dotenv from 'dotenv';
dotenv.config();

export async function sendWelcomeEmail(
  to: string,
  id: string,
  name: string,
  yearOfStudy: string,
  phone: string,
  eventName: string,
  college: string,
): Promise<void> {
  // Helper to capitalize first letter of each word
  const toTitleCase = (s: string) => s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const formattedName = toTitleCase(name);
  const formattedEvent = toTitleCase(eventName);
  const formattedCollege = toTitleCase(college);

  const maxRetries = 3;
  let attempt = 0;
  const mailOptions = {
    from: `"Neuroverse 2K25" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Welcome to Neuroverse 2K25 🎉',
    html: `<html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta content="width=device-width, initial-scale=1.0" name="viewport">
                    <title>
                    Welcome to Neuroverse 2025!
                    </title>
                    <style>
                    body { margin: 0; padding: 40px 20px; background: linear-gradient(135deg, indigo, blue, purple, gold); background-size: 400% 400%; animation: gradientBG 20s ease infinite; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; } @keyframes gradientBG { 0% {background-position: 0% 50%;} 50% {background-position: 100% 50%;} 100% {background-position: 0% 50%;} } .container { max-width: 640px; margin: auto; background: #ffffffdd; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); text-align: center; } .logo-wrapper { display: flex; justify-content: center; margin-bottom: 20px; } .logo { width: 100px; height: 100px; border-radius: 50%; background: white; padding: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); } .banner { background: linear-gradient(90deg, #4b0082, #1e90ff, #8e44ad, #f1c40f); color: white; padding: 16px; border-radius: 12px; font-size: 24px; font-weight: bold; letter-spacing: 0.5px; margin-bottom: 20px; box-shadow: inset 0 0 5px rgba(255,255,255,0.3); } .content { text-align: left; font-size: 16px; color: #2f3640; line-height: 1.6; } .highlight-card { margin: 24px 0; background: #f5f7fa; border-radius: 12px; padding: 20px; border-left: 5px solid #1e90ff; box-shadow: 0 2px 6px rgba(0,0,0,0.05); } .btn { display: inline-block; background-color: #1e90ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin-top: 15px; box-shadow: 0 2px 8px rgba(30,144,255,0.3); } .footer { text-align: center; margin-top: 40px; font-size: 13px; color: #555; } .footer span { display: block; margin-top: 8px; font-style: italic; }
                    </style>
                    <!--[if mso]><xml>
                    <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
                    <w:DontUseAdvancedTypographyReadingMail/>
                    </w:WordDocument>
                    </xml><![endif]-->
                </head>
                <body>
                    <div class="container">
                    <div class="logo-wrapper" style="display: flex; justify-content: center;">
                        <img alt="Event Logo" src="https://nero-henna.vercel.app/logo.png" class="logo">
                    </div>
                    <div esd-text="true" class="banner esd-text">
                        Neuroverse 2025: Welcome Onboard! 🎉
                    </div>
                    <div esd-text="true" class="content esd-text" style="font-family: monospace">
                        Hello <strong>${formattedName}</strong>,
                        <br><br>
                        <span>
                            You’ve successfully registered for
                            <strong>${formattedEvent}</strong>
                            as part of
                            <strong>Neuroverse 2K25</strong>
                            ! We’re super excited to have you onboard.
                        </span>
                        🚀
                        <br>
                        <br>
                        Here's your registration summary:
                        <div class="highlight-card">
                        <strong>
                            Registration ID:
                        </strong>
                        ${id}
                        <br>
                        <strong>
                            College:
                        </strong>
                        ${formattedCollege}
                        <br>
                        <strong>
                            Year of Study:
                        </strong>
                        ${yearOfStudy}
                        <br>
                        <strong>
                            Phone Number:
                        </strong>
                        ${phone}
                        <br>
                        </div>
                        🔔 Stay tuned for further updates, schedules, and announcements via email and our official page.
                        <div style="text-align: center; margin-top: 20px ">
                        <a href="https://nero-henna.vercel.app/" class="btn" style="color: white;">
                            View Event Details
                        </a>
                        </div>
                    </div>
                    <div esd-text="true" class="footer esd-text">
                        Have questions? Just reply to this email. 💬
                        <br>
                        <span>
                        We’ll see you at the event – Team Neuroverse 🧠✨
                        </span>
                    </div>
                    </div>
                </body>
                </html>`
  };
  while (attempt < maxRetries) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Welcome email sent (attempt ${attempt+1}/${maxRetries}): messageId=${info.messageId}`);
      return;
    } catch (err) {
      attempt++;
      console.error(`Error sending welcome email (attempt ${attempt}/${maxRetries}):`, err);
      if (attempt < maxRetries) {
        // exponential backoff
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(res => setTimeout(res, delay));
      } else {
        console.error('All attempts to send welcome email failed');
      }
    }
  }
}

export default transporter;
