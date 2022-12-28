const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');
const { sqlHelper } = require('../../utils');

class ChoreographieTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    listAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(
                `SELECT * FROM tblChoreographie ${sqlHelper.getWhere(
                    values
                )} ORDER BY id ASC ${sqlHelper.getLimitOffset(values)}`,
                (error, result) => {
                    if (!error) {
                        if (result.length > 0) resolve(result);
                        else
                            reject({
                                status: HttpStatusCode.NOT_FOUND,
                                message: 'No Choreographie registered to the system was found.'
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
                `INSERT INTO tblChoreographie SET ?`,
                values,
                (error, result) => {
                    if (!error) {
                        if (result.affectedRows)
                            resolve('Choreographie registration has taken place.');
                        else
                            reject({
                                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                                message: 'Error while registering Choreographie!'
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
                `UPDATE tblChoreographie SET ? WHERE Id=?`,
                [values, values.Id],
                (error, result) => {
                    if (!error) {
                        if (result.affectedRows)
                            resolve('Choreographie information has been updated.');
                        else
                            reject({
                                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                                message: 'An error occurred while updating Choreographie information.'
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
                `DELETE FROM tblChoreographie ${sqlHelper.getWhere(values)}`,
                (error, result) => {
                    if (!error) {
                        if (result.affectedRows) resolve('Deletion succeeded.');
                        else
                            reject({
                                status: HttpStatusCode.GONE,
                                message: 'There is no such Choreographie.'
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

module.exports = ChoreographieTransactions;