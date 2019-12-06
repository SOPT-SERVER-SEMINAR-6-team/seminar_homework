const express = require('express');
const router = express.Router({mergeParams: true});
const Article = require('../../../model/Article')

const statusCode = require('../../../module/statusCode');
const responseMessage = require('../../../module/responseMessage');
const authUtil = require('../../../module/authUtil');

router.get('/', (req, res) => {
    const blogIdx = req.params.blogIdx;
    console.log(blogIdx);

    if(!blogIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    return;
    }
    Article.readAll({blogIdx})
    .then(({code, json}) => res.status(code).send(json))
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR,
                authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
        });

})

router.get('/:articleIdx', (req, res) => {
    const blogIdx = req.params.blogIdx;
    const articleIdx = req.params.articleIdx;
    console.log({blogIdx, articleIdx});

    if(!blogIdx || !articleIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    return;
    }
    Article.read({blogIdx, articleIdx})
    .then(({code, json}) => res.status(code).send(json))
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR,
                authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
        });

})

router.post('/', (req, res) => {
    const blogIdx = req.params.blogIdx;
    const {title, content} = req.body;
    console.log({title, content});

    if(!title || !content || !blogIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    return;
    }
    Article.create({blogIdx, title, content})
    .then(({code, json}) => res.status(code).send(json))
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR,
                authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
        });
})


router.put('/:articleIdx', (req, res) => {
    const blogIdx = req.params.blogIdx;
    const articleIdx = req.params.articleIdx;
    const {title, content} = req.body;
    console.log({blogIdx, articleIdx, title, content});

    if(!title || !content || !blogIdx || !articleIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    return;
    }
    Article.update({blogIdx, articleIdx, title, content})
    .then(({code, json}) => res.status(code).send(json))
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR,
                authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
        });
})


router.delete('/:articleIdx', (req, res) => {
    const blogIdx = req.params.blogIdx;
    const articleIdx = req.params.articleIdx;
    console.log({blogIdx, articleIdx});

    if(!blogIdx || !articleIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    return;
    }
    Article.delete({blogIdx, articleIdx})
    .then(({code, json}) => res.status(code).send(json))
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR,
                authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
        });
})

module.exports = router;