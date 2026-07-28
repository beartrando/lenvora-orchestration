function required(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is missing`);
    }
    return value;
}

export const config = {
    appName: process.env.APP_NAME ?? 'orchestration',
    appVersion: process.env.APP_VERSION ?? '0.0.0',
    appEnv: process.env.APP_ENV ?? 'prod',

    jwtAccessSecret: required("JWT_ACCESS_SECRET"),
};

export default config;
