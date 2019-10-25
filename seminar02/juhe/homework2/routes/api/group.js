const express = require('express');
const router = express.Router();
const csvManager = require('../../module/csvManager');


router.get('/', async (req, res) => {
    try{
        const member = await csvManager.read("member.csv");
        if(!member){
            console.log(`file read err : ${err}`);
        }    
        else{
            res.send(member);
        }    
    }catch(err){
        console.log(`err : ${err}`);
    }
});


router.get('/:groupIdx', async (req, res) => {
    try{
        const member = await csvManager.read("member.csv");
        const group = await csvManager.read("group.csv");
        const Idx = req.params.groupIdx;
        if(!member || !group)
            console.log(`err : ${err}`);
        groupno = group[String(Number(Idx-1))].name;
        console.log(groupno);
        membername = member.filter(membername => membername.groupIdx === Idx).map(membername => membername.name);
        res.send(`${groupno}:${membername}`);
    }catch(err){
        console.log(`err : ${err}`);
    }
});

module.exports = router;