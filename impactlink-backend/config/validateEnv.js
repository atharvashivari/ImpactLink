const { cleanEnv, str, port } = require('envalid');

module.exports = function validateEnv() {
    cleanEnv(process.env, {
        PORT: port({ default: 5000 }),
        MONGO_URI: str(),
        JWT_SECRET: str(),
        RAZORPAY_KEY_ID: str(),
        RAZORPAY_KEY_SECRET: str(),
        EMAIL_USER: str({ default: '' }),
        EMAIL_PASS: str({ default: '' }),
        REDIS_URL: str({ default: '' }),
        CLIENT_URL: str({ default: 'http://localhost:5173' }),
    });
};
