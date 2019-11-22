const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const {secretOrPrivateKey} = require('../config/secretKey');

const options = {
    algorithm: "HS256", //H256(algorithm)에 해당하는 header, payload, signiture가 있음(내정)
    expiresIn: "1h",
    issuer: "genie"
};

module.exports = {
    sign: (user) => {
        const payload = { // 
            id : user.id,
            pwd : user.pwd
        };
        //발급받은 refreshToken은 반드시 디비에 저장해야 한다.
        const result = {
            token: jwt.sign(payload, secretOrPrivateKey, options),
            refreshToken: randToken.uid(256)
        };
        //refreshToken을 만들 때에도 다른 키를 쓰는게 좋다.
        //대부분 2주로 만든다.
        return result;
    },
    verify: (token) => { //verify(token) 하면 토큰의 payload내에 요소 알아서 비교하는건가?
        let decoded;
        try {
            decoded = jwt.verify(token, secretOrPrivateKey);
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return -3;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                return -2;
            } else {
                console.log("invalid token");
                return -2;
            }
        }
        return decoded;
    },
    refresh: (user) => {
        const payload = {
            idx: user.idx,
            grade: user.grade,
            name: user.name
        };
        return jwt.sign(payload, secretOrPrivateKey, options);
    }
};