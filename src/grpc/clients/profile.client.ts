import * as grpc from '@grpc/grpc-js';
import * as profileGrpc from '../generated/profile';
import config from '../../config/config';
import {GrpcClientManager} from '@shared/grpc-client-manager';

export class ProfileClient {
    private readonly manager: GrpcClientManager<profileGrpc.ProfileClient>;

    constructor(
        private readonly url: string,
    ) {

        this.manager = new GrpcClientManager(
            () =>
                new profileGrpc.ProfileClient(
                    this.url,
                    grpc.credentials.createInsecure(),
                ),
        );
    }

    async getByUser(grpcRequest: authGrpc.UserIdRequest, metadata: grpc.Metadata): Promise<profileGrpc.ProfileResponse | null> {
        return profileManager.call((client, cb) => client.getByUser(grpcRequest, metadata, cb));
    }

    async getOrCreate(metadata: grpc.Metadata): Promise<profileGrpc.ProfileResponse | null> {
        const grpcRequest: emptyGrpc.Empty = {};
        return profileManager.call((client, cb) => client.getOrCreate(grpcRequest, metadata, cb));
    }

    async get(grpcRequest: profileGrpc.ProfileIdRequest, metadata: grpc.Metadata): Promise<profileGrpc.ProfileResponse | null> {
        return profileManager.call((client, cb) => client.get(grpcRequest, metadata, cb));
    }

    async getMe(metadata: grpc.Metadata): Promise<profileGrpc.ProfileResponse | null> {
        const grpcRequest: emptyGrpc.Empty = {};

        return profileManager.call((client, cb) => client.getMe(grpcRequest, metadata, cb));
    }
}

const profileClient = new ProfileClient(config.serviceProfileUrl);

export default profileClient;

