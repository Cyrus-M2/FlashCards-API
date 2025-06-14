import express from 'express';

const app = express()

// testing the root
app.get("/", (req, res) => {
    res.send("<h1>Welcome to our FlashCards API<h1/>")
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