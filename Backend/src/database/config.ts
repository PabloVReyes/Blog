import { PrismaClient } from '@prisma/client';

let database: PrismaClient;

database = new PrismaClient();

export { database }