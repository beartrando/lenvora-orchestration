import { Router, type Router as ExpressRouter } from 'express';

import * as healthController from '../../../../gateway/src/http/controllers/gateway.controller';

const router: ExpressRouter = Router();

router.get('/health', healthController.health);
router.get('/full-health', healthController.fullHealth);
router.get('/status', healthController.status);
router.get('/livez', healthController.livez);
router.get('/readyz', healthController.readyz);

export default router;
