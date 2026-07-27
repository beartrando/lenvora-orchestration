import * as grpc from '@grpc/grpc-js';
import * as authGrpc from '../generated/auth';
import * as emptyGrpc from "../generated/common/empty";
import * as responseGrpc from "../generated/common/response";
import config from '../../config/config';
import {GrpcClientManager} from '@shared/grpc-client-manager';


export class AuthClient {
    private readonly manager: GrpcClientManager<authGrpc.AuthClient>;

    private readonly empty: emptyGrpc.Empty = {};

    constructor(private readonly url: string) {
        this.manager = new GrpcClientManager(
            () => new authGrpc.AuthClient(this.url, grpc.credentials.createInsecure(),),
        );
    }

    async register(request: authGrpc.RegisterRequest): Promise<authGrpc.AuthResponse | null> {
        return this.manager.call((client, callback) => client.register(request, callback));
    }

    async anonymousSignIn(request: authGrpc.AnonymousSignInRequest): Promise<authGrpc.AuthResponse | null> {
        return this.manager.call((client, callback) => client.anonymousSignIn(request, callback));
    }

    async login(request: authGrpc.LoginRequest): Promise<authGrpc.AuthResponse | null> {
        return this.manager.call((client, callback) => client.login(request, callback));
    }

    async refreshTokens(request: authGrpc.RefreshTokensRequest): Promise<authGrpc.AuthResponse | null> {
        return this.manager.call((client, callback) => client.refreshTokens(request, callback));
    }

    async logout(request: emptyGrpc.Empty, metadata: grpc.Metadata): Promise<responseGrpc.EmptyResponse | null> {
        return this.manager.call((client, callback) => client.logout(request, metadata, callback));
    }

    async forgotPassword(request: authGrpc.ForgotPasswordRequest): Promise<responseGrpc.EmptyResponse | null> {
        return this.manager.call((client, callback) => client.forgotPassword(request, callback));
    }

    async resetPassword(request: authGrpc.ResetPasswordRequest, metadata: grpc.Metadata): Promise<authGrpc.AuthResponse | null> {
        return this.manager.call((client, callback) => client.resetPassword(request, metadata, callback));
    }

    async get(request: authGrpc.UserIdRequest, metadata: grpc.Metadata): Promise<authGrpc.UserResponse | null> {
        return this.manager.call((client, callback) => client.get(request, metadata, callback));
    }

    async getMe(metadata: grpc.Metadata): Promise<authGrpc.UserResponse | null> {
        return this.manager.call((client, callback) => client.getMe(this.empty, metadata, callback));
    }
}

const authClient = new AuthClient(config.serviceAuthUrl);

export default authClient;

