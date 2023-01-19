const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');
const ctrlWrapper = require('../../helpers/ctrlWrapper');

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:id', ctrlWrapper(ctrl.getContactById));

router.post('/', ctrlWrapper(ctrl.addContact));

router.delete('/:id', ctrlWrapper(ctrl.removeContact));

router.put('/:id', ctrlWrapper(ctrl.updateContact));

module.exports = router;
