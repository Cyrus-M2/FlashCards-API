import express from 'express';
//prisma client
import { PrismaClient } from '@prisma/client';

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
        const flashCards = await client.flashCard.findMany();
        res.status(200).json(flashCards)
    } catch (e) {
        res.status(500).json({message: "Something went wrong"});
    }
});

// route for adding data 
app.post('/flashcards', (req, res) => {
    try {
        const {title, content} = req.body
        client.flashCard.create({
            data: {
                title,
                content
            }
        })
    } catch (e) {
        res.status(500).json({ message: "Something went wrong" })
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