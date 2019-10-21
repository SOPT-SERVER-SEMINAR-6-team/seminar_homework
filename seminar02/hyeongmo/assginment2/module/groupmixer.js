const fs = require('fs');
const path = require('path');
const csvManager = require('./csvManager');

const filePath = './public/csvs/';

const groupmixer = {
    random: async (req, res) => {
        try{
            var i, a;
            let numarr = Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0);
            console.log(numarr)
            let rdfile = await csvManager.read("member.csv");
            if(!rdfile)
                console.log(`err : ${err}`);
            for(i = 0; i < rdfile.length; i++){
                do{
                    a = parseInt(Math.random()*6);
                }while(numarr[a] > 6);
                numarr[a] += 1;
                rdfile[i].groupIdx = a+1;
                }
            await csvManager.write("member.csv", rdfile);
        }catch(err){
            console.log(`err : ${err}`);
        }
    },
}

module.exports = groupmixer;