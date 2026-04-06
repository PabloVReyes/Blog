import { AuthUser } from "./auth";

declare module 'express-serve-static-core' {
    interface Request {
        user?: AuthUser;
        rateLimit?: {
            limit: number;
            current: number;
            remaining: number;
            resetTime: Date;
        };
    }
}

export { };