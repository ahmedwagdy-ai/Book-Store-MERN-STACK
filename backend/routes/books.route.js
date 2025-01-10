const express = require("express");

const router = express.Router();

const controller = require("../controllers/books.controller");

router.route("/").get(controller.getBooks)
                .post(controller.addBook);

router.route("/:id").get(controller.getSingleBook)
                    .put(controller.updateBook)
                    .delete(controller.deleteBook);

module.exports = router;