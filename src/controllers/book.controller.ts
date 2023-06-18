import { Publisher } from "../models/schemas/publisher.model";
import { Category } from "../models/schemas/category.model";
import { Book } from "../models/schemas/book.model";

export class BookController {
    static async getCreatePage(req, res) {
        try {
            const categories = await Category.find();
            const publishers = await Publisher.find();
            res.render('create', { categories: categories, publishers: publishers });
        } catch (err) {
            console.log(err.message);
        }
    }

    static async createNewBook(req, res) {
        try {
            const { name, categoryID, author, keyword, publisherID } = req.body;
            let bookSearch = await Book.findOne({ name: name });
            if (!bookSearch) {
                let bookNew = new Book({
                    name: name,
                    author: author,
                    category: categoryID,
                    publisher: publisherID
                })
                bookNew.keywords.push({ keyword: keyword });
                await bookNew.save();
            } else console.log('Book was existed!');
            res.redirect('/')
        } catch (err) {
            console.log(err.message);
        }
    }

    static async getAllBook(req, res) {
        try {
            let size = 3;
            let page = req.query.page ? +req.query.page : 1;

            if (req.body.size) {
                size = +req.body.size;
            } else if (req.query.limit) {
                size = +req.query.limit;
            }
            let query = {};
            if (req.query.keyword && req.query.keyword !== "") {
                let keywordSearch = req.query.keyword || "";
                query = {
                    "keywords.keyword": { $regex: keywordSearch }
                }
            }

            const allBook = await Book.find(query).populate(
                [
                    { path: "category", select: "name" },
                    { path: "publisher", select: "name" }
                ]
            );
            let totalPage = Math.ceil(allBook.length / size);
            let offset = (page - 1) * size;
            const books = await Book.find(query).populate(
                [
                    { path: "category", select: "name" },
                    { path: "publisher", select: "name" }
                ]
            ).limit(size).skip(offset);
            res.render("list", { books: books, totalPage: totalPage, pageCurrent: page, limit: size, totalItem: allBook.length });
        } catch (err) {
            res.render(err.message);
        }
    }
}