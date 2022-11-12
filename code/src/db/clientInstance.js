import { PrismaClient } from '@prisma/client'

let prismaClient = undefined

const getDatabaseClientInstance = () => {
    if (!prismaClient) {
        prismaClient = new PrismaClient()
    }
    return prismaClient;
}

export { getDatabaseClientInstance }