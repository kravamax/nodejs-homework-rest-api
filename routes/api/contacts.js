const express = require('express');
const Joi = require('joi');

const router = express.Router();

const contactsAPI = require('../../models/contacts');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsAPI.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsAPI.getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Not Found' });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'missing required name field',
      });
    }

    const result = await contactsAPI.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsAPI.removeContact(id);
    console.log('result', result);
    if (!result) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = addSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'missing fields' });
    }

    const result = await contactsAPI.updateContact(id, req.body);
    if (!result) {
      res.status(404).json({ message: 'Not found' });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
