// src/hooks/useAuthInit.ts

import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/features/auth/store";

interface JwtPayload {
    exp: number;
}

export function useAuthInit() {
    const token = useAuthStore((s) => s.token);
    const logout = useAuthStore((s) => s.logout);

    useEffect(() => {
        if (!token) return;

        const decoded = jwtDecode<JwtPayload>(token);

        if (decoded.exp * 1000 < Date.now()) {
            logout();
        }
    }, []);
}