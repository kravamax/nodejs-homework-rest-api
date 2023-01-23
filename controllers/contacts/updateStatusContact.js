const { Contact, schemas } = require('../../models/contact');

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { error } = schemas.updateFavoriteSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    res.status(404).json({ message: 'Not found' });
  }

  res.json(result);
};

module.exports = updateStatusContact;
