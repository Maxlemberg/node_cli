const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
    const data = JSON.parse(await fs.readFile(contactsPath, 'utf-8'));
    console.log(data);
}

async function getContactById(contactId) {
    const data = JSON.parse(await fs.readFile(contactsPath, 'utf-8'));
    const contact = data.find(({ id }) =>  id.toString() === contactId.toString());
    console.log(contact);
    return contact;
}

async function removeContact(contactId) {
    const data = JSON.parse(await fs.readFile(contactsPath, 'utf-8'));
    const newData = data.filter(({ id }) => id.toString() !== contactId.toString());
    await fs.writeFile(contactsPath, JSON.stringify(newData));
}

async function addContact(id, name, email, phone) {
    const newContact = {
       id, name, email, phone
    }
    const data = JSON.parse(await fs.readFile(contactsPath, 'utf-8'));
    await fs.writeFile(contactsPath, JSON.stringify([...data, newContact]));
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}

