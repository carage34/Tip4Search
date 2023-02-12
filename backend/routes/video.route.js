import {ControllerVideo} from '../controller/VideoController.js'
import {default as express} from 'express';
const router = express.Router()

router.get('/:id', ControllerVideo.getVideoById);
router.get('', ControllerVideo.getVideos);

export const videoRouter = router;
export default router;