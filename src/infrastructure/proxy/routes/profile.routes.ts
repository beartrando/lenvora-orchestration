import {Router} from "../router";
import ProfileController from "../controllers/profile.controller";

export class ProfileRouter {

    constructor(
        private readonly profileController: ProfileController,
    ) {
    }

    register(
        router: Router,
    ) {
        router.get('/profile/getMe', this.profileController.getMe);
        router.get('/profile/get', this.profileController.get);
    }
}

export default ProfileRouter;
