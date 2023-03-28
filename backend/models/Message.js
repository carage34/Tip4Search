import mongoose, { Schema } from 'mongoose';

// Define collection and schema
let Message = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    video: {
        type: mongoose.Types.ObjectId,
        ref: "Video",
    },
    winner:  [String],
    postedAt: Date,
    offsetSeconds: Number,
    done: { type: Boolean, default: false },
    song : {
        type: mongoose.Types.ObjectId,
        ref: "Song",
    }

}, {
    collection: 'messages'
})

const model = mongoose.model('Message', Message);

export const schemaMessage = model;
export default model;