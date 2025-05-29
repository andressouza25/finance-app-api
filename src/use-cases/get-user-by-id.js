import { PostgresGetUserByIdRepository } from '../repositories/postgres/index.js'

export class GetUserByIdUseCase {
    async execute(userId) {
        const getUseByIdRepository = new PostgresGetUserByIdRepository()

        const user = await getUseByIdRepository.execute(userId)

        return user
    }
}
