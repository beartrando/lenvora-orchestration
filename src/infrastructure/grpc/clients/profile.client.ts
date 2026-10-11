import * as grpc from '@grpc/grpc-js';
import * as profileProto from '../../../contracts/proto/profile';
import * as authProto from "../../../contracts/proto/auth";
import * as emptyProto from "../../../contracts/proto/common/empty";
import grpcConfig from '../config';
import {GrpcClientManager} from '@shared/grpc-client-manager';


export class ProfileClient {
    private readonly manager: GrpcClientManager<profileProto.ProfileClient>;

    private readonly empty: emptyProto.Empty = {};

    constructor(private readonly url: string) {
        this.manager = new GrpcClientManager(
            () => new profileProto.ProfileClient(this.url, grpc.credentials.createInsecure(),),
        );
    }

    async getByUser(
        request: authProto.UserIdRequest,
        metadata: grpc.Metadata,
    ): Promise<profileProto.ProfileResponse | null> {
        return this.manager.call((client, callback) => client.getByUser(request, metadata, callback,),);
    }

    async getOrCreate(
        metadata: grpc.Metadata,
    ): Promise<profileProto.ProfileResponse | null> {
        return this.manager.call((client, callback) => client.getOrCreate(this.empty, metadata, callback,),);
    }

    async get(
        request: profileProto.ProfileIdRequest,
        metadata: grpc.Metadata,
    ): Promise<profileProto.ProfileResponse | null> {
        return this.manager.call((client, callback) => client.get(request, metadata, callback,),);
    }
}

const profileClient = new ProfileClient(grpcConfig.serviceProfileUrl);

export default profileClient;
