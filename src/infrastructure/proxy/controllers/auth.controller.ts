import * as orchestrationProto from "../../../contracts/proto/orchestration";
import * as authProto from "../../../contracts/proto/auth";
import * as responseProto from "../../../contracts/proto/common/response";
import ResponseAdapter from "../adapter/response";
import parseBody from "../utils/parse-body";
import AnonymousSignInUseCase from "../../../application/use-cases/auth/anonymous-sign-in";
import GetOrCreateProfileUseCase from "../../../application/use-cases/profile/get-or-create-profile";
import GetUserUseCase from "../../../application/use-cases/auth/get-user";
import RefreshTokensUseCase from "../../../application/use-cases/auth/refresh-tokens";
import LogoutUseCase from "../../../application/use-cases/auth/logout";
import jwtFromProxyRequest from "../utils/jwt-from-proxy-request";
import AuthService from "../../auth/service";
import SessionAccessToken from "../../../domain/session/value-objects/session-access-token.vo";
import logger from "@shared/logger";
import {InvalidResponseError, ServiceUnavailableError} from "@shared/errors";


export class AuthController {

    constructor(
        private readonly responseAdapter: ResponseAdapter,
        private readonly authService: AuthService,
        private readonly anonymousSignInUseCase: AnonymousSignInUseCase,
        private readonly getOrCreateProfileUseCase: GetOrCreateProfileUseCase,
        private readonly getUserUseCase: GetUserUseCase,
        private readonly refreshTokensUseCase: RefreshTokensUseCase,
        private readonly logoutUseCase: LogoutUseCase,
    ) {
    }

    async anonymousSignIn(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {

        const {deviceId} = parseBody<authProto.AnonymousSignInRequest>(request.body);

        const resp = await this.anonymousSignInUseCase.execute(deviceId);

        if (!resp) {
            throw new ServiceUnavailableError("Auth");
        }

        if (resp.session?.accessToken) {
            await this.getOrCreateProfileUseCase.execute(new SessionAccessToken(resp.session.accessToken));
            // logger.log(resp);
            return this.responseAdapter.ok(resp);
        }

        throw new InvalidResponseError("Auth");
    }

    async getMe(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {
        const accessToken = jwtFromProxyRequest(request);
        const userId = this.authService.verifyAccessToken(accessToken);
        const resp = await this.getUserUseCase.execute(userId, accessToken);
        // logger.log(resp);

        return this.responseAdapter.ok(resp);
    }

    async verify(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {
        const accessToken = jwtFromProxyRequest(request);
        this.authService.verifyAccessToken(accessToken);
        const success = true;
        const resp = responseProto.SuccessResponse.create({success})
        // logger.log(resp);
        return this.responseAdapter.ok(resp);
    }

    async refreshTokens(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {
        const {token} = parseBody<authProto.RefreshTokensRequest>(request.body);
        const resp = await this.refreshTokensUseCase.execute(token);
        // logger.log(resp);
        return this.responseAdapter.ok(resp);
    }


    async logout(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {
        const accessToken = jwtFromProxyRequest(request);

        const resp = await this.logoutUseCase.execute(accessToken);
        return this.responseAdapter.ok(resp);
    }

// export const forgotPassword = wrapper(async (req, res) => {
//   const email = req.body.email;
//   return authService.forgotPassword(email);
// });
//
// export const resetPassword = wrapper(async (req, res) => {
//   const {token, newPassword} = req.body;
//   return authService.resetPassword(token, newPassword);
// });

}

export default AuthController;
