import * as orchestrationGrpc from "../../grpc/generated/orchestration";
import * as authGrpc from "../../grpc/generated/auth";
import * as authService from "../../services/auth.service";
import {response} from "../adapter/response";

export async function anonymousSignIn(
    request: orchestrationGrpc.ProxyRequest,
): Promise<orchestrationGrpc.ProxyResponse> {

  const body = JSON.parse(
      Buffer.from(request.body).toString(),
  ) as authGrpc.AnonymousSignInRequest;

  const auth = await authService.anonymousSignIn(body);

  return response.ok(auth);
}

export async function getMyUser(
    request: orchestrationGrpc.ProxyRequest,
): Promise<orchestrationGrpc.ProxyResponse> {

  const auth = await authService.getMyUser(request);

  return response.ok(auth);
}

export async function refreshTokens(
    request: orchestrationGrpc.ProxyRequest,
): Promise<orchestrationGrpc.ProxyResponse> {

  const body = JSON.parse(
      Buffer.from(request.body).toString(),
  ) as authGrpc.RefreshTokensRequest;

  const auth = await authService.refreshTokens(body);

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

