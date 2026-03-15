// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ZodError) {
        return res.status(422).json({ success: false, errors: err.flatten() })
    }
    if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
    }
    return res.status(500).json({ message: 'Error interno del servidor' })
}
