import rateLimit from 'express-rate-limit'; // Express Rate Limit Middleware
import { StatusCodes } from 'outers'; // Import Outers

// Rate Limiter Middleware Function
export default rateLimit({
    windowMs: 60 * 1000, // 1 Minute
    statusCode: StatusCodes.TOO_MANY_REQUESTS, // Too Many Requests
    max: 15, // 15 requests
    message: {
        status: false,
        statusCode: StatusCodes.TOO_MANY_REQUESTS,
        Title: 'Too many requests',
        message: 'Too many requests, please try again later',
        response: undefined,
    }, // Message
    standardHeaders: true, // Include standard headers for request limit
    legacyHeaders: false, // Include legacy headers for request limit
    keyGenerator: (Request) => {
        return String(
            Request.headers['x-forwarded-for'] ??
                Request.connection.remoteAddress ??
                Request.socket.remoteAddress ??
                Request.socket.remoteAddress ??
                Request.headers['x-real-ip'] ??
                Request.ip,
        );
    },
}); // Rate Limiter Middleware
