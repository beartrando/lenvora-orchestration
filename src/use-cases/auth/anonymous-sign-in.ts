import authClient from "../../infrastructure/grpc/clients/auth.client";
import * as authProto from "../../contracts/proto/auth";
import getOrCreateUseCase from "../profile/get-or-create";

export class AnonymousSignInUseCase {

    async execute(
        deviceId: string,
    ): Promise<authProto.AuthResponse | null> {
        const grpcRequest: authProto.AnonymousSignInRequest = {deviceId};
        return await authClient.anonymousSignIn(grpcRequest);
    }
}

const anonymousSignInUseCase =
    new AnonymousSignInUseCase();

export default anonymousSignInUseCase;

