const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
    try {
        const data = JSON.parse(await fs.readFile(contactsPath, 'utf-8'));
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

async function getContactById(contactId) {
    try {
        const data = JSON.parse(await fs.readFile(contactsPath, 'utf-8'));
        const contact = data.find(({ id }) =>  id.toString() === contactId.toString());
        console.log(contact);
        return contact;
    } catch (error) {
        console.error(error);
    }
}

async function removeContact(contactId) {
    try {
        const data = JSON.parse(await fs.readFile(contactsPath, 'utf-8'));
        const newData = data.filter(({ id }) => id.toString() !== contactId.toString());
        await fs.writeFile(contactsPath, JSON.stringify(newData));
    } catch (error) {
        console.error(error);
    }
}

async function addContact(id, name, email, phone) {
    try {
        const newContact = {
            id, name, email, phone
        }
        const data = JSON.parse(await fs.readFile(contactsPath, 'utf-8'));
        await fs.writeFile(contactsPath, JSON.stringify([...data, newContact]));
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}

