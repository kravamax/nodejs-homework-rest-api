const contactsAPI = require('../../models/contacts');

const listContacts = async (_, res) => {
  const contacts = await contactsAPI.listContacts();
  res.json(contacts);
};

module.exports = listContacts;
