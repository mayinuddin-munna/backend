import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrHandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import cors from 'cors';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// application routes
app.use('/api/v1', router);

const testRoute = (req: Request, res: Response) => {
  res.send('Server is running!');
};

app.get('/', testRoute);

// Global Error Handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
