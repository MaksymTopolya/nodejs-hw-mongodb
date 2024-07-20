import express from 'express';
import cors from 'cors';
import pino from 'pino';
import dotenv from 'dotenv';
import { getContactById, getContacts } from './services/contacts.js';

dotenv.config();

export function setupServer() {
    const app = express();
    const logger = pino();
    const PORT = process.env.PORT || 3000;

    app.use(cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
    }));

    app.use((req, res, next) => {
        logger.info(`${req.method} ${req.url}`);
        next();
    });


    app.get('/contacts', async (req, res) => {
        try {
            const contacts = await getContacts();
            res.status(200).json({
                status: 200,
                message: 'Successfully found contacts!',
                data: contacts
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
                error: error.message
            });
        }
    });
    
     app.get('/contacts/:contactId', async (req, res) => {
        try {
            const { contactId } = req.params;
            const contact = await getContactById(contactId);

            if (!contact) {
                return res.status(404).json({
                    status: 404,
                    message: 'Contact not found'
                });
            }

            res.status(200).json({
                status: 200,
                message: 'Successfully found contact!',
                data: contact
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
                error: error.message
            });
        }
    });

    app.use((req, res) => {
        res.status(404).json({
            status: 404,
            message: 'Not found',
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
