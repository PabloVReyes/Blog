import * as bcrypt from "bcrypt";
import * as crypto from "crypto";

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

export const comparePassword = async (
    password: string,
    hash: string
): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const generatePassword = (length = 12): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    const limit = 256 - (256 % chars.length);
    let password = '';

    while (password.length < length) {
        const bytes = crypto.randomBytes(1);
        const byte = bytes[0];

        if (byte && byte < limit) {
            password += chars[byte % chars.length];
        }
    }

    return password;
};