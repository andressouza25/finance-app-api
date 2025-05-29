import validator from 'validator'
import { notFound, ok, serverError } from './helpers/http.js'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { invalidIdResopnse } from './helpers/user.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = validator.isUUID(httpRequest.params.userId)

            if (!isIdValid) {
                return invalidIdResopnse()
            }

            const getUserByIdCase = new GetUserByIdUseCase()

            const user = await getUserByIdCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return notFound({
                    message: 'User not found.',
                })
            }

            return ok(user)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
