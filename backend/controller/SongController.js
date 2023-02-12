import {schemaSong} from '../models/Song.js'
import mongoose, { Schema } from 'mongoose';

const routes = {
    getSongs: (req, res) => {
        schemaSong.find()
            .then((songs) => {
                res.status(200).json(songs);
            })
            .catch(() => res.status(500).send("Impossible de récupérer les sons"));
    },

    getSongById: (req, res) => {
        schemaSong.findById(req.params.id)
            .then(song => res.status(200).json({song: song}))
            .catch(() => res.status(500).send('Impossible de récupérer le son'));
    }
}

export const ControllerSong = routes;
export default routes;