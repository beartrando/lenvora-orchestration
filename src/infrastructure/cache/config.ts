import {CacheConfig} from "./service";

export const cacheConfig: CacheConfig = {
    host: process.env.REDIS_HOST ?? "redis",
    port: Number(process.env.REDIS_PORT) ?? 6379,
    password: process.env.REDIS_PASSWORD ?? "",
};

export default cacheConfig;
