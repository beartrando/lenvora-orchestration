import * as grpc from '@grpc/grpc-js';
import * as authGrpc from '../generated/auth';
import * as emptyGrpc from '../generated/common/empty';
import config from '../../config/config';
import {GrpcClientManager} from '@shared/grpc-client-manager';

const authManager = new GrpcClientManager<authGrpc.AuthClient>(() => {
    return new authGrpc.AuthClient(config.serviceAuthUrl, grpc.credentials.createInsecure());
});

export const register = (grpcRequest: authGrpc.RegisterRequest): Promise<authGrpc.AuthObject | null> => {
    // const grpcRequest: authGrpc.RegisterRequest = {email, password};
    return authManager.call((client, cb) => client.register(grpcRequest, cb));
};

export const anonymousSignIn = (grpcRequest: authGrpc.AnonymousSignInRequest): Promise<authGrpc.AuthObject | null> => {
    return authManager.call((client, cb) => client.anonymousSignIn(grpcRequest, cb));
};

export const login = (grpcRequest: authGrpc.LoginRequest): Promise<authGrpc.AuthObject | null> => {
    // const grpcRequest: authGrpc.LoginRequest = {email, password};
    return authManager.call((client, cb) => client.login(grpcRequest, cb));
};

export const refreshTokens = (grpcRequest: authGrpc.RefreshTokensRequest, metadata: grpc.Metadata): Promise<authGrpc.AuthObject | null> => {
    // const grpcRequest: authGrpc.RefreshTokensRequest = {token};
    return authManager.call((client, cb) => client.refreshTokens(grpcRequest, metadata, cb));
};

export const logout = (grpcRequest: authGrpc.LogoutRequest, metadata: grpc.Metadata): Promise<authGrpc.LogoutResponse | null> => {
    // const grpcRequest: authGrpc.LogoutRequest = {userId};
    return authManager.call((client, cb) => client.logout(grpcRequest, metadata, cb));
};

export const forgotPassword = (grpcRequest: authGrpc.ForgotPasswordRequest): Promise<emptyGrpc.Empty | null> => {
    // const grpcRequest: authGrpc.ForgotPasswordRequest = {email};
    return authManager.call((client, cb) => client.forgotPassword(grpcRequest, cb));
};

export const resetPassword = (grpcRequest: authGrpc.ResetPasswordRequest, metadata: grpc.Metadata): Promise<authGrpc.AuthObject | null> => {
    // const grpcRequest: authGrpc.ResetPasswordRequest = {token, newPassword};
    return authManager.call((client, cb) => client.resetPassword(grpcRequest, metadata, cb));
};

export const get = (grpcRequest: authGrpc.UserIdRequest, metadata: grpc.Metadata): Promise<authGrpc.UserObject | null> => {
    // const grpcRequest: authGrpc.UserIdRequest = {userId};
    return authManager.call((client, cb) => client.get(grpcRequest, metadata, cb));
};

export const getMe = (metadata: grpc.Metadata): Promise<authGrpc.UserObject | null> => {
    const grpcRequest: emptyGrpc.Empty = {};
    return authManager.call((client, cb) => client.getMe(grpcRequest, metadata, cb));
};
