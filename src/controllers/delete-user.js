import {
    checkIfIdIsValid,
    invalidIdResopnse,
    serverError,
    ok,
} from './helpers/index.js'
import { DeleteUserUseCase } from '../use-cases/index.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.useId
            const idIsValid = checkIfIdIsValid(userId)

            if (!idIsValid) {
                return invalidIdResopnse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const deleteduser = await deleteUserUseCase.execute(userId)

            return ok(deleteduser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
