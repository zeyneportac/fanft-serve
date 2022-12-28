const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const socialResponsibilityTransactions = TransactionsFactory.creating('socialResponsibilityTransactions');
const tokenControl = verifyToken.tokenControl;
const socialResponsibilityValidator = validators.socialResponsibilityValidator;
const HttpStatusCode = require('http-status-codes');

router.get('/socialResponsibility', socialResponsibilityValidator.limitAndOffset, async (req, res) => {
    try {
        const result = await socialResponsibilityTransactions.listAsync(req.query);
        res.json(result);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.get('/socialResponsibility/:Id', socialResponsibilityValidator.paramId, async (req, res) => {
    try {
        const result = await socialResponsibilityTransactions.listAsync(req.params);
        res.json(result[0]);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.post('/socialResponsibility', tokenControl, socialResponsibilityValidator.insert, async (req, res) => {
    try {
        const result = await socialResponsibilityTransactions.insertAsync(req.body);
        res.json(result);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.put('/socialResponsibility', tokenControl, socialResponsibilityValidator.update, async (req, res) => {
    try {
        const result = await socialResponsibilityTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.delete(
    '/socialResponsibility',
    tokenControl,
    socialResponsibilityValidator.bodyId,
    async (req, res) => {
        try {
            const result = await socialResponsibilityTransactions.deleteAsync(req.body);
            res.json(result);
        } catch (error) {
            res
                .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
                .send(error.message);
        }
    }
);

module.exports = router;