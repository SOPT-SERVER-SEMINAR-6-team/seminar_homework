const express = require('express');
const router = express.Router();
const Member = require('../../model/member');
const csvManager = require('../../module/csvManager');


router.get('/', async (req, res) => {
    // TODO 그룹 구성원 전체 보기
    var memberArray =[];
    try{
        const members = await csvManager.read("member.csv");
        let index = 0;
        members.forEach(element => {
            memberArray[index++] = (new Member(element.name, element.groupIdx));
        });

        var result = "";
        for(var i = 0; i <index; i++){
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
    var groupArray = ["", "", "", "", "", ""];
    var groupNum = [0, 0, 0, 0, 0, 0];
    let index;
    members.forEach(element => {
        index = String((Number(element.groupIdx)-1));
        groupArray[index] += element.name + " ";
        groupNum[index]++;
    });

    const result = `${groupIdx}조<br>구성원: ${groupArray[index]}<br>인원: ${groupNum[index]}명`;

    res.send(result);
});

module.exports = router;
