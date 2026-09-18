import DbService from "../infrastructure/db/service";
import MessageService from "../infrastructure/message/service";
import JobService from "../infrastructure/job/service";
import AnonymousSignInUseCase from "../application/use-cases/auth/anonymous-sign-in";
import GetUserUseCase from "../application/use-cases/auth/get-user";
import LogoutUseCase from "../application/use-cases/auth/logout";
import RefreshTokensUseCase from "../application/use-cases/auth/refresh-tokens";
import HealthUseCase from "../application/use-cases/health/health";
import StatusUseCase from "../application/use-cases/health/status";
import LivezUseCase from "../application/use-cases/health/livez";
import ReadyzUseCase from "../application/use-cases/health/readyz";
import HealthHandler from "../infrastructure/grpc/handlers/health.handler";
import GrpcService from "../infrastructure/grpc/service";
import GetOrCreateProfileUseCase from "../application/use-cases/profile/get-or-create-profile";
import GetProfileUseCase from "../application/use-cases/profile/get-profile";
import AuthController from "../infrastructure/proxy/controllers/auth.controller";
import ProfileController from "../infrastructure/proxy/controllers/profile.controller";
import AuthRoutes from "../infrastructure/proxy/routes/auth.routes";
import ProfileRoutes from "../infrastructure/proxy/routes/profile.routes";
import Router from "../infrastructure/proxy/router";
import OrchestrationHandler from "../infrastructure/grpc/handlers/orchestration.handler";
import grpcConfig from "../infrastructure/grpc/config";
import Application from "../application/application";
import jobConfig from "../infrastructure/job/config";
import authConfig from "../infrastructure/auth/config";
import AuthService from "../infrastructure/auth/service";
import GetProfileByUserUseCase from "../application/use-cases/profile/get-profile-by-user";
import messageConfig from "../infrastructure/message/configs/message.config";
import messageProducersConfig from "../infrastructure/message/configs/producers.config";
import ResponseAdapter from "../infrastructure/proxy/adapter/response";

function buildApplication() {
    const authService = new AuthService(authConfig);

    const messageService = new MessageService(messageConfig);
    const jobService = new JobService(jobConfig, messageConfig, messageProducersConfig)
    const dbService = new DbService();

    const anonymousSignInUseCase = new AnonymousSignInUseCase();
    const getOrCreateProfileUseCase = new GetOrCreateProfileUseCase();
    const getUserUseCase = new GetUserUseCase();
    const refreshTokensUseCase = new RefreshTokensUseCase();
    const logoutUseCase = new LogoutUseCase();

    const responseAdapter = new ResponseAdapter();

    const healthUseCase = new HealthUseCase(dbService, messageService, jobService);
    const statusUseCase = new StatusUseCase;
    const livezUseCase = new LivezUseCase;
    const readyzUseCase = new ReadyzUseCase;

    const authController = new AuthController(
        responseAdapter,
        authService,
        anonymousSignInUseCase,
        getOrCreateProfileUseCase,
        getUserUseCase,
        refreshTokensUseCase,
        logoutUseCase
    );

    const getProfileUseCase = new GetProfileUseCase();
    const getProfileByUserUseCase = new GetProfileByUserUseCase();

    const profileController = new ProfileController(
        responseAdapter,
        authService,
        getProfileByUserUseCase,
        getProfileUseCase,
    );

    const authRoutes = new AuthRoutes(authController);
    const profileRoutes = new ProfileRoutes(profileController);

    const router = new Router(authRoutes, profileRoutes);
//
    const orchestrationHandler = new OrchestrationHandler(router);
    const healthHandler = new HealthHandler(healthUseCase, statusUseCase, livezUseCase, readyzUseCase);

    const grpcService = new GrpcService(grpcConfig.port, orchestrationHandler, healthHandler);
    return new Application(grpcService, dbService, jobService, messageService);
}


export default buildApplication;
