import model, {schemaMessage} from '../models/Message.js'
import mongoose, { Schema } from 'mongoose';

const getMessagesByVideoId = (req, res) => {
    schemaMessage.find({'video': mongoose.Types.ObjectId(req.params.id)})
        .then((messages) => {
            res.status(200).json(messages);
        })
        .catch(() => res.status(500).send("Impossible de récupérer les messages"));
}

export const schemaController = getMessagesByVideoId;
export default getMessagesByVideoId;