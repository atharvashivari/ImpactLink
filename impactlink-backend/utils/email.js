const nodemailer = require("nodemailer");

/**
 * Create a reusable transporter.
 * Priority: Real SMTP → Ethereal test account → Console fallback
 */
let transporter = null;

async function getTransporter() {
  if (transporter) return transporter;

  // Check if real SMTP credentials are configured
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log("📧 Using configured SMTP server");
    return transporter;
  }

  // Try Ethereal test account
  try {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log("📧 Using Ethereal test email:", testAccount.user);
    return transporter;
  } catch (err) {
    console.warn("⚠️ Ethereal unavailable, using console-only mode:", err.message);
    return null; // Will use console fallback
  }
}

/**
 * Send a password reset email
 */
async function sendPasswordResetEmail(toEmail, resetUrl, userName) {
  const mailer = await getTransporter();

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; background: #2563eb; border-radius: 50%; width: 48px; height: 48px; line-height: 48px; color: white; font-size: 24px; font-weight: bold;">I</div>
        <h2 style="margin: 10px 0 0; color: #1a1a1a;">ImpactLink</h2>
      </div>
      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 32px;">
        <h3 style="color: #1a1a1a; margin-top: 0;">Hi ${userName || "there"},</h3>
        <p style="color: #6b7280; line-height: 1.6;">
          We received a request to reset the password for your ImpactLink account. 
          Click the button below to set a new password.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetUrl}" 
             style="display: inline-block; background: #2563eb; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
            Reset Password
          </a>
        </div>
        <p style="color: #9ca3af; font-size: 14px; line-height: 1.6;">
          This link will expire in <strong>1 hour</strong>. If you didn't request a password reset, 
          you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="color: #9ca3af; font-size: 12px;">
          If the button doesn't work, copy and paste this link:<br/>
          <a href="${resetUrl}" style="color: #2563eb; word-break: break-all;">${resetUrl}</a>
        </p>
      </div>
    </div>
  `;

  // If no transporter (Ethereal failed, no SMTP), just log to console
  if (!mailer) {
    console.log("\n" + "=".repeat(60));
    console.log("📧 PASSWORD RESET EMAIL (Console Fallback)");
    console.log("=".repeat(60));
    console.log(`To: ${toEmail}`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log("=".repeat(60) + "\n");
    return { messageId: "console-fallback", previewUrl: resetUrl };
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || '"ImpactLink" <noreply@impactlink.com>',
    to: toEmail,
    subject: "Reset Your Password — ImpactLink",
    html: htmlBody,
  };

  const info = await mailer.sendMail(mailOptions);

  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) {
    console.log("📧 Preview reset email at:", previewUrl);
  }

  return { messageId: info.messageId, previewUrl };
}

module.exports = { sendPasswordResetEmail };
