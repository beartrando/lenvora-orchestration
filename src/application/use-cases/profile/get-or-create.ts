import * as profileProto from "../../../contracts/proto/profile";
import profileClient from "../../../infrastructure/grpc/clients/profile.client";
import AuthHelper from "../../../infrastructure/grpc/helpers/auth.helper";

export class GetOrCreateUseCase {
    async execute(
        jwt: string,
    ): Promise<profileProto.ProfileResponse | null> {
        return profileClient.getOrCreate(AuthHelper.getMetadata(jwt));
    }
}


export default GetOrCreateUseCase;

