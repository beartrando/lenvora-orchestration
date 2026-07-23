import * as orchestrationGrpc from "../../grpc/generated/orchestration";
import * as authGrpc from "../../grpc/generated/auth";
import * as authService from "../../services/auth.service";
import {response} from "../adapter/response";
import {getJwtFromProxyRequest} from "../../lib/proxyRequestMetadata";
import {parseBody} from "../../lib/parseBody";

export async function anonymousSignIn(
    request: orchestrationGrpc.ProxyRequest,
): Promise<orchestrationGrpc.ProxyResponse> {

    const {deviceId} = parseBody<authGrpc.AnonymousSignInRequest>(request.body);

    const auth = await authService.anonymousSignIn(deviceId);

    return response.ok(auth);
}

export async function getMe(
    request: orchestrationGrpc.ProxyRequest,
): Promise<orchestrationGrpc.ProxyResponse> {

    const jwt = getJwtFromProxyRequest(request);

    const auth = await authService.getMe(jwt);

    return response.ok(auth);
}

export async function refreshTokens(
    request: orchestrationGrpc.ProxyRequest,
): Promise<orchestrationGrpc.ProxyResponse> {

    const {token} = parseBody<authGrpc.RefreshTokensRequest>(request.body);

    const auth = await authService.refreshTokens(token);

    return response.ok(auth);
}

// export const register = wrapper(async (req, res) => {
//   const {email, password} = req.body;
//   return authService.register(email, password);
// });
//
// export const login = wrapper(async (req, res) => {
//   const {email, password} = req.body;
//   return authService.login(email, password);
// });
//
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

