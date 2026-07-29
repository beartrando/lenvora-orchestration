import * as orchestrationProto from "../../../contracts/proto/orchestration";
import * as authProto from "../../../contracts/proto/auth";
import * as errorProto from "../../../contracts/proto/common/error";
import response from "../adapter/response";
import parseBody from "../utils/parse-body";
import responseFactory from "../response-factory";
import AnonymousSignInUseCase from "../../../application/use-cases/auth/anonymous-sign-in";
import GetOrCreateUseCase from "../../../application/use-cases/profile/get-or-create";
import GetMeUseCase from "../../../application/use-cases/auth/get-me";
import RefreshTokensUseCase from "../../../application/use-cases/auth/refresh-tokens";
import LogoutUseCase from "../../../application/use-cases/auth/logout";
import jwtFromProxyRequest from "../utils/jwt-from-proxy-request";


export class AuthController {

    constructor(
        private readonly anonymousSignInUseCase: AnonymousSignInUseCase,
        private readonly getOrCreateProfileUseCase: GetOrCreateUseCase,
        private readonly getMeUseCase: GetMeUseCase,
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
                    "Auth service unavailable",
                )
            );
        }

        if (resp.error) {
            return response.ok(resp);
        }

        if (resp.auth?.accessToken) {
            await this.getOrCreateProfileUseCase.execute(resp.auth.accessToken);
            return response.ok(resp);
        }

        return response.ok(
            responseFactory.error(
                authProto.AuthResponse,
                errorProto.ErrorCode.INVALID_RESPONSE,
                "Auth service returned invalid response",
            )
        );
    }

    async getMe(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {
        const jwt = jwtFromProxyRequest(request);
        const resp = response.ok(await this.getMeUseCase.execute(jwt));
        return response.ok(resp);
    }

    async refreshTokens(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {
        const {token} = parseBody<authProto.RefreshTokensRequest>(request.body);
        const resp = response.ok(await this.refreshTokensUseCase.execute(token));
        return response.ok(resp);
    }


    async logout(
        request: orchestrationProto.ProxyRequest,
    ): Promise<orchestrationProto.ProxyResponse> {
        const jwt = jwtFromProxyRequest(request);

        const resp = response.ok(await this.logoutUseCase.execute(jwt));
        return response.ok(resp);
    }

    // export const logout = wrapper(async (req, res) => {
    //   const userId = getUserId(req);
    //   return authService.logout(userId);
    // });
    //
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
