import * as orchestrationGrpc from "../../grpc/generated/orchestration";

export class ResponseAdapter {

    public ok(data: unknown): orchestrationGrpc.ProxyResponse {
        return this.json(200, data);
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
