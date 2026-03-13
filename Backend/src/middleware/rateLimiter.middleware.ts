import rateLimit from 'express-rate-limit'

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10,                  // máximo 10 intentos
    message: { message: 'Demasiados intentos. Intenta en 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false,
})

export const globalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 200,
})