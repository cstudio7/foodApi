/* eslint-disable require-jsdoc */
import Joi from 'joi';
import response from '../response.helper';

// import passwordComplexity from "joi-password-complexity";

const validation = (req, res, schema, next) => {
  const { error } = schema.validate(req.body, req.params, { abortEarly: false });
  if (error) {
    const errorMessages = [];
    error.details.forEach((detail) => {
      errorMessages.push(detail.message.split('"').join(''));
    });
    const err = errorMessages.toString();
    return response.errorMessage(res, err, 400);
  }

  return next();
};

export default class InputValidation {
  static validateMenu(req, res, next) {
    const schema = Joi.object({
      foodType: Joi.string().empty(''),
      userId: Joi.string().empty(''),
      amount: Joi.number(),
      location: Joi.string().empty(''),
      image: Joi.string().empty('')
    });
    validation(req, res, schema, next);
  }
}
