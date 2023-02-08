import {schemaMessage, schemaVideo} from '../models/Message.js'
import mongoose, { Schema } from 'mongoose';

exports.getVideos = (req, res) => {
    schemaVideo.find()
        .then((videos) => {
            res.status(200).json(videos);
        })
        .catch(() => res.status(500).send("Impossible de récupérer les messages"));
}

exports.getVideoById = (req, res) => {
    schemaVideo.findById(req.params.id)
        .then(videos => res.status(200).json({videos: videos}))
        .catch(() => res.status(500).send('Impossible de récupérer les videos'));
}