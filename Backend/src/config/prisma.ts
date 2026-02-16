import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

export const adapter = new PrismaMariaDb(
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    {
        database: process.env.DB_NAME
    }
)

let database: PrismaClient;

database = new PrismaClient({ adapter });

export { database }