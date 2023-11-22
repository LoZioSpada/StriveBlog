import express from 'express';
import authorRouter from './authorRouter.js';
import cors from 'cors'

// Andiamo a mettere tutte le nostre chiamate CRUD in una sotto-directory (API)
const apiRouter = express.Router()

apiRouter.use(express.json())

apiRouter.use('/authors', authorRouter)

apiRouter.use(cors())

apiRouter.options('*', cors())

export default apiRouter