import express from 'express';
import authorRouter from './authorRouter.js';

// Andiamo a mettere tutte le nostre chiamate CRUD in una sotto-directory (API)
const apiRouter = express.Router()

apiRouter.use('/authors', authorRouter)

export default apiRouter