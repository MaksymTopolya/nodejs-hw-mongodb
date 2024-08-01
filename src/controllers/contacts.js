import createHttpError from 'http-errors';
import * as ContactService from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
 

async function getContacts(req, res, next) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
    const contacts = await ContactService.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
  });
  res.send({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts
  });
};


async function getContactById(req, res, next) {
    const { contactId } = req.params;
  const contact = await ContactService.getContactById(contactId);
     if (contact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }
    res.send({ status: 200, data: contact });
};

async function createContact(req, res, next) {
    try {
        const contact = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            isFavourite: req.body.isFavourite ?? false,
            contactType: req.body.contactType ?? 'personal'
        };

        const createdContact = await ContactService.createContact(contact);
        res.status(201).send({ status: 201, message: 'Contact created', data: createdContact });
    } catch (error) {
      console.log(error);
        next(error);
    }
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;

  const result = await ContactService.deleteContact(contactId);

  if (result === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).end();
}


async function updateContact(req, res, next) {
  const { contactId } = req.params;

   const contact = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            isFavourite: req.body.isFavourite ?? false,
            contactType: req.body.contactType ?? 'personal'
        };

  const result = await ContactService.updateContact(contactId, contact);

  if (result === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res
    .status(200)
    .send({ status: 200, message: 'Contact updated', data: result });
}




export {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact
};