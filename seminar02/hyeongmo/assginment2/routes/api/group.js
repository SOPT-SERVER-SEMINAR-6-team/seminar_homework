const express = require('express');
const router = express.Router();
const csvManager = require('../../module/csvManager');
const groupmixer = require('../../module/groupmixer');

router.get('/', async (req, res) => {
    try{
        const member = await csvManager.read("member.csv");
        if(!member)
            console.log(`file read err : ${err}`);
        else
            res.json(member);
    }catch(err){
        console.log(`array err : ${err}`);
    }
});

router.get('/random', async (req, res) => {
    try{
        await groupmixer.random();
        const member = await csvManager.read("member.csv");
        if(!member)
            console.log(`file read err : ${err}`);
        else
            res.json(member);
    }catch(err){
        console.log(`array err : ${err}`);
    }
});

router.get('/:groupIdx', async (req, res) => {
    try{
        const member = await csvManager.read("member.csv");
        const group = await csvManager.read("group.csv");
        const Idx = req.params.groupIdx;
        if(!member || !group)
            console.log(`file read err : ${err}`);
        groupname = group[String(Number(Idx-1))].name;
        console.log(groupname);
        students = member.filter(student => student.groupIdx === Idx).map(student => student.name);
        res.send(`<b>${groupname}</b><br>${students}`);
    }catch(err){
        console.log(`array err : ${err}`);
    }
});

module.exports = router;
