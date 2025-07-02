import dotenv from "dotenv"
dotenv.config()
import express from "express"

const app = express()

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Server is live")
})


app.listen(port, () => {
    console.log(`Server is live on port number ${port}`);
})