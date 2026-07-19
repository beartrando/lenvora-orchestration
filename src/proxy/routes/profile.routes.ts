import * as profileController from '../controllers/profile.controller';
import { router } from "../router";

router.get('/profile/getMyProfile', profileController.getMyProfile);
router.get('/profile/getProfile', profileController.getProfile);

