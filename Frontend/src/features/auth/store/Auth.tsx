import { create } from "zustand"
import { jwtDecode } from "jwt-decode"
import type { User } from "./types"
import { useModalStore } from "@/layout/store"
import { Password } from "@/layout/components/Sidebar/Password"

const scheduleAutoLogout = (token: string, logout: () => void) => {
    const { exp } = jwtDecode<{ exp: number }>(token)
    const msUntilExpiry = exp * 1000 - Date.now()
    if (msUntilExpiry <= 0) {
        logout()
        return
    }
    return setTimeout(logout, msUntilExpiry)
}

interface AuthState {
    user: User | null
    token: string | null
    loginOpened: boolean
    logoutTimer?: ReturnType<typeof setTimeout>

    login: (user: User, token: string) => void
    logout: () => void

    updateUser: (user: Partial<User>) => void

    openLogin: () => void
    closeLogin: () => void

    loadUserFromStorage: () => void

    isAuthenticated: () => boolean
    hasRole: (role: string) => boolean
    hasPermission: (permission: string) => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token"),
    loginOpened: false,

    login: (user, token) => {
        const timer = scheduleAutoLogout(token, get().logout)
        if (!timer) return

        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))

        set({
            user,
            token,
            logoutTimer: timer,
            loginOpened: false
        })

        // 🔐 abrir modal si debe cambiar contraseña
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

    updateUser: (data) => {
        const currentUser = get().user
        if (!currentUser) return
        const updatedUser = { ...currentUser, ...data }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        set({
            user: updatedUser
        })
    },

    logout: () => {
        const timer = get().logoutTimer

        if (timer) clearTimeout(timer)

        localStorage.removeItem("token")
        localStorage.removeItem("user")

        // cerrar todos los modales abiertos
        useModalStore.getState().closeModal()

        set({
            user: null,
            token: null
        })
    },

    loadUserFromStorage: () => {
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        if (!token || !user) return

        try {
            const timer = scheduleAutoLogout(token, get().logout)
            if (!timer) return

            set({
                token,
                user: JSON.parse(user),
                logoutTimer: timer
            })

        } catch {
            get().logout()
        }
    },

    openLogin: () => set({ loginOpened: true }),
    closeLogin: () => set({ loginOpened: false }),

    isAuthenticated: () => !!get().token,

    hasRole: (role) => {
        return get().user?.roles.includes(role) ?? false
    },

    hasPermission: (permission) => {
        return get().user?.permissions.includes(permission) ?? false
    }
}))