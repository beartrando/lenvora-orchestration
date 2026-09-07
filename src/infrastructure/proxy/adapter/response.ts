import responseFactory from "../response-factory";
import * as responseProto from "../../../contracts/proto/common/response";
import * as errorProto from "../../../contracts/proto/common/error";
import * as orchestrationProto from "../../../contracts/proto/orchestration";
import logger from "@shared/logger";

export class ResponseAdapter {

    public ok(data: unknown): orchestrationProto.ProxyResponse {
        return this.json(200, this.normalize(data));
    }

    private normalize(data: unknown): unknown {
        return data ?? responseFactory.error(
            responseProto.SuccessResponse,
            errorProto.ErrorCode.SERVICE_UNAVAILABLE,
            "Service unavailable",
        );
    }

    private json(
        statusCode: number,
        body: unknown,
    ): orchestrationProto.ProxyResponse {

        // logger.log('------------------------------------')
        // logger.log(body)
        // logger.log(Buffer.from(
        //     JSON.stringify(body),
        // ))
        // logger.log('------------------------------------')
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

export default response;
