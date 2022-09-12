"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TOKEN = process.env.TOKEN;
const verifyAuth = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const verified = jsonwebtoken_1.default.verify(token, TOKEN);
        // console.log(verified);
        if (verified)
            next();
        else
            throw new Error();
    }
    catch (err) {
        res.send('Not Verified');
    }
};
exports.default = verifyAuth;
