import * as grpc from '@grpc/grpc-js';
import * as orchestrationProto from '../../../contracts/proto/orchestration';
import callbackError from './callback.error';
import logger from '@shared/logger';
import router from "../../proxy";

export const proxy = async (
    call: grpc.ServerUnaryCall<
        orchestrationProto.ProxyRequest,
        orchestrationProto.ProxyResponse
    >,
    callback: grpc.sendUnaryData<orchestrationProto.ProxyResponse>,
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
