import { faker } from '@faker-js/faker'
import { GetTransactionsByUserIdController } from './get-transactions-by-user-id.js'
import { UserNotFoundError } from '../../errors/user.js'
import { transaction } from '../../tests'

describe('GetTransactionByUserId', () => {
    class GetTransactionByUserIdUseCaseStub {
        async execute() {
            return transaction
        }
    }
    const makeSut = () => {
        const getTransactionByUserIdUseCase =
            new GetTransactionByUserIdUseCaseStub()
        const sut = new GetTransactionsByUserIdController(
            getTransactionByUserIdUseCase,
        )

        return { sut, getTransactionByUserIdUseCase }
    }

    it('should return 200 when finding transaction by user id successfully', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute({
            query: { userId: faker.string.uuid() },
        })

        // Assert
        expect(result.statusCode).toBe(200)
    })
    it('should return 400 when missing userId param', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute({
            query: { userId: undefined },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })
    it('should return 400 when userId param is invalid', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute({
            query: { userId: 'invalid_user_id' },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })
    it('should return 404 when user is not found', async () => {
        // Arrange
        const { sut, getTransactionByUserIdUseCase } = makeSut()
        import.meta.jest
            .spyOn(getTransactionByUserIdUseCase, 'execute')
            .mockRejectedValueOnce(new UserNotFoundError())

        // Act
        const result = await sut.execute({
            query: { userId: faker.string.uuid() },
        })

        // Assert
        expect(result.statusCode).toBe(404)
    })
    it('should return 500 when GetTransactionsByUserIUseCase throws', async () => {
        // Arrange
        const { sut, getTransactionByUserIdUseCase } = makeSut()
        import.meta.jest
            .spyOn(getTransactionByUserIdUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        // Act
        const result = await sut.execute({
            query: { userId: faker.string.uuid() },
        })

        // Assert
        expect(result.statusCode).toBe(500)
    })
    it('should call GetUserByUseCase with correct param', async () => {
        // Arrange
        const { sut, getTransactionByUserIdUseCase } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            getTransactionByUserIdUseCase,
            'execute',
        )
        const userId = faker.string.uuid()

        // Act
        await sut.execute({
            query: { userId: userId },
        })

        // Assert
        expect(executeSpy).toHaveBeenCalledWith(userId)
    })
})
