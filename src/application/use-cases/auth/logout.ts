import * as responseProto from "../../../contracts/proto/common/response";
import authClient from "../../../infrastructure/grpc/clients/auth.client";
import AuthHelper from "../../../infrastructure/grpc/helpers/auth.helper";
import AccessToken from "../../../domain/common/value-objects/access-token.vo";

export class LogoutUseCase {
    async execute(
        accessToken: AccessToken,
    ): Promise<responseProto.EmptyResponse | null> {
        return authClient.logout(AuthHelper.getMetadata(accessToken));
    }
}

export default LogoutUseCase;

