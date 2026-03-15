import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

export const adapter = new PrismaMariaDb(
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    {
        database: process.env.DB_NAME,
    }
);

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const database =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = database;
}