const express  = require('express');
const app = express();

require ("dotenv").config();
const mongoose = require("mongoose");
const cors = require('cors');

mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("Connected to MongoDB");
})

app.use(express.json());
app.use(cors());

const booksRouter = require("./routes/books.route");

app.use("/books", booksRouter);

app.listen(process.env.PORT || 5555, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
})