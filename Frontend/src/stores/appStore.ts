// src/stores/appStore.ts
import { create } from 'zustand';

interface RateLimitState {
    active: boolean;
    retryAfter: number;
}

interface AppState {
    rateLimit: RateLimitState;
    activateRateLimit: (seconds: number) => void;
    clearRateLimit: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    rateLimit: {
        active: false,
        retryAfter: 0
    },

    activateRateLimit: (seconds) => {
        set({
            rateLimit: {
                active: true,
                retryAfter: seconds
            }
        });

        // ⏱ auto desbloqueo
        setTimeout(() => {
            set({
                rateLimit: {
                    active: false,
                    retryAfter: 0
                }
            });

            window.location.reload();
        }, seconds * 1000);
    },

    clearRateLimit: () =>
        set({
            rateLimit: {
                active: false,
                retryAfter: 0
            }
        })
}));