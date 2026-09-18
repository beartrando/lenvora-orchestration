import * as orchestrationProto from "../../../contracts/proto/orchestration";
import * as profileProto from "../../../contracts/proto/profile";
import ResponseAdapter from "../adapter/response";
import parseQueryParams from "../utils/parse-query-params";
import jwtFromProxyRequest from "../utils/jwt-from-proxy-request";
import GetProfileByUserUseCase from "../../../application/use-cases/profile/get-profile-by-user";
import GetProfileUseCase from "../../../application/use-cases/profile/get-profile";
import AuthService from "../../auth/service";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";
import logger from "@shared/logger";

export class ProfileController {

    constructor(
        private readonly responseAdapter: ResponseAdapter,
        private readonly authService: AuthService,
        private readonly getProfileByUserUseCase: GetProfileByUserUseCase,
        private readonly getUseCase: GetProfileUseCase,
    ) {
    }

    async getMe(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {
        logger.log(request);
        const accessToken = jwtFromProxyRequest(request);
        let userId;
        try {
            userId = this.authService.verifyAccessToken(accessToken);
        } catch (e) {
            throw e;
        }

        const profileResp = await this.getProfileByUserUseCase.execute(userId, accessToken);
        logger.log(profileResp);

        return this.responseAdapter.ok(profileResp);
    }

    async get(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {

        const {profileId} = parseQueryParams<profileProto.ProfileIdRequest>(request.queryParams);

        // logger.log(request.body);
        // logger.log(profileId);
        const accessToken = jwtFromProxyRequest(request);

        const profileResp = await this.getUseCase.execute(new ProfileId(profileId), accessToken);

        return this.responseAdapter.ok(profileResp);
    }
}

export default ProfileController;
