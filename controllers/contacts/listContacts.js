const { Contact } = require('../../models/contact');

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...query } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find(
    { owner, ...query },
    'name email phone favorite owner',
    {
      skip,
      limit,
    }
  ).populate('owner', 'name email');
  if (contacts.length === 0) {
    return res.json({
      message: 'not find',
    });
  }
  res.json(contacts);
};

module.exports = listContacts;
