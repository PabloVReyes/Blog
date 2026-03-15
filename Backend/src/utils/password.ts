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

export const generatePassword = (length = 12): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'
    const limit = 256 - (256 % chars.length)  // eliminar sesgo
    let password = ''
    while (password.length < length) {
        const byte: any = crypto.randomBytes(1)[0]
        if (byte < limit) {
            password += chars[byte % chars.length]
        }
    }
    return password
}