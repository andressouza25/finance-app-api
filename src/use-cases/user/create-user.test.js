import { faker } from '@faker-js/faker'
import { CreateUserUseCase } from './create-user'

describe('Create User Use Case', () => {
    class GetUserByEmailRepositoryStub {
        async execute() {
            return null
        }
    }
    class CreateUserUseRepositoryStub {
        async execute(user) {
            return user
        }
    }
    class PasswordHasherAdapterStub {
        async execute() {
            return 'hashed_password'
        }
    }
    class IdGeneratorAdapterStub {
        async execute() {
            return 'generated_id'
        }
    }
    const makeSut = () => {
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub()
        const createUserUseRepository = new CreateUserUseRepositoryStub()
        const passwordHasherAdapter = new PasswordHasherAdapterStub()
        const idGeneratorAdapter = new IdGeneratorAdapterStub()

        const sut = new CreateUserUseCase(
            getUserByEmailRepository,
            createUserUseRepository,
            passwordHasherAdapter,
            idGeneratorAdapter,
        )

        return {
            sut,
            getUserByEmailRepository,
            createUserUseRepository,
            passwordHasherAdapter,
            idGeneratorAdapter,
        }
    }

    it('should successfully create a user', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const createdUser = await sut.execute({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        })

        // Assert
        expect(createdUser).toBeTruthy()
    })
})
