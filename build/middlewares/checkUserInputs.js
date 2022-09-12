"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (req, res, next) => {
    try {
        if (checkfirstName(req.body.firstName) &&
            checkSecondName(req.body.secondName))
            next();
        if (!checkfirstName(req.body.firstName))
            res.send('FirstName is not valid');
        if (!checkSecondName(req.body.secondName))
            res.send('SecondName is not valid');
    }
    catch (e) {
        res.send('Cannot create user');
    }
};
exports.default = validate;
/*
Reference
https://bobbyhadz.com/blog/javascript-check-if-string-contains-only-letters
*/
function checkfirstName(firstName) {
    return /^[a-zA-Z]+$/.test(firstName);
}
function checkSecondName(secondName) {
    return /^[a-zA-Z]+$/.test(secondName);
}
