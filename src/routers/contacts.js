import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContact, deleteContact, getContactById, getContacts, updateContact } from '../controllers/contacts.js';
import express from 'express';

const router = Router();
const jsonParser = express.json();
router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContactById));

router.post('/contacts', jsonParser, ctrlWrapper(createContact));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContact));

router.patch('/contacts/:contactId', jsonParser, ctrlWrapper(updateContact));

export default router;