import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient() // <-- Notice: no curly brace at the end!
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma