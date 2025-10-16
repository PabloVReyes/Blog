import { Layout } from "@/features/public/layout";
import { DynamicPage } from "@/features/public/pages/pages/DynamicPage";
import { useSettingStore } from "@/store/settingStore";
import { Navigate, type RouteObject } from "react-router-dom";

const RedirectToFirstPage = () => {
    const menu: any = useSettingStore((s) => s.menu)

    if (!menu || menu.length === 0) {
        return (
            <>
                Sin paginas
            </>
        )
    }

    const firstLink = menu[0].link;
    return <Navigate to={firstLink} replace />;
}

export const publicRoutes: RouteObject = {
    path: "/",
    element: <Layout />,
    children: [
        {
            index: true,
            element: <RedirectToFirstPage />
        },
        {
            path: ":slug",
            element: <DynamicPage />
        },
    ]
}

