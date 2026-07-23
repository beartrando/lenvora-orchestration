import * as orchestrationGrpc from "../grpc/generated/orchestration";

export function parseBody<T>(
    request: orchestrationGrpc.ProxyRequest,
): T {
    if (request.body.length === 0) {
        return {} as T;
    }

    return JSON.parse(
        Buffer.from(request.body).toString(),
    ) as T;
}
