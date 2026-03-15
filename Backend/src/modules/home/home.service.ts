import * as repo from "./home.repository"

export const getHomeSectionsService = async () => {
    return await repo.getHomeRepository()
}
