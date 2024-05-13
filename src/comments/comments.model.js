import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    idAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    email: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    },
    publication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publication",
        required: true
    }
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;