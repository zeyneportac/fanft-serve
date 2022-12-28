const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const userTransactions = TransactionsFactory.creating('userTransactions');
const userValidator = validators.userValidator;
const tokenControl = verifyToken.tokenControl;
const HttpStatusCode = require('http-status-codes');

router.get(
  '/user',
  tokenControl,
  userValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await userTransactions.listAsync(req.query);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.get(
  '/user/:Id',
  tokenControl,
  userValidator.paramId,
  async (req, res) => {
    try {
      const result = await userTransactions.listAsync(req.params);
      res.json(result[0]);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.delete('/user', tokenControl, userValidator.bodyId, async (req, res) => {
  try {
    const result = await userTransactions.deleteAsync(req.body);
    res.json(result);
  } catch (error) {
    if (error.status == 404)
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .send(
          'User is not registered in the system or unauthorized operation.'
        );
    else
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
  }
});

router.put('/user', tokenControl, userValidator.update, async (req, res) => {
  try {
    const result = await userTransactions.updateAsync(req.body);
    res.json(result);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.post('/user', tokenControl, userValidator.insert, async (req, res) => {
  try {
    const result = await userTransactions.insertAsync(req.body);
    res.json(result);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

module.exports = router;
