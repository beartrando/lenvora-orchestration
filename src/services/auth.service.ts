// import * as authClient from "../grpc/clients/auth.client";
// import * as authGrpc from "../grpc/generated/auth";
// import {createMetadataWithJwt} from "../lib/grpcRequestMetadata";
//
// export const get = async (userId: string) =>
//     await authClient.get(userId);
//
// export const anonymousSignIn = async (deviceId: string) => {
//     const grpcRequest: authGrpc.AnonymousSignInRequest = {deviceId};
//     return await authClient.anonymousSignIn(grpcRequest);
// }
//
// export const refreshTokens = async (token: string) => {
//     const grpcRequest: authGrpc.RefreshTokensRequest = {token};
//     return await authClient.refreshTokens(grpcRequest);
// }
//
// export const getMe = async (jwt: string) => {
//     const metadata = createMetadataWithJwt(jwt)
//
//     return await authClient.getMe(userIdmetadata);
// }
