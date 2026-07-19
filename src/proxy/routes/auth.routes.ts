import * as authController from '../controllers/auth.controller';
import { router } from "../router";

router.post('/auth/anonymousSignIn', authController.anonymousSignIn, false);
router.get('/auth/getMyUser', authController.getMyUser);
router.post('/auth/refreshTokens', authController.refreshTokens, false);


