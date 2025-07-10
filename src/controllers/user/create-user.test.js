import { CreateUserController } from './create-user'

describe('Create User Controller', () => {
    class CreateUserUserCaseStub {
        execute(user) {
            return user
        }
    }

    it('should return 201 when creating an user successfully', async () => {
        // Arrange
        const createUserUseCase = new CreateUserUserCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: 'André',
                last_name: 'Santos',
                email: 'santos@gmail.com',
                password: '123456',
            },
        }

        // Act
        const result = await createUserController.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(201)
        expect(result.body).not.toBeUndefined()
        expect(result.body).not.toBeNull()
    })
})
