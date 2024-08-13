import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContact, deleteContact, getContactById, getContacts, updateContact } from '../controllers/contacts.js';
import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema } from '../validation/contacts.js';
import { isValidID } from '../middlewares/isValidID.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';
const router = Router();
const jsonParser = express.json();
router.get('/contacts',authenticate, ctrlWrapper(getContacts));
router.get('/contacts/:contactId',authenticate,  isValidID, ctrlWrapper(getContactById));

router.post('/contacts', authenticate, jsonParser,upload.single('photo'), validateBody(contactSchema), ctrlWrapper(createContact));
router.delete('/contacts/:contactId',authenticate, isValidID, ctrlWrapper(deleteContact));

router.patch('/contacts/:contactId',authenticate,  jsonParser, isValidID,upload.single('photo'), validateBody(contactSchema), ctrlWrapper(updateContact));

export default router;