import mongoose, { Schema } from "mongoose";

const AuthorSchema = new Schema({
    name: {
        type: String,
    },

    surname: {
        type: String,
    },

   email: {
        type: String,
    },

    birthdate: {
        type: String,
    },

    avatar: {
        type: String,
    },
})

export const Author = mongoose.model('authors', AuthorSchema)