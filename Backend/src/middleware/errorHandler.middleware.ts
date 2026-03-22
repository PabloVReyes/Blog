// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { logger } from '../utils/logger'

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const context = {
        url: req.url,
        method: req.method,
        userId: (req as any)?.user?.id || null,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    }

    if (err instanceof ZodError) {
        logger.warn(
            {
                ...context,
                type: 'validation_error',
                errors: err.flatten()
            },
            'Validation error'
        )

        return res.status(422).json({
            success: false,
            errors: err.flatten()
        })
    }

    if (err instanceof Error) {
        logger.error(
            {
                ...context,
                type: 'application_error',
                message: err.message,
                stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
            },
            'Application error'
        )

        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

    logger.fatal(
        {
            ...context,
            type: 'unknown_error',
            err
        },
        'Unhandled error'
    )

    return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    })
}