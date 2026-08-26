import {ProxyRequest} from "../../../contracts/proto/orchestration";
import SessionAccessToken from "../../../domain/session/value-objects/session-access-token.vo";
import logger from "@shared/logger";

export const jwtFromProxyRequest = (
    req: ProxyRequest,
): SessionAccessToken => {

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

    logger.log(token);
    return new SessionAccessToken(token);
}

export default jwtFromProxyRequest;
