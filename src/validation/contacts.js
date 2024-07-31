import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should be at least {#limit} characters',
    'string.max': 'Name should be at most {#limit} characters',
    'any.required': 'Name is required'
  }),
  phoneNumber: Joi.string().pattern(/^\+?\d{5,11}$/).required().messages({
    'string.pattern.base': 'Phone number must be between 5 and 11 digits',
    'any.required': 'Phone number is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email is not valid',
    'any.required': 'Email is required'
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be a boolean value'
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').required().messages({
    'any.only': 'Contact type must be one of {#valids}',
    'any.required': 'Contact type is required'
  })
});
