const express = require('express')
const router = express.Router();
const pool = require('../modules/db/pool');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const utils = require('../modules/utils');
const jwt = require('../modules/jwt');

user = {
    signup: async({id, password, name, email, phone})=>{
      const fields = 'id, password, name, email, phone';
      const table = 'user1';
      const questions = `?, ?, ?, ?, ?`;
      console.log(`id is ${id}`);
      const values = [id, password, name, email, phone];
      const userDB = await pool.queryParam_None(`SELECT * FROM ${table} WHERE id = '${id}'`);
      if(!userDB){
        return{
          code: statusCode.BAD_REQUEST,
          json: utils.successFalse(statusCode.BAD_REQUEST,responseMessage.SIGNUP_FAIL)
        };
      }
      else if(userDB.length > 0){
        return{
  
          code : statusCode.BAD_REQUEST,
          json : utils.successFalse(statusCode.BAD_REQUEST,responseMessage.ALREADY_ID)
        }
      }
  
      const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
      await pool.queryParam_Parse(query, values);
    
      return{
        code: statusCode.OK,
        json: utils.successTrue(statusCode.OK, responseMessage.SIGNUP_SUCCESS)
      }
    },
    signin : async({id, password})=>{
        const table = 'user1';
        const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
        const userArray = await pool.queryParam_None(query);
        const user = userArray[0];
        if(!user){
          return{
            code: statusCode.BAD_REQUEST,
            json: utils.successFalse(statusCode.BAD_REQUEST, responseMessage.NO_USER)
          };
        }
        if(user.password != password){
          return{
            code : statusCode.BAD_REQUEST,
            json : utils.successFalse(statusCode.BAD_REQUEST, responseMessage.NOT_CORRECT_PASSWORD)
          };
        }
       
        return{
          code : statusCode.OK,
          json : utils.successTrue(statusCode.OK, responseMessage.SIGNIN_SUCCESS)
        }
      }
}
router.post('/signup', async (req, res)=>{
    const {id, password, name, email, phone} = req.body;
    if(!id || !password || !name || !email || !phone){
      res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.NULL_VALUE));
    }
    try {
      const {code, json} = await user.signup({id, password, name, email, phone});
      res.status(code).send(json);
    }catch(err){
      console.log(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(responseMessage.SIGNUP_FAIL));
    }
})
router.post('/signin', async (req, res)=>{
    const {id, password} = req.body;
    if(!id || !password){
      res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.NULL_VALUE));
    }
    try {
      const {code, json} = await user.signin({id, password});
     // res.status(code).send(json);
      const dummy = req.body;
      const result = jwt.sign(dummy); //토큰발급 
      res.json(result);
    }catch(err){
      console.log(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(responseMessage.SIGNIN_FAIL));
    }
  })
module.exports = router;
