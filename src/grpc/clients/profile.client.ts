import * as grpc from '@grpc/grpc-js';
import * as profileGrpc from '../generated/profile';
import * as authGrpc from "../generated/auth";
import * as emptyGrpc from "../generated/common/empty";
import config from '../../config/config';
import {GrpcClientManager} from '@shared/grpc-client-manager';


export class ProfileClient {
    private readonly manager: GrpcClientManager<profileGrpc.ProfileClient>;

    private readonly empty: emptyGrpc.Empty = {};

    constructor(private readonly url: string) {
        this.manager = new GrpcClientManager(
            () => new profileGrpc.ProfileClient(this.url, grpc.credentials.createInsecure(),),
        );
    }

    async getByUser(
        request: authGrpc.UserIdRequest,
        metadata: grpc.Metadata,
    ): Promise<profileGrpc.ProfileResponse | null> {
        return this.manager.call((client, callback) => client.getByUser(request, metadata, callback,),);
    }

    async getOrCreate(
        metadata: grpc.Metadata,
    ): Promise<profileGrpc.ProfileResponse | null> {
        return this.manager.call((client, callback) => client.getOrCreate(this.empty, metadata, callback,),);
    }

    async get(
        request: profileGrpc.ProfileIdRequest,
        metadata: grpc.Metadata,
    ): Promise<profileGrpc.ProfileResponse | null> {
        return this.manager.call((client, callback) => client.get(request, metadata, callback,),);
    }

    async getMe(
        metadata: grpc.Metadata,
    ): Promise<profileGrpc.ProfileResponse | null> {
        return this.manager.call((client, callback) => client.getMe(this.empty, metadata, callback,),
        );
    }
}

const profileClient = new ProfileClient(config.serviceProfileUrl);

export default profileClient;

