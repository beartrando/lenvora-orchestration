import * as grpc from '@grpc/grpc-js';


export const metadataWithJwt = (jwt: string): grpc.Metadata => {
    const metadata = new grpc.Metadata();
    metadata.add('authorization', 'Bearer ' + jwt);
    return metadata;
}


export default metadataWithJwt;
