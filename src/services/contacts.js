import Contact from '../db/models/contactSchema.js';

function getContacts() {
  return Contact.find();
}

function getContactById(contactId) {  
  return Contact.findById(contactId); 
}

function createContact(contact) {
  return Contact.create(contact);
}

function deleteContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

function updateContact(contactId, contact) {
  return Contact.findByIdAndUpdate(contactId, contact, { new: true }); 
}

export {
  getContacts,
  getContactById,
  createContact,
  deleteContact, updateContact
};