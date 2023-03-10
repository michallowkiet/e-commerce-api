import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import ErrorHandler from './middleware/ErrorHandler.js';
import NotFoundHandler from './middleware/NotFoundHandler.js';
import { connectDB } from './utils/index.js';
import morgan from 'morgan';
import AuthRouter from './routes/AuthRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Witaj');
});

app.use('/api/v1/auth', AuthRouter);

app.use(NotFoundHandler);
app.use(ErrorHandler);

const startServer = async () => {
  try {
    await connectDB(MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
