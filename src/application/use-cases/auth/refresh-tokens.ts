import * as authProto from "../../../contracts/proto/auth";
import authClient from "../../../infrastructure/grpc/clients/auth.client";

export class RefreshTokensUseCase {
    async execute(
        token: string,
    ): Promise<authProto.AuthResponse | null> {
        const request = authProto.RefreshTokensRequest.create({token});
        return authClient.refreshTokens(request);
    }
}

export default RefreshTokensUseCase;

