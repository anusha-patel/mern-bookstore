import express from "express";
// we are using these Book module/collection to creaate these routes
import { Book } from "../models/bookmodle.js";




const router = express.Router();

//route for save a new book
router.post('/',async(req, res)=>{
    try {
       if(
        !req.body.title ||
        !req.body.author ||
        !req.body.publishYear
       ){
        return res.status(400).send({
            message:`send all required fields: title,author,publishYear`
        })
       };
       const newBook ={
        title:req.body.title,
        author:req.body.author,
        publishYear:req.body.publishYear,
       };

       const book = await Book.create(newBook);
       return res.status(201).send(book)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
        
    }
})
 
// route to get all books form database

router.get('/',async(req,res)=>{
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count:books.length,
            data:books
        });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
        
    }
})

// route to get  one book usind id  form database


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        

        // Use the provided ID to query the specific book by its ID
        const book = await Book.findById(id);
        // console.log(book._id)
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message });
    }
});


//route for update a book
router.put('/:id', async(req,res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
           ){
            return res.status(400).send({
                message:`send all required fields: title,author,publishYear`
            })
           }

           const { id } = req.params;

           const result = await Book.findByIdAndUpdate(id, req.body ,{ new: true });

           if(!result){
            res.status(404).json({message:'book not found'})

           }
           return  res.status(200).send({message: 'book has been updated successfully'})  
    } catch (error) {
        console.log(error.message);
        res.status(400).send({message: error.message})
        
    }
})

//route for delete a book by using id
//router.delete('/books/:id',async(req,res) because '/books' is already defined in middleware 'app.use("/books", booksroute)' in index.js
router.delete('/:id', async(req,res)=>{
    try {
        const { id } = req.params;
        console.log(id)
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message:"book not found"})
        }


        return  res.status(200).send({message: 'book has been deleted successfully'})  
        
    } catch (error) {
        console.log(error.message);
        res.status(400).send({message: error.message})
        
    }
});

export default router;