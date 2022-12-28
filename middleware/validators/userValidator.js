const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonValidator = require('./commonValidator');

class UserValidator extends CommonValidator {
  constructor() {}

  static async update(req, res, next) {
    try {
      await joi
        .object({
          Id: joi.number().required(),
          UserName: joi
            .string()
            .max(100)
            .pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')),
          UserEmail: joi.string().max(100).email()
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      console.log(error.message);
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          UserName: joi
            .string()
            .max(100)
            .pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$'))
            .required(),
          UserEmail: joi.string().max(100).email().required(),
          UserPassword: joi.string().max(99).required()
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      console.log(error.message);
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }
}

module.exports = UserValidator;
