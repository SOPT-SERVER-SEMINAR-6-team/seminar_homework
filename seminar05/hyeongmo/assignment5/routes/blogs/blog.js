const express = require('express');
const router = express.Router({mergeParams: true});
const statusCode = require('../../module/utils/statusCode');
const responseMessage = require('../../module/utils/responseMessage');
const utils = require('../../module/utils/utils');
const Blog = require('../../model/Blog');

const {LoggedIn} = require('../../module/utils/authUtil');
const jwt = require('../../module/jwt');

const THIS_LOG = '블로그';

router.use('/', LoggedIn);
router.use('/:blogIdx', LoggedIn);

router.get('/', async (req, res) => {
    result = await Blog.readAll();
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

router.get('/:blogIdx', async (req, res) => {
    const {blogIdx} = req.params;
    if(!blogIdx){
        res
        .status(statusCode.BAD_REQUEST)
        .send(utils.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    result = await Blog.read(blogIdx);
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
    const { name, url } = req.body;
    if(!name || !url){
        const missParameters = Object.entries({name, url, userIdx})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(utils.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = {name, url, userIdx};
    result = await Blog.create(json);
    if(!result)
    {
        res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(utils.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(statusCode.OK)
    .send(utils.successTrue(responseMessage.X_CREATE_SUCCESS(THIS_LOG),result));
});

router.put('/:blogIdx', async (req, res) => {
    var userIdx = req.decoded;
    const { blogIdx } = req.params;
    const { name, url } = req.body;
    if(!blogIdx || !name || !url || !userIdx){
        const missParameters = Object.entries({blogIdx, name, url, userIdx})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(utils.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { blogIdx, name, url, userIdx };
    result = await Blog.update(json)
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

router.delete('/:blogIdx', async (req, res) => {
    var userIdx = req.decoded;
    const { blogIdx } = req.params;
    if(!blogIdx || !userIdx){
        const missParameters = Object.entries({blogIdx, userIdx})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(utils.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { blogIdx, userIdx };
    result = await Blog.remove(json)
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
