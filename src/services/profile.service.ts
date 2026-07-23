import * as profileClient from "../grpc/clients/profile.client";
import * as profileGrpc from "../grpc/generated/profile";
import {createMetadataWithJwt} from "../lib/grpcRequestMetadata";

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
    const metadata = createMetadataWithJwt(jwt);

    return await profileClient.getMe(metadata);
}
