const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const displacementTransactions = TransactionsFactory.creating('displacementTransactions');
const tokenControl = verifyToken.tokenControl;
const displacementValidator = validators.displacementValidator;
const HttpStatusCode = require('http-status-codes');

router.get('/displacement', displacementValidator.limitAndOffset, async (req, res) => {
    try {
        const result = await displacementTransactions.listAsync(req.query);
        res.json(result);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.get('/displacement/:Id', displacementValidator.paramId, async (req, res) => {
    try {
        const result = await displacementTransactions.listAsync(req.params);
        res.json(result[0]);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.post('/displacement', tokenControl, displacementValidator.insert, async (req, res) => {
    try {
        const result = await displacementTransactions.insertAsync(req.body);
        res.json(result);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.put('/displacement', tokenControl, displacementValidator.update, async (req, res) => {
    try {
        const result = await displacementTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.delete(
    '/displacement',
    tokenControl,
    displacementValidator.bodyId,
    async (req, res) => {
        try {
            const result = await displacementTransactions.deleteAsync(req.body);
            res.json(result);
        } catch (error) {
            res
                .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
                .send(error.message);
        }
    }
);

module.exports = router;