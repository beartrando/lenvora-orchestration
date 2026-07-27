import * as grpc from '@grpc/grpc-js';
import * as engineGrpc from '../generated/engine';
import config from '../../config/config';
import {GrpcClientManager} from '@shared/grpc-client-manager';

export class EngineClient {
    private readonly manager: GrpcClientManager<engineGrpc.EngineClient>;

    constructor(
        private readonly url: string,
    ) {
        this.manager = new GrpcClientManager(
            () =>
                new engineGrpc.EngineClient(
                    this.url,
                    grpc.credentials.createInsecure(),
                ),
        );
    }
}

const engineClient = new EngineClient(config.serviceEngineUrl);

export default engineClient;
