import { Router } from "express";
import { BookController } from "../controllers/book.controller";
export const router = Router();

router.get('/create', BookController.getCreatePage);
router.post('/create', BookController.createNewBook);
router.get('/', BookController.getAllBook);
router.post('/', BookController.getAllBook);
router.get('/update/:id', BookController.getUpdatePage);
router.post('/update/:id', BookController.updateBook);
router.get('/delete/:id', BookController.deleteBook);