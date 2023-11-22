import express from "express";
import { Author } from './models/authors.js'

const authorRouter = express.Router();


// Test per provare l'endpoint
authorRouter.get("/test", async (req, res) => {
    res.json({ message: "Authors router working!" });
  });

// Metodo 'GET' per effettuare una richiesta di TUTTI gli autori
authorRouter.get('/', async (req, res) => {
    const authors = await Author.find({})
    res.json(authors)
})


// Metodo 'GET' per effettuare una richiesta di un SOLO autore specifico
authorRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const author = await Author.findById({id})

    if(!author){
        return res.status(404).send()
    }

    res.json(author)
})


// Metodo 'POST' per AGGIUNGERE un autore
authorRouter.post('/', async (req, res) => {
    const newAuthor = new Author(req.body);
    await newAuthor.save();
    res.status(200).send(newAuthor)
})

export default authorRouter