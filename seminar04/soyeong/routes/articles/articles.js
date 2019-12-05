var express = require('express');
var router = express.Router({mergeParams: true});
const authUtil = require('../../module/authUtil.js');
const statusCode = require('../../module/statusCode.js');
const responseMessage = require('../../module/responseMessage.js');
const Article = require('../../model/article');

/* GET users listing. */
router.get('/', async function(req, res) {
    const {blogIdx} = req.params;
    if(!blogIdx) res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    try{
        const{code,json} = await Article.readAll(blogIdx);
        console.log(`code: ${code}, json: ${json}`);
        res.status(code).send(json);
    }catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.BOARD_READ_FAIL));
    }
});
router.get('/:articleIdx', async function(req, res) {
    const {blogIdx, articleIdx} = req.params;

    if(!blogIdx || !articleIdx) res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    
    try{
        const{code,json} = await Article.read(blogIdx, articleIdx);
        console.log(`code: ${code}, json: ${json}`);
        res.status(code).send(json);
    }catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.BOARD_READ_ALL_FAIL));
    }
});
router.post('/', async function(req, res) {
    const {title, content} = req.body;
    const {blogIdx} = req.params;

    if(!title || !content || !blogIdx) res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));

    try{
        const{code, json} = await Article.create(title, content, blogIdx);
        console.log(`code: ${code}, json: ${json}`);
        res.status(code).send(json);
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.BOARD_CREATE_FAIL));
    }
});
router.put('/:articleIdx', async function(req, res) {
    const {title, content} = req.body
    const {blogIdx, articleIdx} = req.params;
    if(!blogIdx || !articleIdx || !title || !content) res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    
    try{
        const{code,json} = await Article.update(blogIdx, articleIdx, title, content);
        console.log(`code: ${code}, json: ${json}`);
        res.status(code).send(json);
    }catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.BOARD_UPDATE_FAIL));
    }
});
router.delete('/:articleIdx', async function(req, res) {
    const {blogIdx, articleIdx} = req.params;
    if(!blogIdx || !articleIdx) res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    
    try{
        const{code,json} = await Article.delete(blogIdx, articleIdx);
        console.log(`code: ${code}, json: ${json}`);
        res.status(code).send(json);
    }catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.BOARD_DELETE_FAIL));
    }
});


module.exports = router;
