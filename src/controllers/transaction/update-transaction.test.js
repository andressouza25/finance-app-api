import { faker } from '@faker-js/faker'
import { UpdateTransactionController } from './update-transaction'
import { transaction } from '../../tests'
import { TransactionNotFoundError } from '../../errors'

describe('UpdateTransactionController', () => {
    class UpdateTransactionUseCaseStub {
        async execute() {
            return transaction
        }
    }
    const makeSut = () => {
        const updateTransactionUseCase = new UpdateTransactionUseCaseStub()
        const sut = new UpdateTransactionController(updateTransactionUseCase)

        return { sut, updateTransactionUseCase }
    }

    const httpRequest = {
        params: {
            transactionId: faker.string.uuid(),
        },
        body: {
            name: faker.commerce.productName(),
            date: faker.date.anytime().toISOString(),
            type: 'EXPENSE',
            amount: Number(faker.finance.amount()),
        },
    }

    it('should return 200 when updating a transaction successfully', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(200)
    })
    it('should return 400 when transaction id is invalid', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute({
            params: { transactionId: 'invalid_id' },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when amount is invalid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                amount: 'invalid_amount', // sem body extra
            },
        })

        expect(result.statusCode).toBe(400)
    })
    it('should return 400 when type is invalid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                type: 'invalid_type', // sem body extra
            },
        })

        expect(result.statusCode).toBe(400)
    })
    it('should return 500 when UpdateTransactionUseCase throws', async () => {
        // Arrange
        const { sut, updateTransactionUseCase } = makeSut()
        import.meta.jest
            .spyOn(updateTransactionUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        // Act
        const result = await sut.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(500)
    })
    it('should call UpdateTransactionUseCase with correct params', async () => {
        // Arrange
        const { sut, updateTransactionUseCase } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            updateTransactionUseCase,
            'execute',
        )

        // Act
        await sut.execute(httpRequest)

        // Assert
        expect(executeSpy).toHaveBeenCalledWith(
            httpRequest.params.transactionId,
            httpRequest.body,
        )
    })

    it('should return 404 when TransactionNotFoundError is thrown', async () => {
        // Arrange
        const { sut, updateTransactionUseCase } = makeSut()
        import.meta.jest
            .spyOn(updateTransactionUseCase, 'execute')
            .mockRejectedValueOnce(new TransactionNotFoundError())

        // Act
        const result = await sut.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(404)
    })
})
