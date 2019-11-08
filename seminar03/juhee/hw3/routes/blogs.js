const express = require('express');
const router = express.Router({mergeParams: true});
const authUtil = require('../modules/authUtil');
const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');
const Blog= require('../models/Blog');

// create
router.post('/', async (req,res)=>{
    const {name} = req.body;
    
    if(!name){
        res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    }
    try{
        const {code, json} = await Blog.create(name);
        res.status(code).send(json);
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(authUtil.successFalse(responseMessage.BOARD_CREATE_FAIL))
    }
});

// selectall
router.get('/', async(req,res)=>{
    try{
        const {code, json} = await Blog.selectAll();
        res.status(code).send(json);
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(authUtil.successFalse(responseMessage.BOARD_READ_ALL_FAIL))
    }
});

// selectone
router.get('/:blogIdx', async(req,res)=>{
    const blogIdx = req.params.blogIdx; 

    if(!blogIdx){
        res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    }
    try{
        const {code, json} = await Blog.selectOne(blogIdx);
        res.status(code).send(json);
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(authUtil.successFalse(responseMessage.BOARD_READ_FAIL))
    }
});

// update
router.put('/:blogIdx',async(req, res)=>{
    const {blogIdx} = req.params;
    const {name} = req.body;

    if(!blogIdx||!name){
        res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    }
    try{
        const {code, json} = await Blog.selectOne(blogIdx, name);
        res.status(code).send(json);
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(authUtil.successFalse(responseMessage.BOARD_UPDATE_FAIL));
    }
});

// delete
router.delete('/:blogIdx', async(req,res)=>{
    const {blogIdx} = req.params;
    
    if(!blogIdx){
        res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    }
    try {
         const {code, json} = await Blog.delete(blogIdx);
         res.status(code).send(json);
    } catch(err) {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(authUtil.successFalse(responseMessage.BOARD_DELETE_FAIL));

    }
});

module.exports = router;