import * as profileGrpc from "../../grpc/generated/profile";
import {createMetadataWithJwt} from "../../utils/grpc-request-metadata";
import profileClient from "../../grpc/clients/profile.client";

export class GetOrCreateUseCase {
    async execute(
        jwt: string,
    ): Promise<profileGrpc.ProfileResponse | null> {
        return profileClient.getOrCreate(
            createMetadataWithJwt(jwt),
        );
    }
}

export const getOrCreateUseCase =
    new GetOrCreateUseCase();

export default getOrCreateUseCase;

