import authClient from "../../../infrastructure/grpc/clients/auth.client";
import * as authProto from "../../../contracts/proto/auth";
import logger from "@shared/logger";

export class AnonymousSignInUseCase {

    async execute(
        deviceId: string,
    ): Promise<authProto.SessionResponse | null> {
        const request: authProto.AnonymousSignInRequest = {deviceId};
        const result =  await authClient.anonymousSignIn(request);
        // logger.log(result);
        return result;
    }
}

export default AnonymousSignInUseCase;
