const authUtil = require('../module/authUtil.js');
const statusCode = require('../module/statusCode.js');
const responseMessage = require('../module/responseMessage.js');
const pool = require('../module/pool')

const table = 'Blog';

module.exports = {
    create: async (name, host) => {
        const fields = 'name, host';
        const questions = `'${name}','${host}'`;
        const query = `INSERT INTO ${table} (${fields}) VALUES(${questions})`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.BOARD_CREATE_FAIL)
            };
        }
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS, result)
        };

    },
    read: async(blogIdx) => {
        const query = `SELECT * FROM ${table} WHERE blogIdx = ${blogIdx}`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.BOARD_READ_FAIL)
            };
        }
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.BOARD_READ_SUCCESS, result)
        };
    },
    readAll: async () => {
        const query = `SELECT * FROM ${table}`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.BOARD_READ_ALL_FAIL)
            };
        }
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.BOARD_READ_ALL_SUCCESS, result)
        };
    },
    update: async (blogIdx, name) => {
        const query = `UPDATE ${table} SET name='${name}' WHERE blogIdx=${blogIdx}`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.BOARD_UPDATE_FAIL)
            };
        }
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.BOARD_UPDATE_SUCCESS, result)
        };
    },
    delete: async (blogIdx) => {
        const query = `DELETE FROM ${table} WHERE blogIdx = ${blogIdx}`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code:statusCode.BAD_REQUEST,
                json:authUtil.successFalse(responseMessage.BOARD_DELETE_FAIL)
            };
        }
        return{
            code:statusCode.OK,
            json:authUtil.successTrue(responseMessage.BOARD_DELETE_SUCCESS, result)
        };
    }
}