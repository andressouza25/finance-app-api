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
    it('should call UpdateTransactionRepository with correct params', async () => {
        // Arrange
        const { sut, updateTransactionRepository } = makeSut()
        const updateTransactionRepositorySpy = jest.spyOn(
            updateTransactionRepository,
            'execute',
        )

        // Act
        await sut.execute(createTransactionParams.id, {
            amount: createTransactionParams.amount,
        })

        // Assert
        expect(updateTransactionRepositorySpy).toHaveBeenCalledWith(
            createTransactionParams.id,
            {
                amount: createTransactionParams.amount,
            },
        )
    })
    it('should throw if UpdateTransactionRepository throws', async () => {
        // Arrange
        const { sut, updateTransactionRepository } = makeSut()
        jest.spyOn(
            updateTransactionRepository,
            'execute',
        ).mockImplementationOnce(() => {
            throw new Error()
        })

        // Act
        const promise = sut.execute(createTransactionParams.id, {
            amount: createTransactionParams.amount,
        })

        // Assert
        await expect(promise).rejects.toThrow()
    })
})
