import createHttpError from 'http-errors';
import Contact from '../db/models/contactSchema.js';
 
export const getContacts = async (req, res, next) => {
    const contacts = await Contact.find();
    res.send(contacts);
};


export const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
     if (contact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }
    res.send({ status: 200, data: contact });
};