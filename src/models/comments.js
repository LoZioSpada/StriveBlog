import mongoose, { Schema } from "mongoose";

const CommentsSchema = new Schema({
    rate: {
        type: String,
        required: true,
    },

    text: {
        type: String,
        required: true,
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'authors',
        required: true,
    },

    blogPost: {
        type: Schema.Types.ObjectId,
        ref: 'blogPosts',
    },

    createdAt:{
        type: String,
    }
})

export const Comment = mongoose.model('comments', CommentsSchema)