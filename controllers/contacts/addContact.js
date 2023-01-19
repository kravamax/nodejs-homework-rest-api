const contactsAPI = require('../../models/contacts');
const addSchema = require('../../schemas/contacts');

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'missing required name field',
    });
  }

  const result = await contactsAPI.addContact(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
