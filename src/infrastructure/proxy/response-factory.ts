import * as responseGrpc from "../../contracts/proto/generated/common/response";
import * as errorGrpc from "../../contracts/proto/generated/common/error";

export class ResponseFactory {
    error<
        T extends {
            create(data: {
                error: errorGrpc.ErrorObject;
            }): R;
        },
        R
    >(
        responseType: T,
        code: errorGrpc.ErrorCode,
        message: string,
    ): R {
        return responseType.create({
            error: {
                code,
                message,
            },
        });
    }
}

const responseFactory = new ResponseFactory();

export default responseFactory;
