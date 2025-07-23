import { faker } from '@faker-js/faker'
import { UpdateTransactionUseCase } from './update-transaction'

describe('UpdateTransactionUseCase', () => {
    const createTransactionParams = {
        id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        name: faker.commerce.productName(),
        date: faker.date.anytime().toISOString(),
        type: 'EXPENSE',
        amount: Number(faker.finance.amount()),
    }
    class UpdateTransactionRepositoryStub {
        async execute(transactionId) {
            return {
                id: transactionId,
                ...createTransactionParams,
            }
        }
    }
    const makeSut = () => {
        const updateTransactionRepository =
            new UpdateTransactionRepositoryStub()
        const sut = new UpdateTransactionUseCase(updateTransactionRepository)

        return { sut, updateTransactionRepository }
    }
    it('should update a transaction successfully', async () => {
        // Arrange
        const { sut } = makeSut()
        const id = faker.string.uuid()

        // Act
        const result = await sut.execute(id, {
            amount: Number(faker.finance.amount()),
        })

        // Assert
        expect(result).toEqual(createTransactionParams)
    })
})
