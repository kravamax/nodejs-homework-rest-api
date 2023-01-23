const { Contact } = require('../../models/contact');

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  console.log('result', result);
  if (!result) {
    return res.status(404).json({
      message: 'Not found',
    });
  }
  res.json({ message: 'contact deleted' });
};

module.exports = removeContact;
