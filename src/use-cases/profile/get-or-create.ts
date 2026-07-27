import * as profileGrpc from "../../grpc/generated/profile";
import {createMetadataWithJwt} from "../../utils/grpc-request-metadata";
import * as profileClient from "../../grpc/clients/profile.client";

export class GetOrCreateUseCase {
    async execute(
        jwt: string,
    ): Promise<profileGrpc.ProfileResponse> {
        return profileClient.getOrCreate(
            createMetadataWithJwt(jwt),
        );
    }
}

const getOrCreateUseCase =
    new GetOrCreateUseCase();

export default getOrCreateUseCase;

