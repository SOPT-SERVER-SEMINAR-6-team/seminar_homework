const authUtil = require('../modules/authUtil');
const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');

const pool = require('../modules/db/pool');
const table = 'Blog';

module.exports = {
    create : async(name)=>{
        const field = 'name';
        const questions = '?';
        const query = `INSERT INTO ${table} (${field}) VALUES(${questions})`;
        const values = [name];
        const result = await pool.queryParam_Parse(query,values);

        if(!result){
            return{
                code: statusCode.BAD_REQUEST,
                json: authUtil.successFalse(responseMessage.BOARD_CREATE_FAIL)
            };

        }
        return{
            code : statusCode.OK,
            json : authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS, result)
        };
    },
    selectAll : async()=>{
        const query = `SELECT * FROM ${table}`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code : statusCode.BAD_REQUEST,
                json : authUtil.successFalse(responseMessage.BOARD_READ_ALL_FAIL)
            };
        }
        return{
            code : statusCode.OK,
            json : authUtil.successTrue(responseMessage.BOARD_READ_ALL_SUCCESS, result)
        };
    },
    selectOne : async(blogIdx)=>{
        const query = `SELECT * FORM ${table} WHERE blogIdx = '${blogIdx}'`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code : statusCode.BAD_REQUEST,
                json : authUtil.successFalse(responseMessage.BOARD_READ_FAIL)
            };
        }
        return{
            code : statusCode.OK,
            json : authUtil.successTrue(responseMessage.BOARD_READ_SUCCESS, result)
        };
    },
    update : async(blogIdx, name)=>{
        const query = `UPDATE ${table} SET name='${name}' WHERE blogIdx = '${blogIdx}'`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code : statusCode.BAD_REQUEST,
                json : authUtil.successFalse(responseMessage.BOARD_UPDATE_FAIL)
            };
        }
        return{
            code : statusCode.OK,
            json : authUtil.successTrue(responseMessage.BOARD_UPDATE_SUCCESS, result)
        };
    },
    delete : async(blogIdx)=>{
        const query = `DELETE FROM ${table} WHERE blogIdx = '${blogIdx}'`;
        const result = await pool.queryParam_None(query);

        if(!result){
            return{
                code : statusCode.BAD_REQUEST,
                json : authUtil.successFalse(responseMessage.BOARD_DELETE_FAIL)
            };
        }
        return{
            code : statusCode.OK,
            json : authUtil.successTrue(responseMessage.BOARD_DELETE_SUCCESS, result)
        };
    }
   
    
};