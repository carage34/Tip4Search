import {ControllerMessage} from '../controller/MessageController.js'
import {default as express} from 'express';
const router = express.Router()

router.get('/undone', ControllerMessage.getMessageToBeProcessedByVideoId);
router.get('/:id', ControllerMessage.getMessagesByVideoId);


export const messageRouter = router;
export default router;