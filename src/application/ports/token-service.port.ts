import Id from "../../domain/value-objects/id";
import AccessToken from "../../domain/value-objects/access-token.vo";
import RefreshToken from "../../domain/value-objects/refresh-token.vo";

export interface TokenService {
    verifyAccessToken(
        token: AccessToken,
    ): Id;
}

export default TokenService;
