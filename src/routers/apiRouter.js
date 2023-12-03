import express from 'express';
import authorRouter from './authorRouter.js';
import blogPostRouter from './blogPostRouter.js';
import searchPostRouter from './searchPostRouter.js';
import cors from 'cors'

// Andiamo a mettere tutte le nostre chiamate CRUD in una sotto-directory (API)
const apiRouter = express.Router()

apiRouter.use(express.json())

apiRouter.use(cors())

apiRouter.use('/authors', authorRouter)

apiRouter.use('/blogPosts', blogPostRouter)

apiRouter.use('/searchPost', searchPostRouter)

export default apiRouter