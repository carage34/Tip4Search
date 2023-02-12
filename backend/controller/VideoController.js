import {schemaVideo} from '../models/Video.js'
import mongoose, { Schema } from 'mongoose';

const routes = {
    getVideos: (req, res) => {
        schemaVideo.find()
            .then((videos) => {
                res.status(200).json(videos);
            })
            .catch(() => res.status(500).send("Impossible de récupérer les messages"));
    },

    getVideoById: (req, res) => {
        schemaVideo.findById(req.params.id)
            .then(videos => res.status(200).json({videos: videos}))
            .catch(() => res.status(500).send('Impossible de récupérer les videos'));
    }
}

export const ControllerVideo = routes;
export default routes;
