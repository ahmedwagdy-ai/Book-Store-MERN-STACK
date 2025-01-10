const booksModel = require("../models/books.models");
const httpStatusText = require("../utils/httpStatusText");

const getBooks = async (req, res) => {

    try{
        const books = await booksModel.find({},{"__v":false});
        return res.status(200).json({ status: httpStatusText.SUCCESS, data: books });
    }
    catch(error){
        res.status(400).json({ status: httpStatusText.FAIL, message: error.message });
    }
};

const getSingleBook = async (req, res) => {
    try{
        const bookId = req.params.id;
        const book = await booksModel.findById(bookId, {"__v":false});
        return res.status(200).json({ status: httpStatusText.SUCCESS, data: book });
    }
    catch(error){
        res.status(400).json({ status: httpStatusText.FAIL, message: error.message});
    }
};

const addBook = async (req, res) => {
    console.log(req.body);

    if (!req.body.title || !req.body.author || !req.body.publicationYear ) {
        return res.status(404).json({ status: httpStatusText.ERROR, message: "Title, author, and publicationYear are required fields." });
    }

    try{
        const { title, author, publicationYear} = req.body;

        const newBook = await new booksModel({
            title,
            author,
            publicationYear
        });
        await newBook.save();
        return res.status(201).json({ status: httpStatusText.SUCCESS, data: newBook });
    }
    catch(error){
        res.status(400).json({ status: httpStatusText.FAIL, message: error.message });
    }
    
};

const updateBook = async (req, res) => {

    if (!req.body.title || !req.body.author || !req.body.publicationYear ) {
        return res.status(404).json({ status: httpStatusText.ERROR, message: "Title, author, and publicationYear are required fields." });
    }

    try{
        const bookId = req.params.id;
        await booksModel.findByIdAndUpdate(bookId, req.body);
        return res.status(200).json({ status: httpStatusText.SUCCESS, message: "Book updated successfully"});
    }
    catch(error){
        res.status(400).json({ status: httpStatusText.FAIL, message: error.message });
    };
};

const deleteBook = async (req, res) => {
    
    try{
        const bookId = req.params.id;
        await booksModel.findByIdAndDelete(bookId);
        return res.status(200).json({ status: httpStatusText.SUCCESS, message: "Book deleted successfully"});
    }
    catch(error){
        res.status(400).json({ status: httpStatusText.FAIL, message: error.message });
    };

};

module.exports = {
    getBooks,
    getSingleBook,
    addBook,
    updateBook,
    deleteBook,
}