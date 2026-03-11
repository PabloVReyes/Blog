import { comparePassword } from "../../utils/password"
import { generateToken } from "./jwt"
import * as repo from "./auth.repository"

export const login = async (email: string, password: string) => {
    const user = await repo.getUserByEmailRepository(email)
    if (!user) {
        throw new Error("Usuario no encontrado")
    }

    const validPassword = await comparePassword(password, user.password)

    if (!validPassword) {
        throw new Error("Contraseña incorrecta")
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
            permissions
        }
    }

}