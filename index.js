import express from 'express';
//prisma client
import { PrismaClient } from '@prisma/client';

import { validateFlashcardInfo } from './middlewares.js';

const app = express()
//creating instance of prisma client
const client = new PrismaClient()

app.use(express.json()) //middleware

// testing the root
app.get("/", (req, res) => {
    res.send("<h1>Welcome to our FlashCards API<h1/>")
})

//getting all our flashcards
app.get("/flashcards", async (req, res) => {
    try {
        const flashCards = await client.flashCard.findMany({
            where: {
                isDeleted: false
            }
        });
        res.status(200).json(flashCards)
    } catch (e) {
        res.status(500).json({message: "Something went wrong"});
    }
});

// route for creating flashcards
app.post('/flashcards', [validateFlashcardInfo], async (req, res) => {
    try {
        const {title, content} = req.body
        const newFlashCard = await client.flashCard.create({
            data: {
                title,
                content
            }
        })
        res.status(201).json(newFlashCard)
    } catch (e) {
        res.status(500).json({ message: "Something went wrong" })
    }
})

// route for getting a specific flashcard
app.get("/flashcard/:id", async (req, res) => {
    try {
        const { id } = req.params
        const flashCard = await client.flashCard.findFirst({
            where: {
                id
            }
        })
        if (flashCard) {
            return res.status(200).json(flashCard)
        } else {
            return res.status(404).json({message: "FlashCard is not found"});
        }
    } catch (e) {
        res.status(500).json({ message: "Something went wrong" })
    }
})

//implementing route for deletion
app.delete("/flashcards/:id", async (req, res) => {
    try {
        const {id} = req.params
        await client.flashCard.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        })
        res.status(200).json({message: "FlashCard deleted successfully"})
    }
    catch(e) {
        res.status(500).json({message: "Something went wrong"});
    }
})

// route for updating (put/patch)
app.patch("/flashcards/:id", async (req, res) => {
    try {
        const {title, content} = req.body
        const {id} = req.params
        const flashCard = await client.flashCard.update({
            where: {
                id
            },
            data: {
                title: title && title,
                content: content && content
            }
        })
        res.status(200).json(flashCard)
    }
    catch(e) {
        res.status(500).json({message: "Something went wrong"});
    }
})

let port;
if (process.env.PORT) {
    port = process.env.PORT
} else {
    port = 4000;
}
// const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})