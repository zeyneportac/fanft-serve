const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonValidator = require('./commonValidator');

class SocialResponsibilityValidator extends CommonValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi
                .object({
                    SocialResponsibilityName: joi.string().max(250).required(),
                    SocialResponsibilityStatus: joi.string().max(100).required()
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
                    Id: joi.number().required(),
                    SocialResponsibilityName: joi.string().max(250).required(),
                    SocialResponsibilityStatus: joi.string().max(100).required()
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

module.exports = SocialResponsibilityValidator;