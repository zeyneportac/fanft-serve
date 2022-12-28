const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const compositionTransactions = TransactionsFactory.creating('compositionTransactions');
const tokenControl = verifyToken.tokenControl;
const compositionValidator = validators.compositionValidator;
const HttpStatusCode = require('http-status-codes');

router.get('/composition', compositionValidator.limitAndOffset, async (req, res) => {
    try {
        const result = await compositionTransactions.listAsync(req.query);
        res.json(result);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.get('/composition/:Id', compositionValidator.paramId, async (req, res) => {
    try {
        const result = await compositionTransactions.listAsync(req.params);
        res.json(result[0]);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.post('/composition', tokenControl, compositionValidator.insert, async (req, res) => {
    try {
        const result = await compositionTransactions.insertAsync(req.body);
        res.json(result);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.put('/composition', tokenControl, compositionValidator.update, async (req, res) => {
    try {
        const result = await compositionTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.delete(
    '/composition',
    tokenControl,
    compositionValidator.bodyId,
    async (req, res) => {
        try {
            const result = await compositionTransactions.deleteAsync(req.body);
            res.json(result);
        } catch (error) {
            res
                .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
                .send(error.message);
        }
    }
);

module.exports = router;