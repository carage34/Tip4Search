import {ControllerSong} from '../controller/SongController.js'
import {default as express} from 'express';
const router = express.Router()

router.get('/:id', ControllerSong.getSongById);
router.get('', ControllerSong.getSongs);

export const songRouter = router;
export default router;