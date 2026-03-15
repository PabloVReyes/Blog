// src/router/PrivateRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store";

export function PrivateRoute() {
    const isAuthenticated = useAuthStore((s) => !!s.token)
    const openLogin = useAuthStore((s) => s.openLogin);

    useEffect(() => {
        if (!isAuthenticated) {
            openLogin();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}