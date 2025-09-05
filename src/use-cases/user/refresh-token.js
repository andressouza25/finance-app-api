import { UnauthorizedError } from '../../errors/user.js'

export class RefreshTokensUseCase {
    constructor(tokensGeneratorAdapter, tokenVerifierAdapter) {
        this.tokensGeneratorAdapter = tokensGeneratorAdapter
        this.tokenVerifierAdapter = tokenVerifierAdapter
    }

    execute(refreshToken) {
        // verificar se o refreshToken é valido
        try {
            const decodedToken = this.tokenVerifierAdapter.execute(
                refreshToken,
                process.env.JWT_REFRESH_TOKEN_SECRET,
            )
            if (!decodedToken) {
                throw new UnauthorizedError()
            }
            return this.tokensGeneratorAdapter.execute(decodedToken.userId)
        } catch (error) {
            console.log(error)
            throw new UnauthorizedError()
        }
    }
}
