import { create } from "zustand"
import { jwtDecode } from "jwt-decode"
import type { User } from "./types"
import { useModalStore } from "@/layout/store"
import { Password } from "@/layout/components/Sidebar/Password"

/** ────────────── Helpers de persistencia ────────────── */
const STORAGE_USER_KEY = "user"
const STORAGE_TOKEN_KEY = "token"

const safeParseUser = (): User | null => {
    try {
        const raw = localStorage.getItem(STORAGE_USER_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw)
        if (!parsed?.id || !parsed?.email) return null
        return parsed as User
    } catch {
        localStorage.removeItem(STORAGE_USER_KEY)
        return null
    }
}

const saveUserToStorage = (user: User) => {
    try {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
    } catch {
        console.error("Error al guardar usuario en localStorage")
    }
}

const saveTokenToStorage = (token: string) => localStorage.setItem(STORAGE_TOKEN_KEY, token)
const removeUserFromStorage = () => localStorage.removeItem(STORAGE_USER_KEY)
const removeTokenFromStorage = () => localStorage.removeItem(STORAGE_TOKEN_KEY)
const getTokenFromStorage = () => localStorage.getItem(STORAGE_TOKEN_KEY)

/** ────────────── Scheduler de logout automático ────────────── */
const scheduleAutoLogout = (token: string, logout: () => void) => {
    try {
        const { exp } = jwtDecode<{ exp: number }>(token)
        const msUntilExpiry = exp * 1000 - Date.now()
        if (msUntilExpiry <= 0) {
            logout()
            return
        }
        return setTimeout(logout, msUntilExpiry)
    } catch {
        logout()
    }
}

/** ────────────── Estado y store ────────────── */
interface AuthState {
    user: User | null
    token: string | null
    loginOpened: boolean
    logoutTimer?: ReturnType<typeof setTimeout>

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
    /** ────────────── Inicialización segura ────────────── */
    user: safeParseUser(),
    token: getTokenFromStorage(),
    loginOpened: false,

    /** ────────────── Login ────────────── */
    login: (user, token) => {
        const timer = scheduleAutoLogout(token, get().logout)
        if (!timer) return

        saveTokenToStorage(token)
        saveUserToStorage(user)

        set({
            user,
            token,
            logoutTimer: timer,
            loginOpened: false
        })

        if (user.mustChangePassword) {
            useModalStore.getState().openModal({
                title: "Cambio de contraseña requerido",
                subtitle: "Debes establecer una nueva contraseña para continuar",
                content: <Password id={user.id} />,
                withCloseButton: false,
                closeOnEscape: false,
                closeOnClickOutside: false
            })
        }
    },

    /** ────────────── Actualización de usuario ────────────── */
    updateUser: (data) => {
        const currentUser = get().user
        if (!currentUser) return
        const updatedUser = { ...currentUser, ...data }
        saveUserToStorage(updatedUser)
        set({ user: updatedUser })
    },

    /** ────────────── Logout ────────────── */
    logout: () => {
        const timer = get().logoutTimer
        if (timer) clearTimeout(timer)

        removeTokenFromStorage()
        removeUserFromStorage()

        useModalStore.getState().closeModal()

        set({ user: null, token: null, logoutTimer: undefined })
    },

    /** ────────────── Carga desde storage ────────────── */
    loadUserFromStorage: () => {
        const token = getTokenFromStorage()
        const user = safeParseUser()
        if (!token || !user) return get().logout()

        const timer = scheduleAutoLogout(token, get().logout)
        if (!timer) return

        set({ token, user, logoutTimer: timer })
    },

    /** ────────────── Modales ────────────── */
    openLogin: () => set({ loginOpened: true }),
    closeLogin: () => set({ loginOpened: false }),

    /** ────────────── Consultas de estado ────────────── */
    isAuthenticated: () => !!get().token,

    hasRole: (role: string) => {
        const user = get().user
        if (!user || !Array.isArray(user.roles)) return false
        return user.roles.includes(role)
    },

    hasPermission: (perm: string) => {
        const user = get().user
        if (!user || !Array.isArray(user.permissions)) return false
        return user.permissions.includes(perm)
    }
}))