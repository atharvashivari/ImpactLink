const Sentry = require("@sentry/node");
require("dotenv").config(); // Ensure env variables are available for DSN

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  sendDefaultPii: true,
});
