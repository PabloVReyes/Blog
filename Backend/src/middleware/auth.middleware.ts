import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

interface AuthUser {
    id: string;
    email: string;
    roles: string[];
    permissions: string[];
}

declare module "express-serve-static-core" {
    interface Request {
        user?: AuthUser;
    }
}

function isAuthUser(obj: any): obj is AuthUser {
    return (
        obj &&
        typeof obj.id === "string" &&
        typeof obj.email === "string" &&
        Array.isArray(obj.roles) &&
        Array.isArray(obj.permissions)
    );
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No autorizado" });

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer")
        return res.status(401).json({ message: "Token mal formado" });

    const token = parts[1];
    if (!token) return res.status(401).json({ message: "Token mal formado" });

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET no definido");

    try {
        const decoded = jwt.verify(token, secret!) as unknown;

        if (!isAuthUser(decoded))
            return res.status(401).json({ message: "Token inválido" });

        if (!decoded.roles.length)
            return res
                .status(403)
                .json({ message: "Usuario sin roles asignados" });

        if (!decoded.permissions.length)
            return res
                .status(403)
                .json({ message: "Usuario sin permisos asignados" });

        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Token inválido" });
    }
};