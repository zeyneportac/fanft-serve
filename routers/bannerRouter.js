const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const bannerTransactions = TransactionsFactory.creating('bannerTransactions');
const tokenControl = verifyToken.tokenControl;
const bannerValidator = validators.bannerValidator;
const HttpStatusCode = require('http-status-codes');

router.get('/banner', bannerValidator.limitAndOffset, async (req, res) => {
    try {
        const result = await bannerTransactions.listAsync(req.query);
        res.json(result);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.get('/banner/:Id', bannerValidator.paramId, async (req, res) => {
    try {
        const result = await bannerTransactions.listAsync(req.params);
        res.json(result[0]);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.post('/banner', tokenControl, bannerValidator.insert, async (req, res) => {
    try {
        const result = await bannerTransactions.insertAsync(req.body);
        res.json(result);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.put('/banner', tokenControl, bannerValidator.update, async (req, res) => {
    try {
        const result = await bannerTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        res
            .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(error.message);
    }
});

router.delete(
    '/banner',
    tokenControl,
    bannerValidator.bodyId,
    async (req, res) => {
        try {
            const result = await bannerTransactions.deleteAsync(req.body);
            res.json(result);
        } catch (error) {
            res
                .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
                .send(error.message);
        }
    }
);

module.exports = router;