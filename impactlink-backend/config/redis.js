const Redis = require('ioredis');
const logger = require('../utils/logger');

let redisClient = null;

if (process.env.REDIS_URL) {
    try {
        redisClient = new Redis(process.env.REDIS_URL, {
            maxRetriesPerRequest: 3,
            retryStrategy(times) {
                if (times > 3) {
                    logger.warn('⚠️ Redis max retries reached, giving up.');
                    return null; // Stop retrying
                }
                return Math.min(times * 200, 2000);
            },
            lazyConnect: true,
        });

        redisClient.connect()
            .then(() => logger.info('✅ Redis connected'))
            .catch((err) => {
                logger.warn(`⚠️ Redis connection failed: ${err.message}. Caching disabled.`);
                redisClient = null;
            });

        redisClient.on('error', (err) => {
            logger.warn(`⚠️ Redis error: ${err.message}`);
        });
    } catch (err) {
        logger.warn(`⚠️ Redis initialization failed: ${err.message}. Caching disabled.`);
        redisClient = null;
    }
} else {
    logger.info('ℹ️ REDIS_URL not set. Caching disabled (app runs without Redis).');
}

module.exports = { getRedisClient: () => redisClient };
