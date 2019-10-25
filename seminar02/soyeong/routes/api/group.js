const express = require('express');
const router = express.Router();
const Member = require('../../model/member');
const csvManager = require('../../module/csvManager');
const csvPath = '../../public/csvs/'

router.get('/', function(req, res) {
    // TODO 그룹 구성원 전체 보기
    let members = ["","","","","","",""];
    csvManager.read(csvPath + 'member.csv').then((csv_res) => {
        // TODO 특정 그룹의 인원 보기
        csv_res.forEach(element => {
            members[element.groupIdx] += element.name + ' ';
        });
        console.log(members);
        res.send(`1조 : ${members[1]} 2조 : ${members[2]} 3조 : ${members[3]} 4조 : ${members[4]} 5조 : ${members[5]} 6조 : ${members[6]}`);
    });
});

router.get('/:groupIdx', function(req, res) {
    const groupIdx = req.params.groupIdx;
    var memberName = "";
    var groupName;
    csvManager.read(csvPath + 'member.csv').then((csv_res) => {
        csvManager.read(csvPath + 'group.csv').then((csv_res2) =>{
            csv_res2.forEach(element=>{
                if(element.groupIdx == groupIdx) groupName = element.name;
            })
            csv_res.forEach(element => {
                if(element.groupIdx==groupIdx) {
                    memberName = memberName + element.name + ' ';
                }
            });
            // TODO 특정 그룹의 인원 보기
            res.send(`${groupName} : ${memberName}`);
        });
        
    });
    
    
});

module.exports = router;
