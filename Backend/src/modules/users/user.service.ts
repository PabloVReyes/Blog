import { hashPassword } from "../../utils/password"
import * as repo from "./user.repository"

export const createUser = async (data) => {
    const password = await hashPassword(data.password)
    return await repo.createUser({
        name: data.name,
        email: data.email,
        password
    })
}