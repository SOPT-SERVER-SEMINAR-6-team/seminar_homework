const express = require('express');
const router = express.Router({
    mergeParams: true
});
const stat_code = require('../../../module/utils/statusCode');
const res_mss = require('../../../module/utils/responseMessage');
const auth_util = require('../../../module/utils/authUtil');
const Article = require('../../../model/Article');

router.get('/', async (req, res) => {
    result = await Article.readAll();
    if(!result)
    {
        res
        .status(stat_code.INTERNAL_SERVER_ERROR)
        .send(auth_util.successFalse(res_mss.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(stat_code.OK)
    .send(auth_util.successTrue(res_mss.X_READ_ALL_SUCCESS("article"),result));
});

router.get('/:articleIdx', async (req, res) => {
    const { blogIdx, articleIdx } = req.params;
    if(!blogIdx || !articleIdx){
        res
        .status(stat_code.BAD_REQUEST)
        .send(auth_util.successFalse(res_mss.NULL_VALUE));
        return;
    }
    const json = {blogIdx, articleIdx};
    result = await Article.read(json);
    if(!result)
    {
        res
        .status(stat_code.INTERNAL_SERVER_ERROR)
        .send(auth_util.successFalse(res_mss.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(stat_code.OK)
    .send(auth_util.successTrue(res_mss.X_READ_SUCCESS("article"),result));
});

router.post('/', async (req, res) => {
    const { blogIdx } = req.params;
    const { title, content } = req.body;
    if(!blogIdx || !title || !content){
        res
        .status(stat_code.BAD_REQUEST)
        .send(auth_util.successFalse(res_mss.NULL_VALUE));
        return;
    }
    const json = {blogIdx, title, content};
    result = await Article.create(json)
    if(!result)
    {
        res
        .status(stat_code.INTERNAL_SERVER_ERROR)
        .send(auth_util.successFalse(res_mss.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(stat_code.OK)
    .send(auth_util.successTrue(res_mss.X_CREATE_SUCCESS("article"),result));
});

router.put('/:articleIdx', async (req, res) => {
    const {blogIdx, articleIdx} = req.params;
    const {new_content} = req.body;
    if(!blogIdx || !articleIdx || !new_content){
        res
        .status(stat_code.BAD_REQUEST)
        .send(auth_util.successFalse(res_mss.NULL_VALUE));
        return;
    }
    const json = { blogIdx, articleIdx, new_content };
    result = await Article.update(json);
    if(!result)
    {
        res
        .status(stat_code.INTERNAL_SERVER_ERROR)
        .send(auth_util.successFalse(res_mss.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(stat_code.OK)
    .send(auth_util.successTrue(res_mss.X_UPDATE_SUCCESS("article"),result));
});

router.delete('/:articleIdx', async (req, res) => {
    const { blogIdx, articleIdx } = req.params;
    if(!blogIdx || !articleIdx){
        res
        .status(stat_code.BAD_REQUEST)
        .send(auth_util.successFalse(res_mss.NULL_VALUE));
        return;
    }
    const json = { blogIdx, articleIdx };
    result = await Article.remove(json);
    if(!result)
    {
        res
        .status(stat_code.INTERNAL_SERVER_ERROR)
        .send(auth_util.successFalse(res_mss.INTERNAL_SERVER_ERROR));
        return;
    }
    res
    .status(stat_code.OK)
    .send(auth_util.successTrue(res_mss.X_DELETE_SUCCESS("article"),result));
});

module.exports = router;
