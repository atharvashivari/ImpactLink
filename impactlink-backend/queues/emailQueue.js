const { Queue } = require('bullmq');
const logger = require('../utils/logger');

let emailQueue = null;

if (process.env.REDIS_URL) {
    try {
        emailQueue = new Queue('email', {
            connection: {
                host: new URL(process.env.REDIS_URL).hostname,
                port: parseInt(new URL(process.env.REDIS_URL).port) || 6379,
            },
            defaultJobOptions: {
                attempts: 3,
                backoff: { type: 'exponential', delay: 2000 },
                removeOnComplete: 100,
                removeOnFail: 50,
            },
        });
        logger.info('📧 Email queue initialized');
    } catch (err) {
        logger.warn(`⚠️ Email queue init failed: ${err.message}. Emails will be sent synchronously.`);
        emailQueue = null;
    }
} else {
    logger.info('ℹ️ REDIS_URL not set. Email queue disabled (emails skip silently).');
}

/**
 * Add an email job to the queue.
 * @param {string} type - Job type (e.g. 'donationReceipt')
 * @param {object} data - Job payload
 * @returns {Promise<object|null>} - Job object or null if queue unavailable
 */
async function addEmailJob(type, data) {
    if (!emailQueue) return null;

    try {
        const job = await emailQueue.add(type, data);
        logger.info(`📧 Email job queued: ${type} (ID: ${job.id})`);
        return job;
    } catch (err) {
        logger.warn(`⚠️ Failed to queue email job: ${err.message}`);
        return null;
    }
}

module.exports = { emailQueue, addEmailJob };
