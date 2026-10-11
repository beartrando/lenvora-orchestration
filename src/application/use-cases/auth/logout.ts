import * as responseProto from "../../../contracts/proto/common/response";
import authClient from "../../../infrastructure/grpc/clients/auth.client";
import AuthHelper from "../../../infrastructure/grpc/helpers/auth.helper";
import SessionAccessToken from "../../../domain/session/value-objects/session-access-token.vo";

export class LogoutUseCase {
    async execute(
        accessToken: SessionAccessToken,
    ): Promise<responseProto.SuccessResponse | null> {
        return authClient.logout(AuthHelper.getMetadata(accessToken));
    }
}

export default LogoutUseCase;
