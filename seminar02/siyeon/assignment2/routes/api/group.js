const express = require('express');
const router = express.Router();
const Member = require('../../model/member');
const csvManager = require('../../module/csvManager');


router.get('/', async (req, res) => {
    // TODO 그룹 구성원 전체 보기
    var memberArray =[];
    try{
        const members = await csvManager.read("member.csv");
        members.forEach(element => {
            memberArray.push(new Member(element.name, element.groupIdx));
        });

        var result = "";
        for(var i = 0; i <memberArray.length; i++){
            result += `<br>${memberArray[i].groupIdx}조 ${memberArray[i].name}<br>`
        }

        res.send(result);

    }catch(err){
        console.log(`error: ${err}`);
    }
    res.render('index', { title: 'Express' });
});

router.get('/:groupIdx', async(req, res) => {
     // TODO 특정 그룹의 인원 보기
    const groupIdx = req.params.groupIdx;
    const members =  await csvManager.read("member.csv");
    const groupName = await csvManager.read("group.csv");
    
    var groupArray =[];

    members.forEach(element => {
        if(element.groupIdx == groupIdx){
            groupArray.push(element.name);
        }
    });

    const result = `${groupName[Number(groupIdx)-1].name}조<br>구성원: ${groupArray}<br>인원: ${groupArray.length}명`;

    res.send(result);
});

module.exports = router;
