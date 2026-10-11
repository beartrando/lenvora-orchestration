import * as grpc from '@grpc/grpc-js';
import * as authProto from '../../../contracts/proto/auth';
import * as emptyProto from "../../../contracts/proto/common/empty";
import * as responseProto from "../../../contracts/proto/common/response";
import grpcConfig from '../config';
import {GrpcClientManager} from '@shared/grpc-client-manager';


export class AuthClient {
    private readonly manager: GrpcClientManager<authProto.AuthClient>;

    private readonly empty: emptyProto.Empty = {};

    constructor(private readonly url: string) {
        this.manager = new GrpcClientManager(
            () => new authProto.AuthClient(this.url, grpc.credentials.createInsecure(),),
        );
    }

    async anonymousSignIn(request: authProto.AnonymousSignInRequest): Promise<authProto.SessionResponse | null> {
        return this.manager.call((client, callback) => client.anonymousSignIn(request, callback));
    }

    async refreshTokens(request: authProto.RefreshTokensRequest): Promise<authProto.SessionResponse | null> {
        return this.manager.call((client, callback) => client.refreshTokens(request, callback));
    }

    async logout(metadata: grpc.Metadata): Promise<responseProto.SuccessResponse | null> {
        return this.manager.call((client, callback) => client.logout(this.empty, metadata, callback));
    }

    async get(request: authProto.UserIdRequest, metadata: grpc.Metadata): Promise<authProto.UserResponse | null> {
        return this.manager.call((client, callback) => client.get(request, metadata, callback));
    }
}

const authClient = new AuthClient(grpcConfig.serviceAuthUrl);

export default authClient;
