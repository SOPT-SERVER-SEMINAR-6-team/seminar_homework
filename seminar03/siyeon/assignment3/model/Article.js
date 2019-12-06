const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');

const articlesDB = [{
    blogIdx: 0,
    articleIdx: 0,
    title: '첫번째 게시물',
    content: '첫번째 내용입니다.'
},{
    blogIdx:1,
    articleIdx: 1,
    title: '두번째 아티클',
    content: '두번째 게시글입니다.'
}]

const article = {
    create: ({blogIdx, title, content }) => {
        return new Promise((resolve, reject) =>{

            if(title.length > 10){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.TITLE_LENGTH_OVER)
                });
            }
            blogIdx *= 1;
            articlesDB.push({
                blogIdx,
                articleIdx: articlesDB.length,
                title,
                content
            });
            console.log({articlesDB});
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.CREATE_ARTICLE_SUCCESS)
            });
        })
    },
    readAll: ({blogIdx}) => {
        return new Promise((resolve, reject) =>{

            // 원래는 존재하는 blog인지 확인해야 하는데, 지금은 DB 연결을 안해서 확인 x

            const articles = articlesDB.filter(it => it.blogIdx == blogIdx);
            if(articles.length == 0){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_ARTICLE)
                });
            }

            console.log({articles});
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.READ_ARTICLE_SUCCESS, articles)
            });
        })
    },
    read: ({blogIdx, articleIdx}) => {
        return new Promise((resolve, reject) =>{

            // 원래는 존재하는 blog인지 확인해야 하는데, 지금은 DB 연결을 안해서 확인 x

            const article = articlesDB.filter(it => it.blogIdx == blogIdx && it.articleIdx == articleIdx);
            if(article.length == 0){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_ARTICLE)
                });
            }
            console.log({article});
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.READ_ARTICLE_SUCCESS, article)
            });
        })
    },
    update: ({blogIdx, articleIdx, title, content}) => {
        return new Promise((resolve, reject) =>{

            // 원래는 존재하는 blog인지 확인해야 하는데, 지금은 DB 연결을 안해서 확인 x

            const article = articlesDB.filter(it => it.blogIdx == blogIdx && it.articleIdx == articleIdx);
            if(article.length == 0){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_ARTICLE)
                });
            }
            console.log({article});

            // 원래는 블로그의 주인인지 확인해야 하는데, 지금은 DB 연결을 안해서 확인 x

            articlesDB[articleIdx].title = title;
            articlesDB[articleIdx].content = content;
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.UPDATE_ARTICLE_SUCCESS, articlesDB[articleIdx])
            });
        })
    },
    delete: ({blogIdx, articleIdx}) => {
        return new Promise((resolve, reject) =>{

            // 원래는 존재하는 blog인지 확인해야 하는데, 지금은 DB 연결을 안해서 확인 x

            const article = articlesDB.filter(it => it.blogIdx == blogIdx && it.articleIdx == articleIdx);
            if(article.length == 0){
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_ARTICLE)
                });
            }
            console.log({article});

            // 원래는 블로그의 주인인지 확인해야 하는데, 지금은 DB 연결을 안해서 확인 x

            articlesDB.splice(articleIdx, 1);
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.DELETE_ARTICLE_SUCCESS, articlesDB)
            });
        })
    }
}

module.exports = article;