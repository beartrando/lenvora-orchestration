import * as orchestrationGrpc from "../../grpc/generated/orchestration";

export class ResponseAdapter {

    public ok(data: unknown): orchestrationGrpc.ProxyResponse {
        return this.json(200, data);
    }

    public created(data: unknown): orchestrationGrpc.ProxyResponse {
        return this.json(201, data);
    }

    public noContent(): orchestrationGrpc.ProxyResponse {
        return {
            statusCode: 204,
            headers: [],
            body: Buffer.alloc(0),
        };
    }

    public badRequest(message: string): orchestrationGrpc.ProxyResponse {
        return this.json(400, {
            error: message,
        });
    }

    public unauthorized(message = "Unauthorized"): orchestrationGrpc.ProxyResponse {
        return this.json(401, {
            error: message,
        });
    }

    public forbidden(message = "Forbidden"): orchestrationGrpc.ProxyResponse {
        return this.json(403, {
            error: message,
        });
    }

    public notFound(message = "Not Found"): orchestrationGrpc.ProxyResponse {
        return this.json(404, {
            error: message,
        });
    }

    public internalServerError(message = "Internal Server Error"): orchestrationGrpc.ProxyResponse {
        return this.json(500, {
            error: message,
        });
    }

    private json(
        statusCode: number,
        body: unknown,
    ): orchestrationGrpc.ProxyResponse {

        return {
            statusCode,
            headers: [
                {
                    key: "content-type",
                    value: "application/json",
                },
            ],
            body: Buffer.from(
                JSON.stringify(body),
            ),
        };
    }
}

export const response = new ResponseAdapter();
