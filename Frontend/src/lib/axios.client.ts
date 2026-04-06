// src/api/index.ts
import axios from "axios";
import { useAuthStore } from "@/features/auth/store";
import { useAppStore } from "@/stores/appStore";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    const { rateLimit } = useAppStore.getState();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (rateLimit.active) {
        return Promise.reject({
            isRateLimit: true,
            message: "Rate limit activo"
        });
    }

    return config;
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error?.isRateLimit) {
            return Promise.reject(error);
        }

        const status = error.response?.status;

        if (status === 401) {
            useAuthStore.getState().logout();
            useAuthStore.getState().openLogin();
        }

        if (status === 429) {
            const retryAfter =
                error.response?.data?.retryAfter ||
                Number(error.response?.headers?.["retry-after"]) ||
                60;

            useAppStore.getState().activateRateLimit(retryAfter);
        }

        return Promise.reject(error);
    }
);