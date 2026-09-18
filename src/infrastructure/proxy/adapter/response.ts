import * as responseProto from "../../../contracts/proto/common/response";
import * as errorProto from "../../../contracts/proto/common/error";
import * as orchestrationProto from "../../../contracts/proto/orchestration";
import logger from "@shared/logger";
import {ServiceUnavailableError} from "@shared/errors";

export class ResponseAdapter {

    public ok(data: unknown): orchestrationProto.ProxyResponse {
        return this.json(200, this.normalize(data));
    }

    private normalize(data: unknown): unknown {
        // if (data == null) {
        //     throw new ServiceUnavailableError();
        // }

        return data;
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

export default ResponseAdapter;
