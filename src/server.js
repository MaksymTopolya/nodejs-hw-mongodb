import express from 'express';
import contactRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';



const app = express();
app.use(contactRouter);
app.use(notFoundHandler);
app.use(errorHandler);


export default app;