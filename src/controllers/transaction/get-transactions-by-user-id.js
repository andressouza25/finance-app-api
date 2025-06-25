import { UserNotFoundError } from '../../errors/user.js'
import {
    checkIfTypeIsValid,
    invalidIdResponse,
    ok,
    requiredFieldsMissingResponse,
    serverError,
    userNotFoundResponse,
} from '../helpers'

export class GetTransactionByUserId {
    constructor(getTransactionByUserIdUseCase) {
        this.getTransactionByUserIdUseCase = getTransactionByUserIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId

            if (!userId) {
                return requiredFieldsMissingResponse('userId')
            }

            const userIdIsValid = checkIfTypeIsValid(userId)

            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            const transactions =
                await this.getTransactionByUserIdUseCase.execute({
                    userId,
                })

            return ok(transactions)
        } catch (error) {
            console.log(error)
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }

            return serverError()
        }
    }
}
