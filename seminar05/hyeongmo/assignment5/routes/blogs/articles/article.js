const express = require('express');
const router = express.Router({
    mergeParams: true
});
const statusCode = require('../../../module/utils/statusCode');
const responseMessage = require('../../../module/utils/responseMessage');
const authUtil = require('../../../module/utils/authUtil');
const Article = require('../../../model/Article');

const THIS_LOG = '글';

router.get('/', async (req, res) => {
    const { blogIdx } = req.params;
    if(!blogIdx){
        const missParameters = Object.entries({name, url})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { blogIdx };
    result = await Article.readAll(json);
    if(!result)
    {
        res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(statusCode.OK)
    .send(authUtil.successTrue(responseMessage.X_READ_ALL_SUCCESS(THIS_LOG),result));
});

router.get('/:articleIdx', async (req, res) => {
    const { blogIdx, articleIdx } = req.params;
    if(!blogIdx || !articleIdx){
        const missParameters = Object.entries({name, url})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { blogIdx, articleIdx };
    result = await Article.read(json);
    if(!result)
    {
        res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(statusCode.OK)
    .send(authUtil.successTrue(responseMessage.X_READ_SUCCESS(THIS_LOG),result));
});

router.post('/', async (req, res) => {
    const { blogIdx } = req.params;
    const { title, content } = req.body;
    if(!blogIdx || !title || !content){
        const missParameters = Object.entries({name, url})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { blogIdx, title, content };
    result = await Article.create(json)
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

router.put('/:articleIdx', async (req, res) => {
    const {blogIdx, articleIdx} = req.params;
    const { title, content } = req.body;
    if(!blogIdx || !articleIdx || !title || !content){
        const missParameters = Object.entries({name, url})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { blogIdx, articleIdx, title, content };
    result = await Article.update(json);
    if(!result)
    {
        res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(statusCode.OK)
    .send(authUtil.successTrue(responseMessage.X_UPDATE_SUCCESS(THIS_LOG),result));
});

router.delete('/:articleIdx', async (req, res) => {
    const {blogIdx, articleIdx} = req.params;
    if(!blogIdx || !articleIdx){
        const missParameters = Object.entries({name, url})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { blogIdx, articleIdx };
    result = await Article.remove(json);
    if(!result)
    {
        res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(statusCode.OK)
    .send(authUtil.successTrue(responseMessage.X_DELETE_SUCCESS(THIS_LOG),result));
});

module.exports = router;
