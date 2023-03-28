import {ControllerMessage} from '../controller/MessageController.js'
import {default as express} from 'express';
const router = express.Router()

router.get('/undone', ControllerMessage.getMessageToBeProcessedByVideoId);
router.get('/:id', ControllerMessage.getMessagesByVideoId);
router.get('/twitch/:id', ControllerMessage.getMessagesByTwitchId);
router.post('/:id', ControllerMessage.affectSong);


export const messageRouter = router;
export default router;