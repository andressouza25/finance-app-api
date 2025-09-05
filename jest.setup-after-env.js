import { prisma } from './prisma/prisma.js'

beforeEach(async () => {
    await prisma.$transaction([
        prisma.transaction.deleteMany(),
        prisma.user.deleteMany(),
    ])
})
