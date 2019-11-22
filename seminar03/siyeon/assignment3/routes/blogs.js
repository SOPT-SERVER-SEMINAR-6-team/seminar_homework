const express = require('express');
const router = express.Router({mergeParams: true});
const Blog = require('../model/Blog');

const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');

// 블로그 가져오기
router.get('/', (req, res) => {
    Blog.readAll()
    .then(({code, json}) => res.status(code).send(json))
    .catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,
            authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
    });
})

router.get('/:idx', (req, res) => {
    const idx = req.params.idx;
    if(!idx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.read(idx)
    .then(({code, json}) => {res.status(code).send(json)})
    .catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,
            authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
    });
})

// 블로그 생성
router.post('/', (req, res)=>{
    const {
        name,
        owner
    } = req.body;
    console.log({name, owner});
    // 파라미터 값 체크
    if(!name || !owner){
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.create({name, owner})
        .then(({code, json}) => res.status(code).send(json))
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR,
                authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
        });
})

// 블로그 수정
router.put('/:idx', (req, res)=>{
    const idx = req.params.idx;
    const {
        name,
        owner
    } = req.body;
    console.log({idx, name, owner});
    // 파라미터 값 체크
    if(!idx || !name || !owner){
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.update({idx, name, owner})
    .then(({code, json}) => res.status(code).send(json))
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR,
                authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
        });
})

// 블로그 삭제
router.delete('/:idx', (req, res)=>{
    const idx = req.params.idx;
    const {
        owner
    } = req.body;
    console.log({idx, owner});
    // 파라미터 값 체크
    if(!idx || !owner){
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.delete({idx, owner})
    .then(({code, json}) => res.status(code).send(json))
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR,
                authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
        });
})

module.exports = router;