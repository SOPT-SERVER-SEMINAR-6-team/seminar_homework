const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const {secretOrPrivateKey} = require('../config/secretKey'); 
const options = {
algorithm: "HS256", expiresIn: "1h", issuer: "genie"
};
module.exports = { 
    sign: (user) => { 
        const payload = {
            userIdx: user.userIdx, 
            id: user.id
        };
        const result = {
            token: jwt.sign(payload, secretOrPrivateKey, options),
            refreshToken: randToken.uid(256) 
        };
        return result; 
    },
    verify: (token) => { 
        let decoded;
        try {
            decoded = jwt.verify(token, secretOrPrivateKey);
        }
        catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return -3;
                }
            else if (err.message === 'invalid token') {
                console.log('invalid token');
                return -2; }
            else {
            console.log("invalid token");
            return -2; 
            }
        }
        return decoded;
    },
    refresh: (user) => { 
        const payload = {
            userIdx: user.idx, 
            id: user.grade
        };
        return jwt.sign(payload, secretOrPrivateKey, options); 
    }
};