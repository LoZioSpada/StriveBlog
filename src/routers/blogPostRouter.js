import express, { response } from 'express';
import { BlogPost } from '../models/blogPost.js'
import { Comment } from '../models/comments.js'

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
    } catch (error) {
        console.log(error)
        res.status(404).send()
    }
})


// Metodo 'GET' per filtrare i post tramite il nome del titolo del post
blogPostRouter.get('/blogPosts?title=', async (req, res) => {
    try {
        const { title } = req.params
        const titleQuery = req.query

        if (!titleQuery(title)) {
            return res.status(400).json({ messaggio: 'Parametro "title" obbligatorio' })
        }

        const blogPost = await BlogPost.find({
            title: { $regex: titleQuery(title), $options: 'i' },
        })
        res.json({ blogPost })
    } catch (error) {
        console.log(error)
        res.status(500).json({ messaggio: 'Errore server!'})
    }
})


// Metodo 'POST' per AGGIUNGERE un nuovo post
blogPostRouter.post('/', async (req, res) => {
    try {
        const newPost = new BlogPost(req.body)
        await newPost.save()
        res.status(201).send(newPost)
    } catch (error) {
        console.log(error)
        req.status(500).send(error)
    }
})


// Metodo 'PUT' per MODIFICARE un post
blogPostRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updatePost = await BlogPost.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatePost) {
            return res.status(404).send()
        }
        res.json(updatePost)

    } catch (error) {
        console.log(error)
        req.status(400).send(error)
    }

})


// Metodo 'DELETE' per ELIMINARE un post
blogPostRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletePost = await BlogPost.findByIdAndDelete(id)
        if (!deletePost) {
            return res.status(404).send()
        }
    } catch (error) {
        console.log(error)
        req.status(400).send()
    }
})

// QUI ANDRANNO LE ROTTE PER I COMMENTI


// 'GET' PER RITORNARE TUTTI I COMMENTI DI UN POST SPECIFICO
.get("/:id/comments", async (req, res, next) => {
    try{
        const comments = await BlogPost.findById(req.params.id)
        .populate("comments author")
        .select("comments -_id")

        if(!comments){
            return res.status(404).send()
        }
        res.json(comments)
    } catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})


// 'GET' PER ANDARE A RITORNARE UN COMMENTO SPECIFICO DI UN POST SPECIFICO
.get('/:id/comments/:commentId', async (req, res, next) => {
    try{
        const blogPost = await BlogPost.findById(req.params.id);
        const comments = await Comment.findById(req.params.commentId)

        if(!blogPost){
            return res.status(404).send()
        } else if(!comments){
            return res.status(404).send()
        }
        res.json(comment)
    } catch(error){
        console.log(error)
        res.status(400).send()
    }
})


// 'POST' PER AGGIUNGERE UN NUOVO COMMENTO AD UN POST
.post("/:id", async(req, res, next) => {
    try{
        const blogPost = await BlogPost.findById(req.params.id)
        if(!blogPost){
            return res.status(404).send()
        }
        const newComment = new Comment(req.body)
        blogPost.comments.push(newComment)
        await newComment.save()
        await blogPost.save()
        res.status(201).send(newComment)
    } catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})


// 'PUT' PER MODIFICARE UN COMMENTO SPECIFICO
.put('/:id/comments/:commentId', async (req, res, next) => {
    try{
        const blogPost = await BlogPost.findById(req.params.id)
        const updateComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            req.body,+
            { new: true }
        )
        if(!blogPost){
            return res.status(404).send()
        } else if(!updateComment) {
            return res.status(404).send()
        }
        res.json(updateComment)
    } catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})


// 'DELETE' PER CANCELLARE UN COMMENTO
.delete('/:id/comments/:commentId', async (req, res, next) => {
    try{
        const blogPost = await BlogPost.findById(req.params.id)
        const deletedComment = await Comment.findByIdAndDelete(req.params.commentId)
        if(!blogPost){
            return res.status(404).send()
        } else if (!deletedComment){
            return res.status(404).send()
        } else {
            res.status(204).send()
        }
    } catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})

export default blogPostRouter