import { EmailAlreadyInUseError } from '../../errors/user'
import { CreateUserController } from './create-user'
import { faker } from '@faker-js/faker'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    const makeSut = () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const sut = new CreateUserController(createUserUseCase)

        return { createUserUseCase, sut }
    }

    const httpRequest = {
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        },
    }

    it('should return 201 when creating an user successfully', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(201)
        expect(result.body).not.toBeUndefined()
        expect(result.body).not.toBeNull()
    })

    it('should return 400 if first_name is not provided', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute({
            body: {
                ...httpRequest,
                first_name: undefined,
            },
        })
        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if last_name is not provided', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute({
            body: {
                ...httpRequest,
                last_name: undefined,
            },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is not provided', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute({
            body: {
                ...httpRequest,
                email: undefined,
            },
        })
        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is not valid', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute({
            body: {
                ...httpRequest,
                email: 'invalid_email',
            },
        })

        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if password is not provided', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute({
            body: {
                ...httpRequest,
                password: undefined,
            },
        })
        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if password is not valid', async () => {
        // Arrange
        const { sut } = makeSut()

        // Act
        const result = await sut.execute({
            body: {
                ...httpRequest,
                password: faker.internet.password({ length: 5 }),
            },
        })
        // Assert
        expect(result.statusCode).toBe(400)
    })

    it('should call CreateUserUseCase with corect params', async () => {
        // Arrange
        const { createUserUseCase, sut } = makeSut()
        const executeSpy = jest.spyOn(createUserUseCase, 'execute')

        // Act
        await sut.execute(httpRequest)

        // Assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    it('should return 500 if CreateUserUseCase throws ', async () => {
        // Arrange
        const { createUserUseCase, sut } = makeSut()
        jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error()
        })

        // Act
        const result = await sut.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(500)
    })

    it('should return 500 if CreateUserUseCase throws EmailAlreadyInUseError', async () => {
        // Arrange
        const { createUserUseCase, sut } = makeSut()
        jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new EmailAlreadyInUseError(httpRequest.body.email)
        })

        // Act
        const result = await sut.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(400)
    })
})
