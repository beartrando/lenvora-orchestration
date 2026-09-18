import * as grpc from "@grpc/grpc-js";
import * as errorProto from "../../../contracts/proto/common/error";
import {DomainError} from "@shared/errors";
import ResponseAdapter from "../../proxy/adapter/response";

const responseAdapter = new ResponseAdapter;

export function callbackError(
    callback: grpc.sendUnaryData<any>,
    error: unknown,
) {
    if (error instanceof DomainError) {
        return callback(
            null,
            responseAdapter.ok(
                {
                    error: errorProto.ErrorObject.create({
                        code: error.code, details: error.message
                    })
                }
            )
        );
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return callback({code: grpc.status.INTERNAL, details: message}, null);
}

export default callbackError;
