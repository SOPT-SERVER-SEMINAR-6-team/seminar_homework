const pool = require('../module/db/pool');
const table = 'user';

module.exports = {
    search_id: async (userIdx) => {
        const result = await pool.queryParam_None(`SELECT id FROM ${table} WHERE userIdx = ${userIdx}`)
        return result;
    },
    search_pw: async (userIdx) => {
        const result = await pool.queryParam_None(`SELECT pw FROM ${table} WHERE userIdx = ${userIdx}`)
        return result;
    }
}
