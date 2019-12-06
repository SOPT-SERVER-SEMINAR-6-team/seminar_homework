var express = require('express');
var router = express.Router({mergeParams: true});
const authUtil = require('../../../module/authUtil.js');
const statusCode = require('../../../module/statusCode.js');
const responseMessage = require('../../../module/responseMessage.js');
const Comment = require('../../../model/comment');

/* GET users listing. */
router.get('/', async function(req, res) {
    const {articleIdx} = req.params;
    if(!articleIdx) res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    try{
        const{code,json} = await Comment.readAll(articleIdx);
        console.log(`code: ${code}, json: ${json}`);
        res.status(code).send(json);
    }catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.BOARD_READ_FAIL));
    }
});
router.get('/:commentIdx', async function(req, res) {
    const {articleIdx, commentIdx} = req.params;

    if(!commentIdx || !articleIdx) res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    
    try{
        const{code,json} = await Comment.read(articleIdx, commentIdx);
        console.log(`code: ${code}, json: ${json}`);
        res.status(code).send(json);
    }catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.BOARD_READ_ALL_FAIL));
    }
});
router.post('/', async function(req, res) {
    const {writer, content} = req.body;
    const {articleIdx} = req.params;

    if(!writer || !content || !articleIdx) res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));

    try{
        const{code, json} = await Comment.create(writer, content, articleIdx);
        console.log(`code: ${code}, json: ${json}`);
        res.status(code).send(json);
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.BOARD_CREATE_FAIL));
    }
});
router.put('/:commentIdx', async function(req, res) {
    const {content} = req.body
    const {commentIdx, articleIdx} = req.params;
    if(!commentIdx || !articleIdx || !content) res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    
    try{
        const{code,json} = await Comment.update(articleIdx, commentIdx, content);
        console.log(`code: ${code}, json: ${json}`);
        res.status(code).send(json);
    }catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.BOARD_UPDATE_FAIL));
    }
});
router.delete('/:commentIdx', async function(req, res) {
    const {commentIdx, articleIdx} = req.params;
    if(!commentIdx || !articleIdx) res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    
    try{
        const{code,json} = await Comment.delete(articleIdx, commentIdx);
        console.log(`code: ${code}, json: ${json}`);
        res.status(code).send(json);
    }catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.BOARD_DELETE_FAIL));
    }
});


module.exports = router;
