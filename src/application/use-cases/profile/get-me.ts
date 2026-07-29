import profileClient from "../../../infrastructure/grpc/clients/profile.client";
import * as profileProto from "../../../contracts/proto/profile";
import metadataWithJwt from "../../../infrastructure/grpc/jwt/metadata-with-jwt";

export class GetMeUseCase {
    async execute(
        jwt: string,
    ): Promise<profileProto.ProfileResponse | null> {
        return profileClient.getMe(metadataWithJwt(jwt));
    }
}


export default GetMeUseCase;

