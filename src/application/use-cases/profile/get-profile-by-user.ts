import profileClient from "../../../infrastructure/grpc/clients/profile.client";
import * as profileProto from "../../../contracts/proto/profile";
import * as authProto from "../../../contracts/proto/auth";
import AuthHelper from "../../../infrastructure/grpc/helpers/auth.helper";
import UserId from "../../../domain/user/value-objects/user-id.vo";
import SessionAccessToken from "../../../domain/session/value-objects/session-access-token.vo";

export class GetProfileByUserUseCase {
    async execute(
        userId: UserId,
        accessToken: SessionAccessToken,
    ): Promise<profileProto.ProfileResponse | null> {
        const request = authProto.UserIdRequest.create({userId: userId.value});
        return profileClient.getByUser(
            request,
            AuthHelper.getMetadata(accessToken)
        );
    }
}


export default GetProfileByUserUseCase;
