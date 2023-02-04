const bcrypt = require('bcryptjs');

const { User } = require('../../models/user');

// const { RequestError } = require('../../helpers');

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    // RequestError(409, 'Email in use');
    return res.status(409).json({
      message: 'Email in use',
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
  });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = register;
