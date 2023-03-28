import model, {schemaMessage} from '../models/Message.js'
import {schemaVideo} from "../models/Video.js";
import mongoose, { Schema } from 'mongoose';


const routes = {


    getMessageToBeProcessedByVideoId:  (req, res) => {
        schemaMessage.find({'done': false})
            .populate({path: 'video'}).populate({path: 'song'})
            .then((messages) => {
                res.status(200).json(messages);
            })
            .catch(() => res.status(500).send("Impossible de récupérer les messages"));
    },

    getMessagesByVideoId:  (req, res) => {
        schemaMessage.find({'video': mongoose.Types.ObjectId(req.params.id)}).populate({path: 'song'})
            .then((messages) => {
                res.status(200).json(messages);
            })
            .catch((err) => res.status(500).send("Impossible de récupérer les messages" +err ));
    },

    getMessagesByTwitchId:  (req, res) => {

        schemaVideo.findOne({twitchid: req.params.id}).then((video) => {
            console.log(video);
            schemaMessage.find({'video': mongoose.Types.ObjectId(video._id)}).populate({path: 'song'})
                .then((messages) => {
                    res.status(200).json(messages);
                })
                .catch((err) => res.status(500).send("Impossible de récupérer les messages" +err ));
        })


    },

    affectSong: (req, res) => {
        schemaMessage.findOneAndUpdate({_id: req.params.id}, {song: req.body.songId, done:true}).then((message) => {
            res.status(200).json(message);
        })
            .catch(() => {
                res.status(500).send("Impossible de mettre à jour le message");
            })
    }
}

export const ControllerMessage = routes;
export default routes;