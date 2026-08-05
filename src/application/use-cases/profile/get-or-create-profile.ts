import * as profileProto from "../../../contracts/proto/profile";
import profileClient from "../../../infrastructure/grpc/clients/profile.client";
import AuthHelper from "../../../infrastructure/grpc/helpers/auth.helper";
import AccessToken from "../../../domain/value-objects/access-token.vo";

export class GetOrCreateProfileUseCase {
    async execute(
        accessToken: AccessToken,
    ): Promise<profileProto.ProfileResponse | null> {
        return profileClient.getOrCreate(AuthHelper.getMetadata(accessToken));
    }
}


export default GetOrCreateProfileUseCase;

