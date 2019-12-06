var express = require('express');
var router = express.Router({mergeParams: true});
const authUtil = require('../module/authUtil.js');
const statusCode = require('../module/statusCode.js');
const responseMessage = require('../module/responseMessage.js');
const Blog = require('../model/blog');


router.use('/:blogIdx/articles', require('./articles/articles'));
/* GET users listing. */
router.get('/', async function(req, res) {
    try{
        const{code,json} = await Blog.readAll();
        console.log(`code: ${code}, json: ${json}`);
        res.status(code).send(json);
    }catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.BOARD_READ_FAIL));
    }
});
router.get('/:blogIdx', async function(req, res) {
    const {blogIdx} = req.params;
    if(!blogIdx) res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    
    try{
        const{code,json} = await Blog.read(blogIdx);
        console.log(`code: ${code}, json: ${json}`);
        res.status(code).send(json);
    }catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.BOARD_READ_ALL_FAIL));
    }
});
router.post('/', async function(req, res) {
    const {name, host} = req.body;

    if(!name || !host) res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));

    try{
        const{code, json} = await Blog.create(name, host);
        console.log(`code: ${code}, json: ${json}`);
        res.status(code).send(json);
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.BOARD_CREATE_FAIL));
    }
});
router.put('/:blogIdx', async function(req, res) {
    const {blogIdx} = req.params;
    const {name} = req.body
    if(!blogIdx || !name) res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    
    try{
        const{code,json} = await Blog.update(blogIdx, name);
        console.log(`code: ${code}, json: ${json}`);
        res.status(code).send(json);
    }catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.BOARD_UPDATE_FAIL));
    }
});
router.delete('/:blogIdx', async function(req, res) {
    const {blogIdx} = req.params;
    if(!blogIdx) res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    
    try{
        const{code,json} = await Blog.delete(blogIdx);
        console.log(`code: ${code}, json: ${json}`);
        res.status(code).send(json);
    }catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.BOARD_DELETE_FAIL));
    }
});


module.exports = router;
