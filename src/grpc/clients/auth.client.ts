import * as grpc from '@grpc/grpc-js';
import * as authGrpc from '../generated/auth';
import * as responseGrpc from '../generated/common/response';
import * as emptyGrpc from '../generated/common/empty';
import config from '../../config/config';
import {GrpcClientManager} from '@shared/grpc-client-manager';
import {RefreshTokensRequest} from "../generated/auth";

const authManager = new GrpcClientManager<authGrpc.AuthClient>(() => {
    return new authGrpc.AuthClient(config.serviceAuthUrl, grpc.credentials.createInsecure());
});

export const register = (grpcRequest: authGrpc.RegisterRequest): Promise<authGrpc.AuthResponse | null> => {
    // const grpcRequest: authGrpc.RegisterRequest = {email, password};
    return authManager.call((client, cb) => client.register(grpcRequest, cb));
};

export const anonymousSignIn = (grpcRequest: authGrpc.AnonymousSignInRequest): Promise<authGrpc.AuthResponse | null> => {
    return authManager.call((client, cb) => client.anonymousSignIn(grpcRequest, cb));
};

export const login = (grpcRequest: authGrpc.LoginRequest): Promise<authGrpc.AuthResponse | null> => {
    // const grpcRequest: authGrpc.LoginRequest = {email, password};
    return authManager.call((client, cb) => client.login(grpcRequest, cb));
};

export const refreshTokens = (grpcRequest: authGrpc.RefreshTokensRequest): Promise<authGrpc.AuthResponse | null> => {
    return authManager.call((client, cb) => client.refreshTokens(grpcRequest, cb));
}

export const logout = (grpcRequest: emptyGrpc.Empty, metadata: grpc.Metadata): Promise<responseGrpc.EmptyResponse | null> => {
    // const grpcRequest: emptyGrpc.Empty = {userId};
    return authManager.call((client, cb) => client.logout(grpcRequest, metadata, cb));
};

export const forgotPassword = (grpcRequest: authGrpc.ForgotPasswordRequest): Promise<responseGrpc.EmptyResponse | null> => {
    // const grpcRequest: authGrpc.ForgotPasswordRequest = {email};
    return authManager.call((client, cb) => client.forgotPassword(grpcRequest, cb));
};

export const resetPassword = (grpcRequest: authGrpc.ResetPasswordRequest, metadata: grpc.Metadata): Promise<authGrpc.AuthResponse | null> => {
    // const grpcRequest: authGrpc.ResetPasswordRequest = {token, newPassword};
    return authManager.call((client, cb) => client.resetPassword(grpcRequest, metadata, cb));
};

export const get = (grpcRequest: authGrpc.UserIdRequest, metadata: grpc.Metadata): Promise<authGrpc.UserResponse | null> => {
    // const grpcRequest: authGrpc.UserIdRequest = {userId};
    return authManager.call((client, cb) => client.get(grpcRequest, metadata, cb));
};

export const getMe = (metadata: grpc.Metadata): Promise<authGrpc.UserResponse | null> => {
    const grpcRequest: emptyGrpc.Empty = {};
    return authManager.call((client, cb) => client.getMe(grpcRequest, metadata, cb));
};
