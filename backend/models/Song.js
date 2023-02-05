import mongoose, { Schema } from 'mongoose';

// Define collection and schema
let Song = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    name: {
        type: String
    },
    artist: {
        type: String
    },
}, {
    collection: 'songs'
})

const model = mongoose.model('Song', Song);

export const schemaSong = model;
export default model;