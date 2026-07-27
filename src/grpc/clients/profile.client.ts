import * as profileGrpc from '../generated/profile';
import * as emptyGrpc from '../generated/common/empty';
import * as authGrpc from '../generated/auth';
import config from '../../config/config';
import {GrpcClientManager} from '@shared/grpc-client-manager';
import * as grpc from '@grpc/grpc-js';
import logger from "@shared/logger";


const profileManager = new GrpcClientManager<profileGrpc.ProfileClient>(() => {
    return new profileGrpc.ProfileClient(config.serviceProfileUrl, grpc.credentials.createInsecure());
});

// export const getByUser = (grpcRequest: authGrpc.UserIdRequest, metadata: grpc.Metadata): Promise<profileGrpc.ProfileObject | null> => {
//     // const grpcRequest: authGrpc.UserIdRequest = {userId};
//     return profileManager.call((client, cb) => client.getByUser(grpcRequest, metadata, cb));
// };

export const upsert = (metadata: grpc.Metadata): Promise<profileGrpc.ProfileResponse | null> => {
    const grpcRequest: emptyGrpc.Empty = {};
    return profileManager.call((client, cb) => client.getOrCreate(grpcRequest, metadata, cb));
};

export const get = (grpcRequest: profileGrpc.ProfileIdRequest, metadata: grpc.Metadata): Promise<profileGrpc.ProfileResponse | null> => {
    return profileManager.call((client, cb) => client.get(grpcRequest, metadata, cb));
};

export const getMe = (metadata: grpc.Metadata): Promise<profileGrpc.ProfileResponse | null> => {
    const grpcRequest: emptyGrpc.Empty = {};

    return profileManager.call((client, cb) => client.getMe(grpcRequest, metadata, cb));
};
