const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const choreographieTransactions = TransactionsFactory.creating('choreographieTransactions');
const tokenControl = verifyToken.tokenControl;
const choreographieValidator = validators.choreographieValidator;
const HttpStatusCode = require('http-status-codes');

router.get('/choreographie', choreographieValidator.limitAndOffset, async (req, res) => {
    try {
        const result = await choreographieTransactions.listAsync(req.query);
        res.json(result);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.get('/choreographie/:Id', choreographieValidator.paramId, async (req, res) => {
    try {
        const result = await choreographieTransactions.listAsync(req.params);
        res.json(result[0]);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.post('/choreographie', tokenControl, choreographieValidator.insert, async (req, res) => {
    try {
        const result = await choreographieTransactions.insertAsync(req.body);
        res.json(result);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.put('/choreographie', tokenControl, choreographieValidator.update, async (req, res) => {
    try {
        const result = await choreographieTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.delete(
    '/choreographie',
    tokenControl,
    choreographieValidator.bodyId,
    async (req, res) => {
        try {
            const result = await choreographieTransactions.deleteAsync(req.body);
            res.json(result);
        } catch (error) {
            res
                .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
                .send(error.message);
        }
    }
);

module.exports = router;