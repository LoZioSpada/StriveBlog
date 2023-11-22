// Import di Express, Mongoose e ApiRouter.js
import express from 'express'
import apiRouter from './apiRouter.js'
import mongoose from 'mongoose'

const server = express()

// Porta del server
const port = 3030

// La sotto-directory /api
server.use("/api", apiRouter)

// Connessione al database con mongoose
mongoose
    .connect(
        process.env.MONGO_URL
    )
    .then(() => {
        // Il server "sente" a quale porta si deve collegare
        server.listen(port, () => {
            console.log('🚀 Server listening to port: ' + port)
        })
    })
    .catch(() => {
        console.log('Error listening to port: ' + port)
    })


