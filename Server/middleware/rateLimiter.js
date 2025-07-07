import rateLimit from 'express-rate-limit';

// Create a rate limiter middleware
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        error: 'Too many requests, please try again later.'
    }
});

// More strict rate limiter for auth endpoints to prevent brute-force attacks
export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 login/register requests per hour
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: 'Too many login attempts, please try again later.'
    }
});
