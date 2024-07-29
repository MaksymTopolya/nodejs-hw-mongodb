import Contact from '../db/models/contactSchema.js';



async function getContacts({ page, perPage, sortBy, sortOrder}) {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();
    const [contacts, count] = await Promise.all([
      contactQuery
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .exec(),
      Contact.countDocuments(),
    ]);

    const totalPages = Math.ceil(count / perPage);

    return {
        data: contacts,
        page,
        perPage,
        totalItems: count,
        totalPages,
        hasNextPage: totalPages > page,
        hasPreviousPage: page > 1,
    };
};

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