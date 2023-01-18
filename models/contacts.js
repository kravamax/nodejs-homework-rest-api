const fs = require('fs/promises');
const path = require('path');
const pathContacts = path.join(__dirname, 'contacts.json');
const { nanoid } = require('nanoid');

const listContacts = async () => {
  const contacts = await fs.readFile(pathContacts);
  return JSON.parse(contacts);
};

const getContactById = async (id) => {
  const response = await fs.readFile(pathContacts);
  const contacts = JSON.parse(response);
  const contact = contacts.find((contact) => contact.id === id);

  return contact || null;
};

const removeContact = async (id) => {
  const response = await fs.readFile(pathContacts);
  const contacts = JSON.parse(response);

  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const response = await fs.readFile(pathContacts);
  const contacts = JSON.parse(response);

  const newContact = {
    ...body,
    id: nanoid(),
  };

  contacts.push(newContact);
  await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateContact = async (id, body) => {
  const response = await fs.readFile(pathContacts);
  const contacts = JSON.parse(response);

  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }

  contacts[index] = { ...contacts[index], ...body };

  await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
