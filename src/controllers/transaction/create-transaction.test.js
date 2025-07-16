import { faker } from '@faker-js/faker'
import { CreateTransactionController } from './create-transaction.js'

describe('CreateTransactionController', () => {
    class CreateTransactionUseCaseStub {
        async execute(transaction) {
            return transaction
        }
    }
    const makeSut = () => {
        const createTransactionUseCase = new CreateTransactionUseCaseStub()
        const sut = new CreateTransactionController(createTransactionUseCase)

        return { sut, createTransactionUseCase }
    }

    const httpRequest = {
        body: {
            user_id: faker.string.uuid(),
            name: faker.commerce.productName(),
            date: faker.date.anytime().toISOString(),
            type: 'EXPENSE',
            amount: Number(faker.finance.amount()),
        },
    }

    it('should return 201 when creating transaction successfully', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(201)
    })
    it('should return 400 when missing user_id', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                user_id: undefined,
            },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })
    it('should return 400 when missing name', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                name: undefined,
            },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })
    it('should return 400 when missing date', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                date: undefined,
            },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })
})
