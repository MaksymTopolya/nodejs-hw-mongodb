import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export function isValidID(req, res, next) {
  const { contactId } = req.params;

  if (isValidObjectId(contactId) === false) {
    return next(createHttpError(400, 'ID is not valid'));
  }

  next();
}
