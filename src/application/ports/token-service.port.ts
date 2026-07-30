import AccessToken from "../../domain/value-objects/access-token.vo";
import Id from "../../domain/value-objects/id.vo";


export interface TokenService {
    verifyAccessToken(
        token: AccessToken,
    ): Id;
}

export default TokenService;
