import * as grpc from '@grpc/grpc-js';
import * as gusteauProto from '../../../contracts/proto/gusteau';
import grpcConfig from '../config';
import {GrpcClientManager} from '@shared/grpc-client-manager';

export class GusteauClient {
    private readonly manager: GrpcClientManager<gusteauProto.GusteauClient>;

    constructor(
        private readonly url: string,
    ) {
        this.manager = new GrpcClientManager(
            () =>
                new gusteauProto.GusteauClient(
                    this.url,
                    grpc.credentials.createInsecure(),
                ),
        );
    }
}

const gusteauClient = new GusteauClient(grpcConfig.serviceGusteauUrl);

export default gusteauClient;
