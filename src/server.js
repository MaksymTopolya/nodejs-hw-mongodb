
import path from 'node:path';
import express from 'express';
import contactRouter from './routers/contacts.js';
import cookieParser from 'cookie-parser';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routers/auth.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';




const app = express();
app.use(express.static(path.resolve('src', 'uploads')));
app.use('/api-docs', swaggerDocs());

app.use(cookieParser());
app.use(authRouter);
app.use(contactRouter); 
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
