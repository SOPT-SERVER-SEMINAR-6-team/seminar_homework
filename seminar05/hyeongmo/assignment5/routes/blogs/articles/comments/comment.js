const express = require('express');
const router = express.Router({
    mergeParams: true
});
const statusCode = require('../../../../module/utils/statusCode');
const responseMessage = require('../../../../module/utils/responseMessage');
const utils = require('../../../../module/utils/utils');
const Comment = require('../../../../model/Comment');

const {LoggedIn} = require('../../../../module/utils/authUtil');
const jwt = require('../../../../module/jwt');

router.use('/', LoggedIn);
router.use('/:commentIdx', LoggedIn);

const THIS_LOG = '댓글';

router.get('/', async (req, res) => {
    const { articleIdx } = req.params;
    if(!articleIdx){
        const missParameters = Object.entries({articleIdx})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(utils.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { articleIdx };
    result = await Comment.readAll(json);
    if(!result)
    {
        res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(utils.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(statusCode.OK)
    .send(utils.successTrue(responseMessage.X_READ_ALL_SUCCESS(THIS_LOG),result));
});

router.get('/:commentIdx', async (req, res) => {
    const { commentIdx, articleIdx } = req.params;
    if(!commentIdx || !articleIdx){
        const missParameters = Object.entries({commentIdx, articleIdx})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(utils.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { commentIdx, articleIdx };
    result = await Comment.read(json);
    if(!result)
    {
        res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(utils.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(statusCode.OK)
    .send(utils.successTrue(responseMessage.X_READ_SUCCESS(THIS_LOG),result));
});

router.post('/', async (req, res) => {
    var userIdx = req.decoded;
    const { articleIdx } = req.params;
    const { writer, content } = req.body;
    if(!articleIdx || !writer || !content || !userIdx){
        const missParameters = Object.entries({articleIdx, writer, content, userIdx})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { articleIdx, writer, content, userIdx };
    result = await Comment.create(json)
    if(!result)
    {
        res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(statusCode.OK)
    .send(authUtil.successTrue(responseMessage.X_CREATE_SUCCESS(THIS_LOG),result));
});

router.put('/:commentIdx', async (req, res) => {
    var userIdx = req.decoded;
    const { commentIdx, articleIdx } = req.params;
    const { writer, content } = req.body;
    if(!commentIdx || !articleIdx || !writer || !content || !userIdx){
        const missParameters = Object.entries({commentIdx, articleIdx, writer, content, userIdx})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(utils.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { commentIdx, articleIdx, writer, content, userIdx };
    result = await Comment.update(json);
    if(!result)
    {
        res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(utils.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(statusCode.OK)
    .send(utils.successTrue(responseMessage.X_UPDATE_SUCCESS(THIS_LOG),result));
});

router.delete('/:commentIdx', async (req, res) => {
    var userIdx = req.decoded;
    const { commentIdx, articleIdx } = req.params;
    if(!commentIdx || !articleIdx || !userIdx){
        const missParameters = Object.entries({commentIdx, articleIdx, userIdx})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(utils.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { commentIdx, articleIdx, userIdx };
    result = await Comment.remove(json);
    if(!result)
    {
        res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(utils.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(statusCode.OK)
    .send(utils.successTrue(responseMessage.X_DELETE_SUCCESS(THIS_LOG),result));
});

module.exports = router;
