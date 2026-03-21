// config/env.ts
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().min(1).max(65535).default(3001),
    JWT_SECRET: z.string().min(32, 'JWT_SECRET debe tener al menos 32 caracteres'),
    JWT_EXPIRES_IN: z.string().default('1h'),
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number().default(3306),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    ALLOWED_ORIGINS: z.string(),
    SMTP_HOST: z.string(),
    SMTP_USER: z.string().email(),
    SMTP_PASS: z.string(),
    FRONTEND_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)