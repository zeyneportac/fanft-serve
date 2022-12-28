const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonValidator = require('./commonValidator');

class CompositionValidator extends CommonValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi
                .object({
                    CompositionName: joi.string().max(250).required(),
                    CompositionStatus: joi.string().max(100).required()
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
                    CompositionName: joi.string().max(250).required(),
                    CompositionStatus: joi.string().max(100).required()
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

module.exports = CompositionValidator;