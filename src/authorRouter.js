import express from "express";
import { Author } from './models/authors.js'
import { BlogPost } from "./models/blogPost.js";

const authorRouter = express.Router();


// Metodo 'GET' per effettuare una richiesta di TUTTI gli autori
authorRouter.get('/', async (req, res) => {
    const authors = await Author.find({})
    res.json(authors)
})


// Metodo 'GET' per effettuare una richiesta di un SOLO autore specifico
authorRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const author = await Author.findById(id)


        if (!author) {
            return res.status(404).send()
        }
        res.json(author)
    } catch (error) {
        console.log(error)
    }


})


// Metodo 'GET' per ritornare tutti i post di un autore specifico
authorRouter.get('/:id/blogPosts', async(req, res) => {
    try{
        const { id } = req.params
        const author = await Author.findById(id)
        if(!author){
            return res.status(404).json({ messaggio: 'Autore non trovato' })
        }
        const blogPosts = await BlogPost.find({ 'author._id': id })
        res.json(blogPosts)
    } catch(error){
        console.log(error)
        req.status(400).send(error)
    }
})


// Metodo 'POST' per AGGIUNGERE un autore
authorRouter.post('/', async (req, res) => {
    try {
        const newAuthor = new Author(req.body);
        await newAuthor.save();
        res.status(200).send(newAuthor)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

})


// Metodo 'PUT' per MODIFICARE un autore
authorRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const authors = await Author.findByIdAndUpdate(id, req.body, {new: true})
        if (!authors) {
            return res.status(404).send()
        }
    } catch (error) {
        console.log(error)
        req.status(400).send(error)
    }
})

// Metodo 'DELETE' per ELIMINARE un autore
authorRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const author = await Author.findByIdAndDelete(id)
        if (!author) {
            return res.status(404).send()
        }
    } catch (error) {
        console.log(error)
        req.status(400).send(error)
    }
})


export default authorRouter