const contactsAPI = require('../../models/contacts');
const addSchema = require('../../schemas/contacts');

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { error } = addSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: 'missing fields' });
  }

  const result = await contactsAPI.updateContact(id, req.body);
  if (!result) {
    res.status(404).json({ message: 'Not found' });
  }

  res.json(result);
};

module.exports = updateContact;
