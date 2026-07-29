import {createMetadataWithJwt} from "../../utils/grpc-request-metadata";
import authClient from "../../infrastructure/grpc/clients/auth.client";
import * as authProto from "../../contracts/proto/auth";

export class GetMeUseCase {
    async execute(
        jwt: string,
    ): Promise<authProto.UserResponse | null> {
        return authClient.getMe(createMetadataWithJwt(jwt));
    }
}

const getMeUseCase = new GetMeUseCase();

export default getMeUseCase;

