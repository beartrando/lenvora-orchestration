import authClient from "../../../infrastructure/grpc/clients/auth.client";
import * as authProto from "../../../contracts/proto/auth";
import AuthHelper from "../../../infrastructure/grpc/helpers/auth.helper";
import SessionAccessToken from "../../../domain/session/value-objects/session-access-token.vo";
import UserId from "../../../domain/user/value-objects/user-id.vo";

export class GetUserUseCase {
    async execute(
        userId: UserId,
        accessToken: SessionAccessToken,
    ): Promise<authProto.UserResponse | null> {
        const request: authProto.UserIdRequest = {userId: userId.value};
        return authClient.get(
            request,
            AuthHelper.getMetadata(accessToken)
        );
    }
}

export default GetUserUseCase;
