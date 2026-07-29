import * as grpc from '@grpc/grpc-js';
import logger from "@shared/logger";


export const getJwtFromProtoRequest = (
    call: grpc.ServerUnaryCall<any, any>
): string => {
    const authHeader = call.metadata.get('authorization')[0] as string;
    // logger.log(authHeader);
    if (!authHeader?.startsWith('Bearer ')) {
        // throw new Error('Missing or invalid Authorization header');
        logger.error('Missing or invalid Authorization header');
        return '';
    }

    return authHeader.slice(7);
};

export default getJwtFromProtoRequest;
