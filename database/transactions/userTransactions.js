const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');
const { sqlHelper } = require('../../utils');

class UserTransactions {
  constructor() {
    this._datacontext = mysqlDataContext.connection();
  }

  loginAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `SELECT * FROM tblUser where UserEmail=? and UserPassword=?`,
        [values.UserEmail, values.UserPassword],
        (error, result) => {
          if (!error) {
            if (result.length) {
              delete result[0].UserPassword;
              resolve(result[0]);
            } else
              reject({
                status: HttpStatusCode.NOT_FOUND,
                message: 'There is no such user !'
              });
          } else
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message
            });
        }
      );
    });
  }

  listAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `SELECT * FROM vwUserList ${sqlHelper.getWhere(
          values
        )} ORDER BY UserName ASC ${sqlHelper.getLimitOffset(values)}`,
        (error, result) => {
          if (!error) {
            if (result.length > 0) resolve(result);
            else
              reject({
                status: HttpStatusCode.NOT_FOUND,
                message: 'No user registered to the system was found.'
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message
            });
          }
        }
      );
    });
  }

  insertAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `INSERT INTO tblUser SET ?`,
        values,
        (error, result) => {
          if (!error) {
            if (result.affectedRows)
              resolve('User registration has taken place.');
            else
              reject({
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: 'Error while registering user !'
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message
            });
          }
        }
      );
    });
  }

  updateAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `UPDATE tblUser SET ? WHERE Id=?`,
        [values, values.Id],
        (error, result) => {
          if (!error) {
            if (result.affectedRows)
              resolve('User information has been updated.');
            else
              reject({
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: 'An error occurred while updating user information.'
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message
            });
          }
        }
      );
    });
  }

  deleteAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `DELETE FROM tblUser ${sqlHelper.getWhere(values)}`,
        (error, result) => {
          if (!error) {
            if (result.affectedRows) resolve('Deletion succeeded.');
            else
              reject({
                status: HttpStatusCode.GONE,
                message: 'There is no such user.'
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message
            });
          }
        }
      );
    });
  }

  passwordControlAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `SELECT * FROM tblUser WHERE UserPassword=? AND Id=? `,
        [values.UserPassword, values.Id],
        (error, result) => {
          if (!error) {
            if (result.length > 0) resolve(result[0]);
            else
              reject({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'User password does not match !'
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message
            });
          }
        }
      );
    });
  }

  changePasswordAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `UPDATE tblUser SET UserPassword=? WHERE UserPassword=? AND Id=?`,
        [values.UserNewPassword, values.UserPassword, values.Id],
        (error, result) => {
          if (!error) {
            if (result.affectedRows)
              resolve('The user password has been changed successfully.');
            else
              reject({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'User password does not match.'
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message
            });
          }
        }
      );
    });
  }
}

module.exports = UserTransactions;
