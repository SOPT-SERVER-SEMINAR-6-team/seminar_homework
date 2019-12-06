const pool = require('../module/db/pool');
const table = 'comment';


module.exports = {
    create: async (json) => {
        const fields = 'writer, content, articleIdx, userIdx';
        const questions = `"${json.writer}","${json.content}","${json.articleIdx}", "${json.userIdx}"`;
        const result = await pool.queryParam_None(`INSERT INTO ${table}(${fields})VALUES(${questions})`)
        return result;
    },
    read: async (json) => {
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE articleIdx = ${json.articleIdx} AND commentIdx = ${json.commentIdx}`)
        return result;
    },
    readAll: async (json) => {
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE articleIdx = ${json.articleIdx}`)
        return result;
    },
    update: async (json) => {
        const result = await pool.queryParam_None(`UPDATE ${table} SET writer = '${json.writer}', content = '${json.content}' where commentIdx = '${json.commentIdx}' AND articleIdx = '${json.articleIdx}' AND userIdx = '${json.userIdx}'`)
        return result;
    },
    remove: async (json) => {
        const result = await pool.queryParam_None(`DELETE FROM ${table} WHERE commentIdx='${json.commentIdx}' AND articleIdx='${json.articleIdx}' AND userIdx='${json.userIdx}'`)
        return result;
    }
}
