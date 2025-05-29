import { PostgresDeleteuUserRepository } from '../repositories/postgres/index.js'

export class DeleteUserUseCase {
    async execute(userId) {
        const postgresDeleteUserRepository = new PostgresDeleteuUserRepository()

        const deletedUser = postgresDeleteUserRepository.execute(userId)

        return deletedUser
    }
}
