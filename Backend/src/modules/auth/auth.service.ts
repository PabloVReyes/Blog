import { comparePassword } from "../../utils/password"
import { generateToken } from "./jwt"
import * as repo from "./auth.repository"

const DUMMY_HASH = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8Q8ZC6zQ6YqZ0zcKXqQyV2pA6Y5G2K";

export const login = async (email: string, password: string) => {
    const user = await repo.getUserByEmailRepository(email)

    const passwordHash = user?.password ?? DUMMY_HASH

    const valid = await comparePassword(password, passwordHash)

    if (!user || !valid) {
        throw new Error("Credenciales inválidas")
    }

    if (!user.active) {
        throw new Error("Usuario desactivado")
    }

    const permissions = user.roles.flatMap(r =>
        r.role.permissions.map(p => p.permission.key)
    )

    const roles = user.roles.map(r => r.role.name)

    const token = generateToken({
        id: user.id,
        email: user.email,
        roles,
        permissions
    })

    await repo.updateLastLogin(user.id)

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            roles,
            permissions,
            mustChangePassword: user.mustChangePassword,
        }
    }

}