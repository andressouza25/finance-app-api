import { EmailAlreadyInUseError, UserNotFoundError } from '../../errors/user.js'
import { updateUserSchame } from '../../schemas/user.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    badRequest,
    ok,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js'
import { ZodError } from 'zod'
export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const isIdValid = checkIfIdIsValid(userId)
            if (!isIdValid) {
                return invalidIdResponse()
            }

            const params = httpRequest.body

            await updateUserSchame.parseAsync(params)

            const updateUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )

            return ok(updateUser)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0].message,
                })
            }
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ messatge: error.message })
            }

            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }

            console.log(error)

            return serverError()
        }
    }
}
