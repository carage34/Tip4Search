import {schemaVideo} from '../models/Video.js'
import mongoose, { Schema } from 'mongoose';

const routes = {
    getVideos: (req, res) => {
        schemaVideo.find().populate({path: 'messages'})
            .then((videos) => {
                res.status(200).json(videos);
            })
            .catch((reason) => res.status(500).send("Impossible de récupérer les messages " + reason));
    },

    getVideoById: (req, res) => {
        schemaVideo.findById(req.params.id).populate({path: 'messages', model: 'Message'})
            .then(videos => res.status(200).json({videos: videos}))
            .catch(() => res.status(500).send('Impossible de récupérer les videos'));
    }
}

export const ControllerVideo = routes;
export default routes;
