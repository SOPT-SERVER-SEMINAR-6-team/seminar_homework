const express = require('express');
const router = express.Router();
const Member = require('../../model/member');
const csvManager = require('../../module/csvManager');
const csvName = "member.csv";

router.get('/', async(req, res) =>{
    // TODO 그룹 구성원 전체 보기
    try{
        const members = await csvManager.read(csvName);
        var ppl = ["","","","","","",""]
        var result="";
        if(!members){
            console.log(`file read err : ${err}`);
        }  
        else{
            members.forEach(element=>{
                ppl[element.groupIdx] += element.name+" ";
            }); 
            for(var i=1;i<=6;i++){
                result+=`${i} 조<br>${ppl[i]}</br>`;
            }
            res.send(result);
        }
    }catch(err){
        console.log('ERROR: ${err}');
    }
});

router.get('/:groupIdx', async(req, res) => {
    // TODO 특정 그룹의 인원 보기
    try{
        const members = await csvManager.read(csvName);
        const Idx = req.params.groupIdx;
        var groupMem="";
        members.forEach(element=>{
            if(element.groupIdx == Idx)
                groupMem +=element.name+" ";
        });
        res.send(`${Idx} 조<br>${groupMem}</br>`);
        console.log(Idx);
    }catch(err){
        console.log(`ERROR: ${err}`);
    };
});

module.exports = router;
