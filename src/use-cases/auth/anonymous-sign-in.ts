import * as profileGrpc from "../../grpc/generated/profile";
import {createMetadataWithJwt} from "../../utils/grpc-request-metadata";
import * as profileClient from "../../grpc/clients/profile.client";

export class AnonymousSignInUseCase {
    async execute(
        deviceId: string,
    ): Promise<profileGrpc.ProfileResponse> {
        return authClient.getOrCreate(
            createMetadataWithJwt(jwt),
        );
    }
}

const anonymousSignInUseCase =
    new AnonymousSignInUseCase();

export default anonymousSignInUseCase;

