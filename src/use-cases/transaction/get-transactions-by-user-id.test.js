import { faker } from '@faker-js/faker'
import { GetTransactionsByUserIdUseCase } from './get-transactions-by-user-id'
import { UserNotFoundError } from '../../errors/user'
import { user } from '../../tests'

describe('GetTransactionByUserIdUseCase', () => {
    class GetTransactionByUserIdRepositoryStub {
        async execute() {
            return []
        }
    }
    class GetUserByIdRepositoryStub {
        async execute() {
            return user
        }
    }
    const makeSut = () => {
        const getTransactionByUserIdRepository =
            new GetTransactionByUserIdRepositoryStub()
        const getUserByIdRepository = new GetUserByIdRepositoryStub()
        const sut = new GetTransactionsByUserIdUseCase(
            getTransactionByUserIdRepository,
            getUserByIdRepository,
        )
        return { sut, getTransactionByUserIdRepository, getUserByIdRepository }
    }
    it('should get transactions by user id successfully', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute(faker.string.uuid())

        // Assert
        expect(result).toEqual([])
    })
    it('should throw UserNotFoundError if user dos not exist', async () => {
        // Arrange
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValueOnce(null)
        const id = faker.string.uuid()

        // Act
        const promise = sut.execute(id)

        // Assert
        await expect(promise).rejects.toThrow(new UserNotFoundError(id))
    })
    it('should call GetUserByIdRepository with correct params', async () => {
        // Arrange
        const { sut, getUserByIdRepository } = makeSut()
        const getUserByIdRepositorySpy = jest.spyOn(
            getUserByIdRepository,
            'execute',
        )
        const id = faker.string.uuid()

        // Act
        await sut.execute(id)

        // Assert
        expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(id)
    })
    it('should call GetTransactionByUserIdRepository with correct params', async () => {
        // Arrange
        const { sut, getTransactionByUserIdRepository } = makeSut()
        const getTransactionByUserIdRepositorySpy = jest.spyOn(
            getTransactionByUserIdRepository,
            'execute',
        )
        const id = faker.string.uuid()

        // Act
        await sut.execute(id)

        // Assert
        expect(getTransactionByUserIdRepositorySpy).toHaveBeenCalledWith(id)
    })
    it('should throw if GetUserByIdRepository throws', async () => {
        // Arrange
        const { sut, getUserByIdRepository } = makeSut()
        jest.spyOn(getUserByIdRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        )
        const id = faker.string.uuid()

        // Act
        const promise = sut.execute(id)

        // Assert
        await expect(promise).rejects.toThrow()
    })
    it('should throw if GetTransactionByUserIdRepository throws', async () => {
        // Arrange
        const { sut, getTransactionByUserIdRepository } = makeSut()
        jest.spyOn(
            getTransactionByUserIdRepository,
            'execute',
        ).mockRejectedValueOnce(new Error())
        const id = faker.string.uuid()

        // Act
        const promise = sut.execute(id)

        // Assert
        await expect(promise).rejects.toThrow()
    })
})
