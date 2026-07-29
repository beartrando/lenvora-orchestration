import * as grpc from '@grpc/grpc-js';
import logger from "@shared/logger";
import userIdFromJwt from "../../auth/user-id-from-jwt";
import jwtFromProtoRequest from "./jwt-from-proto-request";


export const userIdFromProtoRequest = (
    call: grpc.ServerUnaryCall<any, any>
): string => {

    try {
        return userIdFromJwt(jwtFromProtoRequest(call))
    } catch (e) {
        logger.error('User id cannot be obtained');
        return '';
    }
};


export default userIdFromProtoRequest;
