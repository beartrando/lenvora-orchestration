import * as authClient from "../grpc/clients/auth.client";
import * as profileService from "./profile.service";
import * as authGrpc from "../grpc/generated/auth";
import {createMetadataWithJwt} from "../lib/grpcRequestMetadata";
import logger from "@shared/logger";

export const get = async (userId: string, jwt: string) => {

    const grpcRequest: authGrpc.UserIdRequest = {userId};
    const metadata = createMetadataWithJwt(jwt);


    return await authClient.get(grpcRequest, metadata);
}

export const anonymousSignIn = async (deviceId: string) => {
    const grpcRequest: authGrpc.AnonymousSignInRequest = {deviceId};
    const auth = await authClient.anonymousSignIn(grpcRequest);

    logger.log(auth);

    await profileService.upsert(auth?.auth?.accessToken?? '');

    return auth;
}

export const refreshTokens = async (token: string) => {
    const grpcRequest: authGrpc.RefreshTokensRequest = {token};
    return await authClient.refreshTokens(grpcRequest);
}

export const getMe = async (jwt: string) => {
    const metadata = createMetadataWithJwt(jwt)

    return await authClient.getMe(metadata);
}
