import { Schema, model } from "mongoose";

interface IBook {
    category: object;
    name: string;
    author: string;
    keywords: object[];
    publisher: object
}

const keywordsSchema = new Schema({
    keyword: String
})

const bookSchema = new Schema<IBook>({
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    name: String,
    author: String,
    keywords: [keywordsSchema],
    publisher: { type: Schema.Types.ObjectId, ref: "Publisher" }
})

export const Book = model<IBook>('Book', bookSchema);