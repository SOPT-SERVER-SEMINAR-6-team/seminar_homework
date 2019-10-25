const express = require('express');
const router = express.Router();
const csvManager = require('../../module/csvManager');
const csvPath = '../../public/csvs/'

router.get('/', function(req, res) {
    // TODO 그룹 구성원 전체 보기
    let members =Array(7).fill(null).map(()=>Array()); //2차원 배열 선언

    csvManager.read(csvPath + 'member.csv').then((csv_res) => {
        // TODO 특정 그룹의 인원 보기
        csv_res.forEach(element => {
            while(1){
                var groupIdx = Math.floor(Math.random() * 6) + 1 ;
                if(members[groupIdx].length < 7) break;
            }
            members[groupIdx].push(element.name);
            
        });
        console.log(members);
        res.send(`1조 : ${members[1]} 2조 : ${members[2]} 3조 : ${members[3]} 4조 : ${members[4]} 5조 : ${members[5]} 6조 : ${members[6]}`);
    });
});


module.exports = router;
