const express = require('express');
const router = express.Router({mergeParams: true});
const stat_code = require('../../module/utils/statusCode');
const res_mss = require('../../module/utils/responseMessage');
const auth_util = require('../../module/utils/authUtil');
const Blog = require('../../model/Blog');

router.get('/', async (req, res) => {
    result = await Blog.readAll();
    if(!result)
    {
        res
        .status(stat_code.INTERNAL_SERVER_ERROR)
        .send(auth_util.successFalse(res_mss.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(stat_code.OK)
    .send(auth_util.successTrue(res_mss.X_READ_ALL_SUCCESS("blog"),result));
});

router.get('/:blogIdx', async (req, res) => {
    const {blogIdx} = req.params;
    if(!blogIdx){
        res
        .status(stat_code.BAD_REQUEST)
        .send(auth_util.successFalse(res_mss.NULL_VALUE));
        return;
    }
    result = await Blog.read(blogIdx);
    if(!result)
    {
        res
        .status(stat_code.INTERNAL_SERVER_ERROR)
        .send(auth_util.successFalse(res_mss.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(stat_code.OK)
    .send(auth_util.successTrue(res_mss.X_READ_SUCCESS("blog"),result));
});

router.post('/', async (req, res) => {
    const { category, id, pw } = req.body;
    if(!category || !id || !pw){
        res
        .status(stat_code.BAD_REQUEST)
        .send(auth_util.successFalse(res_mss.NULL_VALUE));
        return;
    }
    const json = {category, id, pw};
    result = await Blog.create(json);
    if(!result)
    {
        res
        .status(stat_code.INTERNAL_SERVER_ERROR)
        .send(auth_util.successFalse(res_mss.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(stat_code.OK)
    .send(auth_util.successTrue(res_mss.X_CREATE_SUCCESS("blog"),result));
});

router.put('/', async (req, res) => {
    const { id, pw, category } = req.body;
    if(!category || !id || !pw){
        res
        .status(stat_code.BAD_REQUEST)
        .send(auth_util.successFalse(res_mss.NULL_VALUE));
        return;
    }
    const json = { id, pw, category };
    result = await Blog.update(json)
    if(!result)
    {
        res
        .status(stat_code.INTERNAL_SERVER_ERROR)
        .send(auth_util.successFalse(res_mss.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(stat_code.OK)
    .send(auth_util.successTrue(res_mss.X_UPDATE_SUCCESS("blog"),result));
});

router.delete('/', async (req, res) => {
    const { id, pw } = req.body;
    if(!id || !pw){
        res
        .status(stat_code.BAD_REQUEST)
        .send(auth_util.successFalse(res_mss.NULL_VALUE));
        return;
    }
    const json = { id, pw };
    result = await Blog.remove(json)
    if(!result)
    {
        res
        .status(stat_code.INTERNAL_SERVER_ERROR)
        .send(auth_util.successFalse(res_mss.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(stat_code.OK)
    .send(auth_util.successTrue(res_mss.X_UPDATE_SUCCESS("blog"),result));
});
module.exports = router;
