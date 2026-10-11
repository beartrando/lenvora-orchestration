import * as profileProto from "../../../contracts/proto/profile";
import profileClient from "../../../infrastructure/grpc/clients/profile.client";
import AuthHelper from "../../../infrastructure/grpc/helpers/auth.helper";
import SessionAccessToken from "../../../domain/session/value-objects/session-access-token.vo";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";

export class GetProfileUseCase {
    async execute(
        profileId: ProfileId,
        accessToken: SessionAccessToken,
    ): Promise<profileProto.ProfileResponse | null> {
        const request = profileProto.ProfileIdRequest.create({profileId: profileId.value})
        return profileClient.get(
            request,
            AuthHelper.getMetadata(accessToken),
        );
    }
}


export default GetProfileUseCase;
