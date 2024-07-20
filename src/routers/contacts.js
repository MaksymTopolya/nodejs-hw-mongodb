import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { getContactById, getContacts } from '../controllers/contacts';


const router = Router();

router.get('/contacts', ctrlWrapper(getContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContactById));

export default router;