const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');
const ctrlWrapper = require('../../helpers/ctrlWrapper');
const isValidId = require('../../middlewares/isValid');

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:id', isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/', ctrlWrapper(ctrl.addContact));

router.delete('/:id', isValidId, ctrlWrapper(ctrl.removeContact));

router.put('/:id', isValidId, ctrlWrapper(ctrl.updateContact));

router.patch('/:id/favorite', isValidId, ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
