import * as jwt from "jsonwebtoken";

interface AuthUser {
    id: string;
    email: string;
    roles: string[];
    permissions: string[];
}

export const generateToken = (user: AuthUser): string => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"];

    if (!secret) throw new Error("JWT_SECRET no definido");
    if (!expiresIn) throw new Error("JWT_EXPIRES_IN no definido");

    const options: jwt.SignOptions = { expiresIn };

    return jwt.sign(user, secret, options);
};