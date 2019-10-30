const stat_code = require('../module/utils/statusCode');
const res_mss = require('../module/utils/responseMessage');
const auth_util = require('../module/utils/authUtil');
const pool = require('../module/db/pool');
const table = 'blog';

module.exports = {
    create: async (json) => {
        const fields = 'category, id, pw';
        const questions = `"${json.category}","${json.id}","${json.pw}"`;
        const result = await pool.queryParam_None(`INSERT INTO ${table}(${fields})VALUES(${questions})`)
        return result;
    },
    read: async (blogIdx) => {
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE blogIdx = ${blogIdx}`)
        return result;
    },
    readAll: async () => {
        const result = await pool.queryParam_None(`SELECT * FROM ${table}`)
        return result;
    },
    update: async (json) => {
        const result = await pool.queryParam_None(`UPDATE ${table} SET category = '${json.category}' where id = '${json.id}' AND pw = '${json.pw}'`)
        return result;
    },
    remove: async (json) => {
        const result = await pool.queryParam_None(`DELETE FROM ${table} WHERE id='${json.id}' AND pw='${json.pw}'`)
        return result;
    }
}
