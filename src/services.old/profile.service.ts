import * as profileClient from "../grpc/clients/profile.client";
import * as profileGrpc from "../grpc/generated/profile";
import * as errorGrpc from "../grpc/generated/common/error";
import * as authService from "../services/auth.service";
import {createMetadataWithJwt} from "../lib/grpcRequestMetadata";
import logger from "@shared/logger";

export const upsert = async (jwt: string) => {
    const metadata = createMetadataWithJwt(jwt);

    return await profileClient.upsert(metadata);
}

// export const getByUser = async (userId: string) =>
//   await profileClient.getByUser(userId);

export const get = async (profileId: string, jwt: string) => {
    const metadata = createMetadataWithJwt(jwt);
    const grpcRequest: profileGrpc.ProfileIdRequest = {profileId};

    return await profileClient.get(grpcRequest, metadata);
}

export const getMe = async (jwt: string) => {
    logger.log(jwt);
    const metadata = createMetadataWithJwt(jwt);

    const resp = await authService.getMe(jwt);

    logger.log(resp);
    if (resp?.error) {
        return resp;
    }

    return await profileClient.getMe(metadata);
}
