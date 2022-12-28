const router = require('express')();
const jwt = require('jsonwebtoken');
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const userTransactions = TransactionsFactory.creating('userTransactions');
const authValidator = validators.authValidator;
const tokenControl = verifyToken.tokenControl;
const HttpStatusCode = require('http-status-codes');

router.post('/login', authValidator.login, async (req, res) => {
  try {
    const result = await userTransactions.loginAsync(req.body);
    const payload = {
      UserID: result.Id,
      CompanyID: result.CompanyID,
      UserTypeName: result.UserTypeName
    };
    const token = jwt.sign(payload, req.app.get('api_key'), {
      expiresIn: '7d'
    });
    res.json({ result, token });
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.delete(
  '/my-account',
  tokenControl,
  authValidator.delete,
  async (req, res) => {
    try {
      const result = await userTransactions.deleteAsync({
        Id: req.decode.UserID
      });
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.put(
  '/my-account',
  tokenControl,
  authValidator.update,
  async (req, res) => {
    try {
      await userTransactions.passwordControlAsync({
        Id: req.decode.UserID,
        UserPassword: req.body.UserPassword
      });
      const result = await userTransactions.updateAsync(
        Object.assign(req.body, { Id: req.decode.UserID })
      );
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.put(
  '/change-password',
  tokenControl,
  authValidator.changePassword,
  async (req, res) => {
    try {
      const result = await userTransactions.changePasswordAsync(
        Object.assign(req.body, { Id: req.decode.UserID })
      );
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.post(
  '/password-control',
  tokenControl,
  authValidator.passwordControl,
  async (req, res) => {
    try {
      const result = await userTransactions.passwordControlAsync({
        Id: req.decode.UserID,
        UserPassword: req.body.UserPassword
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.get('/token-decode', tokenControl, async (req, res) => {
  res.json(req.decode);
});

module.exports = router;
