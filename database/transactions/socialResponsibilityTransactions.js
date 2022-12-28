const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');
const { sqlHelper } = require('../../utils');

class SocialResponsibilityTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    listAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(
                `SELECT * FROM tblSocialResponsibility ${sqlHelper.getWhere(
                    values
                )} ORDER BY id ASC ${sqlHelper.getLimitOffset(values)}`,
                (error, result) => {
                    if (!error) {
                        if (result.length > 0) resolve(result);
                        else
                            reject({
                                status: HttpStatusCode.NOT_FOUND,
                                message: 'No Social Responsibility registered to the system was found.'
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
                `INSERT INTO tblSocialResponsibility SET ?`,
                values,
                (error, result) => {
                    if (!error) {
                        if (result.affectedRows)
                            resolve('Social Responsibility registration has taken place.');
                        else
                            reject({
                                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                                message: 'Error while registering Social Responsibility!'
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
                `UPDATE tblSocialResponsibility SET ? WHERE Id=?`,
                [values, values.Id],
                (error, result) => {
                    if (!error) {
                        if (result.affectedRows)
                            resolve('Social Responsibility information has been updated.');
                        else
                            reject({
                                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                                message: 'An error occurred while updating Social Responsibility information.'
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
                `DELETE FROM tblSocialResponsibility ${sqlHelper.getWhere(values)}`,
                (error, result) => {
                    if (!error) {
                        if (result.affectedRows) resolve('Deletion succeeded.');
                        else
                            reject({
                                status: HttpStatusCode.GONE,
                                message: 'There is no such Social Responsibility.'
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

module.exports = SocialResponsibilityTransactions;