import * as bcrypt from "bcrypt"
import * as crypto from "crypto"

export const hashPassword = async (password: string) => {
    return bcrypt.hash(password, 10)
}

export const comparePassword = async (
    password: string,
    hash: string
) => {
    return bcrypt.compare(password, hash)
}


export const generatePassword = (length: number = 10): string => {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%"

    const bytes: any = crypto.randomBytes(length)

    let password = ""

    for (let i = 0; i < length; i++) {
        password += chars[bytes[i] % chars.length]
    }

    return password
}