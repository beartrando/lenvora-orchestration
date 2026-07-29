import * as authProto from "../../contracts/proto/auth";
import authClient from "../../infrastructure/grpc/clients/auth.client";

export class RefreshTokensUseCase {
    async execute(
        token: string,
    ): Promise<authProto.AuthResponse | null> {
        const grpcRequest = authProto.RefreshTokensRequest.create({token});
        return authClient.refreshTokens(grpcRequest);
    }
}

const refreshTokensUseCase =
    new RefreshTokensUseCase();

export default refreshTokensUseCase;

