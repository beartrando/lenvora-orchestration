import jwt, {JwtPayload, SignOptions} from "jsonwebtoken";
import config from "./config";

import Id from "../../domain/value-objects/id";
import AccessToken from "../../domain/value-objects/access-token.vo";

import TokenService from "../../application/ports/token-service.port";


interface TokenPayload extends JwtPayload {
    sub: string;
}

const accessTokenOptions: SignOptions = {
    expiresIn: config.accessTokenExpiresIn as any,
};

const refreshTokenOptions: SignOptions = {
    expiresIn: config.refreshTokenExpiresIn as any,
};

export class JwtService implements TokenService {

    private readonly accessSecret: jwt.Secret = config.jwtAccessSecret;

    userIdFromAccessToken(
        token: AccessToken,
    ): Id {

        const payload = this.payload(token.value, this.accessSecret);

        return new Id(payload.sub);
    }

    verifyAccessToken(
        token: AccessToken,
    ): Id {
        return this.payload(token.value, this.accessSecret);
    }

    private payload(
        token: string,
        secret: jwt.Secret,
    ): TokenPayload {
        const payload = jwt.verify(token, secret) as TokenPayload;

        if (!payload.sub) {
            throw new Error("JWT payload missing sub");
        }

        return payload;
    }
}

export default JwtService;

