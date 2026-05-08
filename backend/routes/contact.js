import { Router } from "express";
import { Resend } from "resend";

const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

const DESIGNER_EMAIL = process.env.DESIGNER_EMAIL || "hr59281@gmail.com";
const FROM_EMAIL = "Designer Hamza <onboarding@resend.dev>"; // Use your verified domain later

// ── POST /api/contact — Send contact message + auto-reply ──
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 1. Notify the designer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: DESIGNER_EMAIL,
      reply_to: email,
      subject: `🎨 New Message from ${name} — Portfolio Contact`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; border-radius: 16px; overflow: hidden; border: 1px solid #222;">
          <div style="background: linear-gradient(135deg, #FF6600, #E65100); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Message</h1>
          </div>
          <div style="padding: 30px; color: #e5e5e5;">
            <div style="margin-bottom: 20px; padding: 15px; background: #141414; border-radius: 12px; border-left: 3px solid #FF6600;">
              <p style="margin: 0 0 5px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</p>
              <p style="margin: 0; font-size: 16px; font-weight: 600;">${name}</p>
            </div>
            <div style="margin-bottom: 20px; padding: 15px; background: #141414; border-radius: 12px; border-left: 3px solid #FF6600;">
              <p style="margin: 0 0 5px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</p>
              <p style="margin: 0; font-size: 16px;"><a href="mailto:${email}" style="color: #FF6600; text-decoration: none;">${email}</a></p>
            </div>
            <div style="margin-bottom: 20px; padding: 15px; background: #141414; border-radius: 12px; border-left: 3px solid #FF6600;">
              <p style="margin: 0 0 5px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #222; margin: 20px 0;">
            <p style="color: #666; font-size: 12px; text-align: center;">Sent from Designer Hamza Portfolio — designerhamza.site</p>
          </div>
        </div>
      `,
    });

    // 2. Auto-reply to the visitor
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Thanks for reaching out, ${name}! 🎨`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; border-radius: 16px; overflow: hidden; border: 1px solid #222;">
          <div style="background: linear-gradient(135deg, #FF6600, #E65100); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You, ${name}!</h1>
          </div>
          <div style="padding: 30px; color: #e5e5e5;">
            <p style="font-size: 16px; margin-bottom: 15px;">Hi ${name},</p>
            <p style="font-size: 14px; line-height: 1.7; color: #bbb;">
              Thank you for reaching out! I've received your message and will get back to you as soon as possible, usually within 24 hours.
            </p>
            <p style="font-size: 14px; line-height: 1.7; color: #bbb;">
              I'm always excited to discuss new design projects and creative ideas. In the meantime, feel free to check out my latest work on my portfolio.
            </p>
            <div style="text-align: center; margin: 25px 0;">
              <a href="https://designerhamza.site" style="display: inline-block; padding: 12px 30px; background: #FF6600; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">View My Portfolio</a>
            </div>
            <p style="font-size: 14px; color: #bbb;">
              Best regards,<br>
              <strong style="color: #FF6600;">Designer Hamza</strong><br>
              <span style="color: #888; font-size: 12px;">Creative Graphic Designer</span>
            </p>
            <hr style="border: none; border-top: 1px solid #222; margin: 20px 0;">
            <div style="text-align: center; color: #666; font-size: 12px;">
              <p>📧 hr59281@gmail.com | 📱 +92 303 9219730</p>
            </div>
          </div>
        </div>
      `,
    });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

export default router;
