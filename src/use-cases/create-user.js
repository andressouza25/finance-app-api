import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import {
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
} from '../repositories/postgres/index.js'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        // To Do: Verificar se o e-mail já está em uso:
        const postgresGetEmailByEmailRepository =
            new PostgresGetUserByEmailRepository()

        const userWithProvidedEmail =
            await postgresGetEmailByEmailRepository.execute(
                createUserParams.email,
            )

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }

        // Gerar ID do usuário:
        const userId = uuidv4()

        // Criptografar a senha:
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        // Inserir o usuário no DB:
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        // Chamar o repositório
        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createdUser = await postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
