const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('/', authenticate, ctrlWrapper(ctrl.listContacts));

router.get('/:id', authenticate, isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  '/',
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete('/:id', authenticate, isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
