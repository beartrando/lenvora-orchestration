import {createMetadataWithJwt} from "../../utils/grpc-request-metadata";
import profileClient from "../../grpc/clients/profile.client";
import * as profileGrpc from "../../grpc/generated/profile";

export class GetMeUseCase {
    async execute(
        jwt: string,
    ): Promise<profileGrpc.ProfileResponse | null> {
        return profileClient.getMe(createMetadataWithJwt(jwt));
    }
}

const getMeUseCase = new GetMeUseCase();

export default getMeUseCase;

