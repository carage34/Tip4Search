import model, {schemaMessage} from '../models/Message.js'
import mongoose, { Schema } from 'mongoose';


const routes = {


    getMessageToBeProcessedByVideoId:  (req, res) => {
        schemaMessage.find({'done': false})
            .populate({path: 'video'})
            .then((messages) => {
                res.status(200).json(messages);
            })
            .catch(() => res.status(500).send("Impossible de récupérer les messages"));
    },

    getMessagesByVideoId:  (req, res) => {
        schemaMessage.find({'video': mongoose.Types.ObjectId(req.params.id)})
            .then((messages) => {
                res.status(200).json(messages);
            })
            .catch(() => res.status(500).send("Impossible de récupérer les messages"));
    },
}


export const ControllerMessage = routes;
export default routes;