import mongoose, { Schema } from "mongoose";

const BlogPostSchema = new Schema({
    category: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    cover: {
        type: String,
        required: true,
    },

    readTime: {
        value: {
            type: Number,
            required: true,
        },

        unit: {
            type: String,
            default: "minutes",
        },
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'authors',
    },

    content: {
        type: String,
        required: true,
    },
})

export const BlogPost = mongoose.model('blogPosts', BlogPostSchema)