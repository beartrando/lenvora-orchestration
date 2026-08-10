import * as orchestrationProto from "../../../contracts/proto/orchestration";
import * as profileProto from "../../../contracts/proto/profile";
import response from "../adapter/response";
import parseQueryParams from "../utils/parse-query-params";
import jwtFromProxyRequest from "../utils/jwt-from-proxy-request";
import GetProfileByUserUseCase from "../../../application/use-cases/profile/get-profile-by-user";
import GetProfileUseCase from "../../../application/use-cases/profile/get-profile";
import AuthService from "../../auth/service";
import Id from "../../../domain/common/value-objects/id.vo";

export class ProfileController {

    constructor(
        private readonly authService: AuthService,
        private readonly getProfileByUserUseCase: GetProfileByUserUseCase,
        private readonly getUseCase: GetProfileUseCase,
    ) {
    }

    async getMe(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {
        const accessToken = jwtFromProxyRequest(request);
        const userId = this.authService.verifyAccessToken(accessToken);
        const profile = await this.getProfileByUserUseCase.execute(userId, accessToken);

        return response.ok(profile);
    }

    async get(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {

        const {profileId} = parseQueryParams<profileProto.ProfileIdRequest>(request.queryParams);

        // logger.log(request.body);
        // logger.log(profileId);
        const accessToken = jwtFromProxyRequest(request);

        const profile = await this.getUseCase.execute(new Id(profileId), accessToken);

        return response.ok(profile);
    }
}

export default ProfileController;
