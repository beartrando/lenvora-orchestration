import profileClient from "../../../infrastructure/grpc/clients/profile.client";
import * as profileProto from "../../../contracts/proto/profile";
import AuthHelper from "../../../infrastructure/grpc/helpers/auth.helper";

export class GetMeUseCase {
    async execute(
        jwt: string,
    ): Promise<profileProto.ProfileResponse | null> {
        return profileClient.getMe(AuthHelper.getMetadata(jwt));
    }
}


export default GetMeUseCase;

