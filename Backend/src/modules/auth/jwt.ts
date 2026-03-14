import * as jwt from "jsonwebtoken";

interface AuthUser {
    id: string;
    email: string;
    roles: string[];
    permissions: string[];
}

export const generateToken = (user: AuthUser): string => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;

    if (!secret) throw new Error("JWT_SECRET no definido");
    if (!expiresIn) throw new Error("JWT_EXPIRES_IN no definido");

    // ✅ Forzar a any para evitar errores de tipos
    const options: any = { expiresIn };

    return jwt.sign(user, secret, options);
};