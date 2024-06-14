import express from 'express';
import userRoutes from './routes/userRouter.js'
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
const app = express();
const PORT = process.env.PORT || 3000;

//Public Folder
app.use(express.static('public'));

//Motor de Plantilla
app.engine('hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './views');

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//Routes
app.use('/', userRoutes)


app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`));