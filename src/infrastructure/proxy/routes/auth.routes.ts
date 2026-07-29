import {Router} from "../router";
import AuthController from "../controllers/auth.controller";

export class AuthRouter {

    constructor(
        private readonly authController: AuthController,
    ) {
    }

    register(
        router: Router,
    ) {
        router.post("/auth/anonymousSignIn", this.authController.anonymousSignIn, false);
        router.get("/auth/getMe", this.authController.getMe);
        router.post("/auth/refreshTokens", this.authController.refreshTokens, false);
    }
}

export default AuthRouter;
