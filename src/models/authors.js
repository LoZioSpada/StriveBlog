import mongoose, { Schema } from "mongoose";

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    surname: {
        type: String,
        required: true,
    },

   email: {
        type: String,
        required: true,
    },

    birthdate: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
    },
})

export const Author = mongoose.model('authors', AuthorSchema)