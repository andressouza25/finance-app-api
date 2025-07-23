import { faker } from '@faker-js/faker'
import { CreateTransactionUseCase } from './create-transaction'

describe('CreateTransactionUseCase', () => {
    const createTransactionParams = {
        id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        name: faker.commerce.productName(),
        date: faker.date.anytime().toISOString(),
        type: 'EXPENSE',
        amount: Number(faker.finance.amount()),
    }
    const user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
            length: 7,
        }),
    }
    class CreateTransactionRepositoryStub {
        async execute(transaction) {
            return transaction
        }
    }
    class GetUserByIdRepositoryStub {
        async execute(userId) {
            return { ...user, id: userId }
        }
    }
    class IdGeneratorAdapterStub {
        async execute() {
            return 'random_id'
        }
    }

    const makeSut = () => {
        const createTransactionRepository =
            new CreateTransactionRepositoryStub()
        const getUserByIdRepository = new GetUserByIdRepositoryStub()
        const idGeneratorAdapter = new IdGeneratorAdapterStub()
        const sut = new CreateTransactionUseCase(
            createTransactionRepository,
            getUserByIdRepository,
            idGeneratorAdapter,
        )

        return {
            sut,
            createTransactionRepository,
            getUserByIdRepository,
            idGeneratorAdapter,
        }
    }

    it('should create transaction successfully', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute(createTransactionParams)

        // Assert
        expect(result).toEqual({ ...createTransactionParams, id: 'random_id' })
    })
    it('should call GetUserByIdRepository with correct params', async () => {
        // Arrange
        const { sut, getUserByIdRepository } = makeSut()
        const getUserByIdRepositorySpy = jest.spyOn(
            getUserByIdRepository,
            'execute',
        )

        // Act
        await sut.execute(createTransactionParams)

        // Assert
        expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(
            createTransactionParams.user_id,
        )
    })
})
