import * as orchestrationProto from "../../../contracts/proto/orchestration";
import * as profileProto from "../../../contracts/proto/profile";
import response from "../adapter/response";
import parseQueryParams from "../utils/parse-query-params";
import jwtFromProxyRequest from "../utils/jwt-from-proxy-request";
import GetMeUseCase from "../../../application/use-cases/profile/get-me";
import GetUseCase from "../../../application/use-cases/profile/get";

export class ProfileController {

    constructor(
        private readonly getMeUseCase: GetMeUseCase,
        private readonly getUseCase: GetUseCase,
    ) {
    }

    async getMe(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {
        const jwt = jwtFromProxyRequest(request);

        const profile = await this.getMeUseCase.execute(jwt);

        return response.ok(profile);
    }

    async get(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {

        const {profileId} = parseQueryParams<profileProto.ProfileIdRequest>(request.queryParams);

        // logger.log(request.body);
        // logger.log(profileId);
        const jwt = jwtFromProxyRequest(request);

        const profile = await this.getUseCase.execute(profileId, jwt);

        return response.ok(profile);
    }
}

export default ProfileController;
