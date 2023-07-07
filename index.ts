import express, { Express, Request, Response } from "express";
import connect from './db/connect';
import * as dotenv from "dotenv";
import authRouter  from './routes/auth.routes';
import bookRouter from './routes/books.routes';
import morgan from 'morgan';

dotenv.config();
const port = process.env.PORT;
const app: Express = express();
app.use(express.json());
const loggerMiddleware = morgan('combined');
app.use(loggerMiddleware);
app.use(authRouter);
app.use(bookRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO worldd");
});


connect()
.then(() => {
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
})
}).catch((err) => {
    console.log('Server failed')
})