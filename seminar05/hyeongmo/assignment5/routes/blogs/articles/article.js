const express = require('express');
const router = express.Router({
    mergeParams: true
});
const statusCode = require('../../../module/utils/statusCode');
const responseMessage = require('../../../module/utils/responseMessage');
const utils = require('../../../module/utils/utils');
const Article = require('../../../model/Article');

const {LoggedIn} = require('../../../module/utils/authUtil');
const jwt = require('../../../module/jwt');
const upload = require('../../../config/multer');

const THIS_LOG = '글';

router.use('/', LoggedIn);
router.use('/:articleIdx', LoggedIn);

router.get('/', async (req, res) => {
    const { blogIdx } = req.params;
    if(!blogIdx){
        const missParameters = Object.entries({blogIdx})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(utils.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { blogIdx };
    result = await Article.readAll(json);
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

router.get('/:articleIdx', async (req, res) => {
    const { blogIdx, articleIdx } = req.params;
    if(!blogIdx || !articleIdx){
        const missParameters = Object.entries({blogIdx, articleIdx})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(utils.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { blogIdx, articleIdx };
    result = await Article.read(json);
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

router.post('/', upload.array('photos', 3), async (req, res) => {
    var location_links = req.files.map(file => file.location);
    var userIdx = req.decoded;
    const { blogIdx } = req.params;
    const { title, content } = req.body;
    if(!blogIdx || !title || !content || !userIdx || !location_links){
        const missParameters = Object.entries({blogIdx, title, content, userIdx, location_links})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(utils.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { blogIdx, title, content, userIdx, location_links };
    result = await Article.create(json)
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

router.put('/:articleIdx', upload.array('photos', 3), async (req, res) => {
    var location_links = req.files.map(file => file.location);
    var userIdx = req.decoded;
    const {blogIdx, articleIdx} = req.params;
    const { title, content } = req.body;
    if(!blogIdx || !articleIdx || !title || !content || !userIdx || !location_links){
        const missParameters = Object.entries({blogIdx, articleIdx, title, content, userIdx, location_links})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(utils.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { blogIdx, articleIdx, title, content, userIdx, location_links };
    result = await Article.update(json);
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

router.delete('/:articleIdx', async (req, res) => {
    var userIdx = req.decoded;
    const {blogIdx, articleIdx} = req.params;
    if(!blogIdx || !articleIdx || !userIdx){
        const missParameters = Object.entries({blogIdx, articleIdx, userIdx})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(utils.successFalse(`${responseMessage.NULL_VALUE},${missParameters}`));
        return;
    }
    const json = { blogIdx, articleIdx, userIdx };
    result = await Article.remove(json);
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
