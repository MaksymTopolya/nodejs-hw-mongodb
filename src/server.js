import express from 'express';
import contactRouter from './routers/contacts.js';
import cookieParser from 'cookie-parser';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routers/auth.js';


const app = express();
app.use(cookieParser());
app.use(authRouter);
app.use(contactRouter);
app.use(notFoundHandler);
app.use(errorHandler);


export default app;