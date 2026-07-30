import * as grpc from '@grpc/grpc-js';
import * as orchestrationProto from '../../../contracts/proto/orchestration';
import callbackError from './callback.error';
import logger from '@shared/logger';
import Router from "../../proxy/router";

export class OrchestrationHandler {
    constructor(private readonly router: Router) {
    }

    proxy = async (
        call: grpc.ServerUnaryCall<
            orchestrationProto.ProxyRequest,
            orchestrationProto.ProxyResponse
        >,
        callback: grpc.sendUnaryData<orchestrationProto.ProxyResponse>,
    ) => {
        try {
            const response = await this.router.handle(call.request);

            callback(null, response);
        } catch (err: any) {
            logger.log(call.request);
            logger.log(err);
            callbackError(callback, err);
        }
    };

}

export default OrchestrationHandler;