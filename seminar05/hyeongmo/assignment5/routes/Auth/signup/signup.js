var express = require('express');
var router = express.Router();
const jwt = require('../../../module/jwt');
const User = require('../../../model/User');
const statusCode = require('../../../module/utils/statusCode');
const responseMessage = require('../../../module/utils/responseMessage');
const authUtil = require('../../../module/utils/authUtil');
const utils = require('../../../module/utils/utils');

router.post('/', async (req, res) => { 
    const {userIdx, id, pw} = req.body;
    if(!userIdx || !id || !pw) {
        res.send('wrong parameter');
        return;
    }
    // TODO 2 : check ID
    comp_id = await User.search_id(userIdx);
    if(!comp_id){
        res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(utils.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        return;
    }
    // TODO 3 : check PW
    comp_pw = await User.search_pw(userIdx);
    if(!comp_pw){
        res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(utils.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        return;
    }
    if(pw != comp_pw[0].pw){
        res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(utils.successFalse(responseMessage.MISS_MATCH_PW));
        return;
    }
    const result = jwt.sign({userIdx, id});
    res.json(result);
})

module.exports = router;


