const pool = require('../module/db/pool');
const table = 'article';

module.exports = {
    create: async (json) => {
        const fields = 'blogIdx, title, content, userIdx, image1, image2, image3';
        const questions = `"${json.blogIdx}","${json.title}","${json.content}", "${json.userIdx}", "${json.location_links[0]}", "${json.location_links[1]}", "${json.location_links[2]}"`;
        const result = await pool.queryParam_None(`INSERT INTO ${table}(${fields})VALUES(${questions})`)
        return result;
    },
    read: async (json) => {
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE articleIdx = ${json.articleIdx} AND blogIdx = ${json.blogIdx}`)
        return result;
    },
    readAll: async (json) => {
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE blogIdx = ${json.blogIdx}`)
        return result;
    },
    update: async (json) => {
        const result = await pool.queryParam_None(`UPDATE ${table} SET content = '${json.content}', title = '${json.title}', image1 = '${json.location_links[0]}', image2 = '${json.location_links[1]}', image3 = '${json.location_links[2]}' where blogIdx = '${json.blogIdx}' AND articleIdx = '${json.articleIdx}' AND userIdx = '${json.userIdx}'`)
        return result;
    },
    remove: async (json) => {
        const result = await pool.queryParam_None(`DELETE FROM ${table} WHERE blogIdx='${json.blogIdx}' AND articleIdx='${json.articleIdx}' AND userIdx='${json.userIdx}'`)
        return result;
    }
}
