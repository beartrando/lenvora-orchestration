import * as grpc from '@grpc/grpc-js';
import * as orchestrationGrpc from '../generated/orchestration';
import {callbackError} from './callback.error';
import logger from "@shared/logger";

export const route = async (
  call: grpc.ServerUnaryCall<orchestrationGrpc.ProxyRequest, orchestrationGrpc.ProxyResponse>,
  callback: grpc.sendUnaryData<orchestrationGrpc.ProxyResponse>
) => {
  const request = call.request;

  try {
    logger.log(call.request);
  //   const response = await authService.anonymousSignIn(call.request);
  //
  //   callback(null, response);
  //
  //   router.handle(call, callback);
  } catch (err: any) {
    logger.log(err);
    callbackError(callback, err);
  }
};

