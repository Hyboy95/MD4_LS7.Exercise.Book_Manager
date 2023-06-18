import express from "express";
import bodyParser from "body-parser";
import { DataBase } from "./src/models/database.model";
import { router } from "./src/routers/web.router";

const PORT = 3000;
const app = express();

DataBase.connectDB()
        .then(() => console.log('DB Connected!'))
        .catch((err) => console.log(err.message));

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('./src/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());

app.use(router);

app.listen(PORT, 'localhost', () => console.log(`App is running at http://localhost:${PORT}`));