const contactsAPI = require('../../models/contacts');

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsAPI.removeContact(id);
  console.log('result', result);
  if (!result) {
    return res.status(404).json({
      message: 'Not found',
    });
  }
  res.json({ message: 'contact deleted' });
};

module.exports = removeContact;
