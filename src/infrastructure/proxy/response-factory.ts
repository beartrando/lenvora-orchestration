import * as errorProto from "../../contracts/proto/common/error";

export class ResponseFactory {
    error<
        T extends {
            create(data: {
                error: errorProto.ErrorObject;
            }): R;
        },
        R
    >(
        responseType: T,
        code: errorProto.ErrorCode,
        details: string,
    ): R {
        return responseType.create({
            error: {
                code,
                details,
            },
        });
    }
}

const responseFactory = new ResponseFactory();

export default responseFactory;
