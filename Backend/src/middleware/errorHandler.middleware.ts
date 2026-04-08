// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { logger } from '../utils/logger'
import { HttpError } from '../utils/httpError'

interface ErrorContext {
    url: string;
    method: string;
    userId: string | number | null;
    ip: string | undefined;
    userAgent: string | undefined;
}

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // req.user ya es reconocido gracias a la extensión de tipos
    const context: ErrorContext = {
        url: req.url,
        method: req.method,
        userId: req.user?.id || null,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    }

    if (err instanceof ZodError) {
        const flattened = err.flatten();
        logger.warn({ ...context, type: 'validation_error', errors: flattened }, 'Validation error')

        return res.status(422).json({
            success: false,
            errors: flattened
        })
    }

    if (err instanceof HttpError) {
        logger.warn({ ...context, type: 'http_error', status: err.status, message: err.message }, 'HTTP error')

        return res.status(err.status).json({
            success: false,
            message: err.message
        })
    }

    if (err instanceof Error) {
        const isDev = process.env.NODE_ENV === 'development';

        logger.error(
            {
                ...context,
                type: 'application_error',
                message: err.message,
                stack: isDev ? err.stack : undefined
            },
            'Application error'
        )

        // En producción, es mejor no enviar el mensaje real de Error si es sensible
        return res.status(400).json({
            success: false,
            message: isDev ? err.message : 'Solicitud incorrecta'
        })
    }

    logger.fatal({ ...context, type: 'unknown_error', err }, 'Unhandled error')

    return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    })
}