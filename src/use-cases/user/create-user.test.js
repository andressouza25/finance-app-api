import { faker } from '@faker-js/faker'
import { CreateUserUseCase } from './create-user'
import { EmailAlreadyInUseError } from '../../errors/user'

describe('CreateUserUseCase', () => {
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
    const user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
            length: 7,
        }),
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
        const createdUser = await sut.execute(user)

        // Assert
        expect(createdUser).toBeTruthy()
    })
    it('should throw an EmailAlreadyInUseError if GetUserByEmailRepository returns a user', async () => {
        // Arrange
        const { sut, getUserByEmailRepository } = makeSut()
        jest.spyOn(getUserByEmailRepository, 'execute').mockReturnValueOnce(
            user,
        )

        // Act
        const promise = sut.execute(user)

        // Assert
        await expect(promise).rejects.toThrow(
            new EmailAlreadyInUseError(user.email),
        )
    })
    it('should call Id GeneratorAdapter to generate a random id ', async () => {
        // Arrange
        const { sut, idGeneratorAdapter, createUserUseRepository } = makeSut()
        const idGeneratorSpy = jest.spyOn(idGeneratorAdapter, 'execute')
        const createUserUseRepositorySpy = jest.spyOn(
            createUserUseRepository,
            'execute',
        )

        // Act
        await sut.execute(user)

        // Assert
        expect(idGeneratorSpy).toHaveBeenCalled()
        expect(createUserUseRepositorySpy).toHaveBeenCalledWith({
            ...user,
            password: 'hashed_password',
            id: 'generated_id',
        })
    })
    it('should throw an EmailAlreadyInUseError if GetUserByEmailRepository returns a user', async () => {
        // Arrange
        const { sut, getUserByEmailRepository } = makeSut()
        jest.spyOn(getUserByEmailRepository, 'execute').mockReturnValueOnce(
            user,
        )

        // Act
        const promise = sut.execute(user)

        // Assert
        await expect(promise).rejects.toThrow(
            new EmailAlreadyInUseError(user.email),
        )
    })
    it('should call PasswordHasherAdapter to cryptograph password', async () => {
        // Arrange
        const { sut, createUserUseRepository, passwordHasherAdapter } =
            makeSut()
        const passwordHasherSpy = jest.spyOn(passwordHasherAdapter, 'execute')
        const createUserUseRepositorySpy = jest.spyOn(
            createUserUseRepository,
            'execute',
        )

        // Act
        await sut.execute(user)

        // Assert
        expect(passwordHasherSpy).toHaveBeenCalledWith(user.password)
        expect(createUserUseRepositorySpy).toHaveBeenCalledWith({
            ...user,
            password: 'hashed_password',
            id: 'generated_id',
        })
    })
    it('should throw if GetUserByEmailRepository', async () => {
        // Arrange
        const { sut, getUserByEmailRepository } = makeSut()
        jest.spyOn(getUserByEmailRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        // Act
        const promise = sut.execute(user)

        // Assert
        await expect(promise).rejects.toThrow()
    })
})
