const authUtil = require('../module/authUtil.js');
const statusCode = require('../module/statusCode.js');
const responseMessage = require('../module/responseMessage.js');
const pool = require('../module/pool')

const table = 'Comment';

module.exports = {
    create: async (writer, content, articleIdx) => {
        const fields = 'writer,content,articleIdx';
        const questions = `'${writer}','${content}','${articleIdx}'`;
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
    read: async(articleIdx, commentIdx) => {
        const query = `SELECT * FROM ${table} WHERE commentIdx = ${commentIdx} AND articleIdx= ${articleIdx}`;
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
    readAll: async (articleIdx) => {
        const query = `SELECT * FROM ${table} WHERE articleIdx=${articleIdx}`;
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
    update: async (articleIdx, commentIdx, content) => {
        const query = `UPDATE ${table} SET content='${content}' WHERE articleIdx=${articleIdx} AND commentIdx=${commentIdx}`;
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
    delete: async (articleIdx, commentIdx) => {
        const query = `DELETE FROM ${table} WHERE articleIdx = ${articleIdx} AND commentIdx=${commentIdx}`;
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