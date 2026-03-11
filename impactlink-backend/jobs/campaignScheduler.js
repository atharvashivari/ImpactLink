const cron = require('node-cron');
const Campaign = require('../models/Campaign');
const logger = require('../utils/logger');

// Run every midnight (00:00)
cron.schedule('0 0 * * *', async () => {
    logger.info('🔄 Running Campaign Expiry Job...');
    const now = new Date();

    try {
        const result = await Campaign.updateMany(
            { endDate: { $lt: now }, status: 'active' },
            { $set: { status: 'expired' } }
        );

        if (result.modifiedCount > 0) {
            logger.info(`✅ Expired ${result.modifiedCount} campaigns.`);
        } else {
            logger.info('✅ No campaigns to expire.');
        }
    } catch (error) {
        logger.error('❌ Error in Campaign Scheduler:', { error: error.message, stack: error.stack });
    }
});

logger.info('📅 Campaign expiry scheduler initialized (runs daily at midnight).');
