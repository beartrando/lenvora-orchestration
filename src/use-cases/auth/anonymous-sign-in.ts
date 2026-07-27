import authClient from "../../grpc/clients/auth.client";
import * as authGrpc from "../../grpc/generated/auth";
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

