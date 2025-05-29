import { GetUserByIdUseCase } from '../use-cases/index.js'
import {
    checkIfIdIsValid,
    invalidIdResopnse,
    notFound,
    ok,
    serverError,
} from './helpers/index.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.userId)

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
