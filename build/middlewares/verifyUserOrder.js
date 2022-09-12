"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TOKEN = process.env.TOKEN;
const verifyUser = (req, res, next) => {
    try {
        const user_id = Number(req.body.user_id);
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const verified = parseJwt(token);
        //console.log(verified.id);
        if (verified.id === user_id) {
            console.log('done');
            next();
        }
        else
            throw new Error();
    }
    catch (e) {
        res.send('user_id is incorrect');
    }
};
// herlper function
function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
exports.default = verifyUser;
