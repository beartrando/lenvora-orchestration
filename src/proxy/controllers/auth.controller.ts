import * as orchestrationGrpc from "../../grpc/generated/orchestration";
import * as authGrpc from "../../grpc/generated/auth";
import {response} from "../adapter/response";
import {getJwtFromProxyRequest} from "../../lib/proxyRequestMetadata";
import * as authClient from "../../grpc/clients/auth.client";
import {createMetadataWithJwt} from "../../lib/grpcRequestMetadata";

export async function anonymousSignIn(
    request: orchestrationGrpc.ProxyRequest,
): Promise<orchestrationGrpc.ProxyResponse> {

    const grpcRequest = JSON.parse(
        Buffer.from(request.body).toString(),
    ) as authGrpc.AnonymousSignInRequest;

    const auth = await authClient.anonymousSignIn(grpcRequest);

    return response.ok(auth);
}

export async function getMe(
    request: orchestrationGrpc.ProxyRequest,
): Promise<orchestrationGrpc.ProxyResponse> {

    const metadata = createMetadataWithJwt(getJwtFromProxyRequest(request));

    const auth = await authClient.getMe(metadata);

    return response.ok(auth);
}

export async function refreshTokens(
    request: orchestrationGrpc.ProxyRequest,
): Promise<orchestrationGrpc.ProxyResponse> {

    const grpcRequest = JSON.parse(
        Buffer.from(request.body).toString(),
    ) as authGrpc.RefreshTokensRequest;

    const metadata = createMetadataWithJwt(getJwtFromProxyRequest(request));

    const auth = await authClient.refreshTokens(grpcRequest, metadata);

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

