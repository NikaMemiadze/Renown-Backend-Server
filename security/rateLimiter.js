const rateLimit = require('express-rate-limit');

const globalLimiter = rateLimit({
    windowMs: 30 * 1000,
    max: 3, 
    message: { message: 'Too many requests, please try again later' }
});

module.exports = { globalLimiter };