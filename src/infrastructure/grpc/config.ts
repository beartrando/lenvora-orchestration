export const grpcConfig = {
    port: Number(process.env.GRPC_PORT ?? 50051),

    serviceAuthUrl: process.env.SERVICE_AUTH_URL ?? 'auth:50051',
    serviceProfileUrl: process.env.SERVICE_PROFILE_URL ?? 'profile:50051',
    serviceGusteauUrl: process.env.SERVICE_GUSTEAU_URL ?? 'gusteau:50051',
    serviceBattleUrl: process.env.SERVICE_BATTLE_URL ?? 'gusteau:50051',
};

export default grpcConfig;
