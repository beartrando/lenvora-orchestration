import {ProxyRequest} from "../contracts/proto/orchestration";
import logger from "@shared/logger";

export const getJwtFromProxyRequest = (
    req: ProxyRequest,
): string => {

    // logger.log(req.headers);
    // logger.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1');
    const authorization = req.headers.find(
        header => header.key.toLowerCase() === "authorization",
    )?.value;

    if (!authorization) {
        throw new Error("Authorization header is missing");
    }

    const [scheme, token] = authorization.split(" ", 2);

    if (scheme !== "Bearer" || !token) {
        throw new Error("Invalid Authorization header");
    }

    return token;
}

export default getJwtFromProxyRequest;
