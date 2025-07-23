import { faker } from '@faker-js/faker'
import { DeleteTransactionUseCase } from './delete-transaction'

describe('DeleteTransactionUseCase', () => {
    const createTransactionParams = {
        id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        name: faker.commerce.productName(),
        date: faker.date.anytime().toISOString(),
        type: 'EXPENSE',
        amount: Number(faker.finance.amount()),
    }

    class DeleteTransactionRepositoryStub {
        async execute(transactionId) {
            return {
                ...createTransactionParams,
                id: transactionId,
            }
        }
    }

    const makeSut = () => {
        const deleteTransactionRepository =
            new DeleteTransactionRepositoryStub()
        const sut = new DeleteTransactionUseCase(deleteTransactionRepository)

        return { sut, deleteTransactionRepository }
    }

    it('should delete transaction successfully', async () => {
        // Arrange
        const { sut } = makeSut()
        const id = faker.string.uuid()

        // Act
        const result = await sut.execute(id)

        // Assert
        expect(result).toEqual({
            ...createTransactionParams,
            id: id,
        })
    })
})
