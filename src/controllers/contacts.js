import createHttpError from 'http-errors';
import * as ContactService from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
 import * as fs from 'node:fs/promises';
import path from 'node:path';
async function getContacts(req, res, next) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
    const contacts = await ContactService.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user._id,
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
    res.send({ status: 200, message: "Successfully found contact!", data: contact });
};

async function createContact(req, res, next) {
  try {
    let avatarUrl;
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      const response = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path); 

      avatarUrl = response.secure_url; 
    } else {
      const localPath = path.resolve('src', 'uploads', 'photos', req.file.filename);
      await fs.rename(req.file.path, localPath); 

      avatarUrl = `http://localhost:8080/avatars/${req.file.filename}`;
    }

    const contact = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      isFavourite: req.body.isFavourite ?? false,
      contactType: req.body.contactType ?? 'personal',
      userId: req.user._id,
      photo: avatarUrl, 
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
  try {
    const { contactId } = req.params;
    const existingContact = await ContactService.getContactById(contactId);

    if (!existingContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    let avatarUrl = existingContact.avatarUrl; 

    if (req.file) { 
      if (process.env.ENABLE_CLOUDINARY === 'true') {
        const response = await uploadToCloudinary(req.file.path);
        await fs.unlink(req.file.path);
        avatarUrl = response.secure_url;
      } else {
        const localPath = path.resolve('src', 'uploads', 'avatars', req.file.filename);
        await fs.rename(req.file.path, localPath);
        avatarUrl = `http://localhost:8080/avatars/${req.file.filename}`;
      }
    }

    const contactUpdate = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      isFavourite: req.body.isFavourite ?? false,
      contactType: req.body.contactType ?? 'personal',
      photo: avatarUrl
    };

    const result = await ContactService.updateContact(contactId, contactUpdate);

    if (!result) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).send({ status: 200, message: 'Contact updated', data: result });
  } catch (error) {
    console.log(error);
    next(error); 
  }
}



export {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact
};