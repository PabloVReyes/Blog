import * as repo from "./home.repository"

export const getHomeSectionsService = async () => {
    const data = await repo.getHomeRepository()
    return data
}
