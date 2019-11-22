const express = require('express');
const router = express.Router({mergeParams: true});
const statusCode = require('../../module/utils/statusCode');
const responseMessage = require('../../module/utils/responseMessage');
const authUtil = require('../../module/utils/authUtil');
const Blog = require('../../model/Blog');

const THIS_LOG = '블로그';

router.get('/', async (req, res) => {
    result = await Blog.readAll();
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

router.get('/:blogIdx', async (req, res) => {
    const {blogIdx} = req.params;
    if(!blogIdx){
        res
        .status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    result = await Blog.read(blogIdx);
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
    const { name, url } = req.body;
    if(!name || !url){
        const missParameters = Object.entries({name, url})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = {name, url};
    result = await Blog.create(json);
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

router.put('/', async (req, res) => {
    const { blogIdx, name, url } = req.body;
    if(!blogIdx || !name || !url){
        const missParameters = Object.entries({name, url})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { blogIdx, name, url };
    result = await Blog.update(json)
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

router.delete('/', async (req, res) => {
    const { blogIdx } = req.body;
    if(!blogIdx){
        const missParameters = Object.entries({name, url})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { blogIdx };
    result = await Blog.remove(json)
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
