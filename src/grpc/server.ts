import {OrchestrationService} from './generated/orchestration';
import * as grpc from '@grpc/grpc-js';
import * as healthHandler from "./handlers/health.handler";
import * as profileHandler from "./handlers/profile.handler";
import * as authHandler from "./handlers/auth.handler";
import {verifyToken} from "../../../gateway/src/http/middlewares/auth.middleware";
import app from "../../../gateway/src/http/server";

const server = new grpc.Server();




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




server.addService(OrchestrationService, {
  health: healthHandler.health,
  status: healthHandler.status,
  livez: healthHandler.livez,
  readyz: healthHandler.readyz,

  // getMyUser: authHandler.getMyUser,
  // anonymousSignIn: authHandler.anonymousSignIn,
  // refreshTokens: authHandler.refreshTokens,
  //
  // getMyProfile: profileHandler.getMyProfile,
  // getProfile: profileHandler.getProfile,
});

export default server;

