const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class AuthValidator {
  constructor() {}

  static async login(req, res, next) {
    try {
      await joi
        .object({
          UserEmail: joi.string().email().max(100).required(),
          UserPassword: joi.string().max(99).required()
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }

  static async delete(req, res, next) {
    try {
      await joi
        .object({
          UserPassword: joi.string().max(99).required()
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }

  static async update(req, res, next) {
    try {
      await joi
        .object({
          UserName: joi
            .string()
            .min(3)
            .pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')),
          UserPassword: joi.string().max(99).required()
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }

  static async changePassword(req, res, next) {
    try {
      await joi
        .object({
          UserPassword: joi.string().max(99).required(),
          UserNewPassword: joi.string().max(99).required()
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }

  static async passwordControl(req, res, next) {
    try {
      await joi
        .object({
          UserPassword: joi.string().max(99).required()
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }
}

module.exports = AuthValidator;
