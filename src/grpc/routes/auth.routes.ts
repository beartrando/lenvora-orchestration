import { Router, type Router as ExpressRouter } from 'express';

import * as authController from '../../../../gateway/src/http/controllers/orchestration.controller';

const router: ExpressRouter = Router();


router.get('/health', authController.health);
router.get('/status', authController.status);
router.get('/livez', authController.livez);
router.get('/readyz', authController.readyz);

router.post('/anonymousSignIn', authController.anonymousSignIn);
router.get('/getMyUser', authController.getMyUser);
router.post('/refreshTokens', authController.refreshTokens);

export default router;

