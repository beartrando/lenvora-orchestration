import authClient from "../../../infrastructure/grpc/clients/auth.client";
import * as authProto from "../../../contracts/proto/auth";
import AuthHelper from "../../../infrastructure/grpc/helpers/auth.helper";

export class GetMeUseCase {
    async execute(
        jwt: string,
    ): Promise<authProto.UserResponse | null> {
        return authClient.getMe(AuthHelper.getMetadata(jwt));
    }
}

export default GetMeUseCase;

