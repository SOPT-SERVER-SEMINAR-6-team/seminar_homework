const authUtil = require('../module/authUtil.js');
const statusCode = require('../module/statusCode.js');
const responseMessage = require('../module/responseMessage.js');
const pool = require('../module/pool')

const table = 'Article';

module.exports = {
    create: async (title, content, blogIdx) => {
        const fields = 'title,content,blogIdx';
        const questions = `'${title}','${content}','${blogIdx}'`;
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
    read: async(blogIdx, articleIdx) => {
        const query = `SELECT * FROM ${table} WHERE articleIdx = ${articleIdx} AND blogIdx= ${blogIdx}`;
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
    readAll: async (blogIdx) => {
        const query = `SELECT * FROM ${table} WHERE blogIdx=${blogIdx}`;
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
    update: async (blogIdx, articleIdx, title, content) => {
        const query = `UPDATE ${table} SET title='${title}', content='${content}' WHERE blogIdx=${blogIdx} AND articleIdx=${articleIdx}`;
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
    delete: async (blogIdx, articleIdx) => {
        const query = `DELETE FROM ${table} WHERE blogIdx = ${blogIdx} AND articleIdx=${articleIdx}`;
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