import * as orchestrationGrpc from "../../grpc/generated/orchestration";
import * as profileGrpc from "../../grpc/generated/profile";
import * as profileService from "../../services/profile.service";
import {response} from "../adapter/response";
import {getJwtFromProxyRequest} from "../../lib/proxyRequestMetadata";
import {createMetadataWithJwt} from "../../lib/grpcRequestMetadata";
import logger from "@shared/logger";
import {parseQueryParams} from "../../lib/parseQueryParams";
import {parseBody} from "../../lib/parseBody";
import * as authGrpc from "../../grpc/generated/auth";

export async function getMe(
    request: orchestrationGrpc.ProxyRequest,
): Promise<orchestrationGrpc.ProxyResponse> {

    const jwt = getJwtFromProxyRequest(request);

    const profile = await profileService.getMe(jwt);

    return response.ok(profile);
}

export async function get(
    request: orchestrationGrpc.ProxyRequest,
): Promise<orchestrationGrpc.ProxyResponse> {

    const { profileId } = parseQueryParams<profileGrpc.ProfileIdRequest>(request.queryParams);

    logger.log(request.body);
    logger.log(profileId);
    const jwt = getJwtFromProxyRequest(request);

    const profile = await profileService.get(profileId, jwt);

    return response.ok(profile);
}
