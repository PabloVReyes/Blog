// src/hooks/useAuthInit.ts

import { useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { useAuthStore } from "@/features/auth/store"

interface JwtPayload {
    exp: number
}

export function useAuthInit() {
    const token = useAuthStore((s) => s.token)
    const logout = useAuthStore((s) => s.logout)

    useEffect(() => {
        if (!token) return

        try {
            const decoded = jwtDecode<JwtPayload>(token)

            const expiresAt = decoded.exp * 1000
            const now = Date.now()

            // si ya expiró
            if (expiresAt <= now) {
                logout()
                return
            }

            // tiempo restante
            const remaining = expiresAt - now

            const timer = setTimeout(() => {
                logout()
            }, remaining)

            return () => clearTimeout(timer)

        } catch {
            logout()
        }
    }, [token])
}