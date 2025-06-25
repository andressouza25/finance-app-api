import { userNotFoundResponse } from '../../controllers/helpers.js'

export class GetTransactionByUserId {
    constructor(getTransactionByUserIdRepository, getUserByIdRepository) {
        this.getTransactionByUserIdRepository = getTransactionByUserIdRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            return userNotFoundResponse()
        }

        const transaction = await this.getTransactionByUserIdRepository.execute(
            params.userId,
        )

        return transaction
    }
}
