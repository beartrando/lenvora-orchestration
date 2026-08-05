import * as grpc from '@grpc/grpc-js';
import * as engineProto from '../../../contracts/proto/engine';
import grpcConfig from '../config';
import {GrpcClientManager} from '@shared/grpc-client-manager';

export class EngineClient {
    private readonly manager: GrpcClientManager<engineProto.EngineClient>;

    constructor(
        private readonly url: string,
    ) {
        this.manager = new GrpcClientManager(
            () =>
                new engineProto.EngineClient(
                    this.url,
                    grpc.credentials.createInsecure(),
                ),
        );
    }
}

const engineClient = new EngineClient(grpcConfig.serviceEngineUrl);

export default engineClient;
