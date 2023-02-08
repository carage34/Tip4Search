import {schemaController} from '../controller/MessageController.js'
import {default as express} from 'express';
const router = express.Router()

router.get('/:id', schemaController);

export const messageRouter = router;
export default router;