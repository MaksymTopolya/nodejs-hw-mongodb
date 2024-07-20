
import Contact from '../db/models/contactSchema.js';
 
export const getContacts = async () => {
    const contacts = await Contact.find();
    return contacts;
};


export const getContactById = async (contactId) => {
        const contact = await Contact.findById(contactId);
        return contact;
};