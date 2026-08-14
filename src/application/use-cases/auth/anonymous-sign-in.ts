import authClient from "../../../infrastructure/grpc/clients/auth.client";
import * as authProto from "../../../contracts/proto/auth";
import logger from "@shared/logger";

export class AnonymousSignInUseCase {

    async execute(
        deviceId: string,
    ): Promise<authProto.AuthResponse | null> {
        const request: authProto.AnonymousSignInRequest = {deviceId};
        return await authClient.anonymousSignIn(request);
    }
}

export default AnonymousSignInUseCase;

