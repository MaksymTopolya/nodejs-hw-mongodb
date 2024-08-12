import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginSchema, registerSchema, requestResetEmailSchema, requestResetPasswordSchema } from '../validation/auth.js';
import { login, logout, refresh, register, requestResEmail, requestResPwd } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';


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
router.post('/auth/send-reset-email', jsonParser, validateBody(requestResetEmailSchema), ctrlWrapper(requestResEmail));
router.post('/auth/reset-pwd', jsonParser, validateBody(requestResetPasswordSchema), ctrlWrapper(requestResPwd));

export default router;