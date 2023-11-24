import express, { response } from 'express';
import { BlogPost } from './models/blogPost.js'

const blogPostRouter = express.Router()

// Metodo 'GET' per ritornare tutti i post
blogPostRouter.get('/', async (req, res) => {
    try {
        const blogPost = await blogPostRouter.find({})
        if (!blogPost) {
            return res.status(404).send()
        }
        res.json(blogPost)
    }

    catch (error) {
        console.log(error)
        res.status(404).send()
    }
})


// Metodo 'GET' per ritornare UN POST SPECIFICO
blogPostRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const blogPost = await blogPostRouter.findById(id)
        if (!blogPost) {
            return res.status(404).send()
        }
        req.json(blogPost)
    } catch (error){
        console.log(error)
        res.status(404).send()
    }
})


// Metodo 'POST' per AGGIUNGERE un nuovo post
blogPostRouter.post('/', async (req, res) => {
    try{
        const newPost = new BlogPost(req.body)
        await newPost.save()
        res.status(201).send(newPost)
    } catch(error){
        console.log(error)
        req.status(500).send(error)
    }
})


// Metodo 'PUT' per MODIFICARE un post
blogPostRouter.put('/:id', async(req, res) => {
    try{
        const { id } = req.params
        const updatePost = await BlogPost.findByIdAndUpdate(id, req.body, { new: true })
        if(!updatePost){
            return res.status(404).send()
        }
        res.json(updatePost)

    } catch(error){
        console.log(error)
        req.status(400).send(error)
    }
    
})


// Metodo 'DELETE' per ELIMINARE un post
blogPostRouter.delete('/:id', async(req, res) => {
    try{
        const { id } = req.params
        const deletePost = await BlogPost.findByIdAndDelete(id)
        if(!deletePost){
            return res.status(404).send()
        } 
    } catch(error){
        console.log(error)
        req.status(400).send()
    }
})

export default blogPostRouter