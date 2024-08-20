// src/server.js

import express from 'express';
import contactRouter from './routers/contacts.js';
import cookieParser from 'cookie-parser';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routers/auth.js';
import YAML from 'yamljs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocumentPath = path.join(__dirname, '../docs/openapi.yaml');
const swaggerDocument = YAML.load(swaggerDocumentPath);

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cookieParser());
app.use(authRouter);
app.use(contactRouter); 
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
