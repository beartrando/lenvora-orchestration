import authClient from "../../../infrastructure/grpc/clients/auth.client";
import * as authProto from "../../../contracts/proto/auth";
import metadataWithJwt from "../../../infrastructure/grpc/jwt/metadata-with-jwt";

export class GetMeUseCase {
    async execute(
        jwt: string,
    ): Promise<authProto.UserResponse | null> {
        return authClient.getMe(metadataWithJwt(jwt));
    }
}

export default GetMeUseCase;

