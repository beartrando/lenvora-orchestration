import * as grpc from '@grpc/grpc-js';
import * as orchestrationGrpc from '../generated/orchestration';
import { callbackError } from './callback.error';
import logger from '@shared/logger';
import { router } from '../../proxy/router';

export const route = async (
    call: grpc.ServerUnaryCall<
        orchestrationGrpc.ProxyRequest,
        orchestrationGrpc.ProxyResponse
    >,
    callback: grpc.sendUnaryData<orchestrationGrpc.ProxyResponse>,
) => {
  try {
    logger.log(call.request);

    const response = await router.handle(call.request);

    callback(null, response);
  } catch (err: any) {
    logger.log(err);
    callbackError(callback, err);
  }
};
