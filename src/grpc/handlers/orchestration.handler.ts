import * as grpc from '@grpc/grpc-js';
import * as orchestrationGrpc from '../generated/orchestration';
import * as authService from '../../services/auth.service';
import {callbackError} from './callback.error';
import logger from "@shared/logger";

// const withAuth = (req: Request, res: Response, next: NextFunction) => {
//   const isPublic = publicPaths.some(path => req.path.startsWith('/' + path));
//   // logger.log('req.path',req.path);
//   // logger.log('isPublic',isPublic);
//   if (isPublic) return next();
//   return verifyToken(req, res, next)
// };
// app.use(withAuth);
//
// app.use('/', gatewayRoutes);
// app.use('/auth', authRoutes);
// app.use('/profile', profileRoutes);


export const route = async (
  call: grpc.ServerUnaryCall<orchestrationGrpc.RouteRequest, orchestrationGrpc.RouteResponse>,
  callback: grpc.sendUnaryData<orchestrationGrpc.RouteResponse>
) => {
  try {
    logger.log(call.request);
  //   const response = await authService.anonymousSignIn(call.request);
  //
  //   callback(null, response);
  //
  } catch (err: any) {
    logger.log(err);
    callbackError(callback, err);
  }
};

