import * as responseProto from "../../../contracts/proto/common/response";
import authClient from "../../../infrastructure/grpc/clients/auth.client";
import AuthHelper from "../../../infrastructure/grpc/helpers/auth.helper";

export class LogoutUseCase {
    async execute(
        jwt: string,
    ): Promise<responseProto.EmptyResponse | null> {
        return authClient.logout(AuthHelper.getMetadata(jwt));
    }
}

export default LogoutUseCase;

