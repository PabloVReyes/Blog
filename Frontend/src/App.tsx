import { useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";
import { RateLimitScreen } from "./features";
import { useAppStore } from "@/stores/appStore";
import { useDocumentMeta } from "./hooks";

export const App = () => {
    const { rateLimit } = useAppStore();
    const routing = useRoutes(routes);

    useDocumentMeta();

    if (rateLimit.active) {
        return <RateLimitScreen />;
    }

    return routing;
};