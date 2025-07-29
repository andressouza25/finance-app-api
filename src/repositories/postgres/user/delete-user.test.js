import { prisma } from '../../../../prisma/prisma'
import { user } from '../../../tests'
import { PostgresDeleteUserRepository } from './delete-user'

describe('PostgresDeleteUserRepository', () => {
    it('should delete auser on db', async () => {
        await prisma.user.create({
            data: user,
        })
        const sut = new PostgresDeleteUserRepository()

        const result = await sut.execute(user.id)

        expect(result).toStrictEqual(user)
    })
    it('should call prisma with correct params', async () => {
        const sut = new PostgresDeleteUserRepository()

        const prismaSpy = jest.spyOn(prisma.user, 'delete')

        await sut.execute(user.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: user.id,
            },
        })
    })
})
