const { Contact } = require('../../models/contact');

const getContactById = async (req, res) => {
  const { id } = req.params;
  // const contact = await Contact.findOne({ _id: id });
  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({ message: 'Not Found' });
  }
  res.json(contact);
};

module.exports = getContactById;
