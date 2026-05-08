import { Router } from "express";
import axios from "axios";

const router = Router();

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_API_KEY = process.env.BREVO_API_KEY;

// The email that RECEIVES contact messages (yours — the one you verified on Brevo)
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "shabbirsohail33@gmail.com";
// The "from" sender name shown in the email
const SENDER_NAME  = "Designer Hamza Portfolio";
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || "shabbirsohail33@gmail.com";

const sendEmail = async ({ to, subject, html, replyTo }) => {
  await axios.post(
    BREVO_API_URL,
    {
      sender:  { name: SENDER_NAME, email: SENDER_EMAIL },
      to:      [{ email: to }],
      replyTo: replyTo ? { email: replyTo } : undefined,
      subject,
      htmlContent: html,
    },
    {
      headers: {
        "api-key":     BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
};

// ── POST /api/contact ──
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 1. Notify you (the site owner) about the new message
    await sendEmail({
      to:      NOTIFY_EMAIL,
      replyTo: email,
      subject: `🎨 New Message from ${name} — Portfolio Contact`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A0A0A;border-radius:16px;overflow:hidden;border:1px solid #222;">
          <div style="background:linear-gradient(135deg,#FF6600,#E65100);padding:30px;text-align:center;">
            <h1 style="color:white;margin:0;font-size:24px;">New Contact Message</h1>
          </div>
          <div style="padding:30px;color:#e5e5e5;">
            <div style="margin-bottom:20px;padding:15px;background:#141414;border-radius:12px;border-left:3px solid #FF6600;">
              <p style="margin:0 0 5px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">From</p>
              <p style="margin:0;font-size:16px;font-weight:600;">${name}</p>
            </div>
            <div style="margin-bottom:20px;padding:15px;background:#141414;border-radius:12px;border-left:3px solid #FF6600;">
              <p style="margin:0 0 5px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</p>
              <p style="margin:0;font-size:16px;"><a href="mailto:${email}" style="color:#FF6600;text-decoration:none;">${email}</a></p>
            </div>
            <div style="margin-bottom:20px;padding:15px;background:#141414;border-radius:12px;border-left:3px solid #FF6600;">
              <p style="margin:0 0 5px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</p>
              <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap;">${message}</p>
            </div>
            <hr style="border:none;border-top:1px solid #222;margin:20px 0;">
            <p style="color:#666;font-size:12px;text-align:center;">Sent via Designer Hamza Portfolio — designerhamza.site</p>
          </div>
        </div>
      `,
    });

    // 2. Send auto-reply to the visitor
    await sendEmail({
      to:      email,
      subject: `Thanks for reaching out, ${name}! 🎨`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A0A0A;border-radius:16px;overflow:hidden;border:1px solid #222;">
          <div style="background:linear-gradient(135deg,#FF6600,#E65100);padding:30px;text-align:center;">
            <h1 style="color:white;margin:0;font-size:24px;">Thank You, ${name}!</h1>
          </div>
          <div style="padding:30px;color:#e5e5e5;">
            <p style="font-size:16px;margin-bottom:15px;">Hi ${name},</p>
            <p style="font-size:14px;line-height:1.7;color:#bbb;">
              Thank you for reaching out! Your message has been received and Designer Hamza will get back to you as soon as possible, usually within 24 hours.
            </p>
            <p style="font-size:14px;line-height:1.7;color:#bbb;">
              In the meantime, feel free to explore the portfolio and see the latest creative work.
            </p>
            <div style="text-align:center;margin:25px 0;">
              <a href="https://designerhamza.site" style="display:inline-block;padding:12px 30px;background:#FF6600;color:white;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">View Portfolio</a>
            </div>
            <p style="font-size:14px;color:#bbb;">
              Best regards,<br>
              <strong style="color:#FF6600;">Designer Hamza</strong><br>
              <span style="color:#888;font-size:12px;">Creative Graphic Designer</span>
            </p>
            <hr style="border:none;border-top:1px solid #222;margin:20px 0;">
            <p style="text-align:center;color:#666;font-size:12px;">📧 hr59281@gmail.com | 📱 +92 303 9219730</p>
          </div>
        </div>
      `,
    });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Brevo email error:", err?.response?.data || err.message);
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

export default router;
