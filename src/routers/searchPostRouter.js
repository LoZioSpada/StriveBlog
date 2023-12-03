import express  from "express";
import { BlogPost } from '../models/blogPost.js'
import { genericError } from '../middlewares/genericError.js'

const searchPostRouter = express.Router()

searchPostRouter.get('/', async (req, res, next) => {
    try{
        const title = req.query
        if(!title){
            return res
            .status(400)
            .json({ messaggio:'Il parametro TITOLO è obbligatorio' })
        }

        const titleResult = await BlogPost.findOne({
            title: { $regex: title, $options: 'i' },
        })
        res.json(titleResult)

    } catch(error){
        console.error(error)
        next(genericError)
    }
})

export default searchPostRouter