const contactsAPI = require('../../models/contacts');

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsAPI.getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: 'Not Found' });
  }
  res.json(contact);
};

module.exports = getContactById;
