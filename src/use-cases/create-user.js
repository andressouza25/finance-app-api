import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user'

export class CreateUserUseCase {
    async execute(createUserParams) {
        // To Do: Verificar se o e-mail já está em uso:

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
