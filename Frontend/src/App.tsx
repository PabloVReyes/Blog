import { useRoutes } from "react-router-dom"
import { routes } from "@/routes/routes"
import { useSettings } from "./hooks/useSettings"
import { useEffect } from "react"

export const App = () => {
  const settings = useSettings()

  useEffect(() => {
    if (settings.title) {
      document.title = settings.title;
    }
  }, [settings])

  const routing = useRoutes(routes)
  return routing
}