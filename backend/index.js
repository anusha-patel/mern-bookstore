import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRotes.js";
import cors from "cors"

const app = express();

// middleware for parsing request body
app.use(express.json())

// middleware for handling cors police

// option 1: allow all orgins with default of cors(*)
// app.use(cors());


// option 2 : allow custom origins

app.use(cors({
    origin: "https://mern-bookstore-8rdx.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type']
}));


app.get("/", (req,res)=>{
    // console.log(req);
    return res.status(201).send('welcome to  home /')
})

app.use("/books", booksRoute);




mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('app connected to database');
    app.listen(PORT,()=>{
        console.log(`app is listening to port no ${PORT}`)
    });

})
.catch((err)=>{
    console.error(err);
});
