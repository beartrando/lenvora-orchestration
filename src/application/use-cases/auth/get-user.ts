import authClient from "../../../infrastructure/grpc/clients/auth.client";
import * as authProto from "../../../contracts/proto/auth";
import AuthHelper from "../../../infrastructure/grpc/helpers/auth.helper";
import AccessToken from "../../../domain/value-objects/access-token.vo";
import Id from "../../../domain/value-objects/id.vo";

export class GetUserUseCase {
    async execute(
        userId: Id,
        accessToken: AccessToken,
    ): Promise<authProto.UserResponse | null> {
        const request: authProto.UserIdRequest = {userId: userId.value};
        return authClient.get(
            request,
            AuthHelper.getMetadata(accessToken)
        );
    }
}

export default GetUserUseCase;

