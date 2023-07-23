import { createError } from '../error.js';
import Comment from '../models/Comment.js';
import Video from '../models/Video.js';

export const addComment = async (req, res, next) => {
    const newComment = new Comment({...req.body, userId: req.user.id})
    try{
        const sevedComment = await newComment.save();
        res.status(200).json(sevedComment)
    } catch(err) {
        next(err)
    }
};

export const deleteComment = async (req, res, next) => {
    try{
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(req.params.id)

        if(req.user.id === comment.userId || req.user.id === video.userId){
            await Comment.findOneAndDelete(req.params.id)
            res.status(200).json("Comment has been deleted.")
        } else {
            next(createError(403, 'you cannot delete this comment!'))
        }
    } catch(err) {
        next(err)
    }
};

export const getComment = async (req, res, next) => {
    try{
        const commments = await Comment.find({videoId: req.params.videoId})
        res.status(200).json(commments)
    } catch(err) {
        next(err)
    }
};