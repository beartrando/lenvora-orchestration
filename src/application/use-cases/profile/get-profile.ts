import * as profileProto from "../../../contracts/proto/profile";
import profileClient from "../../../infrastructure/grpc/clients/profile.client";
import AuthHelper from "../../../infrastructure/grpc/helpers/auth.helper";
import AccessToken from "../../../domain/value-objects/access-token.vo";
import Id from "../../../domain/value-objects/id.vo";

export class GetProfileUseCase {
    async execute(
        profileId: Id,
        accessToken: AccessToken,
    ): Promise<profileProto.ProfileResponse | null> {
        const request = profileProto.ProfileIdRequest.create({profileId: profileId.value})
        return profileClient.get(
            request,
            AuthHelper.getMetadata(accessToken),
        );
    }
}


export default GetProfileUseCase;

