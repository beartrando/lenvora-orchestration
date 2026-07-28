import * as grpc from '@grpc/grpc-js';
import * as orchestrationGrpc from '../../../contracts/proto/generated/orchestration';
import callbackError from './callback.error';
import logger from '@shared/logger';
import router from "../../proxy";

export const proxy = async (
    call: grpc.ServerUnaryCall<
        orchestrationGrpc.ProxyRequest,
        orchestrationGrpc.ProxyResponse
    >,
    callback: grpc.sendUnaryData<orchestrationGrpc.ProxyResponse>,
) => {
    try {
        const response = await router.handle(call.request);

        callback(null, response);
    } catch (err: any) {
        logger.log(call.request);
        logger.log(err);
        callbackError(callback, err);
    }
};
