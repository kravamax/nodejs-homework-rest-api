const { isValidObjectId } = require('mongoose');

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const result = isValidObjectId(id);
  if (!result) {
    next(
      res.status(404).json({
        message: `${id} is not valid id`,
      })
    );
  }
  next();
};

module.exports = isValidId;
