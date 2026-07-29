import * as profileProto from "../../../contracts/proto/profile";
import profileClient from "../../../infrastructure/grpc/clients/profile.client";
import metadataWithJwt from "../../../infrastructure/grpc/jwt/metadata-with-jwt";

export class GetUseCase {
    async execute(
        profileId: string,
        jwt: string,
    ): Promise<profileProto.ProfileResponse | null> {
        return profileClient.getOrCreate(
            metadataWithJwt(jwt),
        );
    }
}


export default GetUseCase;

