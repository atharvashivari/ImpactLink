/**
 * HTML templates for automated emails.
 */

function getDonationReceiptHTML(donorName, amount, campaignTitle) {
    return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; background: #047857; border-radius: 50%; width: 48px; height: 48px; line-height: 48px; color: white; font-size: 24px; font-weight: bold;">I</div>
        <h2 style="margin: 10px 0 0; color: #1a1a1a;">ImpactLink</h2>
      </div>
      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 32px;">
        <h3 style="color: #1a1a1a; margin-top: 0;">Thank you, ${donorName || "Supporter"}! 🎉</h3>
        <p style="color: #6b7280; line-height: 1.6;">
          Your generous donation of <strong style="color: #047857;">₹${Number(amount).toLocaleString()}</strong> 
          to <strong>"${campaignTitle}"</strong> has been successfully processed.
        </p>
        <div style="background: #f0fdf4; border-radius: 8px; padding: 16px; margin: 24px 0; text-align: center;">
          <p style="margin: 0; color: #047857; font-weight: 600; font-size: 14px;">Donation Summary</p>
          <p style="margin: 8px 0 0; font-size: 2rem; font-weight: 800; color: #047857;">₹${Number(amount).toLocaleString()}</p>
          <p style="margin: 4px 0 0; color: #6b7280; font-size: 13px;">${campaignTitle}</p>
        </div>
        <p style="color: #6b7280; line-height: 1.6;">
          Your contribution makes a real difference. Together, we're creating impact that matters.
        </p>
        <div style="text-align: center; margin: 32px 0 16px;">
          <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/campaigns" 
             style="display: inline-block; background: #047857; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
            Discover More Campaigns
          </a>
        </div>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">
          This is an automated receipt from ImpactLink. If you did not make this donation, please contact support immediately.
        </p>
      </div>
    </div>
  `;
}

module.exports = { getDonationReceiptHTML };
