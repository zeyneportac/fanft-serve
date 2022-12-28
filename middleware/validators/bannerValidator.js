const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonValidator = require('./commonValidator');

class BannerValidator extends CommonValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi
                .object({
                    BannerName: joi.string().max(250).required(),
                    BannerStatus: joi.string().max(100).required()
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
                    BannerName: joi.string().max(250).required(),
                    BannerStatus: joi.string().max(100).required()
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

module.exports = BannerValidator;