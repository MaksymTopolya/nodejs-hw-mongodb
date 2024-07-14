import express from 'express';
import cors from 'cors';
import pino from 'pino';
import dotenv from 'dotenv';
import Contact from './contactSchema.js';
import mongoose from 'mongoose';
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
            const contacts = await Contact.find();
             res.status(200).send({
            message: 'Successfully found contacts!',
            contacts: contacts
        });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
          }
          
      });
       app.get('/contacts/:contactId', async (req, res) => {
        try {
            const { contactId } = req.params;

            const contact = await Contact.findById(contactId);

            if (!contact) {
                return res.status(404).json({ message: 'Contact not found' });
            }

            res.status(200).json({
                message: 'Successfully found contact!',
                contact: contact
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    });;

    app.use((req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
