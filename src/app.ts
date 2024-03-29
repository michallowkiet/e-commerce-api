import dotenv from 'dotenv';
import cors from 'cors';
import express, { Request, Response } from 'express';
import ErrorHandler from './middleware/ErrorHandler.js';
import NotFoundHandler from './middleware/NotFoundHandler.js';
import { connectDB } from './utils/index.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import AuthRouter from './routes/AuthRouter.js';
import UserRouter from './routes/UserRouter.js';
import { authenticateUserHandler } from './middleware/AuthenticationHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Witaj');
});

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/users', authenticateUserHandler, UserRouter);

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
