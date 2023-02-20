import mongoose, { Schema } from 'mongoose';

// Define collection and schema
let Video = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    name: {
        type: String
    },
    thumbnail: {
        type: String
    },
    postedAt: {
        type: Date
    },
    messages: [{
        type: mongoose.Types.ObjectId,
        ref: "Message"
    }],
}, {
    collection: 'videos'
})


const model = mongoose.model('Video', Video);

export const schemaVideo = model;
export default model;