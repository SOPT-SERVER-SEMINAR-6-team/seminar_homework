const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');
const pool = require('../module/pool');
const table = 'Blog';

const blog = {
    create : async ({blogIdx,name})=>{
        const field = 'blogIdx,name';
        const questions = `'${blogIdx}','${name}'`;
        const query = `INSERT INTO ${table} (${field}) VALUES (${questions})`;
        const result = await pool.queryParam_None(query);
    
        if(!result){
            return{
                code: statusCode.BAD_REQUEST,
                json: authUtil.successFalse(responseMessage.BOARD_CREATE_FAIL)
            };
        }
        return{
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS,result)
        };
    },
    read: async (blogIdx) => {
        const query = `SELECT * FROM ${table} WHERE blogIdx = ${blogIdx}`;
        const result = await pool.queryParam_None(query);
        if(!result){
            return{
                code: statusCode.BAD_REQUEST,
                json: authUtil.successFalse(responseMessage.BOARD_CREATE_FAIL)
            };
        }
        return{
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS,result)
        };
    },
    readAll: async () => {
        const query = `SELECT * FROM ${table}`;
        const result = await pool.queryParam_None(query);
        if(!result){
            return{
                code: statusCode.BAD_REQUEST,
                json: authUtil.successFalse(responseMessage.BOARD_CREATE_FAIL)
            };
        }
        return{
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS,result)
        };
    },
    update: async ({blogIdx,name}) => {
        const query = `UPDATE ${table} SET name = ${name} WHERE blogIdx = ${blogIdx}`;
        const result = await pool.queryParam_None(query);
        if(!result){
            return{
                code: statusCode.BAD_REQUEST,
                json: authUtil.successFalse(responseMessage.BOARD_CREATE_FAIL)
            };
        }
        return{
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS,result)
        };
    },
    remove: async (blogIdx) => {
        const query = `DELETE FROM ${table} WHERE blogIdx = ${blogIdx}`;
        
        const result = await pool.queryParam_None(query);
        if(!result){
            return{
                code: statusCode.BAD_REQUEST,
                json: authUtil.successFalse(responseMessage.BOARD_CREATE_FAIL)
            };
        }
        return{
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS,result)
        };
    }
}
module.exports = blog;