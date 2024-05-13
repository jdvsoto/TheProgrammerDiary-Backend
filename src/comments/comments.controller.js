import Comment from "./comments.model.js";
import mongoose from "mongoose";
export const createComment = async (req, res) => {
    try {
        const { content, publication } = req.body;
        const user = req.user;
        const newComment = new Comment({
            author: user.name,
            idAuthor: user._id,
            email: user.email,
            content,
            publication,
        });
        await newComment.save();
        return res.status(200).json({
            msg: "Comment has been created",
            comment: newComment,
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Comment has not been created",
            errors: error,
        });
    }
};

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.status(200).json({
            comments,
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Comments has not been found",
            errors: error,
        });
    }
};

export const getCommentsByPublication = async (req, res) => {
    try {
        const { publication } = req.query;
        const comments = await Comment.find({ publication });
        if (!comments) {
            return res.status(404).json({
                msg: "No comments found for the specified publication.",
            });
        }
        return res.status(200).json({
            msg: "Comments retrieved successfully.",
            comments,
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error",
            error: error.message,
        });
    }
};

export const getCommentsByUser = async (req, res) => {
    try {
        const { idAuthor } = req.query;
        const comments = await Comment.find({ idAuthor });
        if (comments.length === 0) {
            return res.status(404).json({
                msg: "No comments found for the specified user.",
            });
        }
        console.log(idAuthor, comments);
        return res.status(200).json({
            msg: "Comments retrieved successfully.",
            comments,
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error",
            error: error.message,
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const comment = await Comment.findById(id);
        console.log(comment);
        if (!comment) {
            return res.status(404).json({
                msg: "Comment not found.",
            });
        }
        if (comment.idAuthor.toString() != req.user._id) {
            return res.status(401).json({
                msg: "You are not authorized to update this comment."
            });
        }

        const updatedComment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
        return res.status(200).json({
            msg: "Comment has been updated.",
            comment: updatedComment,
        });

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error",
            error: error.message,
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        console.log(comment);
        if (!comment) {
            return res.status(404).json({
                msg: "Comment not found.",
            });
        }
        if (comment.idAuthor.toString() != req.user._id) {
            return res.status(401).json({
                msg: "You are not authorized to delete this comment."
            });
        }
        await Comment.findByIdAndDelete(id);
        return res.status(200).json({
            msg: "Comment has been deleted.",
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error",
            error: error.message,
        });
    }
};