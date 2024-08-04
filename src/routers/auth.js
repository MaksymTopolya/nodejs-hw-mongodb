import express from 'express';
import { validateBody } from '../middlewares/validateBody';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { loginSchema, registerSchema } from '../validation/auth';
import { login, logout, refresh, register } from '../controllers/auth';



const router = express.Router();
const jsonParser = express.json();

router.post(
  '/auth/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(register),
);

router.post(
    '/auth/login',
    jsonParser,
    validateBody(loginSchema),
    ctrlWrapper(login));

router.post('/auth/logout', ctrlWrapper(logout));
    
router.post('/auth/refresh', ctrlWrapper(refresh));