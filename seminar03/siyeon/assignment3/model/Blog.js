const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');

const blogsDB = [{
    blogIdx: 0,
    name: '첫번째 블로그',
    owner: '주인장1'
},{
    blogIdx: 1,
    name: '두번째 블로그',
    owner: '주인장2'
}]

const blog = {
    create: ({name, owner}) => {
        return new Promise((resolve, reject) => {
            // 1. 존재하는 블로그 이름인지 확인 (중복 x)
            const duplicateName = blogsDB.filter(it => it.name == name);
            if(duplicateName.length != 0){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.ALREADY_EXISTENCE_NAME)
                });
                return;
            }
            const blog = blogsDB.push({
                blogIdx : blogsDB.length ,
                name,
                owner
            });
            console.log(blogsDB);
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.CREATE_BLOG_SUCCESS, blog)
            });
        });
    },

    readAll: () => {
        return new Promise((resolve, reject)=>{
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.READ_ALL_BLOG_SUCCESS, blogsDB)
            });
        });
    },

    read: (idx) => {
        return new Promise((resolve, reject)=>{
            if(idx >= blogsDB.length){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_BLOG)
                });
                return;
            }
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.READ_BLOG_SUCCESS, blogsDB[idx])
            });
        });
    },
    
    update: ({idx, name, owner}) => {
        return new Promise((resolve, reject) => {
            if(idx >= blogsDB.length){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_BLOG)
                });
                return;
            }

            // 블로그 주인이 맞는지 확인
            const isOwner = blogsDB.filter(it => it.owner == owner)
            if(isOwner.length == 0){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NOT_BLOG_OWNER)
                });
                return;
            }

            blogsDB[idx].name = name;
            blogsDB[idx].owner = owner;
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.UPDATE_BLOG_SUCCESS, blogsDB[idx])
            });
        })
    },

    delete: ({idx, owner}) => {
        return new Promise((resolve, reject) => {
            if(idx >= blogsDB.length){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_BLOG)
                });
                return;
            }
            // 블로그 주인이 맞는지 확인
            const isOwner = blogsDB.filter(it => it.owner == owner)
            if(isOwner.length == 0){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NOT_BLOG_OWNER)
                });
                return;
            }

            blogsDB.splice(idx, 1);
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.DELETE_BLOG_SUCCESS)
            });
        })
    }
}

module.exports = blog;