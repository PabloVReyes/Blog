import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

type RateLimitRequest = Request & {
    rateLimit?: {
        limit: number;
        current: number;
        remaining: number;
        resetTime?: Date | number;
    };
};

const getRetryAfter = (req: RateLimitRequest): number => {
    const resetTime = req.rateLimit?.resetTime;

    if (!resetTime) return 60; // fallback seguro

    const reset = new Date(resetTime).getTime();
    const now = Date.now();

    return Math.max(1, Math.ceil((reset - now) / 1000));
};

// 🔐 Login (más estricto)
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: RateLimitRequest, res: Response) => {
        const retryAfter = getRetryAfter(req);

        res.status(429).json({
            error: "RATE_LIMIT",
            scope: "LOGIN",
            message: "Demasiados intentos de login.",
            retryAfter
        });
    }
});

// 🌐 Global (relajado)
export const globalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 700,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: RateLimitRequest, res: Response) => {
        const retryAfter = getRetryAfter(req);

        res.status(429).json({
            error: "RATE_LIMIT",
            scope: "GLOBAL",
            message: "Demasiadas peticiones. Intenta más tarde.",
            retryAfter
        });
    }
});