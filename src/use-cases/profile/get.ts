import * as profileProto from "../../contracts/proto/profile";
import {createMetadataWithJwt} from "../../utils/grpc-request-metadata";
import profileClient from "../../infrastructure/grpc/clients/profile.client";

export class GetUseCase {
    async execute(
        profileId: string,
        jwt: string,
    ): Promise<profileProto.ProfileResponse | null> {
        return profileClient.getOrCreate(
            createMetadataWithJwt(jwt),
        );
    }
}

export const getUseCase =
    new GetUseCase();

export default getUseCase;

