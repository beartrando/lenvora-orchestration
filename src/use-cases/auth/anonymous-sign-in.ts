import authClient from "../../infrastructure/grpc/clients/auth.client";
import * as authGrpc from "../../contracts/proto/generated/auth";
import getOrCreateUseCase from "../profile/get-or-create";

export class AnonymousSignInUseCase {

    async execute(
        deviceId: string,
    ): Promise<authGrpc.AuthResponse | null> {
        const grpcRequest: authGrpc.AnonymousSignInRequest = {deviceId};
        return await authClient.anonymousSignIn(grpcRequest);
    }
}

const anonymousSignInUseCase =
    new AnonymousSignInUseCase();

export default anonymousSignInUseCase;

