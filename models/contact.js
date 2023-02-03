const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSaveErrors } = require('../helpers');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post('save', handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };
