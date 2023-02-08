import {schemaSong} from '../models/Song.js'
import mongoose, { Schema } from 'mongoose';

exports.getSongs = (req, res) => {
    schemaSong.find()
        .then((songs) => {
            res.status(200).json(songs);
        })
        .catch(() => res.status(500).send("Impossible de récupérer les sons"));
}

exports.getSongById = (req, res) => {
    schemaSong.findById(req.params.id)
        .then(song => res.status(200).json({song: song}))
        .catch(() => res.status(500).send('Impossible de récupérer le son'));
}