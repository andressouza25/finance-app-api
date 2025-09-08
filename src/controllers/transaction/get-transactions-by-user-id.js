import { ZodError } from 'zod'
import { UserNotFoundError } from '../../errors/user.js'
import { getTransactionByUserIdSchema } from '../../schemas/transaction.js'
import {
    badRequest,
    ok,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'

export class GetTransactionsByUserIdController {
    constructor(getTransactionByUserIdUseCase) {
        this.getTransactionByUserIdUseCase = getTransactionByUserIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId
            const from = httpRequest.query.from
            const to = httpRequest.query.to

            await getTransactionByUserIdSchema.parseAsync({
                user_id: userId,
                from,
                to,
            })

            const transactions =
                await this.getTransactionByUserIdUseCase.execute(
                    userId,
                    from,
                    to,
                )

            return ok(transactions)
        } catch (error) {
            console.log(error)
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0].message,
                })
            }

            return serverError()
        }
    }
}
