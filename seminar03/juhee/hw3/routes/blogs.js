const express = require('express');
const router = express.Router({mergeParams: true});
const util = require('../modules/utils');
const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');
const Blog= require('../models/Blog');
const upload = require('../config/multer');
const jwt = require('../modules/jwt');

// create
router.post('/',upload.single('img'), async (req,res)=>{
    const {token} = req.headers;
    const result = jwt.verify(token);
    if(result == -3) {
        return res.status(statusCode.UNAUTHORIZED)
        .send(util.successFalse(responseMessage.EXPIRED_TOKEN));
    }
    if(result == -2) {
        return res.status(statusCode.UNAUTHORIZED)
        .send(util.successFalse(responseMessage.INVALID_TOKEN));
    }
    console.log(`token : ${token}`);

    const {name} = req.body;
    const img = req.file.location;
    if(!name||!img){
        res.status(statusCode.BAD_REQUEST).send(util.successFalse(responseMessage.NULL_VALUE));
    }
    try{
        const {code, json} = await Blog.create({name, img});
        res.status(code).send(json);
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(responseMessage.BOARD_CREATE_FAIL))
    }
});

// selectall
router.get('/all', async(req,res)=>{
    const {token} = req.headers;
    const result = jwt.verify(token);
    if(result == -3) {
        return res.status(statusCode.UNAUTHORIZED)
        .send(util.successFalse(responseMessage.EXPIRED_TOKEN));
    }
    if(result == -2) {
        return res.status(statusCode.UNAUTHORIZED)
        .send(util.successFalse(responseMessage.INVALID_TOKEN));
    }
    console.log(`token : ${token}`);
    
    try{
        const {code, json} = await Blog.selectAll();
        res.status(code).send(json);
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(responseMessage.BOARD_READ_ALL_FAIL))
    }
});

// selectone
router.get('/:blogIdx', async(req,res)=>{
    const {token} = req.headers;
    const result = jwt.verify(token);
    if(result == -3) {
        return res.status(statusCode.UNAUTHORIZED)
        .send(util.successFalse(responseMessage.EXPIRED_TOKEN));
    }
    if(result == -2) {
        return res.status(statusCode.UNAUTHORIZED)
        .send(util.successFalse(responseMessage.INVALID_TOKEN));
    }
    console.log(`token : ${token}`);
    
    const blogIdx = req.params.blogIdx; 

    if(!blogIdx){
        res.status(statusCode.BAD_REQUEST).send(util.successFalse(responseMessage.NULL_VALUE));
    }
    try{
        const {code, json} = await Blog.selectOne(blogIdx);
        res.status(code).send(json);
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.successFalse(responseMessage.BOARD_READ_FAIL))
    }
});

// update
router.put('/:blogIdx',async(req, res)=>{
    const {token} = req.headers;
    const result = jwt.verify(token);
    if(result == -3) {
        return res.status(statusCode.UNAUTHORIZED)
        .send(util.successFalse(responseMessage.EXPIRED_TOKEN));
    }
    if(result == -2) {
        return res.status(statusCode.UNAUTHORIZED)
        .send(util.successFalse(responseMessage.INVALID_TOKEN));
    }
    console.log(`token : ${token}`);
    
    const {blogIdx} = req.params;
    const {name} = req.body;

    if(!blogIdx||!name){
        res.status(statusCode.BAD_REQUEST).send(util.successFalse(responseMessage.NULL_VALUE));
    }
    try{
        const {code, json} = await Blog.selectOne(blogIdx, name);
        res.status(code).send(json);
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(responseMessage.BOARD_UPDATE_FAIL));
    }
});

// delete
router.delete('/:blogIdx', async(req,res)=>{
    const {token} = req.headers;
    const result = jwt.verify(token);
    if(result == -3) {
        return res.status(statusCode.UNAUTHORIZED)
        .send(util.successFalse(responseMessage.EXPIRED_TOKEN));
    }
    if(result == -2) {
        return res.status(statusCode.UNAUTHORIZED)
        .send(util.successFalse(responseMessage.INVALID_TOKEN));
    }
    console.log(`token : ${token}`);
    
    const {blogIdx} = req.params;
    
    if(!blogIdx){
        res.status(statusCode.BAD_REQUEST).send(util.successFalse(responseMessage.NULL_VALUE));
    }
    try {
         const {code, json} = await Blog.delete(blogIdx);
         res.status(code).send(json);
    } catch(err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(responseMessage.BOARD_DELETE_FAIL));

    }
});

module.exports = router;