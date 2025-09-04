import { faker } from '@faker-js/faker'
import { UpdateTransactionUseCase } from './update-transaction'
import { transaction } from '../../tests'

describe('UpdateTransactionUseCase', () => {
    class UpdateTransactionRepositoryStub {
        async execute(transactionId) {
            return {
                id: transactionId,
                ...transaction,
            }
        }
    }

    class GetTransactionByIdRepositoryStub {
        async execute() {
            return transaction
        }
    }
    const makeSut = () => {
        const updateTransactionRepository =
            new UpdateTransactionRepositoryStub()
        const getTransactionByIdRepository =
            new GetTransactionByIdRepositoryStub()
        const sut = new UpdateTransactionUseCase(
            updateTransactionRepository,
            getTransactionByIdRepository,
        )

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
        expect(result).toEqual(transaction)
    })
    it('should call UpdateTransactionRepository with correct params', async () => {
        // Arrange
        const { sut, updateTransactionRepository } = makeSut()
        const updateTransactionRepositorySpy = import.meta.jest.spyOn(
            updateTransactionRepository,
            'execute',
        )

        // Act
        await sut.execute(transaction.id, {
            amount: transaction.amount,
        })

        // Assert
        expect(updateTransactionRepositorySpy).toHaveBeenCalledWith(
            transaction.id,
            {
                amount: transaction.amount,
            },
        )
    })
    it('should throw if UpdateTransactionRepository throws', async () => {
        // Arrange
        const { sut, updateTransactionRepository } = makeSut()
        import.meta.jest
            .spyOn(updateTransactionRepository, 'execute')
            .mockImplementationOnce(() => {
                throw new Error()
            })

        // Act
        const promise = sut.execute(transaction.id, {
            amount: transaction.amount,
        })

        // Assert
        await expect(promise).rejects.toThrow()
    })
})
