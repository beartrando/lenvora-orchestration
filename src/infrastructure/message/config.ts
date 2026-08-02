
import {ConsumerConfig} from "@shared/kafka-manager";
export const config = {
    brokers: process.env.KAFKA_BROKERS?.split(',') ?? ['kafka:9092'],
    clientId: process.env.KAFKA_CLIENT_ID ?? 'orchestration-client',
    groupId: process.env.KAFKA_GROUP_ID ?? 'orchestration-service',
};

export const kafkaConsumersConfig: Record<string, ConsumerConfig> = {};

export const kafkaProducersConfig: Record<string, string> = {};

export default config;

