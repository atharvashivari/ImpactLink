const { Worker } = require('bullmq');
const nodemailer = require('nodemailer');
const logger = require('../utils/logger');
const { getDonationReceiptHTML } = require('../utils/emailTemplates');

let worker = null;

function startEmailWorker() {
    if (!process.env.REDIS_URL) {
        logger.info('ℹ️ REDIS_URL not set. Email worker disabled.');
        return null;
    }

    let redisHost, redisPort;
    try {
        const url = new URL(process.env.REDIS_URL);
        redisHost = url.hostname;
        redisPort = parseInt(url.port) || 6379;
    } catch (err) {
        logger.warn(`⚠️ Invalid REDIS_URL: ${err.message}. Email worker disabled.`);
        return null;
    }

    worker = new Worker('email', async (job) => {
        logger.info(`📧 Processing email job: ${job.name} (ID: ${job.id})`);

        const { type } = job.data;

        switch (job.name) {
            case 'donationReceipt': {
                const { email, donorName, amount, campaignTitle } = job.data;
                await sendEmail(
                    email,
                    `Donation Receipt — ₹${Number(amount).toLocaleString()} to "${campaignTitle}"`,
                    getDonationReceiptHTML(donorName, amount, campaignTitle)
                );
                break;
            }
            default:
                logger.warn(`Unknown email job type: ${job.name}`);
        }
    }, {
        connection: { host: redisHost, port: redisPort },
        concurrency: 3,
    });

    worker.on('completed', (job) => {
        logger.info(`✅ Email job completed: ${job.name} (ID: ${job.id})`);
    });

    worker.on('failed', (job, err) => {
        logger.error(`❌ Email job failed: ${job?.name} (ID: ${job?.id}) — ${err.message}`);
    });

    logger.info('📧 Email worker started (listening for jobs).');
    return worker;
}

/**
 * Send an email using available transport.
 */
async function sendEmail(to, subject, html) {
    let transporter;

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });
    } else {
        // Fallback to Ethereal test account
        try {
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: { user: testAccount.user, pass: testAccount.pass },
            });
        } catch (err) {
            logger.warn(`⚠️ Email transport unavailable: ${err.message}. Logging email to console.`);
            logger.info(`📧 [Console Fallback] To: ${to} | Subject: ${subject}`);
            return;
        }
    }

    const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || '"ImpactLink" <noreply@impactlink.com>',
        to,
        subject,
        html,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
        logger.info(`📧 Preview email at: ${previewUrl}`);
    }
}

module.exports = { startEmailWorker };
