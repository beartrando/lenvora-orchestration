import logger from '@shared/logger';
import {config as kafkaConfig} from "./infrastructure/message/config";
import {config as grpcConfig} from "./infrastructure/grpc/config";
import MessageService from "./infrastructure/message/message.service";
import JobService from "./infrastructure/job/job.service";
import DbService from "./infrastructure/db/db.service";
import AnonymousSignInUseCase from "./application/use-cases/auth/anonymous-sign-in";
import GetOrCreateUseCase from "./application/use-cases/profile/get-or-create";
import GetMeUseCase from "./application/use-cases/auth/get-me";
import {GetMeUseCase as GetMyProfileUseCase} from "./application/use-cases/profile/get-me";
import {GetUseCase as GetProfileUseCase} from "./application/use-cases/profile/get";
import RefreshTokensUseCase from "./application/use-cases/auth/refresh-tokens";
import LogoutUseCase from "./application/use-cases/auth/logout";
import AuthController from "./infrastructure/proxy/controllers/auth.controller";
import ProfileController from "./infrastructure/proxy/controllers/profile.controller";
import Router from "./infrastructure/proxy/router";
import AuthRoutes from "./infrastructure/proxy/routes/auth.routes";
import ProfileRoutes from "./infrastructure/proxy/routes/profile.routes";
import GrpcService from "./infrastructure/grpc/grpc.service";
import OrchestrationHandler from "./infrastructure/grpc/handlers/orchestration.handler";
import HealthHandler from "./infrastructure/grpc/handlers/health.handler";
import HealthUseCase from "./application/use-cases/health/health";
import StatusUseCase from "./application/use-cases/health/status";
import LivezUseCase from "./application/use-cases/health/livez";
import ReadyzUseCase from "./application/use-cases/health/readyz";


const messageService = new MessageService(kafkaConfig);
const jobService = new JobService()
const dbService = new DbService();


const anonymousSignInUseCase = new AnonymousSignInUseCase();
const getOrCreateProfileUseCase = new GetOrCreateUseCase();
const getMeUseCase = new GetMeUseCase();
const refreshTokensUseCase = new RefreshTokensUseCase();
const logoutUseCase = new LogoutUseCase();


const healthUseCase = new HealthUseCase(dbService, messageService, jobService);
const statusUseCase = new StatusUseCase;
const livezUseCase = new LivezUseCase;
const readyzUseCase = new ReadyzUseCase;


const authController = new AuthController(
    anonymousSignInUseCase,
    getOrCreateProfileUseCase,
    getMeUseCase,
    refreshTokensUseCase,
    logoutUseCase
);

const getMyProfileUseCase = new GetMyProfileUseCase();
const getProfileUseCase = new GetProfileUseCase();

const profileController = new ProfileController(
    getMyProfileUseCase,
    getProfileUseCase,
);

const authRoutes = new AuthRoutes(authController);
const profileRoutes = new ProfileRoutes(profileController);

const router = new Router(authRoutes, profileRoutes);
//
const orchestrationHandler = new OrchestrationHandler(router);
const healthHandler = new HealthHandler(healthUseCase, statusUseCase, livezUseCase, readyzUseCase);

const grpcService = new GrpcService(grpcConfig.port, orchestrationHandler, healthHandler);
``


async function bootstrap(): Promise<void> {

    try {
        await grpcService.init();
        await dbService.init();
        await jobService.init();
        await messageService.init();

        logger.info(
            '🚀 Orchestration service started',
        );
    } catch (err) {
        logger.error(
            {err},
            '💥 Failed to start Orchestration',
        );
        process.exit(1);
    }

    process.on(
        'SIGINT',
        async () => {
            logger.info(
                '🛑 Shutting down...',
            );

            await dbService.stop();
            await jobService.stop();
            await messageService.stop();
            await grpcService.stop();

            process.exit(0);
        },
    );
}


bootstrap();








