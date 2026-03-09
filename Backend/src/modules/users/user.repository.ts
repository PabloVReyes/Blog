import { database } from "@/config/prisma"

interface Props {
    name: string;
    email: string;
    password: string;
}

export const createUser = async ({ name, email, password }: Props) => {
    try {
        return await database.user.create({
            data: {
                name,
                email,
                password
            }
        })
    } catch (error) {
        console.error("error en createUser")
        throw new Error("Error al crear un nuevo usuario")
    }
}