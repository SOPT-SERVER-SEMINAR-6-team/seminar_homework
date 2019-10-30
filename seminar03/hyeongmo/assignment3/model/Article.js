const stat_code = require('../module/utils/statusCode');
const res_mss = require('../module/utils/responseMessage');
const auth_util = require('../module/utils/authUtil');
const pool = require('../module/db/pool');
const table = 'article';

module.exports = {
    create: async (json) => {
        const fields = 'blogIdx, title, content';
        const questions = `"${json.blogIdx}","${json.title}","${json.content}"`;
        const result = await pool.queryParam_None(`INSERT INTO ${table}(${fields})VALUES(${questions})`)
        return result;
    },
    read: async (json) => {
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE articleIdx = ${json.articleIdx} AND blogIdx = ${json.blogIdx}`)
        return result;
    },
    readAll: async () => {
        const result = await pool.queryParam_None(`SELECT * FROM ${table}`)
        return result;
    },
    update: async (json) => {
        const result = await pool.queryParam_None(`UPDATE ${table} SET content = '${json.new_content}' where blogIdx = '${json.blogIdx}' AND articleIdx = '${json.articleIdx}'`)
        return result;
    },
    remove: async (json) => {
        const result = await pool.queryParam_None(`DELETE FROM ${table} WHERE blogIdx='${json.blogIdx}' AND articleIdx='${json.articleIdx}'`)
        return result;
    }
}
