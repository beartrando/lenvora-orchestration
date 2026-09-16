import * as orchestrationProto from "../../../contracts/proto/orchestration";
import * as authProto from "../../../contracts/proto/auth";
import * as errorProto from "../../../contracts/proto/common/error";
import * as responseProto from "../../../contracts/proto/common/response";
import response from "../adapter/response";
import parseBody from "../utils/parse-body";
import responseFactory from "../response-factory";
import AnonymousSignInUseCase from "../../../application/use-cases/auth/anonymous-sign-in";
import GetOrCreateProfileUseCase from "../../../application/use-cases/profile/get-or-create-profile";
import GetUserUseCase from "../../../application/use-cases/auth/get-user";
import RefreshTokensUseCase from "../../../application/use-cases/auth/refresh-tokens";
import LogoutUseCase from "../../../application/use-cases/auth/logout";
import jwtFromProxyRequest from "../utils/jwt-from-proxy-request";
import AuthService from "../../auth/service";
import SessionAccessToken from "../../../domain/session/value-objects/session-access-token.vo";
import logger from "@shared/logger";


export class AuthController {

    constructor(
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
            return response.ok(
                responseFactory.error(
                    authProto.AuthResponse,
                    errorProto.ErrorCode.SERVICE_UNAVAILABLE,
                    "AuthObject service unavailable",
                )
            );
        }

        if (resp.error) {
            return response.ok(resp);
        }

        if (resp.auth?.accessToken) {
            await this.getOrCreateProfileUseCase.execute(new SessionAccessToken(resp.auth.accessToken));
            // logger.log(resp);
            return response.ok(resp);
        }

        return response.ok(
            responseFactory.error(
                authProto.AuthResponse,
                errorProto.ErrorCode.INVALID_RESPONSE,
                "AuthObject service returned invalid response",
            )
        );
    }

    async getMe(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {
        const accessToken = jwtFromProxyRequest(request);
        const userId = this.authService.verifyAccessToken(accessToken);
        const resp = response.ok(await this.getUserUseCase.execute(userId, accessToken));
        logger.log(resp);

        return response.ok(resp);
    }

    async verify(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {
        const accessToken = jwtFromProxyRequest(request);
        this.authService.verifyAccessToken(accessToken);
        const success = true;
        const resp = responseProto.SuccessResponse.create({success})
        logger.log(resp);
        return response.ok(resp);
    }

    async refreshTokens(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {
        const {token} = parseBody<authProto.RefreshTokensRequest>(request.body);
        const resp = await this.refreshTokensUseCase.execute(token);
        logger.log(resp);
        return response.ok(resp);
    }


    async logout(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {
        const accessToken = jwtFromProxyRequest(request);

        const resp = response.ok(await this.logoutUseCase.execute(accessToken));
        return response.ok(resp);
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
