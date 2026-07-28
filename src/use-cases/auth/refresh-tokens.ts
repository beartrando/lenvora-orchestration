import * as authGrpc from "../../contracts/proto/generated/auth";
import authClient from "../../infrastructure/grpc/clients/auth.client";

export class RefreshTokensUseCase {
    async execute(
        token: string,
    ): Promise<authGrpc.AuthResponse | null> {
        const grpcRequest = authGrpc.RefreshTokensRequest.create({token});
        return authClient.refreshTokens(grpcRequest);
    }
}

const refreshTokensUseCase =
    new RefreshTokensUseCase();

export default refreshTokensUseCase;

