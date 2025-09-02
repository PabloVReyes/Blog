import { useRoutes } from "react-router-dom"
import { routes } from "@/routes/routes"
import { useEffect } from "react"
import { useSettingsStore } from "./store/settingsStore"

export const App = () => {
  const { title } = useSettingsStore()

  useEffect(() => {
    document.title = title;
  }, [title])

  const routing = useRoutes(routes)
  return routing
}