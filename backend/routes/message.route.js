import {ControllerMessage} from '../controller/MessageController.js'
import {default as express} from 'express';
const router = express.Router()

router.get('/:id', ControllerMessage.getMessagesByVideoId);
router.get('/done/:id', ControllerMessage.getMessageProcessedByVideoId);

export const messageRouter = router;
export default router;