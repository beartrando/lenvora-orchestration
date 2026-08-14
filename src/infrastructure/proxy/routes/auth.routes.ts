import {Router} from "../router";
import AuthController from "../controllers/auth.controller";
import logger from "@shared/logger";

export class AuthRouter {

    constructor(
        private readonly authController: AuthController,
    ) {
    }

    register(
        router: Router,
    ) {
        router.post("/auth/anonymousSignIn",this.authController.anonymousSignIn.bind(this.authController), false);
        router.get("/auth/getMe", this.authController.getMe.bind(this.authController));
        router.post("/auth/refreshTokens", this.authController.refreshTokens.bind(this.authController), false);
    }
}

export default AuthRouter;
