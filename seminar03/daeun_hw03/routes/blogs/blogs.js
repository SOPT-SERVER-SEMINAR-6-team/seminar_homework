var express = require('express');
var router = express.Router();
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const authUtil = require('../../module/authUtil');
const Blog = require('../../model/blog');

//read
router.get('/:blogIdx',async (req,res)=>{
    const {blogIdx}=req.params;
    if(!blogIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    } 
    try{
        const {code,json} = await Blog.read(blogIdx);
        res.status(code).send(json);
        console.log(blogIdx)
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,
            authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
    }
});

//readall
router.get('/',async (req,res)=>{
    try{
        const {code,json} = await Blog.readAll();
        res.status(code).send(json);
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,
            authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
    }
});

//create
router.post('/',async (req,res)=>{
    const {blogIdx, name }=req.body;
    if(!blogIdx||!name) {
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    }
    try{
        const{code,json}= await Blog.create({blogIdx,name});
    }catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,
            authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
    }
});

//update
router.put('/:blogIdx',async (req,res)=>{
    const {blogIdx} = req.param;
    const {name} = req.body;
    if(!blogIdx||!name) {
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    }
    try{
        const{code,json}= await Blog.update({blogIdx,name});
    }catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,
            authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
    }
});

//remove
router.delete('/:blogIdx',async (req,res)=>{
    const {blogIdx}=req.params;
    if(!blogIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
    } 
    try{
        const {code,json} = await Blog.remove(blogIdx);
        console.log(blogIdx)
    } catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR,
            authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
    }
});

module.exports = router;
