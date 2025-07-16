import { faker } from '@faker-js/faker'
import { DeleteTransactionController } from './delete-transaction.js'

describe('DeleteTransactionController', () => {
    class DeleteTransactionUseCaseStub {
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
        const deleTransactionUseCase = new DeleteTransactionUseCaseStub()
        const sut = new DeleteTransactionController(deleTransactionUseCase)
        return { sut, deleTransactionUseCase }
    }
    it('should return 200 when deleting transaction successfully', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute({
            params: { transactionId: faker.string.uuid() },
        })

        // Assert
        expect(result.statusCode).toBe(200)
    })
})
