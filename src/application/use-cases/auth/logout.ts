import * as responseProto from "../../../contracts/proto/common/response";
import authClient from "../../../infrastructure/grpc/clients/auth.client";
import metadataWithJwt from "../../../infrastructure/grpc/jwt/metadata-with-jwt";

export class LogoutUseCase {
    async execute(
        jwt: string,
    ): Promise<responseProto.EmptyResponse | null> {
        return authClient.logout(metadataWithJwt(jwt));
    }
}

export default LogoutUseCase;

