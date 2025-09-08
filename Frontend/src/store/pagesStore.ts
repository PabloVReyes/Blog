import { publishPage } from "@/api/pages";
import { create } from "zustand";

type PageState = {
    title: string;
    contentJson: any | null;
    contentHtml: string;
    isPublishing: boolean;

    setTitle: (title: string) => void;
    setContent: (json: any, html: string) => void;
    publishPage: () => Promise<{ ok: boolean; data?: any; error?: any }>;
};

export const usePageStore = create<PageState>((set, get) => ({
    title: "",
    contentJson: null,
    contentHtml: "",
    isPublishing: false,


    setTitle: (title) => set({ title }),
    setContent: (json, html) => set({ contentJson: json, contentHtml: html }),

    publishPage: async () => {
        set({ isPublishing: true });
        try {
            const { title, contentJson, contentHtml } = get();

            if (!title) throw new Error("El título es obligatorio");
            if (!contentJson || !contentHtml) throw new Error("El contenido está vacío");

            const data = await publishPage(title, JSON.stringify(contentJson), contentHtml);

            set({ isPublishing: false });
            return { ok: true, data };
        } catch (error) {
            set({ isPublishing: false });
            return { ok: false, error };
        }
    },
}));

