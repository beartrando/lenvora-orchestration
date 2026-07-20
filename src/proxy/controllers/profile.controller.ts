import * as orchestrationGrpc from "../../grpc/generated/orchestration";
import * as profileGrpc from "../../grpc/generated/profile";
import * as profileClient from "../../grpc/clients/profile.client";
import {response} from "../adapter/response";
import {getJwtFromProxyRequest} from "../../lib/proxyRequestMetadata";
import {createMetadataWithJwt} from "../../lib/grpcRequestMetadata";
import logger from "@shared/logger";

export async function getMe(
    request: orchestrationGrpc.ProxyRequest,
): Promise<orchestrationGrpc.ProxyResponse> {

    const metadata = createMetadataWithJwt(getJwtFromProxyRequest(request));

    const profile = await profileClient.getMe(metadata);

    return response.ok(profile);
}

export async function get(
    request: orchestrationGrpc.ProxyRequest,
): Promise<orchestrationGrpc.ProxyResponse> {
    const metadata = createMetadataWithJwt(getJwtFromProxyRequest(request));

    const grpcRequest = JSON.parse(
        Buffer.from(request.body).toString(),
    ) as profileGrpc.ProfileIdRequest;

    const profile = await profileClient.get(grpcRequest, metadata);

    return response.ok(profile);
}
