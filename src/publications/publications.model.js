import mongoose from 'mongoose';


const PublicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    img: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

const Publication = mongoose.model('Publication', PublicationSchema);

export default Publication;