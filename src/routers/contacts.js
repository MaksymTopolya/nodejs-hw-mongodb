import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContact, deleteContact, getContactById, getContacts, updateContact } from '../controllers/contacts.js';
import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema } from '../validation/contacts.js';
import { isValidID } from '../middlewares/isValidID.js';

const router = Router();
const jsonParser = express.json();
router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', isValidID, ctrlWrapper(getContactById));

router.post('/contacts', jsonParser,validateBody(contactSchema), ctrlWrapper(createContact));
router.delete('/contacts/:contactId',isValidID, ctrlWrapper(deleteContact));

router.patch('/contacts/:contactId', jsonParser, isValidID,validateBody(contactSchema), ctrlWrapper(updateContact));

export default router;