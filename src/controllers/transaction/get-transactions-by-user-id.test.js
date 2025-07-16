import { faker } from '@faker-js/faker'
import { GetTransactionsByUserIdController } from './get-transactions-by-user-id.js'

describe('GetTransactionByUserId', () => {
    class GetTransactionByUserIdUseCaseStub {
        async execute() {
            return {
                user_id: faker.string.uuid(),
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                date: faker.date.anytime().toISOString(),
                type: 'EXPENSE',
                amount: Number(faker.finance.amount()),
            }
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
})
