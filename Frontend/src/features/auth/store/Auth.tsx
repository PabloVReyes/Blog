import { create } from "zustand"
import { jwtDecode } from "jwt-decode"
import type { User } from "./types"
import { useModalStore } from "@/layout/store"
import { Password } from "@/layout/components/Sidebar/Password"
import { Notify } from "@/ui"

// Constantes de persistencia
const STORAGE_USER_KEY = "user_profile"
const SESSION_TOKEN_KEY = "auth_session_token"

// --- HELPERS DE PERSISTENCIA ---

const saveToSession = (token: string) => sessionStorage.setItem(SESSION_TOKEN_KEY, token)
const getFromSession = () => sessionStorage.getItem(SESSION_TOKEN_KEY)
const removeFromSession = () => sessionStorage.removeItem(SESSION_TOKEN_KEY)

const saveToLocal = (user: User) => {
    try {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
    } catch (error) {
        console.error("Error al persistir usuario:", error)
    }
}

const getFromLocal = (): User | null => {
    try {
        const raw = localStorage.getItem(STORAGE_USER_KEY)
        if (!raw) return null
        return JSON.parse(raw) as User
    } catch {
        localStorage.removeItem(STORAGE_USER_KEY)
        return null
    }
}

// --- LÓGICA DE JWT ---

const scheduleAutoLogout = (token: string, logoutFn: () => void): ReturnType<typeof setTimeout> | null => {
    try {
        const { exp } = jwtDecode<{ exp: number }>(token)
        // Convertimos exp (segundos) a milisegundos
        const msUntilExpiry = (exp * 1000) - Date.now()

        if (msUntilExpiry <= 0) {
            logoutFn()
            return null
        }

        // Si falta demasiado tiempo (ej. más de 24h), el timeout de JS puede fallar.
        // Pero para sesiones normales de 1-8h funciona perfecto.
        return setTimeout(logoutFn, msUntilExpiry)
    } catch {
        logoutFn()
        return null
    }
}

// --- STORE ---

interface AuthState {
    user: User | null
    token: string | null
    loginOpened: boolean
    logoutTimer: ReturnType<typeof setTimeout> | null

    login: (user: User, token: string) => void
    logout: () => void
    updateUser: (user: Partial<User>) => void
    loadUserFromStorage: () => void

    openLogin: () => void
    closeLogin: () => void

    isAuthenticated: () => boolean
    hasRole: (role: string) => boolean
    hasPermission: (permission: string) => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: getFromLocal(),
    token: getFromSession(),
    loginOpened: false,
    logoutTimer: null,

    login: (user, token) => {
        // 1. Limpiar cualquier sesión o timer previo
        const currentTimer = get().logoutTimer
        if (currentTimer) clearTimeout(currentTimer)

        // 2. Agendar el cierre de sesión automático
        const timer = scheduleAutoLogout(token, () => get().logout())
        if (!timer) return // Token expirado

        // 3. Persistir datos
        saveToSession(token)
        saveToLocal(user)

        set({
            user,
            token,
            logoutTimer: timer,
            loginOpened: false
        })

        // 4. Acción obligatoria de seguridad
        if (user.mustChangePassword) {
            useModalStore.getState().openModal({
                title: "Cambiar Contraseña",
                subtitle: "Es necesario actualizar tu contraseña por seguridad",
                icon: "IconPassword",
                content: <Password id={user.id} />,
                withCloseButton: false,
                closeOnEscape: false,
                closeOnClickOutside: false
            })
        }
    },

    logout: () => {
        // Limpiar el timer de la memoria
        const timer = get().logoutTimer
        if (timer) clearTimeout(timer)

        // Limpiar storages
        removeFromSession()
        localStorage.removeItem(STORAGE_USER_KEY)

        // Limpiar modales abiertos
        useModalStore.getState().closeModal()

        set({
            user: null,
            token: null,
            logoutTimer: null,
            loginOpened: false
        })

        Notify({
            type: "info",
            title: "Sesión finalizada",
            message: "Has salido del sistema correctamente"
        })
    },

    updateUser: (data) => {
        const currentUser = get().user
        if (!currentUser) return

        const updatedUser = { ...currentUser, ...data }
        saveToLocal(updatedUser)
        set({ user: updatedUser })
    },

    loadUserFromStorage: () => {
        const token = getFromSession()
        const user = getFromLocal()

        if (!token || !user) {
            return get().logout()
        }

        const timer = scheduleAutoLogout(token, () => get().logout())
        if (!timer) return

        set({ token, user, logoutTimer: timer })
    },

    openLogin: () => set({ loginOpened: true }),
    closeLogin: () => set({ loginOpened: false }),

    isAuthenticated: () => !!get().token,

    hasRole: (role) => {
        const user = get().user
        return Array.isArray(user?.roles) && user.roles.includes(role)
    },

    hasPermission: (perm) => {
        const user = get().user
        return Array.isArray(user?.permissions) && user.permissions.includes(perm)
    }
}))