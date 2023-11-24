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
        _id:{
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        avatar: {
            type: String,
        }
    },

    content: {
        type: String,
        required: true,
    },
})

export const BlogPost = mongoose.model('blogPosts', BlogPostSchema)